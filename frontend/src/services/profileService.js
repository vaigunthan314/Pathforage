// PathForge user profile store — the SINGLE canonical source of truth for a
// user's learning data, keyed by the Firebase UID.
//
//   Firebase UID  →  localStorage cache (fast)  +  backend `/api/learners/auth/{uid}`
//
// The backend is the durable remote store; localStorage is the offline/boot
// cache and a safety net when the backend (H2 in-memory) is restarted.
// The two are reconciled on every read so the most complete profile wins and
// is never downgraded by an empty default.

const STORAGE_KEY = 'pathforge.profiles'
const API_BASE = import.meta.env.VITE_API_URL || '/api'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let backendReady = null
let backendCheckedAt = 0

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch (e) {
    console.warn('[Profile] Failed to read localStorage:', e)
    return {}
  }
}

function writeAll(profiles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
  } catch (e) {
    console.warn('[Profile] Failed to write localStorage:', e)
  }
}

// Fast, cached availability probe. Falls back to localStorage if the backend
// is unreachable or too slow.
async function backendAvailable(force = false) {
  if (backendReady !== null && !force && Date.now() - backendCheckedAt < 15000) return backendReady
  backendCheckedAt = Date.now()
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 1500)
    const res = await fetch(`${API_BASE}/skills`, { signal: controller.signal })
    clearTimeout(timer)
    backendReady = res.ok
  } catch {
    backendReady = false
  }
  return backendReady
}

async function fetchProfileFromBackend(userId) {
  const res = await fetch(`${API_BASE}/learners/auth/${encodeURIComponent(userId)}`)
  if (!res.ok) throw new Error(`Backend profile request failed: ${res.status}`)
  const learner = await res.json()
  if (learner && learner.profileData) {
    const parsed = JSON.parse(learner.profileData)
    return {
      userId,
      backendId: learner.id,
      name: learner.name || parsed.name || '',
      email: learner.email || parsed.email || '',
      ...parsed,
    }
  }
  return null
}

async function saveProfileToBackend(profile) {
  const res = await fetch(`${API_BASE}/learners/auth/${encodeURIComponent(profile.userId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: profile.name,
      email: profile.email,
      profileData: JSON.stringify(profile),
    }),
  })
  if (!res.ok) throw new Error(`Backend profile save failed: ${res.status}`)
  const learner = await res.json()
  return { ...profile, backendId: learner.id }
}

// Merge any source into the canonical shape. Crucially, a profile is treated
// as onboarded when it has a career goal + roadmap even if the boolean flag is
// missing (protects against older/partial saves downgrading to onboarding).
export function defaultProfile(userId) {
  const now = new Date().toISOString()
  return {
    userId,
    uid: userId,
    name: '',
    email: '',
    avatar: '',
    careerGoal: '',
    currentSkills: [],
    experienceLevel: '',
    learningHours: '',
    targetDuration: '',
    learningPreference: '',
    priority: '',
    onboardingCompleted: false,
    roadmap: null,
    progress: {
      overallProgress: 0,
      roadmapCompletion: 0,
      currentStreak: 0,
      hoursLearned: 0,
      skillsMastered: 0,
      projectsCompleted: 0,
      topicsCompleted: 0,
      assessmentScore: null,
      weeklyActivity: [],
      skillProgress: [],
      completedProjects: [],
    },
    assessmentResults: [],
    learningDNA: null,
    projects: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function normalizeProfile(userId, src = {}) {
  const d = defaultProfile(userId)
  const merged = { ...d, ...src }
  return {
    ...merged,
    userId,
    uid: src.uid || userId,
    name: src.name || '',
    email: src.email || '',
    avatar: src.avatar || '',
    currentSkills: Array.isArray(src.currentSkills) ? src.currentSkills : d.currentSkills,
    assessmentResults: Array.isArray(src.assessmentResults) ? src.assessmentResults : d.assessmentResults,
    roadmap: src.roadmap || null,
    projects: Array.isArray(src.projects) ? src.projects : d.projects,
    progress: { ...d.progress, ...(src.progress || {}) },
    onboardingCompleted: Boolean(src.onboardingCompleted || (src.careerGoal && src.roadmap)),
    createdAt: src.createdAt || d.createdAt,
    updatedAt: src.updatedAt || new Date().toISOString(),
  }
}

// Load a user's canonical profile by Firebase UID.
// Order: backend (remote truth) → localStorage cache (fallback). The more
// complete source wins; the other is healed so they never diverge.
export async function getProfile(userId) {
  if (!userId) return null
  await delay(80)
  console.log(`[Profile] Loading UID: ${userId}`)

  const local = normalizeProfile(userId, readAll()[userId] || {})

  let backend = null
  let backendUp = false
  try {
    backendUp = await backendAvailable()
    if (backendUp) backend = normalizeProfile(userId, (await fetchProfileFromBackend(userId)) || {})
  } catch (e) {
    console.warn(`[Profile] Backend read failed for ${userId}, using local cache:`, e.message || e)
    backend = null
  }

  const localComplete = local.onboardingCompleted
  const backendComplete = backend?.onboardingCompleted
  const localHasData = Boolean(local.careerGoal || local.roadmap)
  const backendHasData = Boolean(backend?.careerGoal || backend?.roadmap)

  let chosen = local
  if (backendHasData && (!localHasData || backendComplete)) chosen = backend
  else if (!backendHasData && localHasData) chosen = local

  if (!chosen.onboardingCompleted && !chosen.careerGoal && !chosen.roadmap) {
    console.log(`[Profile] No profile found for UID: ${userId}`)
    return null
  }

  // Heal: push the complete local profile up to the backend, or refresh the
  // local cache with the backend's richer copy.
  if (backendUp) {
    if (!backendHasData && localHasData) {
      saveProfileToBackend(chosen).catch(e => console.warn('[Profile] Backend heal failed:', e.message || e))
    } else if (backendHasData && localHasData && backendComplete) {
      writeAll({ ...readAll(), [userId]: backend })
    }
  }

  writeAll({ ...readAll(), [userId]: chosen })
  console.log(`[Profile] Loaded UID: ${userId}`, chosen.onboardingCompleted ? 'onboarded' : 'incomplete')
  return chosen
}

// Persist a profile for a Firebase UID. Always writes the local cache first
// (so a page refresh within the same browser never loses data), then best-effort
// syncs to the backend.
export async function saveProfile(userId, data) {
  if (!userId) return null
  await delay(50)
  const merged = normalizeProfile(userId, { ...readAll()[userId], ...data })
  writeAll({ ...readAll(), [userId]: merged })
  try {
    if (await backendAvailable()) {
      const saved = await saveProfileToBackend(merged)
      writeAll({ ...readAll(), [userId]: saved })
      console.log(`[Profile] Saved UID: ${userId} (backend + cache)`)
      return saved
    }
  } catch (e) {
    console.warn(`[Profile] Backend save skipped for ${userId}:`, e.message || e)
  }
  console.log(`[Profile] Saved UID: ${userId} (local cache only)`)
  return merged
}

// Backwards-compatible aliases used by callers.
export async function createProfile(userId, data = {}) {
  return saveProfile(userId, data)
}

export async function updateProfile(userId, data) {
  return saveProfile(userId, data)
}

export function resetDemoProfiles() {
  writeAll({})
}
