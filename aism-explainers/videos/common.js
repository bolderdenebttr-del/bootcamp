// Shared kit for the AISM explainers: caption cursor, video builder, icons, shared CTA scenes.
// Loaded after engine.html and before videos/<v>_words.js and videos/<v>.js.

const norm = s => s.toLowerCase().replace(/[.,?!:;…«»"*]/g, '');
const CARD = { y: 780, leadSize: 62, punchSize: 140 };

// Walks the aligned WORDS in order, so every spoken word lands on screen exactly once.
// Phrase spec: 'lead words | punch words | tail words'; a trailing * marks the accent word.
function Cursor(words) {
  let i = 0;
  const take = str => str.split(/\s+/).filter(Boolean).map(tok => {
    const acc = tok.endsWith('*');
    const txt = acc ? tok.slice(0, -1) : tok;
    const w = words[i++];
    if (!w) { console.warn('CURSOR PAST END at', txt); return [txt, 0]; }
    if (norm(w[0]) !== norm(txt)) console.warn('WORD MISMATCH', JSON.stringify(txt), 'vs', JSON.stringify(w[0]));
    return acc ? [txt, w[1], { accent: true }] : [txt, w[1]];
  });
  return {
    t: () => (words[i] ? words[i][1] : null),
    left: () => words.length - i,
    lastEnd: () => words[i - 1][2],
    phrase(spec, o = {}) {
      const [lead, punch, tail] = spec.split('|').map(s => (s || '').trim());
      const p = { ...o };
      if (lead) p.lead = take(lead);
      if (punch) p.punch = take(punch);
      if (tail) p.tail = take(tail);
      return p;
    },
  };
}

// Shots cut 2 frames before the first syllable of their sentence.
function Video() {
  const c = Cursor(WORDS);
  const shots = {}, timeline = [];
  return {
    add(reg, phrases, svg, o = {}) {
      const name = 's' + timeline.length + (o.name ? '_' + o.name : '');
      const at = timeline.length ? c.t() - 2 * F : 0;
      const base = o.card ? CARD : (o.cap || {});
      const caps = phrases.map(ph => Array.isArray(ph) ? c.phrase(ph[0], { ...base, ...ph[1] }) : c.phrase(ph, { ...base }));
      const words = caps.flatMap(p => [...(p.lead || []), ...(p.punch || []), ...(p.tail || [])]);
      const on = (w, k = 0) => {
        const m = words.filter(x => norm(x[0]) === norm(w));
        if (!m[k]) throw new Error(`no word "${w}" in shot ${name}`);
        return m[k][1] - at;
      };
      shots[name] = {
        reg, caps,
        cam: o.cam || (o.card ? { type: 'none' } : { type: 'push' }),
        svg: svg ? (lt, R) => svg(lt, R, on) : null,
        sfxFn: o.sfx ? () => o.sfx(on) : null,
      };
      timeline.push({ shot: name, at, ribbon: o.ribbon });
      return on;
    },
    end() {
      if (c.left()) console.warn('UNUSED WORDS', c.left());
      const at = c.lastEnd() + 0.25;
      shots.end = LIB.endcard;
      timeline.push({ shot: 'end', at });
      setVideo({ shots, timeline, end: at + 2.5 });
    },
  };
}

// ---------------------------------------------------------------------------
// Icons and props (all return SVG strings; colours come from the register palette)
// ---------------------------------------------------------------------------
const I = {
  g(x, y, s, inner, o = {}) {
    return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})" opacity="${o.opacity ?? 1}">${inner}</g>`;
  },
  // Figure standing with feet at (x, feet).
  person(x, feet, s, fill, o = {}) { return K.fig(x, feet - 30 * s, s, fill, o); },
  mortarboard(x, y, s, col) {
    return I.g(x, y, s, `<path d="M-52 0 L0 -22 L52 0 L0 22 Z" fill="${col}"/><rect x="-26" y="6" width="52" height="20" rx="4" fill="${col}"/>
      <path d="M40 4 L40 34" stroke="${col}" stroke-width="5" stroke-linecap="round"/><circle cx="40" cy="38" r="6" fill="${col}"/>`);
  },
  diploma(x, y, s, col, band, o = {}) {
    return I.g(x, y, s, `<rect x="-90" y="-22" width="180" height="44" rx="22" fill="${o.fill || T.paper}" stroke="${col}" stroke-width="5"/>
      <ellipse cx="-90" cy="0" rx="10" ry="22" fill="${o.fill || T.paper}" stroke="${col}" stroke-width="5"/>
      <rect x="-14" y="-25" width="28" height="50" fill="${band}"/>
      <path d="M-6 25 L-16 52 L-4 46 L2 56 L8 25 Z" fill="${band}"/>`, o);
  },
  book(x, y, s, col, o = {}) {
    return I.g(x, y, s, `<path d="M0 -30 C-22 -40 -52 -40 -70 -32 L-70 34 C-52 26 -22 26 0 36 C22 26 52 26 70 34 L70 -32 C52 -40 22 -40 0 -30 Z"
      fill="${o.fill || 'none'}" stroke="${col}" stroke-width="5" stroke-linejoin="round"/><path d="M0 -30 L0 36" stroke="${col}" stroke-width="5"/>`, o);
  },
  check(x, y, s, col, k, sw = 9) {
    return I.g(x, y, s, K.draw('M-30 2 L-8 24 L32 -22', 90, k, col, sw));
  },
  star(x, y, r, col, o = {}) {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
      d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1);
    }
    return `<path d="${d}Z" fill="${o.fill ?? col}" stroke="${col}" stroke-width="${o.sw || 0}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''} stroke-linejoin="round" opacity="${o.opacity ?? 1}"/>`;
  },
  spark(x, y, r, col, k = 1, o = {}) {
    let d = '';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, r0 = r * 0.55, r1 = r0 + (r - r0) * k;
      d += `M${(x + r0 * Math.cos(a)).toFixed(1)} ${(y + r0 * Math.sin(a)).toFixed(1)} L${(x + r1 * Math.cos(a)).toFixed(1)} ${(y + r1 * Math.sin(a)).toFixed(1)} `;
    }
    return `<g opacity="${o.opacity ?? 1}"><circle cx="${x}" cy="${y}" r="${r * 0.32}" fill="${col}"/><path d="${d}" stroke="${col}" stroke-width="${o.sw || 6}" stroke-linecap="round"/></g>`;
  },
  block(x, y, size, col, o = {}) {
    const st = o.stroke ? `stroke="${o.stroke}" stroke-width="${o.sw || 4}" ${o.dash ? `stroke-dasharray="${o.dash}"` : ''}` : '';
    return `<rect x="${-size / 2}" y="${-size / 2}" width="${size}" height="${size}" rx="${size * 0.14}" fill="${col}" ${st}
      transform="translate(${x} ${y}) rotate(${o.rot || 0})" opacity="${o.opacity ?? 1}"/>`;
  },
  clock(x, y, r, col, ang, o = {}) {
    const hx = x + r * 0.62 * Math.sin(ang), hy = y - r * 0.62 * Math.cos(ang);
    const mx = x + r * 0.42 * Math.sin(ang / 12), my = y - r * 0.42 * Math.cos(ang / 12);
    return `<g opacity="${o.opacity ?? 1}"><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${col}" stroke-width="5"/>
      ${K.line(x, y, hx, hy, col, 5)}${K.line(x, y, mx, my, col, 6)}<circle cx="${x}" cy="${y}" r="5" fill="${col}"/></g>`;
  },
  question(x, y, s, col, k = 1) {
    return I.g(x, y, s, K.draw('M-20 -22 C-20 -50 22 -50 22 -22 C22 -4 0 -2 0 18', 120, k, col, 9) +
      (k >= 1 ? `<circle cx="0" cy="38" r="6" fill="${col}"/>` : ''));
  },
  magnifier(x, y, s, col, k = 1) {
    return I.g(x, y, s, K.draw(K.arc(-8, -8, 26, -Math.PI, Math.PI * 0.999), 165, k, col, 8) + K.draw('M12 12 L36 36', 34, k, col, 10));
  },
  retry(x, y, s, col, k = 1) {
    return I.g(x, y, s, K.draw(K.arc(0, 0, 28, -Math.PI * 0.2, Math.PI * 1.45), 145, k, col, 8) +
      (k >= 1 ? `<path d="M22 -30 L30 -12 L10 -10 Z" fill="${col}"/>` : ''));
  },
  cross(x, y, s, col, k = 1, o = {}) {
    return I.g(x, y, s, K.draw('M-22 -22 L22 22', 63, k, col, 8) + K.draw('M22 -22 L-22 22', 63, clamp01(k * 1.4 - 0.4), col, 8), o);
  },
  gear(x, y, r, col, rot = 0) {
    let d = '';
    for (let i = 0; i < 8; i++) {
      const a = rot + i * Math.PI / 4;
      d += `M${(x + r * 0.78 * Math.cos(a)).toFixed(1)} ${(y + r * 0.78 * Math.sin(a)).toFixed(1)} L${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)} `;
    }
    return `<circle cx="${x}" cy="${y}" r="${r * 0.72}" fill="none" stroke="${col}" stroke-width="7"/><circle cx="${x}" cy="${y}" r="${r * 0.26}" fill="${col}"/>
      <path d="${d}" stroke="${col}" stroke-width="11" stroke-linecap="round"/>`;
  },
  flame(x, y, s, col) {
    return I.g(x, y, s, `<path d="M0 36 C-24 36 -36 20 -32 2 C-28 -14 -14 -18 -12 -40 C0 -30 6 -18 5 -6 C11 -12 15 -20 13 -30 C27 -16 35 0 31 14 C28 28 15 36 0 36 Z" fill="${col}"/>
      <path d="M0 30 C-10 30 -14 22 -12 14 C-10 6 -2 4 0 -6 C8 2 12 10 11 18 C10 26 6 30 0 30 Z" fill="${T.paper}"/>`);
  },
  flag(x, base, h, col, o = {}) {
    return `<g opacity="${o.opacity ?? 1}">${K.line(x, base, x, base - h, col, 5)}<path d="M${x} ${base - h} L${x + h * 0.52} ${base - h * 0.84} L${x} ${base - h * 0.68} Z" fill="${col}"/></g>`;
  },
  bubble(x, y, rx, ry, col, fill, o = {}) {
    return `<g opacity="${o.opacity ?? 1}"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${col}" stroke-width="4"/></g>`;
  },
  // Rows of grey text bars, as on a worksheet.
  bars(x, y, w, n, gap, col, k = 1) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const kk = clamp01(k * n - i);
      s += `<rect x="${x}" y="${y + i * gap}" width="${w * (i % 2 ? 0.72 : 1) * eo(kk)}" height="12" rx="6" fill="${col}"/>`;
    }
    return s;
  },
};

