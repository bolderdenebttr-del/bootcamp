"""Turn the ger-lattice line drawing into soft AISM hero backgrounds.

Usage: python3 make_hero.py  (writes into ./out next to this script)
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

HERE = Path(__file__).parent
OUT = HERE / "out"

# AISM brand tokens
INK_LAMP = np.array([0x2E, 0x29, 0x23]) / 255
INK_MID = np.array([0x1D, 0x1A, 0x16]) / 255
INK_EDGE = np.array([0x10, 0x0F, 0x0D]) / 255
PAPER = np.array([0xF1, 0xEC, 0xE2]) / 255
KHADAG = np.array([0x22, 0x54, 0xC7]) / 255
KHADAG_MID = np.array([0x1E, 0x4D, 0xBB]) / 255
KHADAG_DEEP = np.array([0x11, 0x2E, 0x73]) / 255
BLUE_PALE = np.array([0xBF, 0xD0, 0xFF]) / 255

THEMES = {
    "ink": dict(stops=(INK_LAMP, INK_MID, INK_EDGE), line=PAPER, strength=0.30),
    "khadag": dict(stops=(KHADAG, KHADAG_MID, KHADAG_DEEP), line=BLUE_PALE, strength=0.26),
}


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def line_mask(src, size, crop):
    """Anti-aliased 0..1 mask of the white lattice lines."""
    g = src.convert("L").crop(crop).resize(size, Image.LANCZOS)
    g = g.filter(ImageFilter.GaussianBlur(size[0] / 1400))  # kill jaggies / jpeg edges
    m = np.asarray(g, dtype=np.float32) / 255
    return smoothstep(0.08, 0.85, m)


def compose(mask, theme, lamp=(0.62, 0.38), fade_left=True, dim=1.0, seed=7):
    h, w = mask.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx, ny = xx / w, yy / h

    # lamp-light radial background
    d = np.sqrt(((nx - lamp[0]) / 0.70) ** 2 + ((ny - lamp[1]) / 0.60) ** 2)
    a, b, c = theme["stops"]
    t1 = smoothstep(0.0, 0.45, d)[..., None]
    t2 = smoothstep(0.45, 1.05, d)[..., None]
    bg = a * (1 - t1) + b * t1
    bg = bg * (1 - t2) + c * t2

    # line opacity: calm on the left where the headline sits, fade the floor
    alpha = np.full((h, w), theme["strength"] * dim, np.float32)
    if fade_left:
        alpha *= 0.35 + 0.65 * smoothstep(0.05, 0.62, nx)
    alpha *= 1 - 0.85 * smoothstep(0.72, 1.0, ny)
    alpha *= 1 - 0.5 * smoothstep(0.55, 1.15, d)  # vignette

    img = bg * (1 - (mask * alpha)[..., None]) + theme["line"] * (mask * alpha)[..., None]

    # fine monochrome grain to stop gradient banding
    rng = np.random.default_rng(seed)
    img += (rng.standard_normal((h, w, 1)) * 0.012).astype(np.float32)
    return Image.fromarray((np.clip(img, 0, 1) * 255 + 0.5).astype(np.uint8))


def main():
    OUT.mkdir(exist_ok=True)
    src = Image.open(HERE / "source-lattice.webp")
    W, H = src.size  # 1536x1024

    # desktop 16:9 (trim top rail + floor), mobile 4:5 centred on the receding wall
    desk_crop = (0, 70, W, 70 + W * 9 // 16)
    mob_w = int(H * 0.8)
    mob_crop = (W - mob_w - 80, 0, W - 80, H)

    for name, theme in THEMES.items():
        for tag, size, crop, kw in [
            ("2560", (2560, 1440), desk_crop, {}),
            ("1920", (1920, 1080), desk_crop, {}),
            ("mobile", (1080, 1350), mob_crop, dict(lamp=(0.5, 0.32), fade_left=False, dim=0.75)),
        ]:
            im = compose(line_mask(src, size, crop), theme, **kw)
            base = OUT / f"aism-hero-{name}-{tag}"
            im.save(f"{base}.webp", quality=82, method=6)
            im.save(f"{base}.jpg", quality=84, optimize=True, progressive=True)
            print(base.name, size)


if __name__ == "__main__":
    main()
