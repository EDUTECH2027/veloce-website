import express from 'express'
import nodemailer from 'nodemailer'
import { demoEmail } from './template.js'

// Demo requests always go to this address; it is never taken from the request.
const RECIPIENT = 'francisjunior269@gmail.com'

const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_USER, SMTP_PASS, PORT = '3001', SMTP_FROM = SMTP_USER } = process.env
if (!SMTP_USER || !SMTP_PASS) {
  console.error('Missing SMTP_USER / SMTP_PASS. Copy .env.example to .env and fill it in.')
  process.exit(1)
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
})

const app = express()
app.use(express.json({ limit: '20kb' }))

// Minimal per-IP rate limit: 5 requests / 10 minutes.
const hits = new Map()
function limited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

app.post('/api/demo', async (req, res) => {
  if (limited(req.ip)) return res.status(429).json({ error: 'Too many requests' })
  const b = req.body ?? {}
  const data = {
    name: clean(b.name, 120),
    school: clean(b.school, 160),
    email: clean(b.email, 160),
    phone: clean(b.phone, 40),
    students: clean(b.students, 10),
    type: clean(b.type, 40),
    message: clean(b.message, 2000),
  }
  if (!data.name || !data.school || !data.phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ error: 'Invalid form data' })
  }
  try {
    const { html, text } = demoEmail(data)
    await transporter.sendMail({
      from: `"EduTech Website" <${SMTP_FROM}>`,
      to: RECIPIENT,
      replyTo: `"${data.name.replace(/["\r\n]/g, '')}" <${data.email}>`,
      subject: `New demo request – ${data.school.replace(/[\r\n]/g, ' ')}`,
      html,
      text,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Mail failed:', err.message)
    res.status(500).json({ error: 'Could not send email' })
  }
})

app.listen(Number(PORT), () => console.log(`Demo API on http://localhost:${PORT}`))
