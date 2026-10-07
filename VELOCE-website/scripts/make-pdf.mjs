// Renders the /docs page with the print stylesheet to public/EduTech-Documentation.pdf
// using a locally installed Edge or Chrome. Run: npm run docs:pdf
import { spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const browsers = [
  process.env.BROWSER_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)
const browser = browsers.find((p) => existsSync(p))
if (!browser) throw new Error('No Edge/Chrome found. Set BROWSER_PATH.')

const PORT = 4179
const out = fileURLToPath(new URL('../public/EduTech-Documentation.pdf', import.meta.url))

const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 3000))
try {
  const r = spawnSync(browser, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${out}`,
    `http://localhost:${PORT}/docs`,
  ], { stdio: 'inherit' })
  if (r.status !== 0) throw new Error('Browser exited with ' + r.status)
  console.log('PDF written to', out)
} finally {
  server.kill()
}
