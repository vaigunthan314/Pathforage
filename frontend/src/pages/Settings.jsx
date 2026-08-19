import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { LogOut, ShieldCheck, RefreshCw, Loader2, User } from 'lucide-react'

export default function Settings() {
  const { currentUser, signOut } = useAuth()
  const { data: profile, loadProfile } = useActiveProfile()
  const navigate = useNavigate()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
    } catch (e) {
      console.error('Sign out failed:', e)
      setSigningOut(false)
      return
    }
    navigate('/signin', { replace: true })
  }

  const providerLabel = currentUser?.provider === 'google.com'
    ? 'Google'
    : currentUser?.provider === 'password'
      ? 'Email & password'
      : currentUser?.provider || 'Unknown'

  return (
    <div className="page-enter">
      <div className="px-6 md:px-10 pt-8 pb-6 border-b border-surface-200 bg-white">
        <h1 className="text-2xl font-bold text-ink">Account Settings</h1>
        <p className="text-sm text-ink-secondary mt-1">Manage your account and session.</p>
      </div>

      <div className="p-6 md:p-10 max-w-2xl space-y-6">
        {/* Account */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6">
          <h2 className="text-base font-semibold text-ink mb-4">Account</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{profile?.name || currentUser?.name}</div>
                  <div className="text-xs text-ink-tertiary">{profile?.email || currentUser?.email}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-ink">Signed in with {providerLabel}</div>
                <div className="text-xs text-ink-tertiary">Your session is managed by the authentication provider.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Session */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6">
          <h2 className="text-base font-semibold text-ink mb-1">Session</h2>
          <p className="text-xs text-ink-tertiary mb-4">End your session on this device. You can sign in again anytime.</p>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 bg-white border border-surface-300 text-ink text-sm font-medium px-5 py-2.5 rounded-lg hover:border-red-300 hover:text-error transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {signingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
            Log out
          </button>
        </div>

        {/* Sync */}
        <div className="bg-white rounded-2xl border border-surface-200 p-6">
          <h2 className="text-base font-semibold text-ink mb-1">Data</h2>
          <p className="text-xs text-ink-tertiary mb-4">Reload your learning profile from the latest saved state.</p>
          <button
            onClick={loadProfile}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <RefreshCw className="w-4 h-4" />
            Reload profile
          </button>
        </div>
      </div>
    </div>
  )
}
