# 18-day plan · 10.28 → 11.15 23:59

Instagram first, Meta ads on Instagram placements (plus Facebook for parents only).
Messaging comes from [`positioning.md`](positioning.md); rules from [`../guardrails.md`](../guardrails.md).

## The goal, worked backwards

The only number that matters is **applications**. Everything else (reach, followers, likes) is a means.

```
seats 30 ÷ (pass rate × deposit rate) = applications needed
30 ÷ (0.50 × 0.70) ≈ 86 applications          ← replace both rates with your real numbers
(86 − applications so far) ÷ 18 days = daily target
```

Check it every morning (see "Measure" below). If you're behind by 11.08, bring the Phase 3 tactics forward.

## Day 0 (10.28): fix before spending money

These come first: without them, ads are spent blind.

1. **Website copy.** aism.world still says 90 минут, 13 долоо хоног and Demo Day 2027.02.20. Change to 120 minutes (19:00–21:00, 13:00–15:00) and remove the Demo Day date and the week count.
2. **Meta Pixel on aism.world.** There's none now, and no analytics either. Add the Pixel, plus one custom event, `ApplyClick`, fired when someone clicks any "Өргөдөл илгээх" button. Ads optimize for that event. Until it's in, run ads on "Landing page views".
3. **One question on the Google Form:** "AISM-ийн тухай хаанаас сонссон бэ?" with these options: Instagram пост, Instagram зар, Facebook, Найз, Сургууль, Бусад.
   Then make **pre-filled links** for each channel: bio, story stickers, student ads, parent ads, retargeting. The answer arrives filled in, so every application tells you its source, even though Google Forms can't be tracked by the Pixel.
4. **Share image (og:image)** on aism.world. Links pasted in Messenger currently show no picture, and Messenger is how Mongolian parents forward things.
5. **Instagram profile:**
   - Bio: "Асуудлыг эхлээд олно. Дараа нь AI-аар шийднэ. Cohort 1 · 11.15 хүртэл ↓"
   - Bio link: aism.world
   - 5 Highlights: Cohort 1 · AI дүрэм · Элсэлт · Эцэг эхэд · FAQ
6. **Post the launch carousel** ([`posts/01`](../posts/01-cohort-1-launch/post.md)) and pin it.

## The daily system: one idea, five pieces

Not 4–5 feed posts. On a young account, more feed posts split the same reach into smaller pieces, and Stories don't compete with the feed. So:

| Slot | Format | Job | Time (adjust with Insights after day 5) |
|---|---|---|---|
| 1 | **Reel** | Reach people who don't follow you yet. Source for ads | 20:00 |
| 2 | **Carousel or static** | Depth: saves, shares, parents | 12:30 |
| 3 | **Story: interact** | Poll, quiz or question sticker on the day's idea | 10:00 |
| 4 | **Story: proof** | Reshare of the reel or carousel, or behind the scenes | 16:00 |
| 5 | **Story: act** | Link sticker (pre-filled form link) + countdown sticker to 11.15 23:59 | 21:30 |

All five carry **the same idea that day**. That's the depth: one script a day instead of five, and every viewer meets the message from several angles.

**Content mix shifts by phase:**

| | Question (beats 1–3) | Method | Real experience | Admissions |
|---|---|---|---|---|
| Phase 1 · 10.29–11.02 | 50% | 30% | 10% | 10% |
| Phase 2 · 11.03–11.09 | 15% | 30% | 40% | 15% |
| Phase 3 · 11.10–11.15 | 10% | 15% | 20% | 55% |

## Calendar

R = reel, F = feed post (carousel or static), S = story sticker. The link and countdown story (slot 5) runs every day and isn't repeated below.

### Phase 1 · The question (10.29–11.02): start the conversation, win the reframe

| Day | Idea | Pieces |
|---|---|---|
| **1 · 10.29 Thu** | AI биднийг тэнэгрүүлж байна уу? | **R:** the 45s founder script (positioning.md). **F:** the same story as 6 slides (question → not AI → no one taught us → few build → everyone can, with the right start → why we exist + CTA). **S:** poll "AI чамайг илүү ухаантай болгодог уу, залхуу болгодог уу?" |
| **2 · 10.30 Fri** | The evidence | **R:** "1,000 сурагч. Нэг туршилт. 17%." Text and voiceover on the PNAS study. Ends with "Асуудал нь AI биш, яаж ашиглах нь." **F:** static stat card with the source. **S:** quiz "AI-тай давтсан сурагчид AI-гүй шалгалтад…?" |
| **3 · 10.31 Sat** | Хэн ч зааж өгөөгүй | **R:** POV text reel "Даалгавраа ChatGPT-ээр 2 минутад хийчихлээ… шалгалт дээр." **F:** carousel "AI-г буруу ашиглах 5 зуршил → зөв хувилбар" (copy-paste → ask it to critique; ask for the answer → ask for a hint; trust it → check it). Built to be saved. **S:** question sticker "AI-г хамгийн их юунд ашигладаг вэ?" |
| **4 · 11.01 Sun** | Хүн бүр хэрэглэдэг, цөөхөн нь бүтээдэг | **R:** user vs builder, split screen. "Ялгаа нь: тэд эхлээд боддог." **F:** static two-column "AI хэрэглэгч / AI-аар бүтээгч". **S:** slider "AI-аар өөрөө юм бүтээж үзсэн үү?" |
| **5 · 11.02 Mon** | AI-д зөв prompt хэрэгтэй. Хүнд ч бас. | **R:** motion explainer of the 4 AI roles: critic → tutor → builder → teammate (`aism-motion-explainer` skill). **F:** carousel "AI-тай ажиллах 4 шат". **S:** quiz "Тайлбарлаж чадахгүй кодыг төсөлд оруулж болох уу?" |

