import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { getAllProjects } from '../data/careers'
import { Clock, ArrowRight, Building2, CheckCircle2, PlayCircle, Bookmark } from 'lucide-react'

const filters = ['All', 'Beginner', 'Intermediate', 'Advanced']
const difficultyColor = {
  Beginner: 'text-success bg-green-50 border-green-200',
  Intermediate: 'text-brand-600 bg-brand-50 border-brand-200',
  Advanced: 'text-warning bg-amber-50 border-amber-200',
}

export default function Projects() {
  const { data, loading, error, loadProfile } = useActiveProfile()
  const [activeFilter, setActiveFilter] = useState('All')

  if (loading) {
    return (
      <div className="p-6 max-w-5xl space-y-3" aria-busy="true">
        <div className="h-6 w-52 bg-surface-200 rounded animate-pulse" />
        {[0, 1, 2].map(i => (
          <div key={i} className="h-24 bg-white rounded-xl border border-surface-200 animate-pulse" />
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
          <h2 className="text-base font-semibold text-ink mb-1">Unable to load projects.</h2>
          <button onClick={loadProfile} className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700">Try Again</button>
        </div>
      </div>
    )
  }

  const allProjects = getAllProjects()
  const goal = data?.careerGoal || ''
  const projectProgress = data?.projectProgress || {}

  const projects = goal
    ? allProjects.filter(p => p.careerPath === goal)
    : allProjects

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.difficulty === activeFilter)

  const stateBadge = (project) => {
    const status = projectProgress[project.id]?.status
    if (status === 'completed') return { label: 'Completed', cls: 'bg-green-50 text-success border-green-200', Icon: CheckCircle2 }
    if (status === 'started') return { label: 'In Progress', cls: 'bg-brand-50 text-brand-700 border-brand-200', Icon: PlayCircle }
    if (status === 'saved') return { label: 'Saved', cls: 'bg-surface-100 text-ink-secondary border-surface-200', Icon: Bookmark }
    return null
  }

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">Project Ideas for You</h1>
        <p className="text-sm text-ink-secondary mt-1">
          {goal ? `Recommended for your ${goal} goal.` : 'Explore projects across all career paths.'}
        </p>
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
          {filtered.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              state={{ from: '/projects' }}
              className="block bg-white rounded-xl border border-surface-200 p-5 hover:shadow-card hover:border-brand-200 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-ink-muted" />
                    <span className="text-2xs text-ink-tertiary">{project.careerPath}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-brand-700 transition-colors">{project.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">{project.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 ml-3 flex-shrink-0">
                  {(() => {
                    const badge = stateBadge(project)
                    if (!badge) return null
                    const { label, cls, Icon } = badge
                    return (
                      <span className={`inline-flex items-center gap-1 text-2xs font-medium px-2 py-0.5 rounded-full border ${cls}`}>
                        <Icon className="w-3 h-3" /> {label}
                      </span>
                    )
                  })()}
                  <span className={`text-2xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center gap-1 text-xs text-ink-tertiary">
                  <Clock className="w-3 h-3" />
                  {project.duration}
                </span>
                <span className="flex items-center gap-1 text-xs text-ink-tertiary">
                  {project.skills.length} skill{project.skills.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <div className="flex gap-1.5 flex-wrap">
                  {project.skills.slice(0, 4).map(s => (
                    <span key={s} className="text-2xs px-2 py-0.5 rounded bg-surface-100 text-ink-secondary">{s}</span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="text-2xs px-2 py-0.5 rounded bg-surface-100 text-ink-tertiary">+{project.skills.length - 4}</span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-surface-200 p-10 text-center">
              <p className="text-sm text-ink-secondary">No projects match this filter.</p>
              <button
                type="button"
                onClick={() => setActiveFilter('All')}
                className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                Show all projects
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
