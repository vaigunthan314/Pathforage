import { Loader2, RefreshCw } from 'lucide-react'

export default function FullScreenLoader() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <Loader2 className="w-7 h-7 text-brand-600 animate-spin" />
    </div>
  )
}

export function AuthGateScreen({ label = 'Loading...', error = null, onRetry = null }) {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        {error ? (
          <>
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-error text-xl font-bold">!</span>
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">{label}</h2>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto mb-4" />
            <p className="text-sm font-medium text-ink">{label}</p>
          </>
        )}
      </div>
    </div>
  )
}
