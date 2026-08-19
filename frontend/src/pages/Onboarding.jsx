import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLearner } from '../context/LearnerContext'
import { useAuth } from '../context/AuthContext'
import { useProfile } from '../context/ProfileContext'
import { DEMO_PROFILE } from '../data/demoProfile'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, Loader2, Check } from 'lucide-react'

const SKILL_OPTIONS = [
  'Java', 'Python', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
  'React', 'Node.js', 'SQL', 'Git', 'Linux', 'Docker',
  'Data Structures', 'Spring Boot', 'REST API', 'System Design',
  'MongoDB', 'Others'
]

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const TIMES = ['30 min/day', '1 hour/day', '2 hours/day', '3+ hours/day']
const TIMELINES = ['1 month', '3 months', '6 months', '1 year']
const STYLES = [
  { value: 'hands-on', label: 'Hands-on', desc: 'Learn by doing projects' },
  { value: 'visual', label: 'Visual', desc: 'Watch videos and tutorials' },
  { value: 'reading', label: 'Reading', desc: 'Read docs and articles' },
  { value: 'mixed', label: 'Mixed', desc: 'Combination of all' },
]
const PRIORITIES = ['Career Switch', 'Job Prep', 'Skill Upgrade', 'Personal Interest']

// Initial skill estimate based on the learner's declared experience level.
// Clearly a starting estimate — it is refined as they complete topics and assessments.
const INITIAL_SKILL_LEVEL = { Beginner: 25, Intermediate: 50, Advanced: 75 }

const STEPS = [
  { title: 'What is your career goal?', subtitle: 'Select the role you want to pursue.' },
  { title: 'What are your current skills?', subtitle: 'Select all that apply.' },
  { title: 'What is your current level?', subtitle: 'Be honest for the best results.' },
  { title: 'How much time can you dedicate?', subtitle: 'This helps us pace your roadmap.' },
  { title: 'What is your target timeline?', subtitle: 'When do you want to be job-ready?' },
  { title: 'How do you prefer to learn?', subtitle: 'This shapes your learning mix.' },
  { title: 'What is your priority?', subtitle: 'This helps us recommend the right resources.' },
]

// Per-step validation rules
const isStepValid = (step, data) => {
  switch (step) {
    case 0: return !!data.goal
    case 1: return data.currentSkills.length > 0
    case 2: return !!data.level
    case 3: return !!data.availableTime
    case 4: return !!data.timeline
    case 5: return !!data.learningStyle
    case 6: return !!data.priority
    default: return true
  }
}

const stepError = (step) => {
  switch (step) {
    case 0: return 'Please select your career goal.'
    case 1: return 'Select at least one skill to continue.'
    case 2: return 'Please choose your current level.'
    case 3: return 'Please select how much time you can dedicate.'
    case 4: return 'Please choose your target timeline.'
    case 5: return 'Please choose your learning preference.'
    case 6: return 'Please select your priority.'
    default: return ''
  }
}

// Step transition variants (horizontal slide)
const stepVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
}

const stepTransition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] }

const optionBase =
  'relative w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[1.01]'

const optionClass = (selected) =>
  selected
    ? 'border-brand-600 bg-brand-50 text-brand-700'
    : 'border-surface-200 text-ink hover:border-brand-300'

