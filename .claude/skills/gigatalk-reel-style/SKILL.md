---
name: gigatalk-reel-style
description: Use when editing reels or clips for the GigaTalk podcast — the locked "Spatial word-build" (GigaTalk v3) style: word-by-word kinetic captions beside the face, typography tiers, white text with GigaTalk red accents, light-leak clusters, red number cards, jump-zooms, beat timing, and the 4:3 and vertical 1080×1920 builds.
---

# STYLE LOCK — "Spatial word-build" (GigaTalk v3)

Source: reference screen recording, analysed 2026-10-21. Style only — no content, branding, footage, logo or product from the reference is reused.

## 0. Probe
- File: 1290×2796 HEVC, rotated 90° → 2796×1290 landscape phone recording of a 16:9 video, pillarboxed. Real picture = crop 2294:1290:251:0 → normalised to 1920×1080.
- VFR ~46 fps avg (60 fps container); edit cadence reads as 30 fps (all flash/leak events land on 33 ms steps). Audio AAC 44.1 kHz stereo.
- Recording 23.74 s; first 0.40 s is player UI, edit runs 0.40 → 22.73 s (22.3 s) + end card.

## 1. Shot structure & pacing
| # | in–out (s) | dur | shot | text behaviour |
|---|---|---|---|---|
| 1 | 0.40–4.10 | 3.70 | podcast MCU, speaker left third | phrase builds right of head |
| 2 | 4.10–5.60 | 1.50 | tighter cam on same speaker (punch-in) | short line + emphasis word |
| 3 | 5.60–6.43 | 0.83 | wide two-shot | phrase split left / right of head |
| — | 6.43–6.87 | 0.44 | light-leak cluster (3 bursts) | text stays visible under leak |
| 4 | 6.87–9.50 | 2.63 | outdoor CU, centred | 3-tier build → hero word |
| 5 | 9.50–10.87 | 1.37 | b-roll location wide | split left / right |
| 6 | 10.87–11.83 | 0.96 | same location, closer | small + emphasis + small |
| 7 | 11.83–13.70 | ~0.3–0.6 each | b-roll montage (4 cuts) | 1 word per cut, then accent word |
| 8 | 13.70–15.63 | 0.2–1.0 | b-roll montage (3 cuts) | single words, then shouted split pair |
| 9 | 15.63–16.87 | 1.24 | handheld POV b-roll | text tilted & pinned to an object |
| — | 16.87 | 1 frame | full cream flash | — |
| 10 | 16.90–18.97 | 2.07 | flat colour card + product cutout | words flank the object |
| 11 | 18.97–20.70 | 1.73 | back to podcast MCU | **card text carries over the cut unchanged** + accent note |
| 12 | 20.70–21.67 | 0.97 | jump-zoom ×1.18 on same shot | text scales with frame + defocuses |
| — | 21.67–22.07 | 0.40 | light-leak cluster | — |
| 13 | 22.73→ | ≥1.0 | end card (B&W photo + logo) | — |

- 17 visible cuts in 22.3 s → **ASL 1.3 s**. Shape: **long open (3.7 s) → speed up → montage of 0.2–0.6 s shots (11.8–16.9 s) → slow down on a graphic card (2.1 s) → payoff on A-cam → logo.**
- Cuts land on phrase ends and on the stressed word, not on a fixed beat grid. Low-end hits cluster in the montage and the end (≈ every 0.25–0.35 s).

## 2. Composition grid (1920×1080 measured)
- Text lives in **negative space beside the face at eye level**: first line baseline at **y ≈ 43–46 % H**.
- Split phrases: left block x **8–35 % W**, right block x **70–85 % W**, the head sits between them. The phrase reads across the face.
- Emphasis/hero lines stack **directly below**, centred on the subject, overlapping the torso: y **62–93 % H**.
- Text sits on top of the subject, never behind; no cut-outs, no masks.
- Leading is tight: gap between stacked lines ≈ **0.08–0.12 em**.

## 3. Typography system
| tier | ref cap-height | ref font size @1080 h | ratio | use |
|---|---|---|---|---|
| S — carrier | 46 px | ≈ 64 px | 1.0 | every spoken word |
| M — emphasis | 60 px | ≈ 84 px | 1.3 | the second line of a question or claim |
| L — number | ≈ 90 px | ≈ 120 px | 1.9 | numbers and units ("24 hours") |
| XL — hero | 170 px | ≈ 235 px | 3.7 | ONE key word per phrase |
- Reference face: neo-grotesk Bold, tracking **≈ −5 %**, sentence case (ALL CAPS only for shouted words), no stroke, no shadow, no box.
- Accent font (once per video): rough brush script, ≈ 2.5× S, in the accent colour — the reaction or expletive beat.
- Annotation: a small correction word in the accent colour, wrapped in asterisks, rotated **−8°**, at 0.6× S, sitting just above the line it corrects.

## 4. Colour (sampled)
| role | reference | → GigaTalk |
|---|---|---|
| text | #FFEAA7 cream | **#FFFFFF white** |
| accent (script / annotation) | #73FDC4 mint | **GigaTalk red** |
| full-frame card | #104130 deep green | **GigaTalk red card** |
| flash frame | #FEFEEF | #FFFFFF |
| leak core / edge | ≈ #FFF8E0 core → #FF8A3D / #E8402A edge | keep (warm leak) |
| footage | warm, natural | no grade (per cut-20 rule) |

