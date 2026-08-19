import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLearner } from '../context/LearnerContext'
import { useActiveProfile } from '../hooks/useActiveProfile'
import {
  LayoutDashboard,
  Brain,
  Target,
  Map,
  BookOpen,
  Rocket,
  BarChart3,
  Briefcase,
  MessageCircle,
  ClipboardCheck,
  LogOut,
  User as UserIcon,
  Settings,
  GraduationCap,
  Activity,
  ChevronUp,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Learn',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/learning-dna', label: 'Learning DNA', icon: Brain },
      { path: '/skill-gap', label: 'Skills', icon: Target },
      { path: '/roadmap', label: 'Roadmap', icon: Map },
    ],
  },
  {
    label: 'Build',
    items: [
      { path: '/recommendations', label: 'Learn', icon: BookOpen },
      { path: '/projects', label: 'Projects', icon: Rocket },
      { path: '/assessment', label: 'Assessments', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Grow',
    items: [
      { path: '/progress', label: 'Progress', icon: BarChart3 },
      { path: '/career-readiness', label: 'Career', icon: Briefcase },
      { path: '/ai-tutor', label: 'Tutor', icon: MessageCircle },
    ],
  },
  {
    label: 'Account',
    items: [
      { path: '/profile', label: 'Profile', icon: UserIcon },
      { path: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

const navItems = navGroups.flatMap(group => group.items)

function initialsOf(name) {
  return (name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0].toUpperCase())
    .join('') || '?'
}

const menuItems = [
  { to: '/profile', label: 'Profile', icon: UserIcon },
  { to: '/settings', label: 'Account Settings', icon: Settings },
  { to: '/profile', label: 'Learning Preferences', icon: GraduationCap, anchor: 'preferences' },
  { to: '/progress', label: 'My Progress', icon: Activity },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, signOut } = useAuth()
  const { data: profile } = useActiveProfile()
  const { isDemoMode } = useLearner()
  const [menuOpen, setMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const menuRef = useRef(null)

  const isLanding = location.pathname === '/'
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup'
  const isOnboarding = location.pathname === '/onboarding'

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  if (isLanding || isAuthPage || isOnboarding) return null

  const displayName = isDemoMode
    ? (profile?.name || currentUser?.name || 'Demo User')
    : (profile?.name || currentUser?.name || 'Learner')
  const email = isDemoMode ? 'demo' : (profile?.email || currentUser?.email || '')
  const goal = isDemoMode ? (profile?.careerGoal || 'Demo mode') : (profile?.careerGoal || 'Set your goal')
  const avatar = (profile?.avatar || currentUser?.avatar) || ''

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
    } catch (e) {
      console.error('Sign out failed:', e)
      setSigningOut(false)
      return
    }
    setMenuOpen(false)
    navigate('/signin', { replace: true })
  }

  const handleMenuItem = (item) => {
    setMenuOpen(false)
    if (item.anchor) navigate(`${item.to}${item.anchor ? `?view=${item.anchor}` : ''}`)
    else navigate(item.to)
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] bg-white border-r border-surface-200 flex-col z-40">
      <div className="h-16 flex items-center px-5 border-b border-surface-200">
        <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
          <span className="text-white font-bold text-xs">P</span>
        </div>
        <span className="ml-2 font-semibold text-sm text-ink">PathForge</span>
      </div>

      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        {navGroups.map((group, gi) => (
          <div key={group.label} className={gi > 0 ? 'mt-1' : ''}>
            <div className="text-[10px] font-semibold text-ink-tertiary/60 tracking-wider px-3 mt-5 mb-1.5 uppercase">
              {group.label}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 mb-0.5 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-secondary hover:bg-surface-100 hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-brand-600 rounded-full" />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-ink-tertiary'}`} />
                  {item.label}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div className="p-3 border-t border-surface-200 relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-surface-100 transition-colors"
          aria-expanded={menuOpen}
        >
          {avatar ? (
            <img src={avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
          ) : null}
          <div className={`w-8 h-8 rounded-full bg-brand-100 items-center justify-center flex-shrink-0 ${avatar ? 'hidden' : 'flex'}`}>
            <span className="text-xs font-semibold text-brand-700">{initialsOf(displayName)}</span>
          </div>
          <div className="min-w-0 text-left flex-1">
            <div className="text-xs font-medium text-ink truncate">{displayName}</div>
            <div className="text-2xs text-ink-tertiary truncate">{goal}</div>
          </div>
          <ChevronUp className={`w-3.5 h-3.5 text-ink-muted transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
        </button>

        {menuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-1 bg-white border border-surface-200 rounded-xl shadow-card-hover py-1.5 z-50">
            <div className="px-3 py-2 border-b border-surface-100">
              <div className="text-xs font-semibold text-ink truncate">{displayName}</div>
              <div className="text-2xs text-ink-tertiary truncate mt-0.5">{email}</div>
            </div>
            {menuItems.map((item, i) => {
              const Icon = item.icon
              return (
                <button
                  key={i}
                  onClick={() => handleMenuItem(item)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-ink-secondary hover:bg-surface-50 hover:text-ink transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-ink-secondary hover:bg-red-50 hover:text-error transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {signingOut ? 'Signing out...' : 'Log out'}
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export function MobileNav() {
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup'
  const isOnboarding = location.pathname === '/onboarding'

  if (isLanding || isAuthPage || isOnboarding) return null

  const mobileItems = navItems.slice(0, 5)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-surface-200 z-40">
      <div className="flex justify-around py-1.5">
        {mobileItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-3 py-1.5 rounded-lg text-2xs transition-all ${
                isActive ? 'text-brand-600' : 'text-ink-tertiary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="mt-0.5 font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
