// v4 · Don't wait to feel ready: confidence comes after you start. Voice: clip 8ffa49c3.
const v = Video();

// Readiness bars (knowledge, skill, confidence) under a dashed "enough" line.
function readiness(lt, R, ev) {
  const acc = R.accent, mute = R.mute;
  const base = 1390, line = 900, xs = [450, 625, 800];
  let s = K.draw(`M330 ${base} L900 ${base}`, 570, eio(prog(lt, 0, 0.5)), R.line, 4);
  const lk = ev.line !== undefined ? prog(lt, ev.line, 0.5) : 1;
  const crossed = ev.cross ? ev.cross.some(c => lt > c[1]) : false;
  s += `<path d="M330 ${line} L900 ${line}" stroke="${crossed ? acc : mute}" stroke-width="4" stroke-dasharray="14 12" opacity="${eo(lk)}"/>`;
  const icons = [(x, y) => I.book(x, y, 0.42, R.fg), (x, y) => I.gear(x, y, 26, R.fg, lt * 0.8), (x, y) => I.flame(x, y, 0.75, R.fg)];
  xs.forEach((x, i) => {
    let h = 0;
    for (const [bar, t0, to, d] of ev.rise) if (bar === i) h = lerp(h, to, eio(prog(lt, t0, d || 0.8)));
    const wob = h > 0 ? 6 * Math.sin(lt * 2.4 + i) * (ev.still && lt > ev.still ? 0 : 1) : 0;
    const top = base - h * (base - line) + wob;
    const over = top < line;
    s += `<rect x="${x - 52}" y="${top}" width="104" height="${base - top}" rx="12" fill="${over ? acc : R.soft}" stroke="${over ? acc : R.line}" stroke-width="4"/>`;
    s += K.pop(lt, 0.1 + 0.07 * i, icons[i](x, base + 52), x, base + 52);
    const c = ev.cross && ev.cross.find(c => c[0] === i);
    if (c) s += K.landing(x, line, lt, c[1], acc);
  });
  return s;
}

// 1 · Hook (paper H): you wait while the bars stall under "enough".
v.add('paper', [
  'Чи ямар нэгэн зүйл | эхлэхээсээ* | өмнө',
  'өөрийгөө хангалттай мэдлэгтэй, чадвартай, | итгэлтэй* | болохыг',
  'хүлээгээд байдаг юм | биш биз?',
], (lt, R, on) => {
  const w = on('хүлээгээд');
  let s = readiness(lt, R, { line: on('хангалттай'), rise: [[0, on('мэдлэгтэй,'), 0.62], [1, on('чадвартай,'), 0.5], [2, on('итгэлтэй'), 0.4]] });
  s += K.pop(lt, 0.05, I.person(205, 1390, 1.25, R.accent), 205, 1390);
  const ck = eo(prog(lt, w - 0.1, 0.35));
  if (ck > 0) s += I.clock(205, 1160, 38, R.mute, Math.max(0, lt - w) * 6, { opacity: ck });
  return s;
}, { sfx: on => [['tick', on('мэдлэгтэй,')], ['tick', on('чадвартай,')], ['tick', on('итгэлтэй')]] });

// 2 · Start first (paper M): you step off and the bars rise past the line.
v.add('paper', [
  'Яг үнэндээ | эхэлснийхээ* | дараа л',
  'өөртөө итгэлтэй болж, | илүү* их | зүйл сурдаг.',
], (lt, R, on) => {
  const st = on('эхэлснийхээ');
  const rise = [[0, -1, 0.62, 0.01], [1, -1, 0.5, 0.01], [2, -1, 0.4, 0.01],
    [2, on('итгэлтэй'), 1.12], [0, on('илүү'), 1.08], [1, on('их'), 1.15]];
  let s = readiness(lt, R, { rise, cross: [[2, on('итгэлтэй') + 0.55], [0, on('илүү') + 0.6], [1, on('их') + 0.6]] });
  const p = hop([205, 1390], [300, 1390], prog(lt, st, 0.4), 70);
  s += I.person(p[0], p[1], 1.25, R.accent);
  const lv = leave(prog(lt, st, 0.6));
  s += I.clock(205, 1160 - 200 * lv.d, 38, R.mute, lt * 6, { opacity: lv.o });
  return s;
}, { sfx: on => [['whoosh', on('эхэлснийхээ')], ['tick', on('итгэлтэй') + 0.55], ['tick', on('илүү') + 0.6]] });

