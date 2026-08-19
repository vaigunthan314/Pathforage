import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useActiveProfile } from '../hooks/useActiveProfile'
import {
  computeProgressStats, computeSkillGaps, computeCareerReadiness,
  getWeeklyActivity, getLearningHours, getUpcomingMilestones, getRecentActivity,
  getSkillsMastered, formatHours,
} from '../services/derivedData'
import { getResourceByName } from '../data/contentResolver'
import {
  Clock, CheckCircle2, Award, Brain, BookOpen, ArrowRight,
  ChevronRight, Target, Sparkles, Map, Zap, BarChart3, Rocket, ListChecks,
} from 'lucide-react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] },
})

// Subtle metric count-up (150–500ms) used by the KPI cards.
function CountUp({ value, duration = 450 }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let raf
    const start = performance.now()
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <>{display}</>
}

const initialsOf = (name) => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return `${parts[0][0]}${parts[1] ? parts[1][0] : ''}`.toUpperCase()
}

const truncate = (text, len = 60) => {
  const t = (text || '').trim()
  return t.length > len ? `${t.slice(0, len).trimEnd()}…` : t
}

const SKILL_EMOJI = [
  ['machine learning', '🤖'], ['neural', '🤖'], ['ml ', '🤖'], [' ai', '🤖'], ['ai ', '🤖'],
  ['kubernetes', '☸️'], ['docker', '🐳'], ['container', '🐳'],
  ['linux', '🐧'], ['unix', '🐧'], ['bash', '🐧'], ['shell', '🐧'],
  ['network', '🌐'], ['networking', '🌐'], ['tcp', '🌐'], ['http', '🌐'],
  ['git', '🔗'], ['github', '🔗'], ['java', '☕'], ['python', '🐍'],
  ['sql', '🗄️'], ['mysql', '🗄️'], ['postgres', '🗄️'], ['database', '🗄️'],
  ['react', '⚛️'], ['node', '🟢'], ['javascript', '💛'], ['html', '🧱'], ['css', '🎨'],
  ['terraform', '🏗️'], ['aws', '☁️'], ['azure', '☁️'], ['gcp', '☁️'], ['cloud', '☁️'],
  ['security', '🔒'], ['spring', '🍃'], ['crypto', '🔐'], ['testing', '🧪'],
]

const skillEmoji = (name) => {
  const lower = (name || '').toLowerCase()
  const hit = SKILL_EMOJI.find(([key]) => lower.includes(key))
  return hit ? hit[1] : null
}

const levelLabel = (level) => (
  level < 30 ? 'Beginner' : level < 60 ? 'Intermediate' : level < 80 ? 'Advanced' : 'Expert'
)

// Data-driven one-liner under the greeting — only ever reflects actual profile
// data: latest assessment trend, biggest skill gap, or recent activity.
const buildInsight = ({ progress, skillGaps, viewTopics, assessmentResults }) => {
  const scored = (assessmentResults || []).filter(a => typeof a.score === 'number')
  if (scored.length >= 2) {
    const prev = scored[scored.length - 2].score
    const last = scored[scored.length - 1].score
    if (last > prev) {
      return `Nice progress — your latest assessment improved from ${prev}% to ${last}%. Keep it up!`
    }
  }
  const gaps = (skillGaps || []).filter(g => g.required > 0).sort((a, b) => b.gap - a.gap)
  const top = gaps[0]
  if (top && (progress?.topicsCompleted || 0) < (progress?.totalTopics || 0)) {
    return `${top.skill} is your biggest opportunity right now (${Math.round(top.gap)}% gap). Start bridging it today.`
  }
  if (viewTopics > 0) {
    return `You completed ${viewTopics} topic${viewTopics === 1 ? '' : 's'} in the last 7 days. Great momentum!`
  }
  if ((progress?.topicsCompleted || 0) > 0) {
    return `You've completed ${progress.topicsCompleted} topics so far. Keep learning, keep growing!`
  }
  return "You're doing great — keep learning, keep growing!"
}