## 5. Motion
- **Text entry: hard cut-on, 0 frames.** No fade, no slide, no scale pop. Each word appears on the frame its sound starts (±1 frame) and **builds up word by word** into the phrase.
- Phrase exit: a hard clear on the next cut, or on the first word of the next phrase. Text **survives light leaks**, and can survive a cut when the thought continues (card → A-cam).
- Easing: none on text. The only eased move is the camera jump-zoom, a hard cut to ×1.18 with motion blur on the first 1–2 frames.
- Defocus beat: on a reaction or laugh, the punched-in frame scales the text with it (×1.18) and blurs it (Gaussian ≈ 6–8 px @1080) while the speaker stays sharp — the camera "racks focus" to the face.
- Tracked text on b-roll: words rotated −20° to −30°, pinned beside a moving object, added one per word.
- A-cam shots are locked off. B-roll is handheld and kept as shot.

## 6. Transitions
- **Light-leak / film-burn cluster** = the signature. 2–3 bursts within **0.25–0.45 s**, each **1–4 frames @30 fps** (33–133 ms), peak luma ~200–255, warm orange-red edges sweeping horizontally, applied in Screen/Add.
- Placement: on ≈ 50 % of cuts and on punchlines mid-shot. Clusters in this edit at 6.43, 11.83, 12.67–13.07, 14.30–14.63 and 21.67–22.07.
- Into a graphic card: **1-frame full white flash**, then a hard cut.
- Everything else is a straight cut (no smears, no slides).

## 7. Beat timing rules
- Word-on = the onset of the spoken syllable. Hero word = the stressed word of the phrase, and it gets the biggest tier.
- A leak cluster starts **exactly on the cut frame**; the first burst covers the cut.
- Montage cut length 0.2–0.6 s; dialogue shots 1.3–3.7 s; card 2.0 s; end card ≥ 1.0 s.
- Lead with ~0.4 s of A-cam before the first word.

## 8. GigaTalk build (as used on the chip cut, 4:3)
- Canvas 1920×1440 @30 (source 1440×1080 ×1.333). Nothing within 100 px of the edges.
- Speaker's eyes anchored at (680, 520) on every framing; jump zooms cycle 1.00 / 1.28 / 1.00 / 1.45 / 1.12 / 1.34 / 1.00 / 1.22 / 1.50, cut on word onsets, shots 0.4–2.4 s (ASL ≈ 1.7 s). Pauses > 0.30 s trimmed to ≈ 0.14 s.
- Captions: Benzin-Bold, white, sentence case (no ALL CAPS), tracking −2 %, soft shadow (black 40 %, blur 16, y+4). Column x 1010–1820, first line top y 560 (eye level beside the face). S 64 px, line gap 0.12 em; one hero word per phrase at up to 230 px (auto-fit to 810 px).
- Word-on: hard cut on the frame the word's sound starts (floor to frame). Phrases ≤ 6 words / ≤ 2.3 s, break at pauses ≥ 0.2 s, sentence ends and connectors (за, тэгээд, тэгэхээр…). Split layout: a leading connector sits left of the head (right edge x 430) on wide shots only.
- Word timing: Whisper large-v3 cross-attention DTW (heads L7h0 L10h17 L12h18 L13h12 L16h1 L17h14 L19h11 L21h4 L24h1 L25h6) + Whisper-small check; disagreements resolved to speech starts. Measured error at pause anchors: median 35 ms.
- Red card (GigaTalk): full-frame red 243,59,19 → corners 211,45,13 (radial, centre y 45 %), fine grain σ≈3; number alone in Benzin 300 px centred (baseline y 860), slides up 46 px + fades in over 9 frames (ease-out quart, scale .94→1), shadow 90,10,0 @28 % blur 20; captions continue centred below (y 1010). 1-frame white flash in, hit + snap SFX, light-leak cluster out. Card length 1.1 s. Only numbers he says.
- Light leaks: 2–3 bursts per cluster on cuts at key terms (≈ every 7–8 s), whoosh −8 dB vs local speech.
- English terms said in English are shown in English (CPU, GPU, LLM, iPhone, ASIC, Windows, OpenAI…).
- End: GigaTalk keyboard-key logo + topic label, 2.0 s. Loudness −14 LUFS, TP −1 dB. No music bed.

## 9. Vertical translation for GigaTalk (1080×1920, 30 fps)
- Side safe zone 64 px; caption-safe bottom 340 px; top 220 px.
- Sizes are scaled by the width ratio 1080/1920 × 1.6 for phone legibility, with Benzin-Bold's wide set taken into account:
  - S **52 px**, M **68 px**, L **104 px**, XL auto-fit to ≤ 86 % W (max **190 px**).
  - Tracking **−3 %** (Benzin is extended; −5 % collides).
- Grid: the speaker's head sits in the top half. The **carrier band starts at y 54 %**, split chunks go to x 8–46 % / 54–92 %, and M/L/XL stack below down to y 78 %.
- Red card: full-frame red, the number/percent alone and centred (XL), with S words flanking it. The S line then carries over the cut onto the next host shot.
- Keep: no fisheye, no outlines, warm natural skin, audible SFX (a whoosh on each leak cluster, a hit on the hero word and on the card), and the GIGA TALK key logo as the end card.
