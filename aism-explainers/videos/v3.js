// v3 · Right answers: school teaches answers; real life asks you to find the question. Voice: clip e55bb504.
const v = Video();

// Worksheet with three questions; ticks on paper, an empty answer box on ink.
function worksheet(lt, R, ev) {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const k = eo(prog(lt, 0.05, 0.4));
  let s = `<g opacity="${k}" transform="translate(0 ${(1 - k) * 40})">
    <rect x="250" y="770" width="580" height="660" rx="22" fill="${R.soft}" stroke="${R.line}" stroke-width="4"/>
    ${I.bars(310, 830, 300, 2, 30, R.line, 1)}`;
  for (let r = 0; r < 3; r++) {
    const y = 960 + r * 150;
    const fade = ev.blank !== undefined ? 1 - eo(prog(lt, ev.blank + 0.08 * r, 0.4)) : 1;
    s += `<g opacity="${fade}">${I.bars(310, y, 460, 1, 0, R.line, ev.rows !== undefined ? prog(lt, ev.rows + 0.1 * r, 0.4) : 1)}`;
    for (let o = 0; o < 3; o++) {
      const cx = 340 + o * 120, cy = y + 62;
      const pick = r === 0 ? 1 : r === 1 ? 2 : 0;
      const tk = ev.tick !== undefined && o === pick ? prog(lt, ev.tick + 0.22 * r, 0.3) : 0;
      s += `<circle cx="${cx}" cy="${cy}" r="20" fill="${tk > 0 ? acc : 'none'}" fill-opacity="${eo(tk)}" stroke="${tk > 0 ? acc : mute}" stroke-width="4"/>`;
      if (tk > 0) s += I.check(cx + 34, cy - 12, 0.75, acc, tk, 10);
    }
    s += '</g>';
  }
  if (ev.box !== undefined) {
    const bk = eo(prog(lt, ev.box, 0.45));
    const pulse = ev.pulse !== undefined && lt > ev.pulse ? 1 + 0.04 * Math.sin((lt - ev.pulse) * 10) : 1;
    s += `<g opacity="${bk}" transform="translate(540 1200) scale(${pulse}) translate(-540 -1200)">
      <rect x="330" y="1080" width="420" height="240" rx="18" fill="none" stroke="${acc}" stroke-width="5" stroke-dasharray="16 12" stroke-dashoffset="${-lt * 40}"/></g>`;
  }
  return s + '</g>';
}

// 1 · Hook (paper H): the worksheet gets its ticks.
v.add('paper', ['Сургууль бидэнд асуултад | зөв* хариулахыг | заадаг.'],
  (lt, R, on) => worksheet(lt, R, { rows: on('асуултад'), tick: on('зөв') }),
  { sfx: on => [['tick', on('зөв')]] });

// 2 · No answer key (ink M): the options vanish, an empty box remains.
v.add('ink', ['Харин зөв хариулт нь бэлэн | байхгүй* үед | яг яах вэ?'],
  (lt, R, on) => worksheet(lt, R, { blank: on('байхгүй'), box: on('байхгүй') + 0.2, pulse: on('яах') }));

// 3 · Real life (ink M): a winding road; the manual and the answer key fly away.
v.add('ink', ['Бодит амьдрал дээр | бүх зүйл | заавар,', 'хариулттайгаа | ирдэггүй.*'], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  let s = K.draw('M100 1300 C260 1240 380 1330 540 1280 C700 1230 820 1300 980 1250', 900, eio(prog(lt, 0, 0.8)), R.line, 4);
  s += K.draw('M220 1420 C320 1380 300 1330 420 1310 C560 1290 600 1230 720 1200 C800 1180 860 1150 900 1120', 820, eio(prog(lt, on('амьдрал'), 1.2)), mute, 5);
  s += K.pop(lt, 0.1, I.person(220, 1430, 1.25, fg), 220, 1430);
  const go = on('ирдэггүй.');
  const lv = leave(prog(lt, go, 0.75));
  const man = K.pop(lt, on('заавар,'), `<g transform="translate(0 ${3 * Math.sin(lt * 3)})"><rect x="350" y="1000" width="150" height="190" rx="12" fill="${R.soft}" stroke="${R.line}" stroke-width="4"/>${I.bars(375, 1035, 100, 5, 28, R.line)}</g>`, 425, 1095);
  const key = K.pop(lt, on('хариулттайгаа'), `<g transform="translate(0 ${3 * Math.sin(lt * 3 + 1)})"><circle cx="610" cy="1040" r="62" fill="${R.soft}" stroke="${acc}" stroke-width="4"/>${I.check(610, 1042, 1.2, acc, 1, 8)}</g>`, 610, 1040);
  s += `<g opacity="${lv.o}" transform="translate(${lv.d * 520} ${-lv.d * 260}) rotate(${lv.d * 30} 425 1095)">${man}</g>`;
  s += `<g opacity="${lv.o}" transform="translate(${lv.d * 420} ${-lv.d * 380})">${key}</g>`;
  return s;
}, { sfx: on => [['tick', on('заавар,')], ['tick', on('хариулттайгаа')], ['whoosh', on('ирдэггүй.')]] });

