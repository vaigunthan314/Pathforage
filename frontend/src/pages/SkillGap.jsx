import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { computeSkillGaps, computeCareerReadiness } from '../services/derivedData'
import { AlertTriangle, ArrowRight, Wrench, Target } from 'lucide-react'

const priorityColors = {
  critical: { bg: 'bg-red-50', text: 'text-error', border: 'border-red-200', bar: 'bg-error', label: 'Critical gap' },
  high: { bg: 'bg-orange-50', text: 'text-warning', border: 'border-orange-200', bar: 'bg-warning', label: 'High priority' },
  medium: { bg: 'bg-blue-50', text: 'text-brand-600', border: 'border-brand-200', bar: 'bg-brand-600', label: 'Growing' },
  low: { bg: 'bg-green-50', text: 'text-success', border: 'border-green-200', bar: 'bg-success', label: 'On track' },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
}

export default function SkillGap() {
  const { data, loading, error, loadProfile } = useActiveProfile()

  if (loading) {
    return (
      <div className="p-6 max-w-5xl space-y-4" aria-busy="true">
        <div className="h-6 w-44 bg-surface-200 rounded animate-pulse" />
        <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 border-b border-surface-100 animate-pulse bg-surface-50/50" />
          ))}
        </div>
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
          <h2 className="text-base font-semibold text-ink mb-1">Unable to load your skill data.</h2>
          <button onClick={loadProfile} className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const gaps = computeSkillGaps(data)

  if (gaps.length === 0) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Skill Gap Analysis</h1>
          <p className="text-sm text-ink-secondary mt-1">Your current skills vs the skills your goal needs.</p>
        </div>
        <div className="p-6 max-w-4xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Set a career goal to see your skill gaps.</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              Your skill gaps are computed from your current skills and the skills required for your target role.
            </p>
            <Link to="/profile" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors">
              Set My Goal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const readiness = computeCareerReadiness(data)
  const biggestGaps = [...gaps].sort((a, b) => b.gap - a.gap).slice(0, 2)

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">Skill Gap Analysis</h1>
        <p className="text-sm text-ink-secondary mt-1">Your current skills vs required for {data.careerGoal}.</p>
      </div>

      <div className="p-6 max-w-5xl">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-xl border border-surface-200 p-4">
            <div className="text-2xl font-bold text-ink">{readiness}%</div>
            <div className="text-xs text-ink-secondary">Career readiness</div>
          </div>
          <div className="bg-white rounded-xl border border-surface-200 p-4">
            <div className="text-2xl font-bold text-ink">{gaps.filter(g => g.gap <= 10).length}/{gaps.length}</div>
            <div className="text-xs text-ink-secondary">Skills on track</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-surface-200 bg-surface-50">
            <div className="col-span-3 text-xs font-medium text-ink-secondary uppercase tracking-wide">Skill</div>
            <div className="col-span-3 text-xs font-medium text-ink-secondary uppercase tracking-wide">Your Level</div>
            <div className="col-span-3 text-xs font-medium text-ink-secondary uppercase tracking-wide">Required</div>
            <div className="col-span-2 text-xs font-medium text-ink-secondary uppercase tracking-wide">Gap</div>
            <div className="col-span-1 text-xs font-medium text-ink-secondary uppercase tracking-wide">Priority</div>
          </div>

          {gaps.map((gap, i) => {
            const colors = priorityColors[gap.priority]
            return (
              <motion.div
                key={i}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-12 gap-4 items-center px-5 py-3.5 border-b border-surface-100 last:border-0 hover:bg-surface-50 transition-colors"
              >
                <div className="col-span-3">
                  <span className="text-sm font-medium text-ink">{gap.skill}</span>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-surface-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className={`h-1.5 rounded-full ${colors.bar}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${gap.current}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="text-xs text-ink-secondary w-8 text-right">{gap.current}%</span>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-surface-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-1.5 rounded-full bg-ink-tertiary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${gap.required}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.08 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="text-xs text-ink-secondary w-8 text-right">{gap.required}%</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className={`text-sm font-semibold ${colors.text}`}>{gap.gap}%</span>
                </div>
                <div className="col-span-1">
                  <span className={`text-2xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>
                    {colors.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {biggestGaps.length > 0 && (
          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-ink mb-1">Recommended Focus</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Focus on <strong>{biggestGaps[0].skill}</strong>
                {biggestGaps[1] ? <> and <strong>{biggestGaps[1].skill}</strong></> : null}
                {' '}first — they have the largest gaps for your {data.careerGoal} goal.
              </p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Link to="/roadmap" className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1.5">
            View your roadmap <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
