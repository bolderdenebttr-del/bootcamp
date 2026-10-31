"""Find speech / pause regions in a voice track and build the pause-trim edit list."""
import subprocess, sys, json
import numpy as np

SR = 48000

def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-vn', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)

def envelope(x, hop=0.01):
    n = int(SR * hop)
    m = len(x) // n
    fr = x[:m * n].reshape(m, n)
    return 20 * np.log10(np.sqrt((fr ** 2).mean(axis=1)) + 1e-9)

def speech_regions(x, min_pause=0.30, pad=0.06):
    db = envelope(x)
    # Pauses: dips 14 dB below the 1 s moving max, lasting >= 80 ms; speech threshold from the noise floor.
    floor = np.percentile(db, 8)
    peak = np.percentile(db, 97)
    thr = max(floor + 9, peak - 30)
    sp = db > thr
    # close short gaps (< 120 ms) inside words
    idx = np.where(sp)[0]
    regs = []
    if len(idx):
        s = idx[0]; p = idx[0]
        for i in idx[1:]:
            if (i - p) * 0.01 > 0.12:
                regs.append([s * 0.01, (p + 1) * 0.01]); s = i
            p = i
        regs.append([s * 0.01, (p + 1) * 0.01])
    regs = [r for r in regs if r[1] - r[0] >= 0.06]
    # merge regions separated by less than min_pause
    merged = []
    for r in regs:
        if merged and r[0] - merged[-1][1] < min_pause:
            merged[-1][1] = r[1]
        else:
            merged.append(r)
    dur = len(x) / SR
    out = [[max(0, a - pad), min(dur, b + pad)] for a, b in merged]
    return out, dict(floor=float(floor), peak=float(peak), thr=float(thr))

if __name__ == '__main__':
    for p in sys.argv[1:]:
        x = load(p)
        regs, st = speech_regions(x)
        print(p.split('/')[-1], f"dur {len(x)/SR:.2f}", {k: round(v, 1) for k, v in st.items()})
        for i, (a, b) in enumerate(regs):
            gap = a - regs[i - 1][1] if i else a
            print(f"  {a:6.2f} - {b:6.2f}  ({b-a:5.2f})  gap before {gap:5.2f}")
