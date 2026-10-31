// v1 · Diploma: a diploma matters, so do the skills to build. Voice: clip 62a03716.
const v = Video();

// 1 · Hook (paper H): a graduate with a diploma and an idea they cannot yet build.
v.add('paper', [
  'Их сургуулиа төгсөөд | диплома* | авсан ч',
  'өөрийнхөө бодож байсан зүйлийг | яаж бүтээхээ*',
  'мэдэхгүй байвал | яах вэ?',
], (lt, R, on) => {
  const acc = R.accent, mute = R.mute;
  const gx = 290, feet = 1410, gs = 1.7;
  let s = '';
  s += K.pop(lt, 0.08, I.person(gx, feet, gs, acc) + I.mortarboard(gx, feet - 118 * gs - 4, 1.15, T.ink), gx, feet);
  s += K.pop(lt, on('диплома'), I.diploma(gx + 150, feet - 70, 0.85, T.ink, acc, { rot: -24 }), gx + 150, feet - 70);
  // thought bubble rising from the graduate
  const b0 = on('өөрийнхөө');
  s += K.pop(lt, b0, K.circle(gx + 95, feet - 255, 14, R.soft, { stroke: R.line }), gx + 95, feet - 255);
  s += K.pop(lt, b0 + 0.08, K.circle(gx + 140, feet - 310, 22, R.soft, { stroke: R.line }), gx + 140, feet - 310);
  s += K.pop(lt, b0 + 0.16, I.bubble(680, 935, 260, 175, R.line, R.soft), 680, 935);
  // the idea, a dashed ger sketch
  const ik = eo(prog(lt, on('бодож'), 0.6));
  if (ik > 0) s += `<g opacity="${ik}" stroke-dasharray="12 10">${K.ger(680, 1010, 250 * lerp(0.85, 1, ik), acc, { sw: 5, lattice: 0.6 })}</g>`;
  // the parts, unassembled
  const parts = [[600, 1370, 18], [690, 1392, -12], [790, 1366, 30], [880, 1394, -6], [740, 1318, 8]];
  const wob = on('мэдэхгүй');
  parts.forEach(([x, y, r], i) => {
    const t0 = on('яаж') + 0.06 * i;
    const w = lt > wob ? 9 * Math.sin((lt - wob) * 9 + i * 1.7) * Math.exp(-(lt - wob) * 0.8) : 0;
    s += K.pop(lt, t0, I.block(x, y, 62, mute, { rot: r + w }), x, y);
  });
  return s;
}, { sfx: on => [['tick', on('диплома')], ['tick', on('яаж')]] });

// 2 · Text card (paper T).
v.add('paper', ['Мэдээж дүн, | диплом чухал.*'], null, { card: true });

// 3 · Skills around the diploma (paper M), one tile per skill, all lit on "чадвар".
v.add('paper', [
  'Гэхдээ сурсан зүйлээ | амьдрал* дээр | хэрэглэх,',
  'бодит асуудал шийдэх, | багаар* ажиллах,',
  'өөрийн гэсэн төсөл бүтээх | чадвар* | ч бас чухал.',
], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const tiles = [[320, 905, 'амьдрал'], [760, 905, 'бодит'], [320, 1265, 'багаар'], [760, 1265, 'өөрийн']];
  const all = on('чадвар');
  let s = '';
  tiles.forEach(([cx, cy, w], i) => {
    const t0 = on(w);
    const k = prog(lt, t0, 0.38);
    const glow = eo(prog(lt, all + 0.07 * i, 0.4));
    const sc = k > 0 ? lerp(0.92, 1, eback(k)) : 1;
    s += `<g transform="translate(${cx} ${cy}) scale(${sc})">
      <rect x="-170" y="-150" width="340" height="300" rx="28" fill="${acc}" fill-opacity="${0.09 * glow}"
        stroke="${k > 0 ? acc : mute}" stroke-width="${k > 0 ? 5 : 3}" ${k > 0 ? '' : 'stroke-dasharray="12 10"'} opacity="${eo(prog(lt, 0.05 * i, 0.3))}"/>`;
    const d = lt - t0;
    if (i === 0 && d > 0) {      // apply learning in life: book -> ger
      s += I.book(-75, -5, 0.78, fg) + K.draw('M-12 0 L36 0', 48, prog(d, 0.15, 0.3), acc, 6);
      s += K.fade(d, 0.3, 0.35, K.ger(90, 40, 110, acc, { sw: 5, lattice: 0.5 }));
    }
    if (i === 1 && d > 0) {      // a real problem untangled
      s += K.draw('M-110 10 C-80 -60 -40 60 -10 0 C20 -60 50 50 0 30 C-40 10 50 -50 110 -10', 470, prog(d, 0, 0.55), mute, 6);
      s += I.check(0, -8, 1.6, acc, prog(lt, on('шийдэх,') + 0.05, 0.35), 8);
    }
    if (i === 2 && d > 0) {      // a team, linked
      [-80, 0, 80].forEach((x, j) => { s += K.pop(d, 0.06 * j, I.person(x, 85, 0.62, j === 1 ? acc : fg), x, 85); });
      s += K.draw('M-80 40 L80 40', 160, prog(lt, on('ажиллах,'), 0.3), acc, 5);
    }
    if (i === 3 && d > 0) {      // your own project, stacked block by block
      const b0 = on('төсөл') - t0;
      [[-38, 92], [24, 92], [-7, 34]].forEach(([x, y], j) => {
        const kk = prog(d, b0 + 0.18 * j, 0.36);
        if (kk > 0) s += I.block(x, lerp(y - 90, y, eback(kk)), 56, j === 2 ? acc : fg, { opacity: clamp01(kk * 3) });
      });
      s += K.fade(d, on('бүтээх') - t0, 0.3, I.flag(-7, 6, 70, acc));
    }
    s += '</g>';
  });
  s += K.pop(lt, 0.15, I.diploma(540, 1085, 0.55, T.ink, acc), 540, 1085);
  s += K.landing(540, 1085, lt, all, acc);
  return s;
}, { sfx: on => [['tick', on('амьдрал')], ['tick', on('бодит')], ['tick', on('багаар')], ['tick', on('өөрийн')]] });

