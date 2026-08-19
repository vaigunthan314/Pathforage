import { createContext, useContext, useState, useEffect } from 'react'
import { DEMO_PROFILE } from '../data/demoProfile'

const LearnerContext = createContext()

export function useLearner() {
  return useContext(LearnerContext)
}

export function LearnerProvider({ children }) {
  const [learner, setLearner] = useState(null)
  const [demoProfile, setDemoProfile] = useState(DEMO_PROFILE)
  const [roadmap, setRoadmap] = useState(null)
  const [progress, setProgress] = useState(null)
  const [skillGaps, setSkillGaps] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [assessment, setAssessment] = useState(null)
  const [learningDNA, setLearningDNA] = useState(null)
  const [isDemoMode, setIsDemoModeState] = useState(() => {
    try {
      return sessionStorage.getItem('pathforge.demo') === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      if (isDemoMode) sessionStorage.setItem('pathforge.demo', 'true')
      else sessionStorage.removeItem('pathforge.demo')
    } catch {
      // storage unavailable
    }
  }, [isDemoMode])

  const setIsDemoMode = (value) => setIsDemoModeState(Boolean(value))

  const updateLearner = (data) => {
    setLearner(prev => ({ ...prev, ...data }))
  }

  // Demo mode holds the canonical demo profile in memory so every page renders
  // real content. Mutations (complete topic, save assessment) update this state.
  const updateDemoProfile = (updater) => {
    setDemoProfile(prev => (typeof updater === 'function' ? updater(prev) : updater))
  }

  const value = {
    learner,
    setLearner,
    updateLearner,
    demoProfile,
    setDemoProfile,
    updateDemoProfile,
    roadmap,
    setRoadmap,
    progress,
    setProgress,
    skillGaps,
    setSkillGaps,
    recommendations,
    setRecommendations,
    assessment,
    setAssessment,
    learningDNA,
    setLearningDNA,
    isDemoMode,
    setIsDemoMode,
  }

  return (
    <LearnerContext.Provider value={value}>
      {children}
    </LearnerContext.Provider>
  )
}
