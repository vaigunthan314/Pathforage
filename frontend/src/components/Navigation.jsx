import { Link, useLocation } from 'react-router-dom'
import { useLearner } from '../context/LearnerContext'
import ThemeSwitcher from './ThemeSwitcher'
import {
  Home,
  User,
  Map,
  BookOpen,
  Target,
  BarChart3,
  MessageCircle,
  Briefcase,
  Rocket
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/learning-dna', label: 'DNA', icon: User },
  { path: '/skill-gap', label: 'Skills', icon: Target },
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/recommendations', label: 'Learn', icon: BookOpen },
  { path: '/projects', label: 'Projects', icon: Rocket },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
  { path: '/career-readiness', label: 'Career', icon: Briefcase },
  { path: '/ai-tutor', label: 'Tutor', icon: MessageCircle },
]

export default function Navigation() {
  const location = useLocation()
  const { learner, isDemoMode } = useLearner()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-white">PathForge</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-dark-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            {isDemoMode && (
              <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 text-xs font-medium rounded-md border border-purple-500/20">
                Demo
              </span>
            )}
            <ThemeSwitcher />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {learner?.name?.charAt(0) || 'A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5">
        <div className="flex justify-around py-2 px-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isActive ? 'text-white' : 'text-dark-500 hover:text-dark-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="mt-0.5">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
