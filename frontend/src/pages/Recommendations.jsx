import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { buildRecommendations } from '../services/derivedData'
import { BookOpen, Clock, Star, ExternalLink, Map } from 'lucide-react'

const filters = ['All', 'Courses', 'Videos', 'Practice']

export default function Recommendations() {
  const { data, loading, error, loadProfile } = useActiveProfile()
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="p-6 max-w-5xl space-y-3" aria-busy="true">
        <div className="h-6 w-52 bg-surface-200 rounded animate-pulse" />
        {[0, 1, 2].map(i => (
          <div key={i} className="h-20 bg-white rounded-xl border border-surface-200 animate-pulse" />
        ))}
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
          <h2 className="text-base font-semibold text-ink mb-1">Unable to load recommendations.</h2>
          <button onClick={loadProfile} className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700">Try Again</button>
        </div>
      </div>
    )
  }

  const courses = buildRecommendations(data)

  if (courses.length === 0) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Recommended Content</h1>
        </div>
        <div className="p-6 max-w-5xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <Map className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Recommendations need a roadmap.</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              Once you have a career goal and roadmap, courses and content matched to your missing skills appear here.
            </p>
            <Link to="/roadmap" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors">
              Go to Roadmap
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const filtered = activeFilter === 'All' ? courses
    : activeFilter === 'Videos' ? courses.filter(c => c.type === 'video')
    : activeFilter === 'Practice' ? courses.filter(c => c.type === 'practice')
    : courses.filter(c => c.type === 'course')

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">Recommended for You</h1>
        <p className="text-sm text-ink-secondary mt-1">Resources matched to your {data?.careerGoal || 'learning'} path and skill gaps.</p>
      </div>

      <div className="p-6 max-w-5xl">
        <div className="flex items-center gap-2 mb-5">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeFilter === f
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-100 text-ink-secondary hover:bg-surface-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((course) => (
            <div key={course.id} className="bg-white rounded-xl border border-surface-200 p-4 hover:shadow-card transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-semibold text-ink truncate">{course.title}</h3>
                    <span className="text-xs text-ink-tertiary">{course.provider}</span>
                  </div>
                  <p className="text-xs text-ink-secondary mb-2">{course.description}</p>
                  <div className="flex items-center gap-3 text-xs text-ink-tertiary">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-warning" />
                      {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-100 text-ink-secondary">{course.skill}</span>
                    <span className="px-1.5 py-0.5 rounded bg-surface-100 text-ink-secondary">{course.level}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      if (course.url) window.open(course.url, '_blank', 'noopener')
                      else navigate(`/learn/${course.skillId}?name=${encodeURIComponent(course.skill)}`, { state: { from: '/recommendations' } })
                    }}
                    className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => navigate(`/learn/${course.skillId}?name=${encodeURIComponent(course.skill)}`, { state: { from: '/recommendations' } })}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
