import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { getProjectById } from '../data/contentResolver'
import { updateProjectStatus } from '../services/derivedData'
import {
  ArrowLeft, Clock, Target, Wrench, Building2, ListChecks, Star, Rocket,
  Bookmark, CheckCircle2, Code, AlertTriangle, Lightbulb, Briefcase, MessageCircle,
  Users, GraduationCap, FlaskConical, Cloud, FileText, PlayCircle, BookOpen,
} from 'lucide-react'

const difficultyColor = {
  Beginner: 'text-success bg-green-50 border-green-200',
  Intermediate: 'text-brand-600 bg-brand-50 border-brand-200',
  Advanced: 'text-warning bg-amber-50 border-amber-200',
}

const careerColor = {
  'Java Developer': 'bg-blue-50 text-blue-700 border-blue-200',
  'Full Stack Developer': 'bg-purple-50 text-purple-700 border-purple-200',
  'Cloud Engineer': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Data Scientist': 'bg-orange-50 text-orange-700 border-orange-200',
  'DevOps Engineer': 'bg-red-50 text-red-700 border-red-200',
  'AI/ML Engineer': 'bg-indigo-50 text-indigo-700 border-indigo-200',
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay },
})

function Section({ title, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div {...fade(delay)} className="bg-white rounded-xl border border-surface-200 p-5">
      <h2 className="text-sm font-semibold text-ink flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-brand-600" /> {title}
      </h2>
      {children}
    </motion.div>
  )
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary leading-relaxed">
          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetail() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data, updateProfile } = useActiveProfile()
  const project = getProjectById(projectId)

  const skillsMap = {}
  ;(data?.currentSkills || []).forEach(s => { if (s.name) skillsMap[s.name] = s.level })
  ;(data?.progress?.skillProgress || []).forEach(s => { if (skillsMap[s.name] == null && s.name) skillsMap[s.name] = s.level })
  const mastery = (name) => skillsMap[name] ?? 0
  const safeSkills = Array.isArray(project?.skills) ? project.skills : []
  const safeFeatures = Array.isArray(project?.features) ? project.features : []
  const safeMilestones = Array.isArray(project?.milestones) ? project.milestones : []
  const safeImplSteps = Array.isArray(project?.implementationSteps) ? project.implementationSteps : []
  const safeCommonMistakes = Array.isArray(project?.commonMistakes) ? project.commonMistakes : []
  const safeExtensionIdeas = Array.isArray(project?.extensionIdeas) ? project.extensionIdeas : []
  const safeInterviewQs = Array.isArray(project?.interviewQuestions) ? project.interviewQuestions : []
  const safeHowToBuild = Array.isArray(project?.howToBuild) ? project.howToBuild : []
  const safeTechStack = Array.isArray(project?.techStack) ? project.techStack : []
  const skillMatch = safeSkills.length
    ? Math.round(safeSkills.reduce((acc, s) => acc + mastery(s), 0) / safeSkills.length)
    : 0
  const missingSkills = safeSkills.filter(s => mastery(s) < 30)

  const projectState = data?.projectProgress?.[projectId]?.status || 'not-started'
  const isSaved = projectState === 'saved'
  const isStarted = projectState === 'started'
  const isCompleted = projectState === 'completed'

  const setProjectStatus = async (status) => {
    const updated = updateProjectStatus(data, projectId, status, project)
    await updateProfile(updated)
  }

  if (!project) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Project Not Found</h1>
        </div>
        <div className="p-6 max-w-5xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-error text-xl font-bold">!</span>
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Project not found.</h2>
            <p className="text-sm text-ink-secondary mb-5">The project you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/projects')} className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </button>
          </div>
        </div>
      </div>
    )
  }

  const fromPath = location.state?.from || '/projects'
  const goBack = () => {
    if (fromPath && fromPath !== location.pathname) navigate(fromPath)
    else if (window.history.length > 1) navigate(-1)
    else navigate('/projects')
  }

  const archItems = Array.isArray(project.architecture)
    ? project.architecture
    : project.architecture ? [project.architecture] : ['Standard layered architecture.']

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-ink mb-3 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </button>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-ink">{project.title}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-2xs font-medium px-2 py-0.5 rounded-full border ${careerColor[project.careerPath] || 'bg-surface-100 text-ink-secondary border-surface-200'}`}>
                {project.careerPath}
              </span>
              <span className={`text-2xs font-medium px-2 py-0.5 rounded-full border ${difficultyColor[project.difficulty]}`}>
                {project.difficulty}
              </span>
              <span className="flex items-center gap-1 text-xs text-ink-tertiary">
                <Clock className="w-3 h-3" /> {project.duration}
              </span>
              {safeTechStack.length > 0 && (
                <span className="flex items-center gap-1.5 text-xs text-ink-tertiary">
                  <Code className="w-3 h-3" />
                  <span className="flex gap-1 flex-wrap">
                    {safeTechStack.map(t => (
                      <span key={t} className="text-2xs px-1.5 py-0.5 rounded bg-surface-100 text-ink-secondary">{t}</span>
                    ))}
                  </span>
                </span>
              )}
            </div>
            {(isCompleted || isStarted) && (
              <span className={`inline-flex items-center gap-1.5 mt-2 text-2xs font-medium px-2 py-0.5 rounded-full border ${isCompleted ? 'bg-green-50 text-success border-green-200' : 'bg-brand-50 text-brand-700 border-brand-200'}`}>
                <CheckCircle2 className="w-3 h-3" /> {isCompleted ? 'Completed' : 'In Progress'}
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="text-2xl font-bold text-brand-600 leading-none">{skillMatch}%</div>
            <div className="text-2xs text-ink-tertiary">Skill match</div>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-5xl space-y-6">
        {/* Project Overview */}
        <Section title="Project Overview" icon={Building2} delay={0.03}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.description}</p>
        </Section>

        {/* Problem Statement */}
        <Section title="Problem Statement" icon={Target} delay={0.05}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.problemStatement || project.description}</p>
          {missingSkills.length > 0 && (
            <div className="mt-4 pt-4 border-t border-surface-100">
              <div className="text-2xs font-medium text-ink-secondary uppercase tracking-wide mb-1.5">Skills to brush up on first</div>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.map(s => (
                  <span key={s} className="text-2xs px-2 py-0.5 rounded bg-amber-50 text-amber-700">{s}</span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* Why Build It */}
        <Section title="Why Build It" icon={Rocket} delay={0.07}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.whyBuild || project.whyUseful}</p>
        </Section>

        {/* Who Should Build It */}
        <Section title="Who Should Build It" icon={Users} delay={0.09}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.whoShouldBuild}</p>
        </Section>

        {/* Prerequisites */}
        <Section title="Prerequisites" icon={GraduationCap} delay={0.11}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.prerequisites}</p>
        </Section>

        {/* Skills Required */}
        <Section title="Skills Practiced" icon={Wrench} delay={0.13}>
          {safeSkills.length > 0 ? (
            <div className="space-y-3">
              {safeSkills.map(s => {
                const level = mastery(s)
                const gauge = level >= 80 ? 'bg-success' : level >= 50 ? 'bg-brand-600' : level >= 30 ? 'bg-warning' : 'bg-surface-300'
                return (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-32 text-xs font-medium text-ink truncate flex-shrink-0">{s}</span>
                    <span className="flex-1 bg-surface-100 rounded-full h-1.5 overflow-hidden">
                      <motion.span
                        className={`block h-1.5 rounded-full ${gauge}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${level}%` }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                    <span className="text-xs text-ink-tertiary w-9 text-right flex-shrink-0">{level}%</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-ink-secondary">Skills for this project are defined in its roadmap context.</p>
          )}
        </Section>

        {/* Architecture */}
        <Section title="Architecture" icon={Building2} delay={0.15}>
          <BulletList items={archItems} />
        </Section>

        {/* Features */}
        {safeFeatures.length > 0 && (
          <Section title="Features" icon={Star} delay={0.17}>
            <BulletList items={safeFeatures} />
          </Section>
        )}

        {/* How To Build */}
        {safeHowToBuild.length > 0 && (
          <Section title="How To Build" icon={PlayCircle} delay={0.2}>
            <ol className="space-y-5">
              {safeHowToBuild.map(phase => (
                <li key={phase.phase} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-xl bg-brand-50 text-brand-600 text-xs font-bold flex items-center justify-center mt-0.5">
                    {phase.phase}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-ink mb-1">{phase.title}</div>
                    <p className="text-sm text-ink-secondary leading-relaxed">{phase.action}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Implementation Steps */}
        {safeImplSteps.length > 0 && (
          <Section title="Implementation Steps" icon={ListChecks} delay={0.22}>
            <ol className="space-y-3">
              {safeImplSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink-secondary leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-2xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Milestones */}
        {safeMilestones.length > 0 && (
          <Section title="Milestones" icon={ListChecks} delay={0.24}>
            <ol className="space-y-2">
              {safeMilestones.map((m, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink-secondary leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-50 text-brand-600 text-2xs font-semibold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {m}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Testing */}
        <Section title="Testing" icon={FlaskConical} delay={0.26}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.testing}</p>
        </Section>

        {/* Deployment */}
        <Section title="Deployment" icon={Cloud} delay={0.28}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.deployment}</p>
        </Section>

        {/* Expected Result */}
        <Section title="Expected Result" icon={CheckCircle2} delay={0.3}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.expectedOutcome || project.expectedResult}</p>
        </Section>

        {/* Common Mistakes */}
        {safeCommonMistakes.length > 0 && (
          <Section title="Common Mistakes" icon={AlertTriangle} delay={0.32}>
            <ul className="space-y-2">
              {safeCommonMistakes.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary leading-relaxed">
                  <span className="mt-1 text-amber-500 flex-shrink-0">⚠</span>
                  {m}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Extension Ideas */}
        {safeExtensionIdeas.length > 0 && (
          <Section title="Extension Ideas" icon={Lightbulb} delay={0.34}>
            <BulletList items={safeExtensionIdeas} />
          </Section>
        )}

        {/* GitHub / README Checklist */}
        {Array.isArray(project.readmeChecklist) && project.readmeChecklist.length > 0 && (
          <Section title="GitHub / README Checklist" icon={FileText} delay={0.36}>
            <BulletList items={project.readmeChecklist} />
          </Section>
        )}

        {/* Portfolio Value */}
        <Section title="Portfolio Value" icon={Briefcase} delay={0.38}>
          <p className="text-sm text-ink-secondary leading-relaxed">{project.portfolioValue}</p>
        </Section>

        {/* Interview Questions */}
        {safeInterviewQs.length > 0 && (
          <Section title="Interview Preparation" icon={MessageCircle} delay={0.4}>
            <div className="space-y-4">
              {safeInterviewQs.map((item, i) => (
                <div key={i} className="border-l-2 border-brand-200 pl-4">
                  <p className="text-sm font-medium text-ink mb-1.5">{item.q}</p>
                  <p className="text-sm text-ink-secondary leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Action Buttons */}
        <div className="pt-2 pb-6 flex flex-wrap items-center gap-3">
          {isCompleted ? (
            <>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                <CheckCircle2 className="w-4 h-4" /> Project Completed
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-lg border border-surface-200 text-ink-secondary hover:bg-surface-50 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> View Project
              </button>
            </>
          ) : isStarted ? (
            <>
              <button
                onClick={() => setProjectStatus('completed')}
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark Complete
              </button>
              <button
                onClick={() => setProjectStatus('not-started')}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-lg border border-surface-200 text-ink-secondary hover:bg-surface-50 transition-colors"
              >
                Remove
              </button>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-tertiary">
                <Clock className="w-3 h-3" /> Started {new Date(data?.projectProgress?.[projectId]?.startedAt).toLocaleDateString()}
              </span>
            </>
          ) : (
            <>
              <button
                onClick={() => setProjectStatus('started')}
                className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors"
              >
                <Rocket className="w-4 h-4" /> Start Project
              </button>
              <button
                onClick={() => setProjectStatus(isSaved ? 'not-started' : 'saved')}
                className="inline-flex items-center justify-center gap-2 text-sm font-medium px-5 py-3 rounded-lg border border-surface-200 text-ink-secondary hover:bg-surface-50 transition-colors"
              >
                <Bookmark className="w-4 h-4" /> {isSaved ? 'Saved ✓' : 'Save for Later'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}