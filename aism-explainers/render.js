// AISM motion render driver.
//   node render.js <video> frames <t1,t2,...>   style frames to build/<video>/frame_<t>.png
//   node render.js <video> motion [workers]      full timeline to build/<video>/silent.mp4
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const [, , video, mode = 'frames', arg] = process.argv;
if (!video) { console.error('usage: node render.js <video> frames|motion [...]'); process.exit(1); }
const OUT = path.join(ROOT, 'build', video);
fs.mkdirSync(OUT, { recursive: true });

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  page.on('console', m => { if (m.type() === 'warning' || m.type() === 'error') console.log(`[page ${m.type()}]`, m.text()); });
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto('file://' + path.join(ROOT, 'engine.html') + '?v=' + video);
  const info = await page.evaluate(() => window.READY);
  return { page, info };
}

async function frames(times) {
  const browser = await chromium.launch();
  const { page, info } = await openPage(browser);
  console.log('end', info.end, 'fonts', info.fonts);
  for (const t of times) {
    await page.evaluate(t => renderAt(t), t);
    const file = path.join(OUT, `frame_${t.toFixed(2)}.png`);
    await page.locator('#stage').screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
}

async function cues() {
  const browser = await chromium.launch();
  const { page } = await openPage(browser);
  const c = await page.evaluate(() => collectCues());
  fs.writeFileSync(path.join(OUT, 'cues.json'), JSON.stringify(c, null, 1));
  console.log(c.cues.length, 'cues, end', c.end);
  await browser.close();
}

async function beats() {
  const browser = await chromium.launch();
  const { page } = await openPage(browser);
  const b = await page.evaluate(() => {
    const txt = ws => (ws || []).map(w => wText(w)).join(' ');
    const acc = p => [...(p.lead || []), ...(p.punch || []), ...(p.tail || [])].filter(w => wOpt(w).accent).map(wText);
    const c = collectCues();
    return { end: END, cues: c.cues, shots: TL.map(s => ({ name: s.name, reg: s.reg, at: s.at, dur: s.dur, ribbon: s.ribbon || 0,
      caps: (s.caps || []).map(p => ({ lead: txt(p.lead), punch: txt(p.punch), tail: txt(p.tail), accent: acc(p), on: Math.min(...[...(p.lead || []), ...(p.punch || []), ...(p.tail || [])].map(wOnset)) })) })) };
  });
  fs.writeFileSync(path.join(OUT, 'beats.json'), JSON.stringify(b, null, 1));
  console.log('beats ->', path.join(OUT, 'beats.json'));
  await browser.close();
}

async function motion(workers) {
  const pb = await chromium.launch();
  const probe = await openPage(pb);
  const end = probe.info.end;
  await pb.close();
  const total = Math.round(end * 30);
  const per = Math.ceil(total / workers);
  const t0 = Date.now();
  let done = 0;
  const jobs = [];
  for (let w = 0; w < workers; w++) {
    const a = w * per, b = Math.min(total, a + per);
    if (a >= b) break;
    jobs.push((async () => {
      const browser = await chromium.launch();   // one browser per worker so rendering runs in parallel
      const { page } = await openPage(browser);
      const file = path.join(OUT, `part_${w}.mp4`);
      const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-',
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '8', '-pix_fmt', 'yuv444p', '-r', '30', file], { stdio: ['pipe', 'inherit', 'inherit'] });
      const closed = new Promise(res => ff.on('close', res));
      for (let f = a; f < b; f++) {
        await page.evaluate(t => renderAt(t), f / 30);
        const buf = await page.screenshot({ type: 'jpeg', quality: 96, clip: { x: 0, y: 0, width: 1080, height: 1920 } });
        if (!ff.stdin.write(buf)) await new Promise(res => ff.stdin.once('drain', res));
        done++;
        if (done % 60 === 0) process.stdout.write(`\r${done}/${total} frames, ${(done / ((Date.now() - t0) / 1000)).toFixed(1)} fps   `);
      }
      ff.stdin.end();
      await closed;
      await browser.close();
      return file;
    })());
  }
  const parts = await Promise.all(jobs);
  const list = path.join(OUT, 'parts.txt');
  fs.writeFileSync(list, parts.map(p => `file '${p}'`).join('\n'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', path.join(OUT, 'silent.mp4')]);
  parts.forEach(p => fs.unlinkSync(p));
  console.log(`\n${total} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s -> ${path.join(OUT, 'silent.mp4')}`);
}

(async () => {
  if (mode === 'frames') await frames((arg || '0.5').split(',').map(Number));
  else if (mode === 'motion') await motion(Number(arg || 3));
  else if (mode === 'cues') await cues();
  else if (mode === 'beats') await beats();
})().catch(e => { console.error(e); process.exit(1); });
