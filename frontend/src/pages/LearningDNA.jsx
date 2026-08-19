import { useActiveProfile } from '../hooks/useActiveProfile'
import { computeLearningDNA } from '../services/derivedData'
import { Brain, TrendingUp, Zap, BookOpen, Target, CheckCircle2, Activity, BarChart3, ClipboardList } from 'lucide-react'

function RadarChart({ data }) {
  const size = 240
  const cx = size / 2
  const cy = size / 2
  const radius = 90
  const labels = ['Problem Solving', 'Consistency', 'Curiosity', 'Practical', 'Visual', 'Theoretical']
  const values = [
    data.problemSolving, data.consistency, data.curiosity,
    data.practicalLearning, data.visualLearning, data.theoreticalLearning
  ]
  const n = labels.length
  const angleStep = (2 * Math.PI) / n

  const getPoint = (i, val) => {
    const angle = angleStep * i - Math.PI / 2
    const r = (val / 100) * radius
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const dataPoints = values.map((v, i) => getPoint(i, v)).map(p => `${p.x},${p.y}`).join(' ')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {[25, 50, 75, 100].map(pct => {
        const pts = Array.from({ length: n }, (_, i) => getPoint(i, pct))
        return (
          <polygon
            key={pct}
            points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke="#E4E7EB"
            strokeWidth="1"
          />
        )
      })}
      {labels.map((_, i) => {
        const p1 = getPoint(i, 0)
        const p2 = getPoint(i, 100)
        return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#E4E7EB" strokeWidth="1" />
      })}
      <polygon points={dataPoints} fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="2" />
      {labels.map((label, i) => {
        const p = getPoint(i, 115)
        return (
          <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            className="text-[10px] fill-ink-secondary font-medium">{label}</text>
        )
      })}
    </svg>
  )
}

function Stat({ icon: Icon, label, value, color = 'text-brand-600', bg = 'bg-brand-50' }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-4">
      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-2`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="text-lg font-bold text-ink">{value}</div>
      <div className="text-xs text-ink-secondary">{label}</div>
    </div>
  )
}

export default function LearningDNA() {
  const { data, loading } = useActiveProfile()

  if (loading) {
    return (
      <div className="p-6 max-w-5xl space-y-4" aria-busy="true">
        <div className="h-6 w-44 bg-surface-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-xl border border-surface-200 animate-pulse" />
          ))}
        </div>
        <div className="h-72 bg-white rounded-xl border border-surface-200 animate-pulse" />
      </div>
    )
  }

  const dna = computeLearningDNA(data)

  if (!dna.hasActivity) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Your Learning DNA</h1>
          <p className="text-sm text-ink-secondary mt-1">A complete view of your learning profile.</p>
        </div>
        <div className="p-6 max-w-4xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5">
              <Brain className="w-7 h-7 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Your learning DNA is forming.</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              Complete a few lessons and assessments to build your Learning DNA. Each topic and quiz teaches us how
              you learn best.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-ink">Your Learning DNA</h1>
            <p className="text-sm text-ink-secondary mt-1">A complete view of your learning profile.</p>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-5xl">
        {/* Overview stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <Stat icon={BookOpen} label="Topics completed" value={dna.topicsCompleted} />
          <Stat icon={ClipboardList} label="Assessments taken" value={dna.assessmentsTaken} />
          <Stat icon={BarChart3} label="Avg. assessment score" value={dna.avgAssessment == null ? '—' : `${dna.avgAssessment}%`} color="text-teal-600" bg="bg-teal-50" />
          <Stat icon={Activity} label="Consistency" value={dna.consistencyLabel} color="text-success" bg="bg-green-50" />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Radar Chart */}
          <div className="md:col-span-2 bg-white rounded-xl border border-surface-200 p-6">
            <div className="flex justify-center mb-4">
              <RadarChart data={dna.radar} />
            </div>
          </div>

          {/* DNA Insights */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-surface-200 p-5">
              <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-3">DNA Insights</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-ink">You learn best through</div>
                    <div className="text-xs text-ink-secondary">{dna.learningStyleLabel}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-ink">Your Strength</div>
                    <div className="text-xs text-ink-secondary">{dna.strengths.length ? dna.strengths.join(', ') : 'Building your skill profile'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-warning mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-ink">Keep Improving</div>
                    <div className="text-xs text-ink-secondary">{dna.growthAreas.length ? dna.growthAreas.join(', ') : 'No gaps identified yet'}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Target className="w-4 h-4 text-brand-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-ink">Pace</div>
                    <div className="text-xs text-ink-secondary">{dna.paceLabel}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-surface-200 p-5">
              <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-3">Weekly Commitment</h3>
              <div className="text-lg font-bold text-ink">{dna.weeklyCommitment}</div>
            </div>
          </div>
        </div>

        {/* Recommended learning mix */}
        <div className="mt-5 bg-white rounded-xl border border-surface-200 p-5">
          <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-4">Recommended Learning Mix</h3>
          <div className="flex rounded-lg overflow-hidden h-8">
            <div className="bg-brand-600 flex items-center justify-center text-white text-2xs font-medium" style={{ width: `${dna.recommendedStyle.practical}%` }}>
              {dna.recommendedStyle.practical}% Practical
            </div>
            <div className="bg-teal-500 flex items-center justify-center text-white text-2xs font-medium" style={{ width: `${dna.recommendedStyle.theory}%` }}>
              {dna.recommendedStyle.theory}% Theory
            </div>
            <div className="bg-warning flex items-center justify-center text-white text-2xs font-medium" style={{ width: `${dna.recommendedStyle.assessment}%` }}>
              {dna.recommendedStyle.assessment}% Assessment
            </div>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed mt-4 flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" />
            {dna.recommendedApproach}
          </p>
        </div>
      </div>
    </div>
  )
}
