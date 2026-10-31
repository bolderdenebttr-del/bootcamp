// v2 · Smartest in the room: learn among people who know more, build more together. Voice: clip 642f59d6.
const v = Video();

// 1 · Hook (paper H): a room of people; the "smartest" star floats off you.
v.add('paper', [
  'Нэг өрөөнд хамт байгаа хүмүүсээсээ | хамгийн ухаантай*',
  'нь байх | албагүй* | гэвэл ямар вэ?',
], (lt, R, on) => {
  const acc = R.accent, mute = R.mute;
  let s = K.draw('M190 800 L890 800 Q930 800 930 840 L930 1400 Q930 1440 890 1440 L190 1440 Q150 1440 150 1400 L150 840 Q150 800 190 800 Z',
    2840, eio(prog(lt, 0, 0.7)), R.line, 5);
  const ppl = [[300, 1110], [470, 1110], [640, 1110], [800, 1110], [330, 1390], [750, 1390]];
  ppl.forEach(([x, y], i) => { s += K.pop(lt, 0.15 + 0.05 * i, I.person(x, y, 1.12, T.ink2), x, y); });
  s += K.pop(lt, 0.2, I.person(540, 1390, 1.2, acc), 540, 1390);
  // the star: crowned, then let go
  const t0 = on('хамгийн'), go = on('албагүй');
  const lv = leave(prog(lt, go, 0.8));
  const pulse = 1 + 0.15 * Math.sin(Math.PI * clamp01((lt - on('ухаантай')) / 0.4));
  if (lt < go) s += K.pop(lt, t0, I.star(540, 1215, 40 * pulse, acc), 540, 1215);
  else s += I.star(540, 1215 - 300 * lv.d, 40, mute, { fill: 'none', sw: 5, dash: '9 8', opacity: lv.o });
  return s;
}, { sfx: on => [['tick', on('хамгийн')], ['whoosh', on('албагүй')]] });

// 2 · Learning network (paper M): you, people who know more, questions, mistakes, new tries, inside one ger.
v.add('paper', [
  'Харин ч чамаас | илүү мэдлэгтэй* | хүмүүсээс суралцаж,',
  'ойлгохгүй зүйлээ асууж, | алдаа гаргаж,',
  'шинэ зүйл туршиж үздэг | орчинд*',
  'байх нь | илүү чухал | байж болох юм.',
], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const you = [540, 1430];
  const ppl = [[235, 1300], [395, 1250], [685, 1250], [845, 1300]];
  let s = '';
  // the environment: a ger drawing itself around everyone
  const gk = prog(lt, on('орчинд'), 1.0);
  if (gk > 0) s += gerBuild(540, 1460, 790, acc, eio(gk), { fill: eo(prog(lt, on('чухал'), 0.5)), door: false, lat: 0.28 });
  s += K.landing(540, 1460, lt, on('чухал'), acc);
  // knowledge flows to you
  const lk = on('хүмүүсээс');
  ppl.forEach(([x, y], i) => {
    const k = prog(lt, lk + 0.08 * i, 0.4);
    const x1 = you[0] + (x - you[0]) * 0.22, y1 = you[1] - 130;
    s += K.draw(`M${x} ${y - 60} L${x1} ${y1}`, Math.hypot(x1 - x, y1 - y + 60), k, R.line, 4);
    const fl = lt - on('суралцаж,');
    if (fl > 0) for (let j = 0; j < 2; j++) {
      const u = ((fl * 0.8 + j * 0.5 + i * 0.13) % 1);
      s += K.circle(lerp(x, x1, u), lerp(y - 60, y1, u), 8, acc, { opacity: Math.sin(Math.PI * u) });
    }
  });
  ppl.forEach(([x, y], i) => {
    s += K.pop(lt, 0.1 + 0.05 * i, I.person(x, y, 1.0, fg), x, y);
    s += K.pop(lt, on('мэдлэгтэй') + 0.06 * i, I.book(x, y - 142, 0.34, fg), x, y - 142);
  });
  s += K.pop(lt, 0.05, I.person(you[0], you[1], 1.3, acc), you[0], you[1]);
  // ask
  const qa = on('асууж,');
  s += K.pop(lt, qa - 0.1, K.circle(540, 1060, 50, R.soft, { stroke: R.line }), 540, 1060) + (lt > qa ? I.question(540, 1053, 0.85, acc, prog(lt, qa, 0.4)) : '');
  // a mistake: a block topples and greys out
  const mk = prog(lt, on('алдаа'), 0.55);
  if (mk > 0) s += I.block(330 + 22 * eio(mk), 1385 + 20 * ein(mk), 64, mk > 0.6 ? mute : fg, { rot: 52 * ein(mk), stroke: mk > 0.6 ? mute : null, dash: '8 7' });
  // something new tried
  s += K.pop(lt, on('шинэ'), I.spark(760, 1390, 44, acc), 760, 1390);
  return s;
}, { sfx: on => [['tick', on('асууж,')], ['tick', on('шинэ')], ['whoosh', on('орчинд')]] });