// 4 · Course years (ink M): no need to wait for the final year.
v.add('ink', [
  'Эдгээр чадвараа хөгжүүлэхийн тулд заавал | төгсөх* курс',
  'хүртлээ хүлээх | шаардлагагүй.*',
], (lt, R, on) => {
  const acc = R.accent, mute = R.mute, fg = R.fg;
  const go = on('шаардлагагүй.');
  const lv = leave(prog(lt, go, 0.75));
  let s = '';
  for (let i = 0; i < 4; i++) {
    const x0 = 150 + i * 200, top = 1400 - (i + 1) * 85;
    const away = i > 0 ? lv : { d: 0, o: 1 };
    const dx = 420 * away.d * (0.6 + 0.2 * i);
    const kk = eo(prog(lt, 0.05 + 0.07 * i, 0.38));
    if (kk <= 0) continue;
    const lostDash = i > 0 && lt > go ? 'stroke-dasharray="10 9"' : '';
    const hi = i === 3 ? eo(prog(lt, on('төгсөх'), 0.35)) : 0;
    s += `<g opacity="${away.o}" transform="translate(${dx} ${(1 - kk) * 60})">
      <rect x="${x0}" y="${top}" width="180" height="${1400 - top}" rx="10" fill="${R.soft}" stroke="${hi > 0 && lt < go ? acc : R.line}" stroke-width="${hi > 0 ? 4 : 3}" ${lostDash}/></g>`;
    if (i === 3) s += `<g opacity="${away.o * hi}" transform="translate(${dx} 0)">${I.mortarboard(x0 + 90, top - 40, 1.0, lt > go ? mute : acc)}</g>`;
  }
  // waiting: a dashed path to the final year and a ticking clock
  const wk = prog(lt, on('хүртлээ'), 0.5);
  s += `<path d="M300 1150 Q560 860 820 980" fill="none" stroke="${mute}" stroke-width="4" stroke-dasharray="10 10" stroke-dashoffset="${-lt * 30}" opacity="${eo(wk) * lv.o}"/>`;
  const ck = eo(prog(lt, on('хүртлээ'), 0.35));
  if (ck > 0) s += I.clock(385, 1100, 36, mute, Math.max(0, lt - on('хүлээх')) * 7, { opacity: ck * lv.o });
  // you, lit once the wait is dropped
  const lit = eo(prog(lt, go + 0.1, 0.35));
  s += K.pop(lt, 0.1, I.person(240, 1315, 1.25, fg) + (lit > 0 ? `<g opacity="${lit}">${I.person(240, 1315, 1.25, acc)}</g>` : ''), 240, 1315);
  s += K.landing(240, 1315, lt, go + 0.15, acc);
  return s;
}, { sfx: on => [['tick', on('төгсөх')], ['whoosh', on('шаардлагагүй.')]] });

// 5 · AISM line (khadag T via ribbon).
ctaKhadag(v);

// 6 · First step (paper M): from the idea along the path to a ger, with help.
v.add('paper', ['Санаагаа бодит болгох | эхний алхмаа* | хийгээрэй.', 'Бид танд | туслая.*'],
  (lt, R, on) => pathScene(lt, R, { idea: on('санаагаа'), ger: on('бодит'), step: on('эхний'), help: on('бид'), all: on('туслая.'), real: on('туслая.') + 0.25 }),
  { sfx: on => [['tick', on('эхний') + 0.34], ['whoosh', on('бид')], ['tick', on('туслая.') + 0.45]] });

v.end();
