'use client'

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  Menu,
  Moon,
  Phone,
  Plus,
  Sun,
  X,
} from 'lucide-react'
import { experience, profile, skillGroups } from '@/data/profile'
import { kindLabels, projects, type Project, type ProjectKind } from '@/data/projects'

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

function figmaEmbed(url: string) {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
  }
  return { theme, toggle }
}

function ProjectCover({ project }: { project: Project }) {
  if (project.image) return <img className="cover-img" src={project.image} alt="" loading="lazy" />
  return (
    <div className={`cover-art art-${project.kind}`} aria-hidden="true">
      {project.kind === 'figma' && <><span className="f-frame f1" /><span className="f-frame f2" /><span className="f-frame f3" /><span className="f-cursor" /></>}
      {project.kind === 'web' && <div className="w-window"><div className="w-bar"><i /><i /><i /></div><div className="w-body"><span /><span /><span /></div></div>}
      {project.kind === 'docs' && <><span className="d-node n1" /><span className="d-node n2" /><span className="d-node n3" /><span className="d-link l1" /><span className="d-link l2" /></>}
    </div>
  )
}

export function Portfolio() {
  const [filter, setFilter] = useState<'all' | ProjectKind>('all')
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<Project | null>(null)
  const [openExp, setOpenExp] = useState(0)
  const [toast, setToast] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const { theme, toggle } = useTheme()
  useReveal()

  const kinds = useMemo(() => {
    const present = Array.from(new Set(projects.map((p) => p.kind)))
    return present.map((k) => ({ key: k, label: kindLabels[k], count: projects.filter((p) => p.kind === k).length }))
  }, [])
  const visible = filter === 'all' ? projects : projects.filter((p) => p.kind === filter)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (active && !d.open) d.showModal()
    if (!active && d.open) d.close()
  }, [active])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(t)
  }, [toast])

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setToast(`${label} copied`)
    } catch {
      setToast(`Couldn't copy — ${text}`)
    }
  }

  const tilt = (e: MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`)
  }
  const untilt = () => {
    photoRef.current?.style.setProperty('--rx', '0deg')
    photoRef.current?.style.setProperty('--ry', '0deg')
  }

  const spotlight = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <main className="shell">
      <a className="skip-link" href="#projects">Skip to projects</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label={`${profile.shortName}, back to top`}>
          <span className="wordmark-mark">{profile.initials}</span>
          <span>{profile.shortName}</span>
        </a>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Primary">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
          <a className="nav-cv" href={profile.cv} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>CV <ArrowUpRight aria-hidden="true" /></a>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" type="button" onClick={toggle} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}>
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <button className="icon-btn menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><span className="pulse" /> Looking for an {profile.seeking}</p>
          <h1>Kyla<br /><span className="h1-outline">Chua</span><span className="h1-dot">.</span></h1>
          <p className="hero-lede">
            Fourth-year IT student majoring in <mark>Web Development</mark> at Sorsogon State University. I build web apps, design in Figma, and like
            digging into requirements, workflows, and testing to make sure things work the way people need them to.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">See my projects <ArrowUpRight aria-hidden="true" /></a>
            <a className="btn btn-ghost" href={profile.cv} download>Download CV <Download aria-hidden="true" /></a>
          </div>
        </div>

        <div className="hero-photo" ref={photoRef} onMouseMove={tilt} onMouseLeave={untilt}>
          <div className="photo-frame">
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} width={460} height={460} />
          </div>
          <svg className="badge" viewBox="0 0 120 120" aria-hidden="true">
            <defs><path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
            <circle cx="60" cy="60" r="58" />
            <text><textPath href="#badge-circle">BUSINESS ANALYSIS ✦ QUALITY ASSURANCE ✦ </textPath></text>
          </svg>
          <span className="sticker sticker-a">BSIT ’27</span>
          <span className="sticker sticker-b">Bulan, Sorsogon</span>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-head reveal">
          <p className="label">01 — My projects</p>
          <h2>Things I&apos;ve <em>designed</em> &amp; <em className="alt">built</em>.</h2>
        </div>

        <div className="filters reveal" role="group" aria-label="Filter projects">
          <button type="button" className={filter === 'all' ? 'chip active' : 'chip'} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
            All <sup>{projects.length}</sup>
          </button>
          {kinds.map((k) => (
            <button key={k.key} type="button" className={`chip chip-${k.key}${filter === k.key ? ' active' : ''}`} aria-pressed={filter === k.key} onClick={() => setFilter(k.key)}>
              {k.label} <sup>{k.count}</sup>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visible.map((p) => (
            <article key={p.title} className={`project kind-${p.kind}`} onMouseMove={spotlight}>
              <button type="button" className="project-hit" onClick={() => setActive(p)} aria-label={`Open ${p.title}`} />
              <div className="project-cover"><ProjectCover project={p} /></div>
              <div className="project-body">
                <div className="project-meta">
                  <span className={`kind-pill pill-${p.kind}`}>{kindLabels[p.kind]}</span>
                  {p.status && <span className="status">{p.status}</span>}
                  {p.year && <span className="year">{p.year}</span>}
                </div>
                <h3>{p.title}</h3>
                <p>{p.summary}</p>
                {p.tags && <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
                <div className="project-links">
                  {p.figma && <a href={p.figma} target="_blank" rel="noopener noreferrer">Figma <ArrowUpRight aria-hidden="true" /></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live site <ArrowUpRight aria-hidden="true" /></a>}
                  {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer">Code <ArrowUpRight aria-hidden="true" /></a>}
                </div>
              </div>
            </article>
          ))}
          <a className="project project-more" href={profile.github} target="_blank" rel="noopener noreferrer">
            <Plus aria-hidden="true" />
            <span>More on GitHub</span>
            <small>github.com/{profile.githubHandle}</small>
          </a>
        </div>
      </section>

      <section className="section" id="experience">
        <div className="section-head reveal">
          <p className="label">02 — Experience</p>
          <h2>Academic projects &amp; <em>hands-on</em> work.</h2>
        </div>
        <ol className="exp-list reveal">
          {experience.map((x, i) => {
            const open = openExp === i
            return (
              <li key={x.title} className={open ? 'exp open' : 'exp'}>
                <button type="button" className="exp-head" aria-expanded={open} onClick={() => setOpenExp(open ? -1 : i)}>
                  <span className="exp-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="exp-title">{x.title}</span>
                  <span className="exp-kind">{x.kind}{x.status && <b> · {x.status}</b>}</span>
                  <Plus className="exp-icon" aria-hidden="true" />
                </button>
                <div className="exp-panel"><ul>{x.points.map((pt) => <li key={pt}>{pt}</li>)}</ul></div>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="section" id="skills">
        <div className="section-head reveal">
          <p className="label">03 — Skills &amp; tools</p>
          <h2>What I <em>work</em> with.</h2>
        </div>
        <div className="skills">
          {skillGroups.map((g) => (
            <div key={g.label} className="skill-group reveal">
              <h3>{g.label}</h3>
              <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="edu reveal">
          <p className="label">Education</p>
          <div>
            <h3>{profile.school}</h3>
            <p>{profile.degree} · {profile.graduation}</p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-inner reveal">
          <p className="label">04 — Contact</p>
          <h2>Have an OJT slot or a project in mind?</h2>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="contact-row">
            <button type="button" className="btn btn-light" onClick={() => copy(profile.email, 'Email')}><Copy aria-hidden="true" /> Copy email</button>
            <a className="btn btn-light" href={profile.phoneHref}><Phone aria-hidden="true" /> {profile.phoneDisplay}</a>
            <a className="btn btn-light" href={profile.github} target="_blank" rel="noopener noreferrer"><GitBranch aria-hidden="true" /> GitHub</a>
            <a className="btn btn-light" href={profile.cv} target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /> View CV</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
        <a href="#top">Back to top ↑</a>
      </footer>

      <dialog
        ref={dialogRef}
        className={active ? `modal kind-${active.kind}` : 'modal'}
        onClose={() => setActive(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setActive(null) }}
        aria-labelledby="modal-title"
      >
        {active && (
          <div className="modal-card">
            <div className="modal-top">
              <div>
                <span className={`kind-pill pill-${active.kind}`}>{kindLabels[active.kind]}</span>
                <h3 id="modal-title">{active.title}</h3>
              </div>
              <button type="button" className="icon-btn" onClick={() => setActive(null)} aria-label="Close"><X aria-hidden="true" /></button>
            </div>
            <div className="modal-media">
              {active.figma
                ? <iframe src={figmaEmbed(active.figma)} title={`${active.title} Figma preview`} allowFullScreen loading="lazy" />
                : <ProjectCover project={active} />}
            </div>
            <p className="modal-summary">{active.summary}</p>
            {active.tags && <ul className="tags">{active.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
            <div className="modal-links">
              {active.figma && <a className="btn btn-primary" href={active.figma} target="_blank" rel="noopener noreferrer">Open in Figma <ArrowUpRight aria-hidden="true" /></a>}
              {active.live && <a className="btn btn-primary" href={active.live} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight aria-hidden="true" /></a>}
              {active.repo && <a className="btn btn-ghost" href={active.repo} target="_blank" rel="noopener noreferrer">View code <GitBranch aria-hidden="true" /></a>}
              {!active.figma && !active.live && !active.repo && <span className="muted">Links coming soon.</span>}
            </div>
          </div>
        )}
      </dialog>

      <div className={toast ? 'toast show' : 'toast'} role="status" aria-live="polite">{toast && <><Check aria-hidden="true" /> {toast}</>}</div>
    </main>
  )
}