// 3 · Alone (ink M): one person under a tower of books that comes down.
v.add('ink', ['Чи ганцаараа бүхнийг мэддэг байх | шаардлагагүй.*'], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const go = on('шаардлагагүй.');
  let s = '';
  const books = [[230, 44], [200, 40], [244, 46], [190, 38], [222, 44], [176, 40], [210, 42], [168, 38], [196, 40]];
  let y = 1420;
  books.forEach(([w, h], i) => {
    y -= h;
    const k = prog(lt, on('ганцаараа') + 0.07 * i, 0.3);
    if (k <= 0) return;
    const sway = 6 * Math.sin(lt * 2.2 + i * 0.4) * (i / books.length);
    const lv = leave(prog(lt, go + 0.03 * (books.length - i), 0.6));
    const dx = sway + lv.d * (180 + 40 * i) * (i % 2 ? 1 : -0.6), dy = -lv.d * (120 + 30 * i);
    s += `<rect x="${760 - w / 2 + dx}" y="${y + dy - (1 - eback(k)) * 40}" width="${w}" height="${h - 4}" rx="6"
      fill="${lt > go ? 'none' : R.soft}" stroke="${lt > go ? mute : R.line}" stroke-width="3" ${lt > go ? 'stroke-dasharray="9 8"' : ''}
      transform="rotate(${lv.d * (i % 2 ? 30 : -24)} ${760 + dx} ${y + dy})" opacity="${lv.o * clamp01(k * 3)}"/>`;
  });
  const lit = eo(prog(lt, go + 0.15, 0.35));
  s += K.pop(lt, 0.05, I.person(430, 1420, 1.4, fg), 430, 1420);
  if (lit > 0) s += `<g opacity="${lit}">${I.person(430, 1420, 1.4, acc)}</g>`;
  s += K.landing(430, 1420, lt, go + 0.2, acc);
  return s;
}, { sfx: on => [['whoosh', on('шаардлагагүй.')]] });

// 4 · Together (paper M): learn, join others, build a bigger ger than you imagined.
v.add('paper', [
  'Харин мэдэхгүй зүйлээ сурч, | бусадтай хамтран*',
  'өөрийнхөө бодож байснаас ч | илүү* зүйлийг',
  'хийж чаддаг байх | хэрэгтэй.',
], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  let s = '';
  // the bigger ger, built together
  const bk = prog(lt, on('илүү'), 1.3);
  if (bk > 0) s += gerBuild(610, 1255, 500, acc, eio(bk), { fill: eo(prog(lt, on('хэрэгтэй.'), 0.5)) });
  s += K.landing(610, 1255, lt, on('хэрэгтэй.') + 0.1, acc);
  // what you imagined alone: small and dashed
  const sk = eo(prog(lt, on('өөрийнхөө'), 0.5));
  if (sk > 0) s += `<g opacity="${sk}" stroke-dasharray="10 9">${K.ger(205, 1175, 150, mute, { sw: 4, lattice: 0 })}</g>`;
  // you and a book
  s += K.pop(lt, 0.05, I.person(205, 1430, 1.2, acc), 205, 1430);
  s += K.pop(lt, on('сурч,'), I.book(205, 1235 - 0, 0.42, fg, { fill: R.soft }), 205, 1235);
  // others join, then link up
  [[420, 'бусадтай', 0], [610, 'бусадтай', 0.1], [800, 'бусадтай', 0.2]].forEach(([x, w, d]) => {
    s += K.pop(lt, on(w) + d, I.person(x, 1430, 1.2, fg), x, 1430);
  });
  s += K.draw('M205 1375 L800 1375', 595, prog(lt, on('хамтран'), 0.5), acc, 6);
  return s;
}, { sfx: on => [['tick', on('бусадтай')], ['tick', on('илүү')]] });

// 5 · AISM line (khadag T via ribbon).
ctaKhadag(v);

// 6 · First step (paper M).
v.add('paper', ['Санаагаа бодит болгох | эхний алхмаа* | хийгээрэй.', 'Бид танд | туслая.*'],
  (lt, R, on) => pathScene(lt, R, { idea: on('санаагаа'), ger: on('бодит'), step: on('эхний'), help: on('бид'), all: on('туслая.'), real: on('туслая.') + 0.25 }),
  { sfx: on => [['tick', on('эхний') + 0.34], ['whoosh', on('бид')], ['tick', on('туслая.') + 0.45]] });

v.end();
