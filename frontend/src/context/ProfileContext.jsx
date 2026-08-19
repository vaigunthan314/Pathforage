import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import * as profileService from '../services/profileService'
import { completeRoadmapItem, addAssessmentToProfile, migrateProfile } from '../services/derivedData'

const ProfileContext = createContext()

export function useProfile() {
  return useContext(ProfileContext)
}

export function ProfileProvider({ children }) {
  const { currentUser } = useAuth()
  const uid = currentUser?.uid || currentUser?.id || null
  const [profile, setProfile] = useState(null)
  const [profileError, setProfileError] = useState(null)
  const [loadedUid, setLoadedUid] = useState(null)

  // Derived loading state: the profile is "loading" until a load has
  // COMPLETED for the CURRENT authenticated user. This is evaluated during
  // render (not via effect timing), so there is never a frame where an
  // onboarded user is misrouted to /onboarding while their profile is about
  // to be restored from localStorage/backend.
  const profileLoading = uid ? loadedUid !== uid : false

  const loadProfile = useCallback(async () => {
    if (!currentUser) {
      setProfile(null)
      setProfileError(null)
      setLoadedUid(null)
      return
    }
    const uid = currentUser.uid || currentUser.id
    setProfileError(null)
    try {
      console.log(`[Profile] Loading profile for UID: ${uid}`)
      const existing = await profileService.getProfile(uid)
      if (!existing) {
        // Brand-new user: no profile yet. Do NOT create one here — the app
        // routes them to onboarding, which creates it on completion. This
        // guarantees a returning user is never shown onboarding again.
        console.log(`[Profile] No existing profile for UID: ${uid} (new user)`)
        setProfile(null)
      } else {
        // Heal stale/missing fields (skill progress, progress counters,
        // weekly activity) without resetting any real learner data.
        const migrated = migrateProfile(existing)
        if (migrated !== existing) {
          console.log(`[Profile] Migration applied for UID: ${uid}`)
          const saved = await profileService.saveProfile(uid, migrated)
          setProfile(saved)
        } else {
          setProfile(existing)
        }
        console.log(`[Profile] Profile loaded for UID: ${uid}`, (migrated || existing).onboardingCompleted ? 'onboarded' : 'incomplete')
      }
    } catch (e) {
      console.error(`[Profile] Failed to load profile for UID: ${uid}`, e)
      setProfileError('Unable to load your profile.')
    } finally {
      setLoadedUid(uid)
    }
  }, [currentUser?.uid, currentUser?.id])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const persist = useCallback(async (data) => {
    if (!currentUser) return null
    const uid = currentUser.uid || currentUser.id
    const saved = await profileService.saveProfile(uid, data)
    setProfile(saved)
    setLoadedUid(uid)
    return saved
  }, [currentUser?.uid, currentUser?.id])

  const saveProfile = useCallback(async (data) => {
    if (!currentUser) return null
    const prev = profile || {}
    const payload = {
      ...prev,
      ...data,
      uid: currentUser.uid || currentUser.id,
      name: data.name ?? prev.name ?? currentUser.name ?? '',
      email: data.email ?? prev.email ?? currentUser.email ?? '',
      avatar: data.avatar ?? prev.avatar ?? currentUser.avatar ?? '',
      onboardingCompleted: prev.onboardingCompleted || Boolean(data.roadmap) || false,
    }
    return persist(payload)
  }, [currentUser, profile, persist])

  const completeOnboarding = useCallback(async (learnerData) => {
    if (!currentUser) return null
    const uid = currentUser.uid || currentUser.id
    const now = new Date().toISOString()
    const payload = {
      ...learnerData,
      uid,
      userId: uid,
      name: learnerData.name || currentUser.name || '',
      email: learnerData.email || currentUser.email || '',
      avatar: learnerData.avatar || currentUser.avatar || '',
      onboardingCompleted: true,
      createdAt: profile?.createdAt || now,
      updatedAt: now,
    }
    console.log(`[Profile] Saving onboarding for UID: ${uid}`)
    const saved = await profileService.saveProfile(uid, payload)
    setProfile(saved)
    console.log(`[Profile] Onboarding complete for UID: ${uid}`)
    return saved
  }, [currentUser, profile])

  const addAssessmentResult = useCallback(async (result) => {
    if (!currentUser) return null
    const uid = currentUser.uid || currentUser.id
    const prev = profile || {}
    const updated = addAssessmentToProfile(prev, result)
    const saved = await profileService.saveProfile(uid, updated)
    setProfile(saved)
    console.log(`[Profile] Assessment saved for UID: ${uid}`, result.topic, result.score)
    return saved
  }, [currentUser, profile])

  const markTopicComplete = useCallback(async (topicId, topicName, minutes) => {
    if (!currentUser) return null
    const uid = currentUser.uid || currentUser.id
    const prev = profile
    if (!prev?.roadmap) return prev
    const updated = completeRoadmapItem(prev, topicId, minutes)
    if (updated === prev) return prev
    const saved = await profileService.saveProfile(uid, updated)
    setProfile(saved)
    console.log(`[Profile] Topic completed for UID: ${uid}`, topicName || topicId)
    return saved
  }, [currentUser, profile])

  const value = {
    profile,
    profileLoading,
    profileError,
    loadProfile,
    saveProfile,
    completeOnboarding,
    addAssessmentResult,
    markTopicComplete,
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}
