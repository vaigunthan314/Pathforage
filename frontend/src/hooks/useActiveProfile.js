import { useLearner } from '../context/LearnerContext'
import { useProfile } from '../context/ProfileContext'
import { completeRoadmapItem, addAssessmentToProfile } from '../services/derivedData'

// Single access point for the learner's canonical profile.
//
//   authenticated user  →  ProfileContext.profile  (persisted, UID-keyed)
//   demo mode           →  LearnerContext.demoProfile (in-memory canonical)
//
// All pages consume `data` through this hook so there is exactly ONE data
// source instead of each page inventing its own.
export function useActiveProfile() {
  const { isDemoMode, demoProfile, updateDemoProfile } = useLearner()
  const { profile, profileLoading, profileError, loadProfile, saveProfile, markTopicComplete, addAssessmentResult } = useProfile()

  const data = isDemoMode ? demoProfile : profile
  const loading = isDemoMode ? false : profileLoading
  const error = isDemoMode ? null : profileError

  const completeTopic = async (topicId, topicName, minutes) => {
    if (isDemoMode) {
      updateDemoProfile(p => completeRoadmapItem(p, topicId, minutes))
      return null
    }
    return markTopicComplete(topicId, topicName, minutes)
  }

  const saveAssessment = async (result) => {
    if (isDemoMode) {
      updateDemoProfile(p => addAssessmentToProfile(p, result))
      return null
    }
    return addAssessmentResult(result)
  }

  const updateProfile = async (dataUpdate) => {
    if (isDemoMode) {
      updateDemoProfile(p => ({ ...p, ...dataUpdate, updatedAt: new Date().toISOString() }))
      return null
    }
    return saveProfile(dataUpdate)
  }

  return {
    data,
    isDemoMode,
    loading,
    error,
    loadProfile,
    completeTopic,
    saveAssessment,
    updateProfile,
  }
}
