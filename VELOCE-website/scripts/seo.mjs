// Post-build SEO step: per-route HTML with correct <title>/meta/canonical, sitemap.xml and robots.txt.
// Runs after `vite build` (see package.json "build").
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const dist = new URL('../dist/', import.meta.url)
const base = readFileSync(new URL('index.html', dist), 'utf8')
const site = base.match(/<link rel="canonical" href="([^"]+?)\/?"/)?.[1]
if (!site) throw new Error('Could not read the site URL from dist/index.html')
if (site.includes('localhost')) {
  console.warn('\n[seo] SITE_URL is not set: sitemap/canonical URLs point to ' + site + '. Set SITE_URL in your hosting environment.\n')
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
const pages = [
  {
    path: '/docs',
    title: 'EduTech Documentation – User Guide for School Management',
    description: 'Step-by-step EduTech user guide: school setup, student and teacher management, marks and report cards, attendance, fees, parent portal and security.',
  },
  {
    path: '/features',
    title: 'EduTech Features – Tools for Administrators, Teachers, Students & Parents',
    description: 'Explore what EduTech offers administrators, teachers, students and parents, and how it fits primary schools, secondary schools, colleges and universities.',
  },
]

for (const p of pages) {
  const url = `${site}${p.path}`
  let html = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(p.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(p.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(p.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(p.description)}$2`)
  const dir = new URL(`.${p.path}/`, dist)
  mkdirSync(dir, { recursive: true })
  writeFileSync(new URL('index.html', dir), html)
}

const today = new Date().toISOString().slice(0, 10)
const urls = [['/', '1.0'], ['/features', '0.8'], ['/docs', '0.8']]
writeFileSync(
  new URL('sitemap.xml', dist),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map(([u, pr]) => `  <url><loc>${site}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n') +
    `\n</urlset>\n`,
)
writeFileSync(new URL('robots.txt', dist), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site}/sitemap.xml\n`)
console.log('[seo] wrote /docs, /features, sitemap.xml, robots.txt for', site)