// Hop along an arc from a to b; returns [x, y].
function hop(a, b, k, h = 90) {
  const e = eio(k);
  return [lerp(a[0], b[0], e), lerp(a[1], b[1], e) - h * Math.sin(Math.PI * clamp01(k))];
}

// Something leaving: accelerates and fades over the last 40% of its path.
function leave(k) { const e = ein(k); return { d: e, o: 1 - clamp01((k - 0.6) / 0.4) }; }

// ---------------------------------------------------------------------------
// Shared CTA scenes
// ---------------------------------------------------------------------------

// Khadag thesis: AISM line on the khadag card, a toono wheel drawing in faint paper lines.
function toonoSVG(lt) {
  const cx = 540, cy = 1260, r = 150, k = eio(prog(lt, 0.15, 0.9)), rot = lt * 6;
  let spokes = '';
  for (let i = 0; i < 8; i++) {
    const a = (rot + i * 45) * Math.PI / 180;
    spokes += K.line(cx + 46 * Math.cos(a), cy + 46 * Math.sin(a), cx + (46 + (r - 46) * k) * Math.cos(a), cy + (46 + (r - 46) * k) * Math.sin(a), T.paper, 3, { opacity: 0.28 });
  }
  return `${K.draw(K.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * 0.999), 2 * Math.PI * r, k, T.paper, 3, { opacity: 0.32 })}
    ${K.draw(K.arc(cx, cy, 46, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * 0.999), 2 * Math.PI * 46, k, T.paper, 3, { opacity: 0.32 })}${spokes}`;
}

