import { useState, type FormEvent } from 'react'
import './App.css'
import adminShot from './assets/dashboard-admin.png'

const LOGIN_URL = '#login' // TODO: point to the school-management platform login
const DEMO_ENDPOINT = '/api/demo'

const NAV = [
  ['Features', '#features'],
  ['Solutions', '#solutions'],
  ['How it works', '#how'],
  ['Pricing', '#pricing'],
  ['About', '#about'],
] as const

const STRIP = [
  ['👨‍🎓', 'Students'], ['👨‍🏫', 'Teachers'], ['👨‍👩‍👧', 'Parents'],
  ['📊', 'Results'], ['💰', 'Fees'], ['📅', 'Attendance'],
  ['💬', 'Communication'], ['📋', 'Reports'], ['🔐', 'Security'],
]

const FEATURES = [
  ['🎓', 'Student Management', ['Student registration', 'Student profiles', 'Class assignment', 'Academic history', 'Parent/guardian information']],
  ['📊', 'Academic Management', ['Marks entry', 'Subjects and coefficients', 'Class rankings', 'Report cards', 'Academic performance tracking']],
  ['📅', 'Attendance Management', ['Student attendance', 'Teacher attendance', 'Absence tracking', 'QR-based teacher attendance', 'Attendance reports']],
  ['💰', 'Fees Management', ['Configure school fees', 'Track payments', 'Outstanding balances', 'Student payment history', 'Financial reports']],
  ['👨‍🏫', 'Teacher Management', ['Teacher profiles', 'Timetables', 'Attendance', 'Marks', 'Student behaviour comments', 'Salary information']],
  ['👨‍👩‍👧', 'Parent Portal', ["See children's results", 'Monitor attendance', 'View fees', 'Follow academic performance', 'Receive school communication']],
] as const

const SOLUTIONS = [
  ['🏫', 'Primary Schools', 'Simple registration, attendance and report cards for younger learners.'],
  ['📚', 'Secondary Schools', 'Subjects, coefficients, rankings and parent follow-up across every class.'],
  ['🎓', 'Colleges', 'Structured academic records, timetables and fee tracking.'],
  ['🏛️', 'Universities', 'Scalable administration for large cohorts and multiple departments.'],
] as const

const ROLES = [
  ['👨‍💼', 'Administrator', 'Manage your entire school.'],
  ['👨‍🏫', 'Teacher', 'Manage classes, marks & attendance.'],
  ['👨‍🎓', 'Student', 'Follow your academic performance.'],
  ['👨‍👩‍👧', 'Parent', 'Stay informed about your child.'],
] as const

const STEPS = [
  ['Create your school', "The school administrator provides the school's information and creates its EduTech account."],
  ['Configure your school', 'Add classes, subjects, teachers, students, fees and academic settings.'],
  ['Invite your users', 'Teachers, students and parents receive their access credentials.'],
  ['Start managing your school', 'Everything is available from one centralized platform.'],
] as const

const PLANS = [
  { name: 'Basic', tag: 'Offline', features: ['Student management', 'Attendance', 'Marks & report cards'], cta: 'Choose Basic' },
  { name: 'Standard', tag: 'Online', features: ['Everything in Basic', 'Parent portal', 'Communication'], cta: 'Choose Standard', pop: true },
  { name: 'Premium', tag: 'Online', features: ['Everything in Standard', 'Advanced reports', 'Mobile access'], cta: 'Contact us' },
]

type Screen = { label: string; side: string[]; title: string; kpis: [string, string, string][]; rows: [string, string, boolean][]; img?: string }
const SCREENS: Screen[] = [
  { label: 'Super Admin', side: ['Overview', 'Schools', 'Subscriptions', 'Revenue', 'Settings'], title: 'Platform overview',
    kpis: [['Schools', '24', '+3'], ['Students', '4,285', '+6%'], ['Attendance', '94%', '+1%'], ['Revenue', '12.4M FCFA', '+9%']],
    rows: [['Lycée Excellence', 'Active', true], ['Collège du Savoir', 'Active', true], ['École Horizon', 'Renewal due', false]] },
  { label: 'School Admin', img: adminShot, side: [], title: '', kpis: [], rows: [] },
  { label: 'Teacher', side: ['Dashboard', 'My classes', 'Attendance', 'Marks', 'Timetable'], title: 'Teacher dashboard',
    kpis: [['Classes today', '4', ''], ['Pending marks', '2', ''], ['Class average', '13.4/20', '+0.6'], ['Absent today', '3', '']],
    rows: [['Mathematics – Form 5', '08:00', true], ['Mathematics – Form 4', '10:00', true], ['Enter Term 1 marks', 'Pending', false]] },
  { label: 'Parent', side: ['My children', 'Results', 'Attendance', 'Fees', 'Messages'], title: 'Parent dashboard',
    kpis: [['Average', '14.2/20', '+0.8'], ['Rank', '5th', '+2'], ['Absences', '1', ''], ['Balance', '0 FCFA', '']],
    rows: [['Term 1 report card', 'Available', true], ['School announcement', 'New', true], ['Term 2 fees', 'Due soon', false]] },
  { label: 'Student', side: ['Dashboard', 'Results', 'Timetable', 'Attendance', 'Subjects'], title: 'Student dashboard',
    kpis: [['Average', '14.2/20', '+0.8'], ['Class rank', '5th', '+2'], ['Attendance', '98%', ''], ['Subjects', '11', '']],
    rows: [['Mathematics', '16/20', true], ['Physics', '13/20', true], ['History', '11/20', false]] },
]

