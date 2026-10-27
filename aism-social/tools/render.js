// Renders each <section class="slide"> of a post's slides.html to 01.png, 02.png, … next to it,
// and warns when any text spills outside its slide.
// Usage: node aism-social/tools/render.js aism-social/posts/01-cohort-1-launch/slides.html
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const file = path.resolve(process.argv[2]);
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const browser = await chromium.launch(proxy ? { proxy: { server: proxy } } : {});
  const page = await browser.newPage({ viewport: { width: 1160, height: 1430 } });
  await page.goto('file://' + file, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll('section.slide')].flatMap((slide, i) => {
      const box = slide.getBoundingClientRect();
      const pad = parseFloat(getComputedStyle(slide).paddingLeft);
      return [...slide.querySelectorAll('h1, h2, h3, p, li, dd, dt, span')]
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.width && (r.left < box.left + pad - 1 || r.right > box.right - pad + 1 || r.bottom > box.bottom);
        })
        .map(el => `slide ${i + 1}: "${el.textContent.trim().slice(0, 40)}"`);
    }));
  overflow.forEach(o => console.warn('OVERFLOW', o));

  const slides = await page.$$('section.slide');
  for (const [i, slide] of slides.entries()) {
    const out = path.join(path.dirname(file), String(i + 1).padStart(2, '0') + '.png');
    await slide.screenshot({ path: out });
    console.log(out);
  }
  await browser.close();
  process.exit(overflow.length ? 1 : 0);
})();
