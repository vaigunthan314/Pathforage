import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import AuthNotConfigured from '../components/AuthNotConfigured'
import GoogleIcon from '../components/GoogleIcon'
import { useAuth } from '../context/AuthContext'
import { isAuthConfigured } from '../services/authService'

export default function SignUp() {
  const { signUp, signInWithGoogle } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState('')

  const validate = () => {
    const next = {}
    if (!name.trim()) next.name = 'Name is required.'
    if (!email.trim()) next.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!confirm) next.confirm = 'Please confirm your password.'
    else if (confirm !== password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return
    setBusy('email')
    try {
      await signUp({ name, email, password })
      // Guard redirects to onboarding because the new profile has onboardingCompleted = false.
    } catch (err) {
      setFormError(err.message || 'Account creation failed.')
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

  const clearError = (key) => setErrors(prev => (prev[key] ? { ...prev, [key]: '' } : prev))

  const inputClass = (invalid) =>
    `w-full bg-surface-50 border rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-1 transition-colors ${
      invalid
        ? 'border-error focus:border-error focus:ring-error/30'
        : 'border-surface-200 focus:border-brand-300 focus:ring-brand-300'
    }`

  const passwordField = (id, value, onChange, show, setShow, placeholder, invalid, autoComplete) => (
    <div className="relative">
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass(invalid)} pr-11`}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        onClick={() => setShow(v => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  )

  return (
    <AuthShell
      eyebrow="START YOUR PATH"
      heading="Create your PathForge account."
      description="Tell us a little about yourself, then we'll build a personalized learning path around your career goal."
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
            <h2 className="text-xl font-bold text-ink mb-1">Create your account</h2>
            <p className="text-sm text-ink-secondary mb-6">Start your personalized learning journey.</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-ink mb-1.5">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError('name') }}
                  placeholder="Your full name"
                  className={inputClass(errors.name)}
                  autoComplete="name"
                />
                {errors.name && <p className="text-xs text-error mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-ink mb-1.5">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError('email') }}
                  placeholder="you@example.com"
                  className={inputClass(errors.email)}
                  autoComplete="email"
                />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-medium text-ink mb-1.5">Password</label>
                {passwordField('password', password, (e) => { setPassword(e.target.value); clearError('password') }, showPassword, setShowPassword, 'At least 8 characters', errors.password, 'new-password')}
                {errors.password && <p className="text-xs text-error mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirm" className="block text-xs font-medium text-ink mb-1.5">Confirm password</label>
                {passwordField('confirm', confirm, (e) => { setConfirm(e.target.value); clearError('confirm') }, showConfirm, setShowConfirm, 'Re-enter your password', errors.confirm, 'new-password')}
                {errors.confirm && <p className="text-xs text-error mt-1">{errors.confirm}</p>}
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
                Create Account
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
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-brand-600 hover:text-brand-700">
                Sign In
              </Link>
            </p>
          </>
        )}
      </motion.div>
    </AuthShell>
  )
}
