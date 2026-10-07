const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const FIELDS = [
  ['Full Name', 'name'],
  ['School Name', 'school'],
  ['Email', 'email'],
  ['Phone Number', 'phone'],
  ['Number of Students', 'students'],
  ['School Type', 'type'],
]

export function demoEmail(d, receivedAt = new Date()) {
  const when = receivedAt.toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })
  const rows = FIELDS.map(
    ([label, key]) => `
      <tr>
        <td style="padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:38%">${label}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:15px;font-weight:600">${esc(d[key]) || '—'}</td>
      </tr>`,
  ).join('')

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f1f5f9;font-family:Segoe UI,Arial,sans-serif">
  <table role="presentation" width="100%" style="max-width:600px;margin:auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0">
    <tr><td style="background:#2563eb;padding:24px 28px;color:#fff">
      <div style="font-size:13px;letter-spacing:.1em;text-transform:uppercase;opacity:.85">EduTech</div>
      <div style="font-size:22px;font-weight:700;margin-top:4px">New demo request</div>
    </td></tr>
    <tr><td style="padding:24px 28px 8px;color:#475569;font-size:15px">
      <b style="color:#0f172a">${esc(d.name)}</b> from <b style="color:#0f172a">${esc(d.school)}</b> has requested a demo.
    </td></tr>
    <tr><td style="padding:8px 28px">
      <table role="presentation" width="100%" style="border:1px solid #e2e8f0;border-radius:10px;border-collapse:separate;overflow:hidden">${rows}</table>
    </td></tr>
    <tr><td style="padding:8px 28px 4px">
      <div style="color:#64748b;font-size:13px;margin-bottom:6px">Message</div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;color:#0f172a;font-size:15px;white-space:pre-wrap">${esc(d.message) || '—'}</div>
    </td></tr>
    <tr><td style="padding:20px 28px 28px">
      <a href="mailto:${esc(d.email)}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:9px">Reply to ${esc(d.name)}</a>
    </td></tr>
    <tr><td style="padding:14px 28px;background:#f8fafc;color:#94a3b8;font-size:12px;border-top:1px solid #e2e8f0">Received ${esc(when)} via the EduTech website</td></tr>
  </table>
</body></html>`

  const text = [
    'New EduTech demo request',
    ...FIELDS.map(([label, key]) => `${label}: ${d[key] || '-'}`),
    `Message: ${d.message || '-'}`,
    `Received: ${when}`,
  ].join('\n')

  return { html, text }
}
