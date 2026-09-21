const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  
  // Hero screenshot
  await page.screenshot({ 
    path: 'C:/Users/admin0/.gemini/antigravity/brain/e97993fc-d26f-413c-99a0-3be20ceb061a/hero_perfect.png', 
    clip: { x: 0, y: 0, width: 1440, height: 850 } 
  });
  
  // USA section screenshot
  const el = await page.$('#greencard');
  if (el) {
    await el.screenshot({ 
      path: 'C:/Users/admin0/.gemini/antigravity/brain/e97993fc-d26f-413c-99a0-3be20ceb061a/usa_3d_perfect.png' 
    });
  }
  
  await browser.close();
  console.log('Screenshots saved');
})();