### Phase 2 · The proof (11.03–11.09): show how it works and who's behind it

| Day | Idea | Pieces |
|---|---|---|
| **6 · 11.03 Tue** | Асуудлыг эхлээд олно | **R:** screen recording. Ask AI to solve a UB problem (traffic, air), and it answers in a minute. Then list everything it assumed without asking anyone. This is the L1 lesson, shown. **F:** carousel "Сайн асуудлын шалгуур: хэн, юу, хэзээ, яагаад". **S:** question "Өдөр бүр тулгардаг нэг асуудал чинь юу вэ?" Reshare the best answers. |
| **7 · 11.04 Wed** | 3 бодит төсөл | **R:** fast cut "AISM өгсөн асуудал → өөрсдийн олсон асуудал → бодит хэрэглэгчтэй MVP". **F:** carousel, one slide per project (what you learn → what you ship). **S:** poll "Аль салбарын асуудал шийдмээр байна: боловсрол / эрүүл мэнд / хот / байгаль?" |
| **8 · 11.05 Thu** | Эцэг эхэд + **IG Live 20:00** | **R:** "AI хүүхдийг маань тэнэгрүүлж байна уу?" with the approved parent line. **F:** parent carousel: how we check (weekly 3-line check, L10 code test, explain-or-cut), safety (no unrecorded 1:1s with under-18s, official channels only, reference checks), college prep, the price. **S:** Live countdown + question box. Live: founder + one coach, 30–40 min, saved to profile; clip 3 answers for days 14–15. |
| **9 · 11.06 Fri** | Код мэдэх шаардлагагүй | **R:** "Бид код биш, сониуч зан, тууштай байдал, хүмүүстэй ажиллах чадварыг хардаг." **F:** carousel "Бид юуг хардаг вэ", one trait per slide and what it looks like in an application. **S:** poll "Чамд аль нь хамгийн их байдаг вэ?" |
| **10 · 11.07 Sat** | Ментор, коучууд | **R:** a coach's 30s video: "Би яагаад AISM-д коуч болсон бэ." **F:** coach intro carousel as a **Collab post** with the coach, so it reaches their followers too. Written consent first. Without it: a mentor-role explainer, no names. **S:** question "Коучаас юу асуумаар байна?" |
| **11 · 11.08 Sun** | Их сургуулийн бэлтгэл · **1 week left** | **R:** "Их сургуульд өргөдөл өгөх гэж байна уу? AI эсээг чинь бичихгүй. Харин…" **F:** carousel with what's included (3 × 1:1, essay feedback, school list, rec letter). Never promise admission. **S:** "1 долоо хоног үлдлээ" |
| **12 · 11.09 Mon** | Бодит туршлага | **R:** Investor Day: "Батлав. Хүрээг нь багасга. Дахин бод." **F:** carousel on Demo Day judging (30% real problem · 25% fit · 20% it works · 15% improved from feedback · 10% presentation). "Кодын чанар шалгуурт байхгүй." **S:** poll "Debug өдөр багш код бичихгүй. Чи бэлэн үү?" |

### Phase 3 · The close (11.10–11.15): remove the last doubts, make it easy to act

