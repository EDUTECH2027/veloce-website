import LogoMark from './Logo'
import { useEffect } from 'react'
import './features.css'
import { INSTITUTION_DETAILS, ROLE_DETAILS, SECTION_INTRO, WHY, type Detail } from './content'

const TOTAL = [...ROLE_DETAILS, ...INSTITUTION_DETAILS].reduce((n, d) => n + d.items.length, 0)
const slug = (d: Detail) => d.title.toLowerCase().replace(/[^a-z]+/g, '-')

function Block({ d, i }: { d: Detail; i: number }) {
  const detailed = Boolean(d.items[0]?.[1])
  return (
    <section id={slug(d)} className={`fx-block${i % 2 ? ' alt' : ''}`}>
      <div className="fx-wrap fx-block-grid">
        <div className="fx-block-intro">
          <div className="fx-icon">{d.icon}</div>
          <span className="fx-eyebrow">{d.title}</span>
          <h2>{d.heading}</h2>
          {d.intro.map((p) => <p key={p}>{p}</p>)}
          <div className="fx-outro">
            <h4>{d.outroTitle}</h4>
            {d.outro.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="fx-block-items">
          {d.listTitle && <h3>{d.listTitle}</h3>}
          {detailed ? (
            <div className="fx-tiles">
              {d.items.map(([t, x], n) => (
                <div className="fx-tile" key={t}>
                  <span className="fx-tile-n">{String(n + 1).padStart(2, '0')}</span>
                  <b>{t}</b>
                  <p>{x}</p>
                </div>
              ))}
            </div>
          ) : (
            <ul className="fx-checks">
              {d.items.map(([t]) => <li key={t}>{t}</li>)}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Features() {
  useEffect(() => {
    const prev = document.title
    document.title = 'EduTech Features – Tools for Administrators, Teachers, Students & Parents'
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="fx">
      <header className="fx-nav">
        <div className="fx-wrap fx-nav-inner">
          <a href="/" className="logo"><LogoMark />EduTech</a>
          <div className="fx-nav-actions">
            <a className="btn btn-ghost" href="/">← Back to website</a>
            <a
              className="btn btn-primary"
              href="/#demo"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </header>

      <section className="fx-hero">
        <div className="fx-wrap">
          <span className="fx-badge">Features</span>
          <h1>{SECTION_INTRO.title}</h1>
          {SECTION_INTRO.lead.map((p) => <p key={p}>{p}</p>)}
          <div className="fx-stats">
            <div><b>4</b><span>user roles</span></div>
            <div><b>4</b><span>institution types</span></div>
            <div><b>{TOTAL}</b><span>capabilities</span></div>
          </div>
        </div>
      </section>

      <nav className="fx-subnav" aria-label="Sections">
        <div className="fx-wrap fx-subnav-inner">
          <span>Roles</span>
          {ROLE_DETAILS.map((d) => <button key={d.title} onClick={() => go(slug(d))}>{d.icon} {d.title}</button>)}
          <span>Institutions</span>
          {INSTITUTION_DETAILS.map((d) => <button key={d.title} onClick={() => go(slug(d))}>{d.icon} {d.title}</button>)}
          <button onClick={() => go('why')}>🚀 Why EduTech</button>
        </div>
      </nav>

      <div className="fx-divider"><div className="fx-wrap"><h2>Everyone gets the right experience</h2><p>One platform with a dedicated space for every role.</p></div></div>
      {ROLE_DETAILS.map((d, i) => <Block key={d.title} d={d} i={i} />)}

      <div className="fx-divider"><div className="fx-wrap"><h2>Designed for every type of institution</h2><p>One platform. Different educational needs.</p></div></div>
      {INSTITUTION_DETAILS.map((d, i) => <Block key={d.title} d={d} i={i} />)}

      <section id="why" className="fx-why">
        <div className="fx-wrap">
          <span className="fx-eyebrow light">Why EduTech</span>
          <h2>{WHY.title}</h2>
          <p className="fx-why-lead">{WHY.lead}</p>
          <div className="fx-shifts">
            {WHY.shifts.map(([a, b]) => (
              <div key={a}><span>{a}</span><i>→</i><b>{b}</b></div>
            ))}
          </div>
          <h3>{WHY.benefitsTitle}</h3>
          <div className="fx-benefits">
            {WHY.benefits.map(([ic, t, d]) => (
              <div key={t}><div className="fx-icon">{ic}</div><b>{t}</b><p>{d}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-cta">
        <div className="fx-wrap">
          <h2>See it working for your school</h2>
          <p>Book a personalised demo and we’ll show you how EduTech fits your institution.</p>
          <a
            className="btn btn-light btn-lg"
            href="/#demo"
          >
            Request a Demo
          </a>
        </div>
      </section>
    </div>
  )
}