function Selectable({ selected, onClick, children }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.995 }}
      onClick={onClick}
      className={`${optionBase} ${optionClass(selected)}`}
      aria-pressed={selected}
    >
      {children}
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check className="w-3 h-3 text-white" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'
  const { user } = useAuth()
  const { completeOnboarding } = useProfile()
  const { setDemoProfile, setIsDemoMode } = useLearner()

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [data, setData] = useState({
    goal: '',
    currentSkills: [],
    level: '',
    availableTime: '',
    timeline: '',
    learningStyle: '',
    priority: '',
  })

  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
    setShowError(false)
  }

  const toggleSkill = (skill) => {
    setData(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.includes(skill)
        ? prev.currentSkills.filter(s => s !== skill)
        : [...prev.currentSkills, skill]
    }))
    setShowError(false)
  }

  const goNext = () => {
    if (!isStepValid(step, data)) {
      setShowError(true)
      return
    }
    setDirection(1)
    setStep(s => s + 1)
    setShowError(false)
  }

  const goBack = () => {
    setDirection(-1)
    setStep(s => s - 1)
    setShowError(false)
  }

  const handleSubmit = async () => {
    if (!isStepValid(step, data)) {
      setShowError(true)
      return
    }
    setLoading(true)
    try {
      if (isDemo) {
        setDemoProfile(DEMO_PROFILE)
        setIsDemoMode(true)
        setTimeout(() => navigate('/dashboard'), 800)
      } else {
        const { generateRoadmap, EMPTY_PROGRESS } = await import('../services/roadmapGenerator')
        const roadmap = generateRoadmap({ goal: data.goal, timeline: data.timeline })
        await completeOnboarding({
          name: user?.name || '',
          email: user?.email || '',
          avatar: user?.avatar || '',
          careerGoal: data.goal,
          currentSkills: data.currentSkills.map(s => ({ name: s, level: INITIAL_SKILL_LEVEL[data.level] || 25 })),
          experienceLevel: data.level,
          learningHours: data.availableTime,
          targetDuration: data.timeline,
          learningPreference: data.learningStyle,
          priority: data.priority,
          roadmap,
          progress: EMPTY_PROGRESS,
        })
        // The route guard redirects to /dashboard once onboardingCompleted becomes true.
      }
    } catch (e) {
      console.error('Failed to save onboarding:', e)
      setShowError(true)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-ink">Building your learning path...</p>
          <p className="text-xs text-ink-secondary mt-1">Analyzing your profile</p>
        </div>
      </div>
    )
  }

  const progress = ((step + 1) / STEPS.length) * 100
  const canContinue = isStepValid(step, data)

  const renderOptions = () => {
    switch (step) {
      case 0:
        return ['Java Developer', 'Full Stack Developer', 'Cloud Engineer', 'Data Scientist', 'DevOps Engineer', 'AI/ML Engineer'].map(g => (
          <Selectable key={g} selected={data.goal === g} onClick={() => updateData('goal', g)}>
            <span className="pr-8">{g}</span>
          </Selectable>
        ))
      case 1:
        return (
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map(skill => (
              <Selectable key={skill} selected={data.currentSkills.includes(skill)} onClick={() => toggleSkill(skill)}>
                <span className="pr-6">{skill}</span>
              </Selectable>
            ))}
          </div>
        )
      case 2:
        return LEVELS.map(l => (
          <Selectable key={l} selected={data.level === l} onClick={() => updateData('level', l)}>
            <span className="pr-8">{l}</span>
          </Selectable>
        ))
      case 3:
        return TIMES.map(t => (
          <Selectable key={t} selected={data.availableTime === t} onClick={() => updateData('availableTime', t)}>
            <span className="pr-8">{t}</span>
          </Selectable>
        ))
      case 4:
        return TIMELINES.map(t => (
          <Selectable key={t} selected={data.timeline === t} onClick={() => updateData('timeline', t)}>
            <span className="pr-8">{t}</span>
          </Selectable>
        ))
      case 5:
        return STYLES.map(s => (
          <Selectable key={s.value} selected={data.learningStyle === s.value} onClick={() => updateData('learningStyle', s.value)}>
            <div className="pr-8">
              <div className="text-sm font-medium">{s.label}</div>
              <div className="text-xs text-ink-secondary mt-0.5">{s.desc}</div>
            </div>
          </Selectable>
        ))
      case 6:
        return PRIORITIES.map(p => (
          <Selectable key={p} selected={data.priority === p} onClick={() => updateData('priority', p)}>
            <span className="pr-8">{p}</span>
          </Selectable>
        ))
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-surface-200 z-50">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xs">P</span>
            </div>
            <span className="font-semibold text-xs text-ink">PathForge</span>
          </div>
          <span className="text-xs text-ink-secondary">Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="h-0.5 bg-surface-200">
          <div
            className="h-full bg-brand-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-24">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-ink mb-1">{STEPS[step].title}</h2>
            <p className="text-sm text-ink-secondary">{STEPS[step].subtitle}</p>
          </div>

          {/* Animated step content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
            >
              {renderOptions()}
            </motion.div>
          </AnimatePresence>

          {/* Inline error */}
          <AnimatePresence>
            {showError && !canContinue && (
              <motion.p
                className="text-xs text-error mt-4"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {stepError(step)}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            {step < STEPS.length - 1 ? (
              <motion.button
                onClick={goNext}
                disabled={!canContinue}
                whileTap={canContinue ? { scale: 0.97 } : {}}
                animate={canContinue ? { opacity: 1 } : { opacity: 0.4 }}
                className="bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors flex items-center gap-1.5 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                onClick={handleSubmit}
                disabled={!canContinue}
                whileTap={canContinue ? { scale: 0.97 } : {}}
                animate={canContinue ? { opacity: 1 } : { opacity: 0.4 }}
                className="bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:cursor-not-allowed"
              >
                Build My Path
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
