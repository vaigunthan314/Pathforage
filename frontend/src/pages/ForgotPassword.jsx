import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import AuthNotConfigured from '../components/AuthNotConfigured'
import { useAuth } from '../context/AuthContext'
import { isAuthConfigured } from '../services/authService'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const validate = (value) => {
    if (!value.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const msg = validate(email)
    if (msg) { setError(msg); return }

    setBusy(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Could not send the reset email. Please try again.')
    } finally {
      setBusy(false)
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
      eyebrow="PASSWORD RESET"
      heading="Recover your PathForge account."
      description="We'll send you a link to reset your password and get you back on your learning path."
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {!isAuthConfigured ? (
          <AuthNotConfigured />
        ) : sent ? (
          <>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <h2 className="text-xl font-bold text-ink text-center mb-2">Password reset link sent!</h2>
            <p className="text-sm text-ink-secondary text-center mb-6 leading-relaxed">
              We sent a password reset link to{' '}
              <span className="font-medium text-ink">{email}</span>.
              <br />
              Please check your inbox and spam folder.
            </p>
            <Link
              to="/signin"
              className="w-full bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-ink mb-1">Forgot your password?</h2>
            <p className="text-sm text-ink-secondary mb-6">
              Enter the email address associated with your PathForge account.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-xs font-medium text-ink mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError('') }}
                    placeholder="you@example.com"
                    className={`${inputClass(error)} pl-10`}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                {error && <p className="text-xs text-error mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={busy}
                className="w-full bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                Send Reset Link
              </button>
            </form>

            <Link
              to="/signin"
              className="mt-5 w-full bg-white border border-surface-300 text-ink text-sm font-medium py-2.5 rounded-lg hover:border-brand-300 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </>
        )}
      </motion.div>
    </AuthShell>
  )
}
