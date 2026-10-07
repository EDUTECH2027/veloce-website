import LogoMark from './Logo'
import { useEffect, useMemo, useState } from 'react'
import './docs.css'
import { DOC_SECTIONS, type Block } from './docsContent'

const PDF_URL = '/EduTech-Documentation.pdf'

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'p': return <p key={i}>{b.x}</p>
          case 'h': return <h4 key={i}>{b.x}</h4>
          case 'ul': return <ul key={i} className="d-list">{b.x.map((x) => <li key={x}>{x}</li>)}</ul>
          case 'steps': return <ol key={i} className="d-steps">{b.x.map((x) => <li key={x}><span>{x}</span></li>)}</ol>
          case 'formula': return <div key={i} className="d-formula">{b.x}</div>
          case 'diagram': return (
            <figure key={i} className="d-diagram">
              <pre>{b.x}</pre>
              {b.caption && <figcaption>{b.caption}</figcaption>}
            </figure>
          )
          case 'note': return (
            <aside key={i} className="d-note"><b>{b.title}</b><p>{b.x}</p></aside>
          )
        }
      })}
    </>
  )
}

export default function Docs() {
  const [active, setActive] = useState(DOC_SECTIONS[0].id)
  const [query, setQuery] = useState('')
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const prev = document.title
    document.title = 'EduTech Documentation – User Guide for School Management'
    window.scrollTo(0, 0)
    return () => { document.title = prev }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-90px 0px -65% 0px' },
    )
    DOC_SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const toc = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q ? DOC_SECTIONS.filter((s) => s.title.toLowerCase().includes(q) || s.group.toLowerCase().includes(q)) : DOC_SECTIONS
    const groups: { name: string; items: typeof DOC_SECTIONS }[] = []
    list.forEach((s) => {
      const g = groups[groups.length - 1]
      if (g && g.name === s.group) g.items.push(s)
      else groups.push({ name: s.group, items: [s] })
    })
    return groups
  }, [query])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenu(false)
  }

  return (
    <div className="docs">
      <header className="docs-nav">
        <div className="docs-nav-inner">
          <a href="/" className="logo"><LogoMark />EduTech <em>Docs</em></a>
          <div className="docs-nav-actions">
            <a className="btn btn-ghost" href="/">← Back to website</a>
            <a className="btn btn-primary" href={PDF_URL} download="EduTech-Documentation.pdf">⬇ Download PDF</a>
            <button className="menu-btn" aria-label="Contents" onClick={() => setMenu(!menu)}>☰</button>
          </div>
        </div>
      </header>

      <section className="docs-cover">
        <div className="docs-cover-inner">
          <span className="docs-badge">User Guide · 48 chapters</span>
          <h1>EduTech Documentation</h1>
          <p>Everything you need to set up, run and get the most from your school or university on EduTech — from the first login to report cards and results.</p>
          <div className="docs-cover-actions">
            <button className="btn btn-light btn-lg" onClick={() => go('s1')}>Start reading</button>
            <a className="btn btn-outline-light btn-lg" href={PDF_URL} download="EduTech-Documentation.pdf">⬇ Download PDF</a>
          </div>
          <div className="docs-cover-quick">
            {[['Setup procedure', 's39'], ['Academic calculations', 's19'], ['Teacher attendance (QR)', 's23'], ['Security', 's45']].map(([l, id]) => (
              <button key={id} onClick={() => go(id)}>{l} →</button>
            ))}
          </div>
        </div>
      </section>

      <div className="docs-layout">
        <aside className={`docs-toc${menu ? ' open' : ''}`}>
          <input className="docs-search" placeholder="Search chapters…" value={query} onChange={(e) => setQuery(e.target.value)} />
          <nav>
            {toc.map((g) => (
              <div key={g.name} className="toc-group">
                <div className="toc-group-name">{g.name}</div>
                {g.items.map((s) => (
                  <button key={s.id} className={s.id === active ? 'on' : ''} onClick={() => go(s.id)}>
                    <i>{s.n}</i>{s.title}
                  </button>
                ))}
              </div>
            ))}
            {toc.length === 0 && <p className="toc-empty">No chapter matches “{query}”.</p>}
          </nav>
        </aside>

        <main className="docs-content">
          <div className="print-cover">
            <div className="logo"><LogoMark />EduTech</div>
            <h1>EduTech Documentation</h1>
            <p>User Guide for schools and universities</p>
          </div>

          <div className="print-toc">
            <h2>Table of Contents</h2>
            {DOC_SECTIONS.map((s) => <div key={s.id}><span>{s.n}.</span> {s.title}</div>)}
          </div>

          {DOC_SECTIONS.map((s, i) => (
            <div key={s.id}>
              {(i === 0 || DOC_SECTIONS[i - 1].group !== s.group) && <div className="d-group">{s.group}</div>}
              <section id={s.id} className="d-section">
                <h2><span className="d-num">{s.n}</span>{s.title}</h2>
                <Blocks blocks={s.blocks} />
              </section>
            </div>
          ))}

          <div className="docs-cta">
            <h3>Ready to see EduTech in action?</h3>
            <p>Book a personalised demo and we’ll walk you through the platform.</p>
            <a
              className="btn btn-light btn-lg"
              href="/#demo"
            >
              Request a Demo
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}
