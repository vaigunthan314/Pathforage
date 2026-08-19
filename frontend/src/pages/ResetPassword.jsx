import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Loader2, ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react'
import AuthShell from '../components/AuthShell'
import AuthNotConfigured from '../components/AuthNotConfigured'
import { useAuth } from '../context/AuthContext'
import { isAuthConfigured, verifyResetCode, confirmPasswordReset } from '../services/authService'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)
  const [success, setSuccess] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [codeValid, setCodeValid] = useState(false)

  useEffect(() => {
    if (!oobCode || !isAuthConfigured) {
      setVerifying(false)
      return
    }
    let cancelled = false
    verifyResetCode(oobCode)
      .then(() => { if (!cancelled) setCodeValid(true) })
      .catch(() => { if (!cancelled) setCodeValid(false) })
      .finally(() => { if (!cancelled) setVerifying(false) })
    return () => { cancelled = true }
  }, [oobCode])

  const validate = () => {
    const next = {}
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    if (!confirm) next.confirm = 'Please confirm your password.'
    else if (password !== confirm) next.confirm = 'Passwords do not match.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setBusy(true)
    try {
      await confirmPasswordReset(oobCode, password)
      setSuccess(true)
    } catch (err) {
      setFormError(err.message || 'Could not reset your password. The link may have expired.')
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
      eyebrow="NEW PASSWORD"
      heading="Set your new password."
      description="Choose a strong password to secure your PathForge account."
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {!isAuthConfigured ? (
          <AuthNotConfigured />
        ) : verifying ? (
          <div className="flex flex-col items-center py-10">
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin mb-4" />
            <p className="text-sm text-ink-secondary">Verifying your reset link…</p>
          </div>
        ) : success ? (
          <>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-success" />
            </div>
            <h2 className="text-xl font-bold text-ink text-center mb-2">Password reset successful!</h2>
            <p className="text-sm text-ink-secondary text-center mb-6">
              Your password has been updated. You can now sign in with your new password.
            </p>
            <Link
              to="/signin"
              className="w-full bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go to Sign In
            </Link>
          </>
        ) : !codeValid ? (
          <>
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-50 mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-warning" />
            </div>
            <h2 className="text-xl font-bold text-ink text-center mb-2">Invalid or expired link</h2>
            <p className="text-sm text-ink-secondary text-center mb-6">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              to="/forgot-password"
              className="w-full bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              Request New Link
            </Link>
            <Link
              to="/signin"
              className="mt-3 w-full bg-white border border-surface-300 text-ink text-sm font-medium py-2.5 rounded-lg hover:border-brand-300 hover:bg-surface-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-ink mb-1">Create new password</h2>
            <p className="text-sm text-ink-secondary mb-6">
              Your new password must be at least 6 characters.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="new-password" className="block text-xs font-medium text-ink mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })) }}
                    placeholder="Enter new password"
                    className={`${inputClass(errors.password)} pr-11`}
                    autoComplete="new-password"
                    autoFocus
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

              <div>
                <label htmlFor="confirm-password" className="block text-xs font-medium text-ink mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); if (errors.confirm) setErrors(prev => ({ ...prev, confirm: '' })) }}
                    placeholder="Confirm new password"
                    className={`${inputClass(errors.confirm)} pr-11`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm && <p className="text-xs text-error mt-1">{errors.confirm}</p>}
              </div>

              {formError && (
                <p className="text-xs text-error bg-red-50 border border-red-100 rounded-lg px-3 py-2">{formError}</p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full bg-brand-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                Reset Password
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