// 3 · The start day recedes (ink M): you wait, the flag slides away toward the horizon.
v.add('ink', ['Бүх зүйлийг мэддэг болох | хүртлээ хүлээвэл', 'эхлэх өдөр чинь улам л | хойшлоно.*'], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const hz = 1270;
  let s = K.draw(`M100 ${hz} L980 ${hz}`, 880, eio(prog(lt, 0, 0.6)), R.line, 4);
  // days passing: a sun arcing over and over
  const d0 = on('өдөр');
  if (lt > d0) {
    const u = ((lt - d0) / 0.9) % 1;
    s += K.circle(lerp(380, 960, u), hz - 40 - 300 * Math.sin(Math.PI * u), 18, acc, { opacity: Math.sin(Math.PI * u) * 0.9 });
  }
  const go = on('улам');
  const k = eio(prog(lt, go, 1.0));
  const lv = leave(prog(lt, on('хойшлоно.'), 0.9));
  const fx = 600 + 260 * k + 300 * lv.d, sc = 1 - 0.45 * k - 0.3 * lv.d;
  const pulse = 1 + 0.08 * Math.sin(Math.PI * clamp01((lt - on('эхлэх')) / 0.4));
  s += `<path d="M300 ${hz + 8} L${fx} ${hz + 8}" stroke="${mute}" stroke-width="4" stroke-dasharray="10 10" opacity="${eo(prog(lt, on('хүлээвэл'), 0.4)) * lv.o}"/>`;
  s += K.pop(lt, 0.2, `<g opacity="${lv.o}" transform="translate(${fx} ${hz}) scale(${sc * pulse}) translate(${-fx} ${-hz})">${I.flag(fx, hz, 190, acc)}</g>`, fx, hz);
  const dim = 1 - 0.45 * eo(prog(lt, on('хүлээвэл'), 0.5));
  s += K.pop(lt, 0.05, `<g opacity="${dim}">${I.person(230, hz, 1.25, fg)}</g>`, 230, hz);
  return s;
}, { sfx: on => [['whoosh', on('улам')]] });

// 4 · Mistakes are fine (paper M): a crooked block, a tower that topples, a new block.
v.add('paper', ['Алдаа гаргаж | болно,', 'эхний оролдлого чинь | бүтэлгүйтэж* | ч болно.'], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const g = 1400;
  let s = K.draw(`M120 ${g} L960 ${g}`, 840, eio(prog(lt, 0, 0.5)), R.line, 4);
  s += K.pop(lt, 0.05, I.person(200, g, 1.25, acc), 200, g);
  const ck = prog(lt, on('алдаа'), 0.4);
  if (ck > 0) s += I.block(430, lerp(g - 160, g - 32, eback(ck)), 64, mute, { rot: 22, opacity: clamp01(ck * 3) });
  const fall = prog(lt, on('бүтэлгүйтэж') + 0.1, 0.8);
  [[690, g - 38], [690, g - 112], [690, g - 186]].forEach(([x, y], i) => {
    const k = prog(lt, on('оролдлого') + 0.16 * i - 0.2, 0.36);
    if (k <= 0) return;
    const f = ein(fall) * (0.6 + 0.25 * i);
    const yy = lerp(y - 100, y, eback(k)) + f * (g - 38 - y + 10 * i);
    s += I.block(x + f * (80 + 70 * i), yy, 70, fall > 0.25 ? mute : fg,
      { rot: f * (40 + 25 * i), opacity: clamp01(k * 3), stroke: fall > 0.25 ? mute : null, dash: '8 7' });
  });
  s += K.pop(lt, on('болно', 1), I.block(560, g - 38, 70, acc), 560, g - 38);
  s += K.landing(560, g - 38, lt, on('болно', 1) + 0.2, acc);
  return s;
}, { sfx: on => [['tick', on('алдаа')], ['whoosh', on('бүтэлгүйтэж')], ['tick', on('болно', 1)]] });

// 5 · Text card (ink T).
v.add('ink', ['Гэхдээ эхлэхгүй бол юу ч | өөрчлөгдөхгүй.*'], null, { card: true });

// 6 · Let the meter go, take the first step (paper M).
v.add('paper', ['Өөрийгөө бэлэн болсон гэж мэдрэхийг | хүлээх хэрэггүй.', 'Эхний | алхмаа* | хийгээрэй.'],
  (lt, R, on) => pathScene(lt, R, { meter: true, meterGo: on('хэрэггүй.'), ger: 0.3, step: on('эхний') }),
  { sfx: on => [['whoosh', on('хэрэггүй.')], ['tick', on('эхний') + 0.34]] });

// 7 · AISM line + help (khadag T via ribbon).
ctaKhadag(v, ['Бид танд | туслая.*']);

v.end();
