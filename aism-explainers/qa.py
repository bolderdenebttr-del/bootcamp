"""QA helpers: static-window check (grain filtered out) and caption/cut report."""
import subprocess, sys, json
import numpy as np

def static_windows(path, thr=0.35, win=30):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-vf', 'scale=54:96:flags=area,format=gray', '-f', 'rawvideo', '-'],
                         capture_output=True, check=True).stdout
    f = np.frombuffer(raw, np.uint8).reshape(-1, 96, 54).astype(np.float32)
    d = np.abs(np.diff(f, axis=0)).max(axis=(1, 2))      # strongest local change between frames
    moving = d > thr * 10
    bad, run = [], 0
    for i, m in enumerate(moving):
        run = 0 if m else run + 1
        if run == win:
            bad.append((i - win + 1) / 30)
    return len(f), bad, d

if __name__ == '__main__':
    for p in sys.argv[1:]:
        n, bad, d = static_windows(p)
        print(p, f'{n} frames; still windows of 30 frames start at: {[round(b, 2) for b in bad] or "none"}')