| Day | Idea | Pieces |
|---|---|---|
| **13 · 11.10 Tue** | Өргөдөл 20 минутад | **R:** screen recording of the form with no personal data: 4 short answers, a 60–90s video, 48-hour reply. **F:** carousel "Өргөдлийн видеонд юу ярих вэ" (a problem you noticed, something you started; production quality doesn't matter). **S:** poll "Өргөдөл өгсөн үү? Тийм / Удахгүй". Instagram shows who voted; send each "Удахгүй" voter one short, friendly DM with the link. |
| **14 · 11.11 Wed** | Цаг, сургууль, ЭЕШ | **R:** founder answers 3 questions fast (Live clips): schedule (Tue 19:00–21:00, Sat 13:00–15:00, 8–10 h/week), school and ЭЕШ clashes, missed sessions. **F:** carousel "7 хоногийн хэмнэл". **S:** question box; answer in Stories all day. |
| **15 · 11.12 Thu** | Үнэ ба үнэ цэнэ | **R:** "₮2,990,000-д юу багтсан бэ?" quick list. **F:** static price card: all included, 3 installments, no discounts or extra fees, refund if AISM cancels or delays the start 7+ days. **S:** "Гэр бүлээрээ ярилцаарай: тэнцсэнээс хойш шийдэх хугацаа 48 цаг". |
| **16 · 11.13 Fri** | Manifesto · **2 days left** | **R:** typographic reel over the hero art: "Асууна. Эргэцүүлнэ. Оролдоно. Бүтээнэ. Туршина. Сайжруулна. Тайлбарлана." **F:** the manifesto as one shareable static. **S:** countdown |
| **17 · 11.14 Sat** | Маргааш хаагдана | **R:** founder, personal, 45–60s: why I started AISM. **F:** static "Сүүлийн 24 цаг". **S:** pointer to the FAQ Highlight + link |
| **18 · 11.15 Sun** | Өнөөдөр 23:59 | **R:** 10s: "Өнөөдөр 23:59. 20 минут л хэрэгтэй." **F:** static "Өнөөдөр хаагдана". **S:** 5–6 Stories (09:00, 12:00, 18:00, 21:00, 22:30, 23:30), the only day above three. After 23:59: thank-you Story, edit the launch post's first line to "хаагдлаа", unpin. |

## Meta ads

**Run everything from Ads Manager, not the Boost button**, so you control the objective, placements and exclusions.

**Organic first.** A piece goes into ads only after it beats your median organic Reel within 24–48h on shares and watch time. Organic is the free creative test; ads only scale winners.

| Campaign | Dates | Objective | Audience | Placements | Creative |
|---|---|---|---|---|---|
| **A · Warm-up** | 10.29–11.04 | Video views (ThruPlay) | Mongolia, 16–22 + 35–55, broad | IG Reels, Stories, Feed | Days 1–5 reels. Cheap reach that builds a pool for C |
| **B · Apply** | 10.31–11.15 | Sales → `ApplyClick` (until the Pixel is in: Landing page views) | Ad set 1: students 16–22. Ad set 2: parents 35–55 | Students: IG only. Parents: IG + FB Feed (parents are on Facebook) | 3–5 best reels/carousels per ad set; the parent carousel for ad set 2. CTA button "Apply now" → aism.world |
| **C · Retarget** | 11.06–11.15 | Sales → `ApplyClick` | IG engagers 30d + video viewers 50%+ + site visitors 14d, excluding `ApplyClick` | IG Stories, Reels, Feed | Deadline countdown, FAQ answers, price card, founder letter. Link straight to the pre-filled form (warm people need fewer steps) |

**Budget (recommended ₮4,000,000; the minimum that still works is half of each line):**

| Window | Per day | Split | Total |
|---|---|---|---|
| 10.29–11.02 | ₮150,000 | A 60% · B 40% | ₮750,000 |
| 11.03–11.09 | ₮200,000 | B 70% · C 30% (C from 11.06) | ₮1,400,000 |
| 11.10–11.15 | ₮310,000 | B 50% · C 50% | ₮1,860,000 |

At ₮2,990,000 per seat, the whole budget pays for itself with about 1.3 seats it brings in.

**Rules:**
- **Under-18 targeting is age and location only** (Meta's teen policy). Keep audiences broad and let the creative do the targeting: the student hook and the parent hook select themselves.
- **Every morning:** pause ads costing more than 2× the ad set's average per `ApplyClick` after ₮40,000 spent; move that money to the best ad.
- **Don't edit live ads.** Edits restart Meta's learning phase. Duplicate the ad and change the copy instead.
- **No famous faces or names in ads** (see positioning.md).

## Measure: 10 minutes every morning

One row a day in a sheet:

| Date | New applications | Total | By source (form question) | Ad spend | `ApplyClick` | Link taps (IG) | Profile visits | Best piece yesterday |
|---|---|---|---|---|---|---|---|---|

**Decisions it drives:**
- Below the daily target 3 days running → start Phase 3 tactics now (poll + DM, retargeting).
- A source with zero applications by 11.06 → cut its budget.
- The day's best piece → tomorrow's ad, and its format gets repeated.

## Making 5 pieces a day without burning out

- **Two filming sessions** cover all 18 reels:
  - 10.29 morning: days 1–9.
  - 11.05 afternoon: days 10–18, including the Live.
  - Kit: phone, clip-on mic, window light. Captions on everything.
- **Carousels and statics** come from the same template as the launch post (`posts/*/slides.html` → `tools/render.js`). Copy and rendering can be done here a few days ahead.
- **Stories are made live** by one person who also owns DMs and comments.
- **DMs and comments:** reply within 2 hours, 09:00–23:00. Save replies for the site's 6 FAQ questions. Every DM is a warm applicant; this is where Phase 3 is won.
- **Instagram Trial Reels** (shown to non-followers first): test two hooks for day 1 and day 8, and keep the winner for ads.
- **Consent:** no student faces yet. Street interviews only with 18+ people, or with a guardian's written OK. Coach names only with written consent.