function Dashboard({ s }: { s: Screen }) {
  if (s.img) {
    return (
      <div className="mock">
        <div className="mock-bar"><i /><i /><i /><span>EduTech · {s.label}</span></div>
        <img className="shot" src={s.img} alt={`EduTech ${s.label} dashboard`} />
      </div>
    )
  }
  return (
    <div className="mock">
      <div className="mock-bar"><i /><i /><i /><span>EduTech · {s.label}</span></div>
      <div className="mock-body">
        <div className="mock-side">
          {s.side.map((x, i) => <div key={x} className={i === 0 ? 'on' : ''}>{x}</div>)}
        </div>
        <div className="mock-main">
          <div className="mock-title">{s.title}</div>
          <div className="kpis">
            {s.kpis.map(([l, v, d]) => (
              <div className="kpi" key={l}><small>{l}</small><b>{v}</b>{d && <em>{d}</em>}</div>
            ))}
          </div>
          <div className="bars">
            {[40, 62, 48, 75, 58, 88, 70].map((h, i) => <div key={i} style={{ height: `${h}%` }} />)}
          </div>
          <div className="rows">
            {s.rows.map(([a, b, ok]) => (
              <div className="row" key={a}><span>{a}</span><span className={ok ? 'pill' : 'pill warn'}>{b}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DemoForm() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError('')
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      const res = await fetch(DEMO_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="form">
        <div className="success"><h3>Thank you! 🎉</h3><p>We received your request and will contact you shortly to schedule your demo.</p></div>
      </div>
    )
  }
  return (
    <form className="form" onSubmit={submit}>
      <label>Full Name *<input name="name" required /></label>
      <label>School Name *<input name="school" required /></label>
      <label>Email *<input name="email" type="email" required /></label>
      <label>Phone Number *<input name="phone" type="tel" required /></label>
      <label>Number of Students<input name="students" type="number" min="0" /></label>
      <label>School Type
        <select name="type" defaultValue="">
          <option value="" disabled>Select…</option>
          <option>Primary</option><option>Secondary</option><option>College</option><option>University</option>
        </select>
      </label>
      <label className="full">Message<textarea name="message" rows={3} /></label>
      {error && <p className="full" style={{ color: '#dc2626', fontSize: 14 }}>{error}</p>}
      <button className="btn btn-primary btn-lg full" disabled={busy}>{busy ? 'Sending…' : 'Request a Demo'}</button>
    </form>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(0)

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo"><span className="logo-mark">🎓</span>EduTech</a>
          <nav className="nav-links">
            {NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
            <a href="#demo">Contact</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn-ghost" href={LOGIN_URL}>Login</a>
            <a className="btn btn-primary" href="#demo">Request a Demo</a>
          </div>
          <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>
        <div className={`mobile-menu${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
          {NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          <a href="#demo">Contact</a>
          <a className="btn btn-ghost" href={LOGIN_URL}>Login</a>
          <a className="btn btn-primary" href="#demo">Request a Demo</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="eyebrow">The smarter way to manage your school</span>
              <h1>Everything your school needs to <span>run better</span>, in one platform.</h1>
              <p className="lead">Manage students, teachers, attendance, fees, results, communication and administration from one secure system.</p>
              <div className="hero-actions">
                <a className="btn btn-primary btn-lg" href="#demo">Request a Demo</a>
                <a className="btn btn-ghost btn-lg" href="#features">Explore Features</a>
              </div>
              <p className="hero-note">Already using EduTech? <a href={LOGIN_URL} style={{ color: 'var(--primary)', fontWeight: 600 }}>Log in →</a></p>
            </div>
            <Dashboard s={SCREENS[1]} />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="strip">
              {STRIP.map(([i, l]) => <div key={l}><span>{i}</span>{l}</div>)}
            </div>
            <div className="center-text">
              <h3>Built for modern schools</h3>
              <p>EduTech brings administration, academics, finance and communication together in one centralized platform.</p>
            </div>
          </div>
        </section>

        <section className="section white" id="features">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Features</span>
              <h2>One platform. Your entire school.</h2>
            </div>
            <div className="grid g3">
              {FEATURES.map(([icon, title, items]) => (
                <div className="card" key={title}>
                  <div className="icon">{icon}</div>
                  <h3>{title}</h3>
                  <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="solutions">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Solutions</span>
              <h2>Everyone gets the right experience.</h2>
              <p>One product, tailored dashboards for every role in your school.</p>
            </div>
            <div className="grid g4" style={{ marginBottom: 56 }}>
              {ROLES.map(([i, t, d]) => (
                <div className="card" key={t} style={{ textAlign: 'center' }}>
                  <div className="icon" style={{ margin: '0 auto 16px' }}>{i}</div>
                  <h3>{t.toUpperCase()}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <div className="grid g4">
              {SOLUTIONS.map(([i, t, d]) => (
                <div className="card" key={t}>
                  <div className="icon">{i}</div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section dark" id="product">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Product</span>
              <h2>See EduTech in action</h2>
              <p>Five dashboards, one connected platform. (Illustrative data shown.)</p>
            </div>
            <div className="tabs" role="tablist">
              {SCREENS.map((s, i) => (
                <button key={s.label} role="tab" aria-selected={tab === i} className={`tab${tab === i ? ' on' : ''}`} onClick={() => setTab(i)}>
                  0{i + 1} — {s.label}
                </button>
              ))}
            </div>
            <div className="showcase"><Dashboard s={SCREENS[tab]} /></div>
          </div>
        </section>

        <section className="section white" id="how">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">How it works</span>
              <h2>Up and running in four steps</h2>
            </div>
            <div className="grid g4">
              {STEPS.map(([t, d], i) => (
                <div className="card" key={t}>
                  <div className="step-num">0{i + 1}</div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Communication</span>
              <h2>Keep parents and schools connected.</h2>
              <p>Send important school information directly to parents through integrated digital communication channels.</p>
            </div>
            <div className="flow">
              <div className="flow-box main"><b>🏫 School</b></div>
              <span className="arrow">→</span>
              <div className="flow-box"><ul><li>Results</li><li>Attendance</li><li>Announcements</li><li>Fees</li><li>Important notifications</li></ul></div>
              <span className="arrow">→</span>
              <div className="flow-box main"><b>💬 Platform</b></div>
              <span className="arrow">→</span>
              <div className="flow-box"><b>👨‍👩‍👧 Parent</b></div>
            </div>
          </div>
        </section>

        <section className="section white" id="pricing">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Pricing</span>
              <h2>Simple, transparent pricing</h2>
            </div>
            <div className="grid g3">
              {PLANS.map((p) => (
                <div className={`card price${p.pop ? ' pop' : ''}`} key={p.name}>
                  {p.pop && <span className="badge">Most popular</span>}
                  <h3>{p.name}</h3>
                  <div className="tag">{p.tag}</div>
                  {/* TODO: replace with real prices */}
                  <div className="amt">— <small>FCFA / year</small></div>
                  <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <a className={`btn ${p.pop ? 'btn-primary' : 'btn-ghost'}`} href="#demo">{p.cta}</a>
                </div>
              ))}
            </div>
            <div className="center-text" style={{ marginTop: 40 }}>
              <p>Not sure which plan is right for your school?</p>
              <a className="btn btn-ghost" style={{ marginTop: 12 }} href="#demo">Talk to our team</a>
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container about-grid">
            <div>
              <span className="eyebrow">About EduTech</span>
              <h2>Technology designed for better education.</h2>
              <p>EduTech was created to help schools move away from time-consuming manual processes and fragmented tools. Our mission is simple: make school administration easier, more efficient and more connected through accessible technology.</p>
            </div>
            <div className="mv">
              <div className="card"><h3>OUR MISSION</h3><p>Make school management simpler.</p></div>
              <div className="card"><h3>OUR VISION</h3><p>Build a more connected and digitally enabled education ecosystem.</p></div>
            </div>
          </div>
        </section>

        <section className="section demo" id="demo">
          <div className="container demo-grid">
            <div>
              <h2>Everything your school needs to manage, in one place.</h2>
              <p>Book a personalised demo and see how EduTech fits your school.</p>
            </div>
            <DemoForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo"><span className="logo-mark">🎓</span>EduTech</div>
              <p>Smart school management made simple.</p>
            </div>
            <div><h4>Product</h4><ul><li><a href="#features">Features</a></li><li><a href="#pricing">Pricing</a></li><li><a href="#solutions">Solutions</a></li><li><a href="#how">How it works</a></li></ul></div>
            <div><h4>Company</h4><ul><li><a href="#about">About</a></li><li><a href="#demo">Contact</a></li><li><a href="#top">Careers</a></li></ul></div>
            <div><h4>Resources</h4><ul><li><a href="#top">Documentation</a></li><li><a href="#top">Help Center</a></li><li><a href="#top">Blog</a></li></ul></div>
            <div><h4>Legal</h4><ul><li><a href="#top">Privacy Policy</a></li><li><a href="#top">Terms of Service</a></li></ul>
              <h4 style={{ marginTop: 20 }}>Follow us</h4><ul><li><a href="#top">LinkedIn</a></li><li><a href="#top">Facebook</a></li><li><a href="#top">TikTok</a></li></ul></div>
          </div>
          <div className="footer-bottom">© 2026 EduTech. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}