function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl border border-surface-200 p-5 hover:shadow-card transition-shadow ${className}`}>
      {children}
    </div>
  )
}

function CardHeader({ title, icon: Icon, right }) {
  return (
    <div className="flex items-center justify-between mb-4 gap-3">
      <div className="flex items-center gap-2">
        {Icon ? <Icon className="w-4 h-4 text-ink-muted" /> : null}
        <div className="eyebrow text-[10px] text-ink-muted">{title}</div>
      </div>
      {right}
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="overflow-x-hidden" aria-busy="true" aria-label="Loading dashboard">
      <div className="bg-white border-b border-surface-200 px-6 md:px-10 pt-8 pb-6 space-y-3">
        <div className="h-7 w-56 bg-surface-200 rounded animate-pulse" />
        <div className="h-4 w-72 bg-surface-200 rounded animate-pulse" />
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {[0, 1, 2].map(i => (
              <div key={i} className="bg-white rounded-xl border border-surface-200 p-5 h-48 animate-pulse" />
            ))}
          </div>
          <div className="space-y-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl border border-surface-200 p-5 h-36 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardError({ onRetry }) {
  return (
    <div className="p-6 md:p-10">
      <div className="bg-white rounded-xl border border-surface-200 p-10 text-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-error text-xl font-bold">!</span>
        </div>
        <h2 className="text-base font-semibold text-ink mb-1">Unable to load your learning data.</h2>
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <Zap className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  )
}

function DashboardEmpty({ name }) {
  const navigate = useNavigate()
  return (
    <div className="page-enter overflow-x-hidden">
      <div className="p-6 md:p-10 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border border-surface-200 p-10 text-center max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-5">
            <Rocket className="w-7 h-7 text-brand-600" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">
            {name ? `Welcome, ${name}.` : 'Your learning path is ready to begin.'}
          </h2>
          <p className="text-sm text-ink-secondary leading-relaxed mb-6 max-w-sm mx-auto">
            Set your career goal to generate a personalized roadmap.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="bg-brand-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
          >
            Set My Goal
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { data, loading, error, loadProfile } = useActiveProfile()

  if (loading) return <DashboardSkeleton />
  if (error) return <DashboardError onRetry={loadProfile} />

  const roadmap = data?.roadmap || null
  if (!roadmap && !data?.careerGoal) {
    return <DashboardEmpty name={data?.name || currentUser?.name} />
  }

  const progress = computeProgressStats(data)
  const skillGaps = computeSkillGaps(data)
  const readiness = computeCareerReadiness(data)
  const phases = roadmap?.phases || []
  const allItems = phases.flatMap(p => p.items) || []
  const completedCount = allItems.filter(i => i.status === 'completed').length
  const currentTopic = allItems.find(i => i.status === 'in-progress') || allItems.find(i => i.status === 'available')
  const allDone = allItems.length > 0 && completedCount === allItems.length
  const weeklyActivityData = getWeeklyActivity(data)
  const { total: totalHours, thisWeek: weekHours } = getLearningHours(data)
  const milestones = getUpcomingMilestones(data)
  const recentActivity = getRecentActivity(data)

  const displayName = data?.name || currentUser?.name || (currentUser?.email ? currentUser.email.split('@')[0] : '')
  const avatar = data?.avatar || currentUser?.avatar || ''
  const goal = data?.careerGoal || roadmap?.title || ''
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const learnLink = (item) => `/learn/${item.id}?name=${encodeURIComponent(item.name)}`
  const goLearn = (item) => navigate(learnLink(item), { state: { from: '/dashboard' } })

  const topStrength = skillGaps
    .filter(g => g.required > 0)
    .sort((a, b) => (b.current / b.required) - (a.current / a.required))[0]
  const topGap = [...skillGaps].sort((a, b) => b.gap - a.gap)[0]

  const viewEntries = weeklyActivityData
  const maxHours = Math.max(1, ...viewEntries.map(e => e.hours || 0))
  const viewTotalHours = viewEntries.reduce((sum, e) => sum + (e.hours || 0), 0)
  const viewTopics = viewEntries.reduce((sum, e) => sum + (e.topics || 0), 0)

  const insightLine = buildInsight({ progress, skillGaps, viewTopics, assessmentResults: data?.assessmentResults || [] })

  const currentPhase = currentTopic
    ? phases.find(p => p.items.some(i => i.id === currentTopic.id))
    : phases[0]
  const ps = currentPhase
    ? { done: currentPhase.items.filter(i => i.status === 'completed').length, total: currentPhase.items.length, pct: currentPhase.items.length ? Math.round((currentPhase.items.filter(i => i.status === 'completed').length / currentPhase.items.length) * 100) : 0 }
    : { done: 0, total: 0, pct: 0 }

  const phasePreview = currentPhase ? {
    completed: currentPhase.items.filter(i => i.status === 'completed'),
    current: currentPhase.items.find(i => i.status === 'in-progress'),
    upcoming: currentPhase.items.filter(i => i.status !== 'completed' && i.id !== currentPhase.items.find(j => j.status === 'in-progress')?.id).slice(0, 3),
  } : null

  return (
    <div className="page-enter overflow-x-hidden">
      <div className="bg-white border-b border-surface-200 px-6 md:px-10 pt-8 pb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <h1 className="text-2xl font-bold text-ink">{greeting}, {displayName}!</h1>
            <p className="text-sm text-ink-secondary mt-1">{insightLine}</p>
          </motion.div>
          <div className="flex items-center gap-2.5 pl-2.5 border-l border-surface-200">
            {avatar ? (
              <img src={avatar} alt="" className="w-9 h-9 rounded-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
            ) : null}
            <div className={`w-9 h-9 rounded-full bg-brand-100 items-center justify-center ${avatar ? 'hidden' : 'flex'}`}>
              <span className="text-xs font-semibold text-brand-700">{initialsOf(displayName)}</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-ink leading-tight">{displayName}</div>
              <div className="text-2xs text-ink-secondary">{goal || 'Learner'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Weekly/Monthly Activity */}
            <motion.div {...fade(0.03)}>
              <Card>
                <CardHeader
                  title="Learning Activity"
                  icon={BarChart3}
                  right={
                    <div className="text-2xs text-ink-tertiary">
                      Last 7 days
                    </div>
                  }
                />
                {viewEntries.some(e => e.hasActivity) ? (
                  <>
                    <div className="flex items-end gap-1.5 h-36">
                      {viewEntries.map((d, i) => {
                        const hasMinutes = (d.hours || 0) > 0 || (d.topics || 0) > 0
                        const barHeight = hasMinutes ? Math.min(100, ((d.hours || 0) / maxHours) * 100) : (d.assessments > 0 ? 18 : 0)
                        return (
                          <div key={d.date} className="flex-1 min-w-0 flex flex-col items-center gap-1.5 h-full group" title={`${d.label}, ${d.dateLabel}${d.hasActivity ? ` — ${formatHours(d.hours)} learned${d.topics ? `, ${d.topics} topic${d.topics === 1 ? '' : 's'} completed` : ''}${d.assessments ? `, ${d.assessments} assessment${d.assessments === 1 ? '' : 's'}` : ''}` : ' — no activity'}`}>
                            <div className="flex-1 w-full flex items-end justify-center">
                              <div className="w-full max-w-[30px] h-[104px] bg-surface-100 rounded-md flex items-end overflow-hidden">
                                <motion.div
                                  className={`w-full rounded-t-md ${hasMinutes ? 'bg-brand-500 group-hover:bg-brand-600 transition-colors' : d.assessments > 0 ? 'bg-amber-400' : 'bg-transparent'}`}
                                  initial={{ height: 0 }}
                                  whileInView={{ height: `${barHeight}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.24), ease: [0.16, 1, 0.3, 1] }}
                                />
                              </div>
                            </div>
                            <span className="text-2xs text-ink-tertiary max-w-full truncate">{d.label}</span>
                          </div>
                        )
                      })}
                    </div>
                    <div className="mt-3 text-2xs text-ink-tertiary">
                      {formatHours(viewTotalHours)} learned · {viewTopics} topic{viewTopics === 1 ? '' : 's'} completed in the last 7 days
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <BarChart3 className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                    <p className="text-sm text-ink-secondary mb-4">
                      {totalHours > 0 || progress.topicsCompleted > 0 || progress.assessmentsTaken > 0
                        ? 'No activity in the last 7 days — pick it back up!'
                        : 'No learning activity yet'}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate(currentTopic ? learnLink(currentTopic) : '/roadmap')}
                      className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      {totalHours > 0 || progress.topicsCompleted > 0 ? 'Continue Learning' : 'Start First Lesson'} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Skills Overview */}
            <motion.div {...fade(0.06)}>
              <Card>
                <CardHeader title="Skills Overview" icon={Award} />
                {skillGaps.length > 0 ? (
                  <div className="space-y-3.5">
                    {skillGaps.slice(0, 6).map(g => {
                      const emoji = skillEmoji(g.skill)
                      return (
                        <button
                          key={g.skill}
                          type="button"
                          onClick={() => navigate('/skill-gap')}
                          className="w-full text-left group"
                        >
                          <div className="flex items-center gap-2.5 mb-1">
                            <span className="text-base w-5 flex-shrink-0">
                              {emoji ? emoji : <Target className="w-4 h-4 text-ink-muted mt-0.5" />}
                            </span>
                            <span className="text-sm font-medium text-ink group-hover:text-brand-700 transition-colors truncate flex-1">
                              {g.skill}
                            </span>
                            <span className="text-2xs font-medium px-2 py-0.5 rounded-full bg-surface-100 text-ink-secondary flex-shrink-0">
                              {levelLabel(g.current)}
                            </span>
                            <span className="text-2xs text-ink-secondary font-medium w-9 text-right">{g.current}%</span>
                          </div>
                          <div className="w-full bg-surface-200 rounded-full h-1.5 overflow-hidden">
                            <motion.div
                              className="bg-brand-600 h-1.5 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${Math.min(100, g.current)}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <Target className="w-8 h-8 text-ink-muted mx-auto mb-3" />
                    <p className="text-sm text-ink-secondary mb-4">Set a career goal to see your skill gaps.</p>
                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="bg-brand-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                    >
                      Set My Goal
                    </button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Roadmap Preview */}
            {phasePreview && (
              <motion.div {...fade(0.09)}>
                <Card>
                  <CardHeader title="Roadmap Preview" icon={Map} />
                  <div className="text-sm font-semibold text-ink mb-0.5">{currentPhase?.name}</div>
                  <div className="text-2xs text-ink-tertiary mb-4">{ps.done} / {ps.total} topics completed</div>
                  <div className="space-y-2">
                    {phasePreview.completed.map(i => (
                      <div key={i.id} className="flex items-center gap-2 text-sm text-ink-secondary">
                        <span className="text-success w-4 flex-shrink-0">✓</span>
                        <span className="truncate">{i.name}</span>
                      </div>
                    ))}
                    {phasePreview.current && (
                      <div className="flex items-center gap-2 text-sm font-medium text-brand-600">
                        <span className="w-4 flex-shrink-0">→</span>
                        <span className="truncate">{phasePreview.current.name}</span>
                      </div>
                    )}
                    {phasePreview.upcoming.map(i => (
                      <div key={i.id} className="flex items-center gap-2 text-sm text-ink-secondary">
                        <span className="text-ink-tertiary w-4 flex-shrink-0">○</span>
                        <span className="truncate">{i.name}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/roadmap')}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                  >
                    View Full Roadmap <ArrowRight className="w-3 h-3" />
                  </button>
                </Card>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Stat Cards Row */}
            <motion.div {...fade(0.03)} className="grid grid-cols-2 gap-4">
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-ink-secondary">Learning Time</span>
                  <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-ink">{formatHours(<CountUp value={totalHours} />)}</div>
                {weekHours > 0 && (
                  <div className="text-2xs text-ink-tertiary mt-2">{formatHours(weekHours)} this week</div>
                )}
              </Card>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-ink-secondary">Courses Done</span>
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-ink"><CountUp value={progress.topicsCompleted} /></div>
                <div className="text-2xs text-ink-tertiary mt-2">of {progress.totalTopics} topics</div>
              </Card>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-ink-secondary">Skills Mastered</span>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-warning" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-ink"><CountUp value={getSkillsMastered(data)} /></div>
                {skillGaps.length > 0 && (
                  <div className="text-2xs text-ink-tertiary mt-2">of {skillGaps.length} required</div>
                )}
              </Card>
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-ink-secondary">Assessment Avg</span>
                  <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
                    <Brain className="w-3.5 h-3.5 text-violet-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-ink">
                  {progress.assessmentScore == null ? '—' : (<><CountUp value={progress.assessmentScore} />%</>)}
                </div>
                {progress.assessmentsTaken > 0 && (
                  <div className="text-2xs text-ink-tertiary mt-2">of {progress.assessmentsTaken} taken</div>
                )}
              </Card>
            </motion.div>

            {/* Upcoming Milestones */}
            <motion.div {...fade(0.06)}>
              <Card>
                <CardHeader title="Upcoming Milestones" icon={ListChecks} />
                {milestones.length > 0 ? (
                  <div className="space-y-1">
                    {milestones.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => goLearn(item)}
                        className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-lg hover:bg-surface-50 transition-colors group"
                      >
                        <span className="text-sm font-medium text-ink group-hover:text-brand-700 transition-colors truncate">
                          {item.name}
                        </span>
                        <span className="inline-flex items-center gap-1.5 flex-shrink-0 ml-2">
                          <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${item.status === 'in-progress' ? 'bg-brand-50 text-brand-700' : 'bg-surface-100 text-ink-secondary'}`}>
                            {item.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-secondary py-2">You're all caught up!</p>
                )}
                {milestones.length > 0 && (
                  <button
                    type="button"
                    onClick={() => navigate('/roadmap')}
                    className="mt-3 text-xs font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
                  >
                    View All <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </Card>
            </motion.div>

            {/* Career Snapshot */}
            {goal && (
              <motion.div {...fade(0.09)}>
                <Card>
                  <CardHeader title="Career Snapshot" icon={Target} />
                  <div className="text-sm font-semibold text-ink mb-2">{goal}</div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-brand-600">{readiness}%</span>
                    <span className="text-xs text-ink-secondary">career readiness</span>
                  </div>
                  {topStrength && (
                    <div className="flex items-center justify-between text-sm py-2 border-t border-surface-200">
                      <span className="text-ink-secondary">Top strength</span>
                      <span className="text-ink font-medium flex items-center gap-1.5">
                        <span>{skillEmoji(topStrength.skill) || ''}</span>
                        {topStrength.skill}
                      </span>
                    </div>
                  )}
                  {topGap && (
                    <div className="flex items-center justify-between text-sm py-2 border-t border-surface-200">
                      <span className="text-ink-secondary">Priority gap</span>
                      <span className="text-ink font-medium">
                        {topGap.skill} <span className="text-ink-tertiary">({Math.round(topGap.gap)}%)</span>
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => navigate('/career-readiness')}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
                  >
                    View Career Readiness <ArrowRight className="w-3 h-3" />
                  </button>
                </Card>
              </motion.div>
            )}

            {/* Recent Activity */}
            <motion.div {...fade(0.12)}>
              <Card>
                <CardHeader title="Recent Activity" icon={Zap} />
                {recentActivity.length > 0 ? (
                  <div className="space-y-1">
                    {recentActivity.map(item => (
                      <div key={item.id} className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg">
                        <span className={`${item.className} text-sm w-5 flex-shrink-0 text-center`}>{item.symbol}</span>
                        <span className="text-sm font-medium text-ink truncate">{item.text}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-ink-secondary py-2">No activity yet. Complete your first lesson.</p>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