// Stepping-stone path from an idea to a ger. opts.helpAt (local) brings in "we"; opts.meter shows a readiness meter that leaves.
function pathScene(lt, R, ev) {
  const fg = R.fg, acc = R.accent, mute = R.mute;
  const stones = [[330, 1392], [470, 1360], [610, 1318], [745, 1266], [870, 1206]];
  const start = [190, 1400];
  let s = '';
  // ground stones
  stones.forEach((p, i) => {
    const lit = ev.step !== undefined && i === 0 ? prog(lt, ev.step + 0.30, 0.15)
      : ev.all !== undefined ? prog(lt, ev.all + 0.12 * (i - 1), 0.25) : 0;
    const k = eo(prog(lt, 0.05 + 0.06 * i, 0.38));
    if (k <= 0) return;
    s += `<ellipse cx="${p[0]}" cy="${p[1]}" rx="${72 * eback(k)}" ry="${19 * eback(k)}" fill="${lit > 0 ? acc : 'none'}" fill-opacity="${lit}"
      stroke="${lit > 0.5 ? acc : mute}" stroke-width="4" ${lit > 0.5 ? '' : 'stroke-dasharray="10 9"'}/>`;
  });
  // ger: dashed idea that becomes real
  const gk = ev.ger !== undefined ? eo(prog(lt, ev.ger, 0.5)) : 0;
  const real = ev.real !== undefined ? eo(prog(lt, ev.real, 0.45)) : 0;
  if (gk > 0) {
    s += `<g opacity="${gk * (1 - real)}" stroke-dasharray="12 10">${K.ger(880, 1130, 210, mute, { sw: 4, lattice: 0 })}</g>`;
    if (real > 0) s += `<g opacity="${real}">${K.ger(880, 1130, 210, acc, { sw: 5, roofFill: acc, door: acc })}</g>`;
  }
  if (ev.real !== undefined) s += K.landing(880, 1130, lt, ev.real + 0.2, acc);
  // idea spark
  const ik = eo(prog(lt, 0.15, 0.38));
  const pulse = ev.idea !== undefined ? 1 + 0.18 * Math.sin(Math.PI * clamp01((lt - ev.idea) / 0.5)) : 1;
  if (ik > 0) s += I.spark(start[0], 1150, 44 * eback(ik) * pulse, acc, ik);
  // readiness meter that is let go
  if (ev.meter !== undefined) {
    const mk = eo(prog(lt, 0.25, 0.4));
    const lv = ev.meterGo !== undefined ? leave(prog(lt, ev.meterGo, 0.7)) : { d: 0, o: 1 };
    const y0 = 1010 - 260 * lv.d;
    const fill = 0.35 + 0.08 * Math.sin(lt * 3);
    if (mk > 0) s += `<g opacity="${mk * lv.o}">
      <rect x="${start[0] + 70}" y="${y0}" width="40" height="150" rx="10" fill="none" stroke="${mute}" stroke-width="4" stroke-dasharray="9 8"/>
      <rect x="${start[0] + 76}" y="${y0 + 144 - 138 * fill}" width="28" height="${138 * fill}" rx="6" fill="${mute}"/></g>`;
  }
  // you: hop onto the first stone
  let pos = start;
  if (ev.step !== undefined) pos = hop(start, [stones[0][0], stones[0][1] - 4], prog(lt, ev.step, 0.36), 110);
  const fk = eo(prog(lt, 0.1, 0.38));
  if (fk > 0) s += K.pop(lt, 0.1, I.person(pos[0], pos[1], 1.35, acc), start[0], start[1]);
  if (ev.step !== undefined) s += K.landing(stones[0][0], stones[0][1], lt, ev.step + 0.34, acc);
  // we: a helper walks in beside you
  if (ev.help !== undefined) {
    const hk = prog(lt, ev.help, 0.5);
    if (hk > 0) {
      const hx = lerp(1100, stones[1][0] + 20, eo(hk));
      s += I.person(hx, stones[1][1] - 2, 1.35, 'none', { hollow: true, stroke: acc, sw: 5 });
    }
  }
  return s;
}

