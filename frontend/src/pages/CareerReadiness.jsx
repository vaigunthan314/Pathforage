import { Link } from 'react-router-dom'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { computeCareerReadiness, computeSkillGaps, getSkillsMastered, isSkillMastered } from '../services/derivedData'
import { CheckCircle2, Circle, ArrowRight, TrendingUp, Briefcase } from 'lucide-react'

export default function CareerReadiness() {
  const { data, loading, error, loadProfile } = useActiveProfile()

  if (loading) {
    return (
      <div className="p-6 max-w-4xl space-y-4" aria-busy="true">
        <div className="h-6 w-44 bg-surface-200 rounded animate-pulse" />
        <div className="h-64 bg-white rounded-xl border border-surface-200 animate-pulse" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl">
        <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-error text-xl font-bold">!</span>
          </div>
          <h2 className="text-base font-semibold text-ink mb-1">Unable to load your readiness.</h2>
          <button onClick={loadProfile} className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700">Try Again</button>
        </div>
      </div>
    )
  }

  const gaps = computeSkillGaps(data)

  if (gaps.length === 0) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Career Readiness</h1>
          <p className="text-sm text-ink-secondary mt-1">How ready are you for your dream role?</p>
        </div>
        <div className="p-6 max-w-4xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Set a career goal to see your readiness.</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              Your readiness is computed from how close your current skills are to your target role's requirements.
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
  // Same mastered rule as Dashboard / Skills / Progress (single source of truth).
  const masteredCount = getSkillsMastered(data)
  const biggest = [...gaps].sort((a, b) => b.gap - a.gap)[0]

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">Career Readiness</h1>
        <p className="text-sm text-ink-secondary mt-1">How ready are you for your dream role?</p>
      </div>

      <div className="p-6 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Readiness Gauge */}
          <div className="bg-white rounded-xl border border-surface-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-sm font-medium text-ink-secondary mb-1">Target: {data?.careerGoal}</h2>
            </div>

            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#EEF0F2" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="50" fill="none"
                  stroke="#6366f1" strokeWidth="10"
                  strokeDasharray={`${readiness * 3.14} ${314 - readiness * 3.14}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-ink">{readiness}%</span>
                <span className="text-xs text-ink-secondary">Overall Readiness</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-ink">
                {readiness >= 80 ? 'Great Progress!' : readiness >= 50 ? 'Good Progress!' : 'Keep Learning!'}
              </p>
              <p className="text-xs text-ink-secondary mt-1">
                {masteredCount} of {gaps.length} required skills on track.
              </p>
            </div>
          </div>

          {/* Skills Checklist */}
          <div className="bg-white rounded-xl border border-surface-200 p-6">
            <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-4">Skills Checklist</h3>
            <div className="space-y-3">
              {gaps.map((gap, i) => {
                const isMastered = isSkillMastered(gap)
                return (
                  <div key={i} className="flex items-center gap-3">
                    {isMastered ? (
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-ink-muted flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <span className={`text-sm ${isMastered ? 'text-ink font-medium' : 'text-ink-secondary'}`}>
                        {gap.skill}
                      </span>
                    </div>
                    <span className="text-xs text-ink-tertiary">{gap.current}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recommended Next Step */}
        {biggest && (
          <div className="mt-6 bg-white rounded-xl border border-surface-200 p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-brand-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-ink mb-1">Recommended Next Step</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Focus on <strong>{biggest.skill}</strong> (gap of {biggest.gap}%) to improve your readiness for the {data?.careerGoal} role.
                </p>
              </div>
              <Link to="/roadmap" className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 flex-shrink-0">
                View Roadmap <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
