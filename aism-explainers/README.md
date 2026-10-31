# AISM motion explainers (MN, vertical)

Four short explainers in the AISM paper / ink / khadag style. Each one is built on the voice from one of the four phone takes; the footage from those takes is not used. The voice tracks are kept in `voice/` as 48 kHz mono FLAC.

| Video | File | Length | Voice take |
|---|---|---|---|
| v1 · Diploma | `out/AISM_Diploma_MN_explainer_v1.mp4` | 27.3 s | `62a03716…MOV` |
| v2 · Room | `out/AISM_Room_MN_explainer_v1.mp4` | 29.4 s | `642f59d6…MOV` |
| v3 · Answers | `out/AISM_Answers_MN_explainer_v1.mp4` | 26.4 s | `e55bb504…MOV` |
| v4 · Ready | `out/AISM_Ready_MN_explainer_v1.mp4` | 29.4 s | `8ffa49c3…MOV` |

Beat sheets: [`BEATS.md`](BEATS.md). Each has 1080 × 1920, 30 fps, H.264 two pass yuv420p with faststart, AAC 192 kbps 48 kHz, and a 2.5 s end card with the AISM wordmark.

## Scripts as captioned

Transcribed with Whisper large-v3 plus two Mongolian fine-tunes (`Tsedee/whisper-large-v3-turbo-mn-2`, `bayartsogt/whisper-medium-mn-10`), corrected by hand, then force-aligned word by word. Every spoken word is on screen and nothing else is.

**v1** Их сургуулиа төгсөөд диплома авсан ч өөрийнхөө бодож байсан зүйлийг яаж бүтээхээ мэдэхгүй байвал яах вэ? Мэдээж дүн, диплом чухал. Гэхдээ сурсан зүйлээ амьдрал дээр хэрэглэх, бодит асуудал шийдэх, багаар ажиллах, өөрийн гэсэн төсөл бүтээх чадвар ч бас чухал. Эдгээр чадвараа хөгжүүлэхийн тулд заавал төгсөх курс хүртлээ хүлээх шаардлагагүй. AI School of Mongolia шинэ элсэлтээ авч эхэллээ. Санаагаа бодит болгох эхний алхмаа хийгээрэй. Бид танд туслая.

**v2** Нэг өрөөнд хамт байгаа хүмүүсээсээ хамгийн ухаантай нь байх албагүй гэвэл ямар вэ? Харин ч чамаас илүү мэдлэгтэй хүмүүсээс суралцаж, ойлгохгүй зүйлээ асууж, алдаа гаргаж, шинэ зүйл туршиж үздэг орчинд байх нь илүү чухал байж болох юм. Чи ганцаараа бүхнийг мэддэг байх шаардлагагүй. Харин мэдэхгүй зүйлээ сурч, бусадтай хамтран өөрийнхөө бодож байснаас ч илүү зүйлийг хийж чаддаг байх хэрэгтэй. AI School of Mongolia шинэ элсэлтээ авч эхэллээ. Санаагаа бодит болгох эхний алхмаа хийгээрэй. Бид танд туслая.

**v3** Сургууль бидэнд асуултад зөв хариулахыг заадаг. Харин зөв хариулт нь бэлэн байхгүй үед яг яах вэ? Бодит амьдрал дээр бүх зүйл заавар, хариулттайгаа ирдэггүй. Заримдаа чи өөрөө асуултаа олж, шийдлээ хайж, алдаж үзэж байж сурдаг. Тиймээс зөвхөн юу мэддэг байх нь чухал биш. Мэдэхгүй зүйлтэйгээ хэрхэн ажиллаж сурах нь бас чухал. AI School of Mongolia шинэ элсэлтээ авч эхэллээ. Санаагаа бодит болгох эхний алхмаа хийгээрэй. Бид танд туслая.

**v4** Чи ямар нэгэн зүйл эхлэхээсээ өмнө өөрийгөө хангалттай мэдлэгтэй, чадвартай, итгэлтэй болохыг хүлээгээд байдаг юм биш биз? Яг үнэндээ эхэлснийхээ дараа л өөртөө итгэлтэй болж, илүү их зүйл сурдаг. Бүх зүйлийг мэддэг болох хүртлээ хүлээвэл эхлэх өдөр чинь улам л хойшлоно. Алдаа гаргаж болно, эхний оролдлого чинь бүтэлгүйтэж ч болно. Гэхдээ эхлэхгүй бол юу ч өөрчлөгдөхгүй. Өөрийгөө бэлэн болсон гэж мэдрэхийг хүлээх хэрэггүй. Эхний алхмаа хийгээрэй. AI School of Mongolia шинэ элсэлтээ авч эхэллээ. Бид танд туслая.

### Native read needed (Boldoo)

Every line needs a native read. These words are where the models disagreed or where I picked the standard spelling:

