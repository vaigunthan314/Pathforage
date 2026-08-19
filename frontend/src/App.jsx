import { BrowserRouter as Router, Routes, Route, useLocation, useSearchParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LearnerProvider, useLearner } from './context/LearnerContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ProfileProvider, useProfile } from './context/ProfileContext'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar, { MobileNav } from './components/Sidebar'
import { AuthGateScreen } from './components/AuthGate'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import LearningDNA from './pages/LearningDNA'
import SkillGap from './pages/SkillGap'
import Roadmap from './pages/Roadmap'
import Recommendations from './pages/Recommendations'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Assessment from './pages/Assessment'
import Progress from './pages/Progress'
import CareerReadiness from './pages/CareerReadiness'
import AITutor from './pages/AITutor'
import LearnTopic from './pages/LearnTopic'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'

const PUBLIC_PATHS = ['/', '/signin', '/signup', '/onboarding', '/forgot-password', '/reset-password']

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AppLayout() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const path = location.pathname
  const isPublic = PUBLIC_PATHS.includes(path)
  const isDemoOnboarding = path === '/onboarding' && searchParams.get('demo') === 'true'

  const { currentUser, loading: authLoading } = useAuth()
  const { profile, profileLoading, profileError, loadProfile } = useProfile()
  const { isDemoMode, setIsDemoMode } = useLearner()

  // Demo mode is for unauthenticated exploration only. The moment a real
  // Firebase user is present, it must be turned off so demo data never
  // appears for an authenticated account.
  useEffect(() => {
    if (currentUser && isDemoMode) setIsDemoMode(false)
  }, [currentUser, isDemoMode, setIsDemoMode])

  let gate = null
  let showChrome = false

  // Never route until Firebase auth state has resolved.
  if (authLoading) {
    console.log('[App] Waiting for Firebase auth state...')
    gate = <AuthGateScreen label="Checking your session..." />
  } else if (isDemoMode && !currentUser) {
    // Unauthenticated demo exploration — full access with demo data only.
    showChrome = !isPublic
  } else if (!currentUser) {
    // Unauthenticated, not in demo — only public pages are reachable.
    if (!isPublic) return <Navigate to="/signin" replace />
    if (path === '/onboarding' && !isDemoOnboarding) return <Navigate to="/signin" replace />
    showChrome = false
  } else {
    // Authenticated — demo mode must never apply to a real account.
    if (isDemoMode) setIsDemoMode(false)
    console.log(`[App] Auth user: ${currentUser.uid || currentUser.id}`)
    // Wait for the canonical profile (which holds roadmap, progress, assessments).
    if (profileLoading) {
      gate = <AuthGateScreen label="Loading your profile..." />
    } else if (profileError) {
      if (!isPublic) gate = <AuthGateScreen label="Unable to load your profile." error={profileError} onRetry={loadProfile} />
      else showChrome = false
    } else {
      const onboarded = profile?.onboardingCompleted === true
      console.log(`[App] Profile onboarded: ${onboarded}`)
      // Authenticated routing decisions.
      if (path === '/signin' || path === '/signup') {
        return <Navigate to={onboarded ? '/dashboard' : '/onboarding'} replace />
      }
      if (path === '/onboarding') {
        if (onboarded) return <Navigate to="/dashboard" replace />
        showChrome = false
      } else if (!isPublic && !onboarded) {
        return <Navigate to="/onboarding" replace />
      } else {
        showChrome = !isPublic
      }
    }
  }

  if (gate) {
    return (
      <div className="min-h-screen bg-surface-50">
        <main className="min-h-screen">{gate}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50">
      {showChrome && <Sidebar />}
      {showChrome && <MobileNav />}
      <main className={`min-h-screen pb-20 md:pb-0 ${showChrome ? 'md:ml-[220px]' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
            <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
            <Route path="/reset-password" element={<PageTransition><ResetPassword /></PageTransition>} />
            <Route path="/onboarding" element={<PageTransition><Onboarding /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/learning-dna" element={<PageTransition><LearningDNA /></PageTransition>} />
            <Route path="/skill-gap" element={<PageTransition><SkillGap /></PageTransition>} />
            <Route path="/roadmap" element={<PageTransition><Roadmap /></PageTransition>} />
            <Route path="/recommendations" element={<PageTransition><Recommendations /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/projects/:projectId" element={<PageTransition><ProjectDetail /></PageTransition>} />
            <Route path="/learn/:topicId" element={<PageTransition><LearnTopic /></PageTransition>} />
            <Route path="/assessment" element={<PageTransition><Assessment /></PageTransition>} />
            <Route path="/progress" element={<PageTransition><Progress /></PageTransition>} />
            <Route path="/career-readiness" element={<PageTransition><CareerReadiness /></PageTransition>} />
            <Route path="/ai-tutor" element={<PageTransition><AITutor /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <LearnerProvider>
            <Router>
              <AppLayout />
            </Router>
          </LearnerProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
