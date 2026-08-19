import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { generateRoadmap, EMPTY_PROGRESS } from '../services/roadmapGenerator'
import { resetRoadmapProgress } from '../services/derivedData'
import { Loader2, Save, Check } from 'lucide-react'

const GOALS = ['Java Developer', 'Full Stack Developer', 'Cloud Engineer', 'Data Scientist', 'DevOps Engineer', 'AI/ML Engineer']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const TIMES = ['30 min/day', '1 hour/day', '2 hours/day', '3+ hours/day']
const DURATIONS = ['1 month', '3 months', '6 months', '1 year']
const STYLES = ['Hands-on', 'Visual', 'Reading', 'Mixed']
const PRIORITIES = ['Career Switch', 'Job Prep', 'Skill Upgrade', 'Personal Interest']

function initialsOf(name) {
  return (name || '?').split(' ').filter(Boolean).slice(0, 2).map(p => p[0].toUpperCase()).join('') || '?'
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, placeholder = 'Select...' }) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-surface-50 border border-surface-200 rounded-lg px-3 py-2 text-sm text-ink focus:outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export default function Profile() {
  const { currentUser } = useAuth()
  const { data: profile, loading: profileLoading, updateProfile, loadProfile } = useActiveProfile()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const isPreferencesView = searchParams.get('view') === 'preferences'

  const [form, setForm] = useState(() => ({
    careerGoal: profile?.careerGoal || '',
    experienceLevel: profile?.experienceLevel || '',
    learningHours: profile?.learningHours || '',
    targetDuration: profile?.targetDuration || '',
    learningPreference: profile?.learningPreference || '',
    priority: profile?.priority || '',
  }))
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(prev => ({
      careerGoal: profile?.careerGoal || prev.careerGoal || '',
      experienceLevel: profile?.experienceLevel || prev.experienceLevel || '',
      learningHours: profile?.learningHours || prev.learningHours || '',
      targetDuration: profile?.targetDuration || prev.targetDuration || '',
      learningPreference: profile?.learningPreference || prev.learningPreference || '',
      priority: profile?.priority || prev.priority || '',
    }))
    setSaved(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.careerGoal, profile?.experienceLevel, profile?.learningHours, profile?.targetDuration, profile?.learningPreference, profile?.priority])

  const set = (key) => (value) => {
    setForm(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.careerGoal) { setError('Select a career goal.'); return }
    setError('')
    setSaving(true)
    try {
      const roadmap = generateRoadmap({ goal: form.careerGoal, timeline: form.targetDuration })
      const base = {
        careerGoal: form.careerGoal,
        experienceLevel: form.experienceLevel,
        learningHours: form.learningHours,
        targetDuration: form.targetDuration,
        learningPreference: form.learningPreference,
        priority: form.priority,
      }
      if (!profile?.roadmap || profile.careerGoal !== form.careerGoal) {
        // New roadmap for a new goal: reconcile topic-derived stats without
        // destroying hours, assessments, projects, or weekly activity.
        base.roadmap = roadmap
        if (!profile?.progress) {
          base.progress = EMPTY_PROGRESS
        } else {
          base.progress = resetRoadmapProgress(profile, roadmap).progress
        }
      }
      await updateProfile(base)
      setSaved(true)
    } catch (e) {
      console.error('Failed to save profile:', e)
      setError('Unable to save your profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const avatar = profile?.avatar || currentUser?.avatar || ''
  const name = profile?.name || currentUser?.name || ''
  const email = profile?.email || currentUser?.email || ''

  if (profileLoading) {
    return (
      <div className="p-6 md:p-10 max-w-2xl">
        <div className="bg-white rounded-2xl border border-surface-200 p-6 space-y-4">
          <div className="h-8 w-40 bg-surface-200 rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-surface-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-surface-200 rounded animate-pulse" />
              <div className="h-3 w-40 bg-surface-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <div className="px-6 md:px-10 pt-8 pb-6 border-b border-surface-200 bg-white">
        <h1 className="text-2xl font-bold text-ink">{isPreferencesView ? 'Learning Preferences' : 'Profile'}</h1>
        <p className="text-sm text-ink-secondary mt-1">
          {isPreferencesView ? 'Update what and how you want to learn.' : 'Your account and learning profile.'}
        </p>
      </div>

      <div className="p-6 md:p-10 max-w-2xl space-y-6">
        {/* Identity */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6">
          <div className="flex items-center gap-4">
            {avatar ? (
              <img src={avatar} alt="" className="w-16 h-16 rounded-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
            ) : null}
            <div className={`w-16 h-16 rounded-full bg-brand-100 items-center justify-center ${avatar ? 'hidden' : 'flex'}`}>
              <span className="text-xl font-semibold text-brand-700">{initialsOf(name)}</span>
            </div>
            <div>
              <div className="text-lg font-bold text-ink">{name || 'Learner'}</div>
              <div className="text-sm text-ink-secondary">{email}</div>              <span className="inline-flex items-center gap-1.5 mt-1.5 text-2xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                <Check className="w-3 h-3" />
                {profile?.onboardingCompleted ? 'Onboarding complete' : 'Onboarding pending'}
              </span>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div id="preferences" className="bg-white rounded-2xl border border-surface-200 p-6">
          <h2 className="text-base font-semibold text-ink mb-5">Learning Preferences</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <Field label="Career goal">
              <Select value={form.careerGoal} onChange={set('careerGoal')} options={GOALS} placeholder="Select your career goal" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Experience level">
                <Select value={form.experienceLevel} onChange={set('experienceLevel')} options={LEVELS} />
              </Field>
              <Field label="Learning hours">
                <Select value={form.learningHours} onChange={set('learningHours')} options={TIMES} />
              </Field>
              <Field label="Target duration">
                <Select value={form.targetDuration} onChange={set('targetDuration')} options={DURATIONS} />
              </Field>
              <Field label="Learning preference">
                <Select value={form.learningPreference} onChange={set('learningPreference')} options={STYLES} />
              </Field>
            </div>
            <Field label="Priority">
              <Select value={form.priority} onChange={set('priority')} options={PRIORITIES} />
            </Field>

            {error && <p className="text-xs text-error bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
            {saved && (
              <p className="text-xs text-success bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                Profile saved. Your roadmap was {profile?.careerGoal !== form.careerGoal ? 'regenerated' : 'updated'}.
              </p>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
              {!profile?.onboardingCompleted && (
                <button
                  type="button"
                  onClick={() => navigate('/onboarding')}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Complete onboarding
                </button>
              )}
            </div>
          </form>
        </div>

        {profile?.onboardingCompleted === false && !profile?.careerGoal && (
          <div className="text-center">
            <button onClick={() => navigate('/onboarding')} className="text-sm font-medium text-brand-600 hover:text-brand-700">
              Complete onboarding
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
