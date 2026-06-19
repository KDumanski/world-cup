// Minimal screenshotter — reuses the front-end's puppeteer install.
// Usage: node scripts/shoot.js
const path = require('path');
const FE = 'c:/Propcheck Git/front-end/node_modules/puppeteer';
const puppeteer = require(FE);

const BASE = 'http://localhost:4321';
const OUT = path.join(__dirname, '..', '.shots');
require('fs').mkdirSync(OUT, { recursive: true });

const shots = [
  { name: 'home', url: '/', theme: 'dark', full: true },
  { name: 'home-light', url: '/', theme: 'light', full: true },
  { name: 'cities', url: '/cities/', theme: 'dark', full: true },
  { name: 'city-mexico-city', url: '/cities/mexico-city/', theme: 'dark', full: true },
  { name: 'city-nynj', url: '/cities/new-york-new-jersey/', theme: 'dark', full: true },
  { name: 'home-mobile', url: '/', theme: 'dark', full: true, mobile: true },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const s of shots) {
    const page = await browser.newPage();
    await page.setViewport(s.mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 });
    // Set theme before load via localStorage + the data-theme attribute.
    await page.evaluateOnNewDocument((theme) => {
      try { localStorage.setItem('wc-theme', theme); } catch (e) {}
    }, s.theme);
    await page.goto(BASE + s.url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Scroll the whole page to trigger every IntersectionObserver reveal, then
    // return to top — otherwise below-the-fold sections stay mid-animation.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 900)); // let reveal anims settle
    const file = path.join(OUT, `${s.name}.png`);
    await page.screenshot({ path: file, fullPage: !!s.full });
    console.log('shot', s.name, '->', file);
    await page.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
