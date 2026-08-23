import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Sparkles,
  MessageCircle,
  Send,
  Code,
  Clock,
  ChevronDown,
} from 'lucide-react'

// ---------- Static product-demonstration data ----------
// This is demo content only. The public landing page must never read the
// real learner profile from LearnerContext. This constant is intentionally
// kept local to the landing page.
const LANDING_DEMO_DATA = {
  goal: 'Java Developer',
  progress: 42,
  skills: [
    { label: 'Java', value: 70 },
    { label: 'SQL', value: 55 },
    { label: 'Spring', value: 20 },
  ],
  path: [
    { name: 'Core Java', done: true },
    { name: 'OOP', done: true },
    { name: 'Collections', done: true },
    { name: 'SQL', done: false, current: true },
    { name: 'Spring Boot', done: false },
    { name: 'REST API', done: false },
  ],
}

// ---------- Motion helpers ----------
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

// ---------- Reusable section pieces ----------
function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

function Bar({ value, color = 'bg-brand-600', delay = 0 }) {
  return (
    <div className="w-full bg-surface-200 rounded-full h-2 overflow-hidden">
      <motion.div
        className={`${color} h-full rounded-full`}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      />
    </div>
  )
}

// ---------- Product preview (hero) ----------
function HeroPreview() {
  const demo = LANDING_DEMO_DATA
  return (
    <motion.div
      className="app-window p-5 animate-floaty"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* window bar */}
      <div className="flex items-center gap-1.5 mb-5">
        <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        <div className="ml-3 h-5 flex-1 max-w-[180px] rounded bg-surface-100" />
        <span className="text-2xs px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 font-medium">Preview</span>
      </div>

      {/* Goal */}
      <div className="mb-5">
        <div className="eyebrow text-ink-muted text-[10px] mb-1.5">Goal</div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{demo.goal}</span>
          <span className="text-2xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-medium">{demo.progress}% complete</span>
        </div>
        <div className="mt-2 w-full bg-surface-200 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="bg-brand-600 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${demo.progress}%` }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </div>
      </div>

      {/* Current skills */}
      <div className="mb-5">
        <div className="eyebrow text-ink-muted text-[10px] mb-2">Current Skills</div>
        <div className="space-y-2">
          {demo.skills.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-xs w-12 text-ink-secondary">{s.label}</span>
              <div className="flex-1 bg-surface-100 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-teal-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
              </div>
              <span className="text-xs text-ink-secondary w-8 text-right">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended path */}
      <div>
        <div className="eyebrow text-ink-muted text-[10px] mb-2">Recommended Path</div>
        <div className="space-y-1">
          {demo.path.map((step, i) => (
            <div key={step.name} className="flex items-center gap-2">
              {i > 0 && <div className="w-px h-3 bg-surface-200 ml-[7px]" />}
              <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                step.done ? 'border-success' : step.current ? 'border-brand-500' : 'border-surface-300'
              }`}>
                {step.done ? (
                  <Check className="w-2 h-2 text-success" />
                ) : step.current ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                ) : null}
              </div>
              <span className={`text-xs ${step.done ? 'text-ink font-medium' : step.current ? 'text-brand-700 font-medium' : 'text-ink-tertiary'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ---------- Learning DNA radar ----------
function Radar({ data, dark = false }) {
  const size = 260
  const cx = size / 2
  const cy = size / 2
  const radius = 95
  const labels = ['Problem Solving', 'Practical', 'Consistency', 'Curiosity', 'Visual', 'Theory']
  const values = data
  const n = labels.length
  const angleStep = (2 * Math.PI) / n
  const gridColor = dark ? 'rgba(247,247,244,0.14)' : '#E8E8E2'
  const labelColor = dark ? 'rgba(247,247,244,0.7)' : '#646B73'

  const point = (i, v) => {
    const angle = angleStep * i - Math.PI / 2
    const r = (v / 100) * radius
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const dataPts = values.map((v, i) => point(i, v)).map(p => `${p.x},${p.y}`).join(' ')

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[25, 50, 75, 100].map(pct => {
        const pts = Array.from({ length: n }, (_, i) => point(i, pct))
        return (
          <motion.polygon
            key={pct}
            points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={gridColor}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          />
        )
      })}
      {labels.map((_, i) => {
        const p1 = point(i, 0)
        const p2 = point(i, 100)
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={gridColor} strokeWidth="1" />
      })}
      <motion.polygon
        points={dataPts}
        fill={dark ? 'rgba(20,184,166,0.12)' : 'rgba(37,99,235,0.12)'}
        stroke={dark ? '#14b8a6' : '#2563eb'}
        strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        style={{ transformOrigin: 'center' }}
      />
      {labels.map((label, i) => {
        const p = point(i, 115)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="9.5" fill={labelColor} fontWeight="500">{label}</text>
        )
      })}
    </motion.svg>
  )
}

// ---------- AI Tutor preview ----------
function TutorPreview() {
  return (
    <div className="app-window dark:bg-transparent overflow-hidden flex flex-col max-w-md w-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-surface-200">
        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="text-xs font-semibold">PathForge Tutor</div>
        <span className="ml-auto text-2xs text-teal-600 font-medium">● online</span>
      </div>
      <div className="flex-1 px-4 py-4 space-y-3 bg-surface-50">
        <div className="flex justify-end">
          <div className="max-w-[80%] bg-brand-600 text-white text-xs rounded-xl rounded-br-sm px-3 py-2">
            Explain Spring dependency injection simply.
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <div className="max-w-[85%] bg-white border border-surface-200 text-ink text-xs rounded-xl rounded-tl-sm px-3 py-2 leading-relaxed">
            Think of dependency injection like ordering food instead of cooking every ingredient
            yourself — you just declare what you need, and the framework serves it.
          </div>
        </div>
      </div>
      <div className="px-3 py-2.5 border-t border-surface-200 flex gap-1.5 overflow-hidden">
        {['Explain simply', 'Give example', 'Quiz me'].map((a) => (
          <span key={a} className="text-2xs px-2.5 py-1 rounded-full bg-surface-100 text-ink-secondary flex-shrink-0">
            {a}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------- Main ----------
export default function Landing() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.02], [0, -6])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const howSteps = [
    { n: '01', title: 'Tell us where you want to go.', desc: 'Pick your target role — we build everything around it.' },
    { n: '02', title: 'We understand what you already know.', desc: 'A quick skill map establishes your starting point.' },
    { n: '03', title: 'PathForge finds the gaps.', desc: 'We compare where you are to where you need to be.' },
    { n: '04', title: 'Your path adapts as you progress.', desc: 'Assessments reshape the roadmap as you learn.' },
  ]

  const projects = [
    {
      name: 'Student Management API', diff: 'Beginner', time: '4–6 hours',
      stack: ['Java', 'Spring Boot', 'MySQL'], desc: 'A CRUD API for managing student records.',
    },
    {
      name: 'Task Tracker API', diff: 'Intermediate', time: '8–10 hours',
      stack: ['Spring Boot', 'REST', 'PostgreSQL'], desc: 'A RESTful service for tasks and priorities.',
    },
    {
      name: 'E-Commerce Backend', diff: 'Advanced', time: '15–20 hours',
      stack: ['Spring Boot', 'JWT', 'PostgreSQL'], desc: 'Full auth + orders backend API.',
    },
  ]

  const journey = [
    { n: '01', t: 'Understand' },
    { n: '02', t: 'Analyze' },
    { n: '03', t: 'Learn' },
    { n: '04', t: 'Practice' },
    { n: '05', t: 'Adapt' },
    { n: '06', t: 'Master' },
  ]

  return (
    <div className="bg-surface-50 text-ink overflow-x-hidden">
      {/* ===== Header ===== */}
      <motion.header
        style={{ y: headerY }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/85 backdrop-blur-md border-b border-surface-200 py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-semibold text-sm">PathForge</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {['Features', 'How It Works', 'Roadmap', 'Projects'].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`}
                className="text-[13px] text-ink-secondary hover:text-ink transition-colors">{l}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/signin" className="text-[13px] font-medium text-ink-secondary hover:text-ink hidden sm:block">Sign In</Link>
            <Link to="/signup" className="bg-brand-600 text-white text-[13px] font-medium px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ===== HERO ===== */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
              <span className="eyebrow text-[11px] text-ink-tertiary">AI-Powered Personal Learning</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl xl:text-[4.4rem] font-bold leading-[1.04] tracking-[-0.03em] mb-6">
              {['YOUR SKILLS.', 'YOUR GOAL.'].map((line, i) => (
                <motion.span key={i} className="block"
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}>
                  {line}
                </motion.span>
              ))}
              <motion.span
                className="block text-brand-600"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
              >
                YOUR PATH.
              </motion.span>
            </h1>

            <motion.p
              className="text-base md:text-lg text-ink-secondary leading-relaxed max-w-md mb-8"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              PathForge builds a learning journey around what you already know, where you want to go,
              and how you learn best.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
            >
              <Link to="/signup" className="bg-brand-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-brand-700 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
                Build My Learning Path <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/onboarding?demo=true" className="bg-white border border-surface-300 text-ink text-sm font-medium px-6 py-3 rounded-lg hover:border-brand-500 hover:text-brand-700 transition-all">
                Explore Demo
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 gap-4 max-w-md"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.74 }}
            >
              {[
                { v: '10+', l: 'Career paths' },
                { v: '50+', l: 'Skills tracked' },
                { v: '100+', l: 'Resources' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-lg font-bold text-ink">{s.v}</div>
                  <div className="text-xs text-ink-tertiary">{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Product preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-100 via-transparent to-teal-100 rounded-3xl -z-10" />
            <HeroPreview />
          </div>
        </div>
      </section>

      {/* ===== Trust ===== */}
      <section className="py-12 px-6 border-y border-surface-200 bg-white">
        <div className="container-x">
          <p className="eyebrow text-[11px] text-ink-muted text-center mb-6">Built for the next generation of learners</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {['Students', 'Developers', 'Career Switchers', 'Placement Aspirants'].map((g) => (
              <div key={g} className="flex items-center gap-2 text-sm font-medium text-ink-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> {g}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (light) ===== */}
      <section id="how-it-works" className="section-pad">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-brand-600 mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] max-w-lg mb-16">
              LEARNING SHOULD START<br />WHERE YOU ARE.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {howSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="flex gap-6 items-start border-l-2 border-surface-200 pl-6 py-2">
                  <span className="text-4xl font-bold text-brand-600/20">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-ink-secondary leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEARNING DNA (dark) ===== */}
      <section id="learning-dna" className="dark-section section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="eyebrow text-teal-500 mb-4">Learning DNA</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              WE DON'T JUST KNOW WHAT YOU WANT TO LEARN.
            </h2>
            <p className="text-2xl font-semibold text-teal-400 leading-snug mb-8">We learn how you learn.</p>
            <div className="space-y-3 text-sm text-[rgba(247,247,244,0.7)]">
              {['Hands-on learner', 'Steady pace', 'Strong problem solver', 'Prefers practical projects'].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500" /> {p}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex justify-center">
              <Radar data={[85, 90, 70, 80, 75, 55]} dark />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== SKILL GAP (light) ===== */}
      <section id="features" className="section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="eyebrow text-brand-600 mb-4">Skill gap</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-8">
              SEE WHAT'S BETWEEN YOU AND YOUR GOAL.
            </h2>
            <Link to="/skill-gap" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors">
              See My Skill Gaps <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="app-window p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="eyebrow text-ink-muted text-[10px] mb-3">Current</div>
                  <div className="space-y-3">
                    {[['Java', 70], ['SQL', 55], ['Spring', 20]].map(([l, v]) => (
                      <div key={l}>
                        <div className="flex justify-between text-xs mb-1"><span>{l}</span><span className="text-ink-secondary">{v}%</span></div>
                        <Bar value={v} color="bg-teal-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="eyebrow text-ink-muted text-[10px] mb-3">Required</div>
                  <div className="space-y-3">
                    {[['Java', 90], ['SQL', 80], ['Spring', 85]].map(([l, v]) => (
                      <div key={l}>
                        <div className="flex justify-between text-xs mb-1"><span>{l}</span><span className="text-ink-secondary">{v}%</span></div>
                        <Bar value={v} color="bg-brand-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-5 border-t border-surface-200">
                <div className="text-2xs text-ink-muted mb-1">YOUR BIGGEST GAP</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold">Spring Boot</span>
                  <span className="text-sm font-semibold text-warning">65% gap</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ROADMAP (dark) ===== */}
      <section id="roadmap" className="dark-section section-pad">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-teal-500 mb-4">Roadmap</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] max-w-xl mb-16">
              NOT ANOTHER COURSE LIST. A PATH.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-7 items-center gap-y-4 md:gap-x-2 mb-4">
              {['Java Basics', 'OOP', 'Collections', 'SQL', 'Spring Boot', 'REST API', 'System Design'].map((step, i) => (
                <div key={step} className="flex flex-col items-center text-center relative">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-semibold mb-2 ${
                    i < 3 ? 'border-success text-success' : i === 3 ? 'border-brand-500 text-brand-500' : 'border-[rgba(247,247,244,0.2)] text-[rgba(247,247,244,0.4)]'
                  }`}>
                    {i < 3 ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <div className={`text-xs font-medium ${i < 3 ? 'text-white' : i === 3 ? 'text-brand-400' : 'text-[rgba(247,247,244,0.4)]'}`}>{step}</div>
                </div>
              ))}
            </div>
            <div className="hidden md:block relative h-px bg-[rgba(247,247,244,0.15)] -mt-2 mb-2">
              <motion.div className="absolute top-0 left-0 h-px bg-teal-500" initial={{ width: 0 }}
                whileInView={{ width: '57%' }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <Link to="/roadmap" className="inline-flex items-center gap-2 border border-teal-500/40 text-teal-400 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-teal-500/10 transition-colors">
                View My Roadmap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== ADAPTIVE PATH (light) ===== */}
      <section className="section-pad bg-white">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-brand-600 mb-4">Adaptive learning</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] max-w-xl mb-6">
              YOUR PATH CHANGES WITH YOU.
            </h2>
            <p className="text-sm text-ink-secondary max-w-md mb-14">
              Your roadmap changed because your latest assessment revealed a gap in networking.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <Reveal>
              <div className="app-window p-5">
                <div className="eyebrow text-ink-muted text-[10px] mb-4">Before</div>
                <div className="space-y-2">
                  {['AWS', 'Docker', 'Kubernetes'].map((s) => (
                    <div key={s} className="text-sm py-2 px-3 rounded-lg bg-surface-100 text-ink-secondary">{s}</div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 border border-warning/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-warning">42%</span>
                </div>
                <div className="text-xs text-ink-secondary text-center max-w-[160px] leading-relaxed">
                  Assessment revealed a weakness in <span className="font-semibold text-ink">Networking</span>
                </div>
                <ChevronDown className="w-5 h-5 text-ink-muted" />
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="app-window p-5 border-teal-300">
                <div className="eyebrow text-teal-600 text-[10px] mb-4">Adapted path</div>
                <div className="space-y-1.5">
                  {['Networking Fundamentals', 'AWS VPC', 'AWS', 'Docker', 'Kubernetes'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      {i === 0 && <span className="text-2xs px-1.5 py-0.5 rounded bg-teal-500 text-white font-medium">new</span>}
                      <div className={`text-sm flex-1 py-2 px-3 rounded-lg ${i === 0 ? 'bg-teal-50 text-teal-700 font-medium' : 'bg-surface-100 text-ink-secondary'}`}>
                        {s}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== AI TUTOR (dark) ===== */}
      <section className="dark-section section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="eyebrow text-purple-500 mb-4">AI Tutor</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-6">
              WHEN YOU GET STUCK, ASK.
            </h2>
            <p className="text-sm text-[rgba(247,247,244,0.7)] max-w-sm mb-8 leading-relaxed">
              A tutor that knows exactly where you are in your path — and meets you there.
            </p>
            <Link to="/ai-tutor" className="inline-flex items-center gap-2 bg-purple-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-purple-600 transition-colors">
              Ask a Question <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <TutorPreview />
          </Reveal>
        </div>
      </section>

      {/* ===== BUILD TO LEARN (light) ===== */}
      <section id="projects" className="section-pad">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-brand-600 mb-4">Build to learn</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-16">
              DON'T JUST WATCH. BUILD.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <Link to="/projects" className="block app-window p-6 h-full hover:-translate-y-1 transition-transform duration-200 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-50 flex items-center justify-center">
                      <Code className="w-4 h-4 text-brand-600" />
                    </div>
                    <span className="text-2xs px-2 py-0.5 rounded-full bg-surface-100 text-ink-secondary font-medium">{p.diff}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1.5 group-hover:text-brand-700 transition-colors">{p.name}</h3>
                  <p className="text-xs text-ink-secondary mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.stack.map((s) => (
                      <span key={s} className="text-2xs px-2 py-0.5 rounded bg-surface-100 text-ink-secondary">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-ink-tertiary">
                    <Clock className="w-3.5 h-3.5" /> {p.time}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAREER READINESS (dark) ===== */}
      <section className="dark-section section-pad">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="eyebrow text-teal-500 mb-4">Career readiness</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-8">
              KNOW HOW CLOSE YOU ARE.
            </h2>
            <div className="relative w-44 h-44 mb-8">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(247,247,244,0.15)" strokeWidth="9" />
                <motion.circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="#14b8a6" strokeWidth="9" strokeLinecap="round"
                  strokeDasharray="314" initial={{ strokeDashoffset: 314 }}
                  whileInView={{ strokeDashoffset: 314 * (1 - 0.65) }}
                  viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">65%</span>
                <span className="text-[11px] text-[rgba(247,247,244,0.6)]">readiness</span>
              </div>
            </div>
            <Link to="/career-readiness" className="inline-flex items-center gap-2 border border-teal-500/40 text-teal-400 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-teal-500/10 transition-colors">
              View My Path <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="app-window p-6">
              <div className="text-xs font-semibold text-ink mb-4">Java Developer</div>
              <div className="space-y-2.5">
                {[
                  ['Core Java', true], ['Data Structures', true], ['SQL', true],
                  ['Spring Boot', false], ['REST API', false], ['System Design', false],
                ].map(([skill, done]) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      done ? 'border-success' : 'border-surface-300'
                    }`}>
                      {done && <Check className="w-3 h-3 text-success" />}
                    </div>
                    <span className={`text-sm ${done ? 'text-ink font-medium' : 'text-ink-tertiary'}`}>{skill}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-surface-200">
                <div className="text-2xs text-ink-muted mb-1">NEXT BEST STEP</div>
                <div className="text-sm font-medium">Complete Spring Boot and REST API development.</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== HORIZONTAL JOURNEY ===== */}
      <section className="py-20 md:py-28 px-6 overflow-hidden bg-white">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow text-brand-600 mb-4">Your journey</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-12">SIX MOVES TO MASTERY.</h2>
          </Reveal>
        </div>
        <motion.div
          className="flex gap-6 md:gap-10"
          initial={{ x: 0 }}
          whileInView={{ x: [0, -220] }}
          viewport={{ once: false }}
          transition={{ duration: 12, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...journey, ...journey].map((s, i) => (
            <div key={i} className="flex-shrink-0 w-56 border border-surface-200 rounded-2xl p-6 bg-surface-50">
              <span className="text-4xl font-bold text-brand-600/25">{s.n}</span>
              <div className="mt-3 text-lg font-semibold">{s.t}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-pad dark-section">
        <div className="container-x text-center max-w-2xl">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-[-0.02em] mb-5">
              YOUR NEXT STEP STARTS HERE.
            </h2>
            <p className="text-base text-[rgba(247,247,244,0.7)] mb-10">
              Stop guessing what to learn next. Let your progress decide.
            </p>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-7 py-3.5 rounded-lg hover:bg-brand-700 hover:-translate-y-0.5 transition-all">
              Build My Learning Path <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-8 px-6 bg-dark-950 text-[rgba(247,247,244,0.5)]">
        <div className="container-x flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xs">P</span>
            </div>
            <span className="font-medium text-[rgba(247,247,244,0.8)]">PathForge</span>
          </div>


        </div>
      </footer>
    </div>
  )
}
