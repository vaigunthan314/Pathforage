import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import AuthNotConfigured from '../components/AuthNotConfigured'
import GoogleIcon from '../components/GoogleIcon'
import { useAuth } from '../context/AuthContext'
import { isAuthConfigured } from '../services/authService'

export default function SignIn() {
  const { signInWithEmail, signInWithGoogle } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState('')

  const validate = () => {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setBusy('email')
    try {
      await signInWithEmail({ email, password })
      // Routing is handled by the auth guard based on the real profile.
    } catch (err) {
      setFormError(err.message || 'Sign-in could not be completed.')
    } finally {
      setBusy('')
    }
  }

  const handleGoogle = async () => {
    setFormError('')
    setBusy('google')
    try {
      await signInWithGoogle()
    } catch (err) {
      setFormError(err.message || 'Google sign-in could not be completed.')
    } finally {
      setBusy('')
    }
  }

  const inputClass = (invalid) =>
    `w-full bg-surface-50 border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 transition-colors ${
      invalid
        ? 'border-error focus:border-error focus:ring-error/30'
        : 'border-surface-200 focus:border-brand-300 focus:ring-brand-300'
    }`

  return (
    <AuthShell
      eyebrow="WELCOME BACK"
      heading="Continue building your learning path."
      description="Sign in to continue your personalized learning journey. Your roadmap, progress, and tutor are waiting for you."
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {!isAuthConfigured ? (
          <AuthNotConfigured />
        ) : (
          <>
            <h2 className="text-xl font-bold text-ink mb-1">Sign in to PathForge</h2>
            <p className="text-sm text-ink-secondary mb-6">Access your personalized learning path.</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-ink mb-1.5">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })) }}
                  placeholder="you@example.com"
                  className={inputClass(errors.email)}
                  autoComplete="email"
                />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-xs font-medium text-ink">Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-brand-600 hover:text-brand-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })) }}
                    placeholder="Enter your password"
                    className={`${inputClass(errors.password)} pr-11`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-error mt-1">{errors.password}</p>}
              </div>

              {formError && (
                <p className="text-xs text-error bg-red-50 border border-red-100 rounded-lg px-3 py-2">{formError}</p>
              )}

              <button
                type="submit"
                disabled={Boolean(busy)}
                className="w-full bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busy === 'email' && <Loader2 className="w-4 h-4 animate-spin" />}
                Sign In
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-surface-200" />
              <span className="text-xs text-ink-tertiary">OR</span>
              <div className="flex-1 h-px bg-surface-200" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={Boolean(busy)}
              className="w-full bg-white border border-surface-300 text-ink text-sm font-medium py-2.5 rounded-lg hover:border-brand-300 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy === 'google' ? <Loader2 className="w-4 h-4 animate-spin text-brand-600" /> : <GoogleIcon />}
              Continue with Google
            </button>

            <p className="text-center text-sm text-ink-secondary mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-brand-600 hover:text-brand-700">
                Create account
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </AuthShell>
  )
}
