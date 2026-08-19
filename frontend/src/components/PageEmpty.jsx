import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function PageEmpty({ title, message, ctaLabel, ctaTo }) {
  const navigate = useNavigate()
  return (
    <div className="p-6 md:p-10">
      <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6 text-brand-600" />
        </div>
        <h2 className="text-base font-semibold text-ink mb-1">{title}</h2>
        <p className="text-sm text-ink-secondary leading-relaxed mb-5">{message}</p>
        {ctaLabel && ctaTo && (
          <button
            onClick={() => navigate(ctaTo)}
            className="bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  )
}
