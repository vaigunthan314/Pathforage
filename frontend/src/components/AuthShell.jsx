import { motion } from 'framer-motion'
import { Sparkles, Map, Brain, ShieldCheck } from 'lucide-react'

const highlights = [
  { icon: Sparkles, text: 'Personalized roadmap built from your goals' },
  { icon: Map, text: 'Structured path from beginner to job-ready' },
  { icon: Brain, text: 'Adaptive AI tutor that learns with you' },
  { icon: ShieldCheck, text: 'Progress tracking with clear milestones' },
]

export default function AuthShell({ eyebrow, heading, description, children }) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left — branding */}
      <div className="hidden lg:flex w-[45%] bg-surface-50 border-r border-surface-200 flex-col justify-between p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-base text-ink">PathForge</span>
          </div>

          <div className="eyebrow text-[11px] text-brand-600 font-semibold mb-3">{eyebrow}</div>
          <h1 className="text-3xl font-bold text-ink leading-tight mb-4">{heading}</h1>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-md">{description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {highlights.map((h, i) => {
            const Icon = h.icon
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-surface-200 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-brand-600" />
                </div>
                <span className="text-[13px] text-ink-secondary">{h.text}</span>
              </div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-ink-tertiary"
        >
          © 2026 PathForge. Your learning journey, forged ahead.
        </motion.p>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-base text-ink">PathForge</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
