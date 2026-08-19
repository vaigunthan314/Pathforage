import { Link } from 'react-router-dom'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { computeProgressStats, getWeeklyActivity, formatHours } from '../services/derivedData'
import { Clock, Award, Target, Map, TrendingUp, BookOpen, ClipboardList } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function Progress() {
  const { data, loading, error, loadProfile } = useActiveProfile()

  if (loading) {
    return (
      <div className="p-6 max-w-5xl space-y-4" aria-busy="true">
        <div className="h-6 w-44 bg-surface-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-xl border border-surface-200 animate-pulse" />
          ))}
        </div>
        <div className="h-52 bg-white rounded-xl border border-surface-200 animate-pulse" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl">
        <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-error text-xl font-bold">!</span>
          </div>
          <h2 className="text-base font-semibold text-ink mb-1">Unable to load your progress.</h2>
          <button onClick={loadProfile} className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700">Try Again</button>
        </div>
      </div>
    )
  }

  const stats = computeProgressStats(data)
  const hasAny = stats.totalTopics > 0 || stats.hoursLearned > 0 || stats.assessmentsTaken > 0

  if (!hasAny) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Learning Progress</h1>
        </div>
        <div className="p-6 max-w-5xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">No progress recorded yet.</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              Once you start completing topics and assessments, your progress trends, streak, and stats will show up here.
            </p>
            <Link to="/roadmap" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors">
              Go to Roadmap <Map className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Same canonical last-7-days window as the Dashboard Learning Activity.
  const weeklyData = getWeeklyActivity(data).map(d => ({
    day: d.label,
    hours: d.hours,
    topics: d.topics,
  }))

  const skillData = stats.skillProgress.length ? stats.skillProgress : [{ name: '—', level: 0 }]

  const chartColors = {
    grid: '#EEF0F2',
    axis: '#98A2B3',
    bar: '#6366f1',
    line: '#6366f1',
    tooltip: { bg: '#fff', border: '#E4E7EB' },
  }

  const overview = [
    { label: 'Total Hours', value: formatHours(stats.hoursLearned), suffix: '', icon: Clock, color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'Topics Completed', value: `${stats.topicsCompleted}`, suffix: `/${stats.totalTopics || 0}`, icon: BookOpen, color: 'text-success', bg: 'bg-green-50' },
    { label: 'Assessments Taken', value: `${stats.assessmentsTaken}`, suffix: '', icon: ClipboardList, color: 'text-warning', bg: 'bg-amber-50' },
    { label: 'Avg. Score', value: stats.assessmentScore == null ? '—' : `${stats.assessmentScore}`, suffix: stats.assessmentScore == null ? '' : '%', icon: Award, color: 'text-teal-600', bg: 'bg-teal-50' },
  ]

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">Your Progress</h1>
        <p className="text-sm text-ink-secondary mt-1">Track your learning journey.</p>
      </div>

      <div className="p-6 max-w-5xl">
        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {overview.map((m, i) => {
            const Icon = m.icon
            return (
              <div key={i} className="bg-white rounded-xl border border-surface-200 p-4">
                <div className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <div className="text-lg font-bold text-ink">{m.value}{m.suffix}</div>
                <div className="text-xs text-ink-secondary">{m.label}</div>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Roadmap completion */}
          <div className="bg-white rounded-xl border border-surface-200 p-5">
            <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-4">Roadmap Completion</h3>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-bold text-ink">{stats.roadmapCompletion}%</span>
              <span className="text-xs text-ink-tertiary flex items-center gap-1"><Target className="w-3 h-3" /> {stats.topicsCompleted}/{stats.totalTopics} topics</span>
            </div>
            <div className="w-full bg-surface-200 rounded-full h-2 overflow-hidden">
              <div className="bg-brand-600 h-2 rounded-full transition-all" style={{ width: `${stats.roadmapCompletion}%` }} />
            </div>
            <div className="h-28 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ name: 'Roadmap', progress: stats.roadmapCompletion }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: chartColors.axis }} />
                  <YAxis tick={{ fontSize: 11, fill: chartColors.axis }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: chartColors.tooltip.bg, border: `1px solid ${chartColors.tooltip.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="progress" stroke={chartColors.line} strokeWidth={2} dot={{ r: 4, fill: chartColors.line }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Learning Time */}
          <div className="bg-white rounded-xl border border-surface-200 p-5">
            <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-4">Weekly Learning Time</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: chartColors.axis }} />
                  <YAxis tick={{ fontSize: 11, fill: chartColors.axis }} />
                  <Tooltip contentStyle={{ backgroundColor: chartColors.tooltip.bg, border: `1px solid ${chartColors.tooltip.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="hours" fill={chartColors.bar} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Skill Progress */}
        <div className="mt-5 bg-white rounded-xl border border-surface-200 p-5">
          <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-4">Skill Progress</h3>
          <div className="space-y-3">
            {skillData.map((skill, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink font-medium">{skill.name}</span>
                  <span className="text-xs text-ink-secondary">{skill.level}%</span>
                </div>
                <div className="w-full bg-surface-200 rounded-full h-1.5">
                  <div className="bg-brand-600 h-1.5 rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