// Shared CTA tail: khadag ribbon + path + end card.
function ctaKhadag(v, extra = []) {
  v.add('khadag', ['AI School of Mongolia | шинэ элсэлтээ* | авч эхэллээ.', ...extra],
    lt => toonoSVG(lt), { card: true, ribbon: 0.6, name: 'thesis' });
}

// A ger that builds itself: walls draw, lattice lights column by column, roof, then toono and door.
function gerBuild(cx, by, w, col, k, o = {}) {
  const h = w * 0.36, roof = w * 0.30, sw = o.sw || 5;
  const x0 = cx - w / 2, x1 = cx + w / 2, wy = by - h;
  const kw = clamp01(k / 0.3), kl = clamp01((k - 0.15) / 0.5), kr = clamp01((k - 0.5) / 0.3), kt = clamp01((k - 0.78) / 0.22);
  let s = K.draw(`M${x0} ${by} L${x0} ${wy} L${x1} ${wy} L${x1} ${by}`, w + 2 * h, kw, col, sw);
  const n = Math.round(w / 40);
  for (let i = 0; i <= n; i++) {
    const kk = clamp01(kl * (n + 1) - i);
    if (kk <= 0) continue;
    const xa = x0 + (w * i) / n;
    const up = Math.min(h, (x1 - xa) / 0.8), dn = Math.min(h, (xa - x0) / 0.8);
    s += `<path d="M${xa} ${by} L${xa + up * 0.8} ${by - up} M${xa} ${by} L${xa - dn * 0.8} ${by - dn}" stroke="${col}" stroke-width="${sw * 0.55}" opacity="${(o.lat ?? 0.55) * kk}" fill="none"/>`;
  }
  const rl = w * 1.25;
  s += K.draw(`M${x0 - 8} ${wy} Q${cx} ${wy - roof * 1.25} ${x1 + 8} ${wy}`, rl, kr, col, sw);
  if (o.fill) s += `<path d="M${x0 - 8} ${wy} Q${cx} ${wy - roof * 1.25} ${x1 + 8} ${wy} Z" fill="${col}" opacity="${0.16 * o.fill}"/>`;
  s += `<g opacity="${kt}"><ellipse cx="${cx}" cy="${wy - roof * 0.6}" rx="${w * 0.07}" ry="${w * 0.028}" fill="none" stroke="${col}" stroke-width="${sw}"/>
    ${o.door === false ? '' : `<rect x="${cx - w * 0.07}" y="${by - h * 0.62}" width="${w * 0.14}" height="${h * 0.62}" fill="${col}" stroke="${col}" stroke-width="${sw}"/>`}</g>`;
  return s;
}
