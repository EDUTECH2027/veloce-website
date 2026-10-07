import nodemailer from 'nodemailer'
import { demoEmail } from '../server/template.js'

// Vercel serverless function: POST /api/demo
// Demo requests always go to this address; it is never taken from the request.
const RECIPIENT = 'francisjunior269@gmail.com'

const clean = (v, max) => String(v ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465', SMTP_USER, SMTP_PASS } = process.env
  const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('Missing SMTP_USER / SMTP_PASS environment variables')
    return res.status(500).json({ error: 'Email not configured' })
  }

  const b = req.body && typeof req.body === 'object' ? req.body : {}
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
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    const { html, text } = demoEmail(data)
    await transporter.sendMail({
      from: `"EduTech Website" <${SMTP_FROM}>`,
      to: RECIPIENT,
      replyTo: `"${data.name.replace(/["\r\n]/g, '')}" <${data.email}>`,
      subject: `New demo request – ${data.school.replace(/[\r\n]/g, ' ')}`,
      html,
      text,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Mail failed:', err.message)
    res.status(500).json({ error: 'Could not send email' })
  }
}