| Video | On screen | What the models heard | Note |
|---|---|---|---|
| v1 | диплома авсан ч | диплома (all three) | Kept as spoken; standard form would be диплом / дипломоо |
| v2 | гэвэл ямар вэ? | ямар уу / мүрүү | Could also be "итгэх үү?" |
| v3 | байхгүй үед яг яах вэ? | гэж / ээж / гөөгийг | "үед" is my best reading |
| v3 | асуултаа олж | асуултаа болж / асуултай болж | |
| v3 | хэрхэн ажиллаж сурах нь | ажил сурах нь (all three) | Possibly "ажиллахаа сурах" |
| v4 | улам л хойшлоно | ул мал хойшилно / улам л хойшлоно | |
| v4 | Алдаа гаргаж болно | гаргаж болно / гаргаа ч болно | No "ч" in the first clause |
| all | шинэ элсэлтээ | эсэлтэй / нисэлтэй / элсэлтээ | |
| all | туслая | тусалъя | Standard spelling used |
| end card | Ирээдүйг эндээс бүтээ. | | Promise wording still to confirm |

## Decisions and deviations from the style lock

- **Phase.** Every take says "шинэ элсэлтээ авч эхэллээ", which is an enrollment call, so these are sales-phase videos. They show no price, seats, dates or deadlines.
- **Length.** The takes run 26 to 29 s with the end card, not 60 to 95 s. The 90 s beat grammar was adapted to the scripts as recorded rather than rewritten.
- **Register shares.** The AISM line plus the end card puts khadag at 17 to 22% (the lock says ≤ 12%), because the videos are short. Ink is 7% in v2 and 16% in v1 because those scripts have only one stakes beat each.
- **No figures, no source lines.** None of the scripts quote a statistic.
- **Wordmark.** The official horizontal AISM mark from `assets/` is used as a paper-colour single-colour reversal on khadag. `aism_wordmark_stacked.png` is kept for later use.
- **Pauses.** Pauses of 0.3 s or more are trimmed to about 0.12 s. One 0.45 s pause is kept before the AISM line.
- **Bed and effects** are synthesised in `audio.py` (warm piano and pad at 88 bpm in D major; sub hit, silk swish, wooden tick, airy whoosh). Swap in licensed stems if preferred.
- **Engine.** The project's `AISM_Motion_Engine.html` and `AISM_Motion_Render.py` were not reachable from this session, so `engine.html` was rebuilt from the skill spec. Rendering uses Node Playwright.

## Build

```bash
cd fontpkgs && npm ci && cd ..
pip install faster-whisper scipy pyloudnorm
python3 audio.py align v1        # force-align videos/v1_script.json against voice/v1.flac, trim pauses -> videos/v1_words.js, build/v1/voice.wav
./build.sh v1 AISM_Diploma_MN_explainer_v1.mp4
```

- `engine.html`: registers, grain, two-tier captions (ghost plus per-word fill), khadag ribbon, end card, cue export.
- `videos/common.js`: caption cursor, which consumes the aligned words in order and warns on any mismatch or unused word; shared icons; the shared CTA scenes.
- `videos/v1.js` to `v4.js`: one `v.add(register, phrases, scene)` per shot. Shots cut 2 frames before the first syllable of their sentence.
- `render.js`: `frames` writes style frames, `motion` renders the silent MP4 with 4 parallel browsers, `cues` and `beats` export JSON.
- `audio.py`: `align` handles alignment, pause trim and the dialogue chain; `mix` builds the bed, effects, ducking and two-pass loudnorm to −14 LUFS.
- `encode.sh`: final two-pass x264 + AAC. `qa.py` checks for one-second windows with no visible change. `beats.py` writes `BEATS.md`.

## QA (skill checklist)

| Check | Result |
|---|---|
| Every spoken word on screen, nothing unspoken | Pass. The caption cursor consumed every aligned word in order, with no mismatch or leftover warnings |
| Figures sourced | Not applicable; no figures are spoken |
| Word fills within ±0.1 s of onset | Fills land on force-aligned onsets; the first word of each speech run fills 0.06 s before its acoustic onset |
| Cuts on sentence onsets only | Pass. Each shot starts 2 frames before its sentence's first word |
| Safe zones | Pass. Captions at x 110 to ≤ 970, y 330 to 720; scenes y 700 to 1490 |
| Ө ө Ү ү ₮ | Pass (Montserrat cyrillic-ext and latin-ext, Tinos cyrillic-ext loaded before the first frame) |
| One accent word per phrase, token colours only | Pass |
| Register shares | Off spec; see deviations above |
| No 30 frame window without visible change | Pass on all four (`qa.py`, grain filtered out) |
| No dialogue gap over 0.45 s | Pass. Pauses trimmed to about 0.12 s, one 0.45 s pause kept before the AISM line |
| −14 LUFS, TP ≤ −1.0 dBTP, LRA ≤ 4 | v1 −14.1 / −1.5 / 3.1 · v2 −14.0 / −1.4 / 2.4 · v3 −14.0 / −1.4 / 3.0 · v4 −14.0 / −1.3 / 2.2 |
| 1080 × 1920, 30 fps, faststart, < 29 MB | Pass: 17.5 to 19.3 MB, BT.709 tagged |
| Native read | Pending; see the table above |
