# AISM hero background

The ger-lattice (khana) line drawing (`source-lattice.webp`) recoloured as a soft hero background in AISM brand colours. Run `python3 make_hero.py` to rebuild `out/`.

- **ink**: warm dark lamp light (`#2E2923` → `#100F0D`), lattice lines in paper `#F1ECE2` at about 30%.
- **khadag**: khadag blue gradient, lattice lines in blue pale `#BFD0FF` at about 26%.

Each one comes in 2560×1440 and 1920×1080 (16:9, with the left side kept quiet for the headline) and a 1080×1350 mobile crop, as WebP and JPEG. Lines are anti-aliased, the floor is faded out and a fine grain prevents gradient banding.

```css
.hero {
  background: #100F0D image-set(
    url(aism-hero-ink-2560.webp) type("image/webp"),
    url(aism-hero-ink-2560.jpg) type("image/jpeg")) center / cover no-repeat;
}
@media (max-width: 720px) {
  .hero { background-image: image-set(
    url(aism-hero-ink-mobile.webp) type("image/webp"),
    url(aism-hero-ink-mobile.jpg) type("image/jpeg")); }
}
```

`preview.html` shows both versions with a sample headline.
