import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'

export default function AuthNotConfigured({ heading = 'Authentication is not configured' }) {
  return (
    <div className="bg-white border border-surface-200 rounded-xl p-6">
      <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
        <Settings className="w-5 h-5 text-warning" />
      </div>
      <h2 className="text-base font-semibold text-ink mb-1">{heading}</h2>
      <p className="text-sm text-ink-secondary leading-relaxed mb-4">
        Google and email sign-in need Firebase credentials. Create a Firebase project
        (firebase.google.com) and enable the <strong>Google</strong> and{' '}
        <strong>Email/Password</strong> sign-in providers, then copy the config into a{' '}
        <code className="text-xs bg-surface-100 px-1 py-0.5 rounded">.env</code> file:
      </p>
      <pre className="text-[11px] leading-relaxed bg-surface-50 border border-surface-200 rounded-lg p-3 mb-4 overflow-x-auto text-ink-secondary">
{`VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...`}
      </pre>
      <p className="text-xs text-ink-tertiary mb-4">
        Also add <code className="text-[11px] bg-surface-100 px-1 py-0.5 rounded">localhost:5173</code> to the
        authorized domains in Firebase Authentication. Restart the app after adding the keys.
      </p>
      <Link to="/" className="text-sm font-medium text-brand-600 hover:text-brand-700">Back to home</Link>
    </div>
  )
}
