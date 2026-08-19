import { chromium } from 'playwright'
const B='http://127.0.0.1:4400'
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })

// ---------- MOBILE MENU ----------
const m = await b.newContext({ viewport:{width:390,height:844}, hasTouch:true, isMobile:true })
const p = await m.newPage()
await p.goto(B+'/', { waitUntil:'networkidle' })
await p.locator('button[aria-controls="mobile-menu"]').click()
await p.waitForTimeout(500)
console.log('menu open:', await p.locator('#mobile-menu').count() > 0)
// body scroll lock?
const lock = await p.evaluate(() => ({ bodyOverflow: getComputedStyle(document.body).overflow, htmlOverflow: getComputedStyle(document.documentElement).overflow }))
console.log('scroll lock:', JSON.stringify(lock))
await p.evaluate(() => window.scrollTo(0, 400)); await p.waitForTimeout(200)
console.log('page scrolled behind open menu? scrollY =', await p.evaluate(()=>window.scrollY))
// escape closes?
await p.keyboard.press('Escape'); await p.waitForTimeout(300)
console.log('menu after Escape:', await p.locator('#mobile-menu').count() > 0 ? 'STILL OPEN' : 'closed')
// touch targets
await p.evaluate(() => window.scrollTo(0,0)); await p.waitForTimeout(200)
if (await p.locator('#mobile-menu').count() === 0) await p.locator('button[aria-controls="mobile-menu"]').click()
await p.waitForTimeout(400)
const targets = await p.evaluate(() => [...document.querySelectorAll('#mobile-menu a, #mobile-menu button')]
  .map(e => ({ t: e.textContent.trim().slice(0,22), h: Math.round(e.getBoundingClientRect().height) })))
console.log('menu touch targets:', JSON.stringify(targets))
await p.keyboard.press('Escape')

// ---------- HORIZONTAL OVERFLOW + LINE LENGTH ACROSS BREAKPOINTS ----------
const paths = ['/','/about','/thesis','/capital','/approach','/portfolio','/founders','/privacy','/terms']
for (const w of [1440,1280,1024,768,390,375]) {
  const c = await b.newContext({ viewport:{width:w,height:900} })
  const q = await c.newPage()
  const bad = []
  for (const path of paths) {
    await q.goto(B+path, { waitUntil:'networkidle' })
    await q.waitForTimeout(250)
    const r = await q.evaluate(() => {
      const doc = document.documentElement
      const overflow = doc.scrollWidth - doc.clientWidth
      // widest text block: approximate chars-per-line for body paragraphs
      let maxCh = 0, maxTxt = ''
      for (const el of document.querySelectorAll('p')) {
        const cs = getComputedStyle(el)
        const w = el.getBoundingClientRect().width
        if (!w || el.innerText.trim().length < 90) continue
        // approx char width = 0.5 * font-size for Inter
        const ch = Math.round(w / (parseFloat(cs.fontSize) * 0.5))
        if (ch > maxCh) { maxCh = ch; maxTxt = el.innerText.trim().slice(0,40) }
      }
      return { overflow, maxCh, maxTxt }
    })
    if (r.overflow > 0 || r.maxCh > 78) bad.push(`${path} overflow=${r.overflow}px maxCPL≈${r.maxCh} "${r.maxTxt}"`)
  }
  console.log(`\n@${w}px:`, bad.length ? '\n  '+bad.join('\n  ') : 'ok (no overflow, all body copy ≤78 CPL)')
  await c.close()
}
await b.close()
