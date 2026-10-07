import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

// Public origin used for canonical/OG/sitemap URLs. Set SITE_URL in Vercel
// (e.g. https://www.yourdomain.com); falls back to Vercel's production domain.
function siteUrl() {
  const raw =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  return (raw || 'http://localhost:5173').replace(/\/+$/, '')
}

const injectSiteUrl = (): Plugin => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl()),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectSiteUrl()],
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