// 4 · Toono loop (paper M): find the question, search, fail and retry, learn.
v.add('paper', ['Заримдаа чи өөрөө | асуултаа олж,', 'шийдлээ хайж, | алдаж* үзэж | байж сурдаг.'], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const cx = 540, cy = 1130, r = 250;
  const ang = [-Math.PI / 2, Math.PI / 6, Math.PI * 5 / 6];
  const nodes = ang.map(a => [cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  const t = [on('асуултаа'), on('шийдлээ'), on('алдаж'), on('сурдаг.')];
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${R.line}" stroke-width="4" opacity="${eo(prog(lt, 0, 0.4))}"/>`;
  for (let i = 0; i < 3; i++) {
    const a0 = ang[i], a1 = i < 2 ? ang[i + 1] : ang[0] + 2 * Math.PI;
    const k = prog(lt, t[i + 1] - 0.1, 0.5);
    s += K.draw(K.arc(cx, cy, r, a0 + 0.24, a1 - 0.24), r * (a1 - a0 - 0.48), k, acc, 8);
  }
  const icons = [
    (x, y, k) => I.question(x, y + 2, 0.9, acc, k),
    (x, y, k) => I.magnifier(x, y, 1.0, acc, k),
    (x, y, k) => (lt < on('үзэж') ? I.cross(x, y, 1.0, mute, k) : I.retry(x, y, 1.0, acc, prog(lt, on('үзэж'), 0.35))),
  ];
  nodes.forEach(([x, y], i) => {
    const k = prog(lt, t[i], 0.38);
    s += `<circle cx="${x}" cy="${y}" r="66" fill="${T.paper}" stroke="${k > 0 ? (i === 2 && lt < on('үзэж') ? mute : acc) : mute}" stroke-width="5"
      ${k > 0 ? '' : 'stroke-dasharray="10 9"'} transform="translate(${x} ${y}) scale(${k > 0 ? eback(k) : 1}) translate(${-x} ${-y})"/>`;
    if (k > 0) s += icons[i](x, y, k);
  });
  const done = eo(prog(lt, t[3], 0.4));
  s += K.pop(lt, 0.1, I.person(cx, cy + 70, 1.15, fg), cx, cy + 70);
  if (done > 0) s += `<g opacity="${done}">${I.person(cx, cy + 70, 1.15, acc)}</g>`;
  s += K.landing(cx, cy, lt, t[3], acc);
  return s;
}, { cam: { type: 'push', fy: 1130 }, sfx: on => [['tick', on('асуултаа')], ['tick', on('шийдлээ')], ['tick', on('алдаж')], ['tick', on('сурдаг.')]] });

// 5 · Text card (paper T).
v.add('paper', ['Тиймээс | зөвхөн* | юу мэддэг', 'байх нь | чухал биш.'], null, { card: true });

// 6 · The unknown (paper M): a dot grid you light up as you work through it.
v.add('paper', ['Мэдэхгүй зүйлтэйгээ хэрхэн | ажиллаж сурах* | нь бас чухал.'], (lt, R, on) => {
  const acc = R.accent, mute = R.mute;
  const cols = 12, rows = 8, gx = 188, gy = 830, step = 64;
  const o = [gx, gy + (rows - 1) * step];
  const t0 = on('хэрхэн'), t1 = on('сурах');
  const rad = Math.max(0, (lt - t0) * 170) + Math.max(0, (lt - t1) * 260);
  let s = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = gx + c * step, y = gy + r * step;
    const d = Math.hypot(x - o[0], y - o[1]);
    const appear = eo(prog(lt, 0.03 * (c + r) * 0.5, 0.3));
    const lit = clamp01((rad - d) / 60);
    s += lit > 0
      ? `<circle cx="${x}" cy="${y}" r="${lerp(7, 12, eback(lit))}" fill="${acc}" opacity="${appear}"/>`
      : `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${mute}" stroke-width="3" stroke-dasharray="4 4" opacity="${appear}"/>`;
  }
  s += K.pop(lt, 0.15, I.person(o[0], o[1] + 160, 1.1, acc), o[0], o[1] + 160);
  s += K.landing(gx + 11 * step, gy, lt, on('чухал.'), acc);
  return s;
}, { sfx: on => [['whoosh', on('сурах')]] });

// 7 · AISM line (khadag T via ribbon).
ctaKhadag(v);

// 8 · First step (paper M).
v.add('paper', ['Санаагаа бодит болгох | эхний алхмаа* | хийгээрэй.', 'Бид танд | туслая.*'],
  (lt, R, on) => pathScene(lt, R, { idea: on('санаагаа'), ger: on('бодит'), step: on('эхний'), help: on('бид'), all: on('туслая.'), real: on('туслая.') + 0.25 }),
  { sfx: on => [['tick', on('эхний') + 0.34], ['whoosh', on('бид')], ['tick', on('туслая.') + 0.45]] });

v.end();
