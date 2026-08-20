import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { computeSkillGaps, computeProgressStats } from '../services/derivedData'
import { Send, Lightbulb, BookOpen, Target, HelpCircle, RefreshCw, Brain } from 'lucide-react'

function buildLearnerContext(profile) {
  if (!profile) return ''
  const parts = []
  if (profile.careerGoal) parts.push(`Career goal: ${profile.careerGoal}`)
  if (profile.experienceLevel) parts.push(`Level: ${profile.experienceLevel}`)
  if (profile.roadmap?.title) parts.push(`Currently learning: ${profile.roadmap.title}`)

  const gaps = computeSkillGaps(profile)
  const topGaps = gaps.filter(g => g.gap > 10).slice(0, 3)
  if (topGaps.length) parts.push(`Key skill gaps: ${topGaps.map(g => `${g.skill} (${g.current}%)`).join(', ')}`)

  const progress = computeProgressStats(profile)
  if (progress.topicsCompleted > 0) parts.push(`Topics completed: ${progress.topicsCompleted}/${progress.totalTopics}`)
  if (progress.assessmentScore != null) parts.push(`Assessment average: ${progress.assessmentScore}%`)

  const roadmap = profile?.roadmap
  const items = roadmap?.phases?.flatMap(p => p.items) || []
  const current = items.find(i => i.status === 'in-progress')
  if (current) parts.push(`Current topic: ${current.name}`)

  return parts.length ? `\n\n[Learner Context: ${parts.join(' | ')}]` : ''
}

const quickActions = [
  { label: 'Explain simply', icon: Lightbulb, prompt: (ctx) => `Explain the current topic in simple terms. Keep it under 150 words. Structure: 1) What it is (1-2 sentences), 2) A tiny example, 3) Why it matters, 4) One practical tip. No fluff.${ctx}` },
  { label: 'Give example', icon: BookOpen, prompt: (ctx) => `Give ONE practical code example for the current topic. Use a real-world scenario. Include brief comments. Keep it under 100 lines.${ctx}` },
  { label: 'Quiz me', icon: Target, prompt: (ctx) => `Create exactly 5 multiple-choice questions on the current topic. Each question has 4 options (A-D). Mark the correct answer with **. Keep questions focused on understanding, not memorization.${ctx}` },
  { label: 'Why do I need this?', icon: HelpCircle, prompt: (ctx) => `In 3-4 sentences, explain why this topic matters for my career goal. Give one concrete real-world use case. Be direct.${ctx}` },
]

const UNAVAILABLE_MSG = 'AI Tutor is temporarily unavailable.'

export default function AITutor() {
  const { currentUser } = useAuth()
  const { data: profile } = useActiveProfile()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEnd = useRef(null)
  const lastUserMsg = useRef(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const buildPayload = useCallback((text) => {
    const ctx = buildLearnerContext(profile)
    // backendId is the canonical server-side learner record for this Firebase
    // user (set by profileService reconciliation). Never fall back to a
    // hardcoded learner — the backend rejects requests without a real learnerId.
    const learnerId = profile?.backendId || profile?.userId || currentUser?.uid

    const history = messages.slice(-6).map(m => ({
      role: m.role,
      content: m.content,
    }))

    return {
      message: text + ctx,
      learnerId,
      history,
    }
  }, [profile, currentUser, messages])

  const callApi = useCallback(async (text, onDelta, attempt = 0) => {
    const payload = buildPayload(text)
    // Hard request timeout — a hung upstream must not leave the UI spinning.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 60_000)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || '/api'}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream, application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
      if (!res.ok) {
        console.warn(`[AITutor] Backend returned HTTP ${res.status}`, { learnerId: payload.learnerId ? '[set]' : '[missing]' })
        throw new Error(`HTTP ${res.status}`)
      }

      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('text/event-stream') && res.body) {
        // Progressive display: append deltas as they arrive.
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let full = ''
        let serverMessage = null
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (!line.startsWith('data:')) continue
            const payloadStr = line.substring(5).trim()
            if (!payloadStr) continue
            try {
              const obj = JSON.parse(payloadStr)
              if (obj.success === false) {
                serverMessage = obj.message || UNAVAILABLE_MSG
                continue
              }
              if (obj.delta) {
                full += obj.delta
                onDelta?.(full)
              }
            } catch {
              // skip malformed intermediate chunk
            }
          }
        }
        if (serverMessage) {
          console.warn(`[AITutor] Server reported: ${serverMessage}`)
          return serverMessage
        }
        return full || UNAVAILABLE_MSG
      }

      const data = await res.json()
      if (data.delta) return data.delta
      return data.content || UNAVAILABLE_MSG
    } catch (err) {
      console.warn(`[AITutor] Request failed (attempt ${attempt + 1}/3):`, err?.name === 'AbortError' ? 'timeout' : (err?.message || err))
      if (attempt < 2) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
        return callApi(text, onDelta, attempt + 1)
      }
      return UNAVAILABLE_MSG
    } finally {
      clearTimeout(timeout)
    }
  }, [buildPayload])

  const sendMessage = useCallback(async (text) => {
    const msg = text || input
    if (!msg.trim() || isTyping) return
    if (msg === lastUserMsg.current) return

    lastUserMsg.current = msg
    const userMsg = { id: Date.now(), role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const assistantId = Date.now() + 1
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', streaming: true }])

    const response = await callApi(msg, (delta) => {
      setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, content: delta } : m)))
    })
    setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, content: response, streaming: false } : m)))
    setIsTyping(false)
  }, [input, isTyping, callApi])

  const handleRetry = useCallback(() => {
    const lastUser = [...messages].reverse().find(m => m.role === 'user')
    if (lastUser) {
      setMessages(prev => prev.filter(m => m.id !== messages[messages.length - 1]?.id))
      sendMessage(lastUser.content)
    }
  }, [messages, sendMessage])

  return (
    <div className="page-enter h-[calc(100vh-4rem)] md:h-screen flex flex-col">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">AI Tutor</h1>
        <p className="text-sm text-ink-secondary mt-1">Ask anything about your learning path.</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Sidebar Context */}
        <div className="hidden md:block w-64 border-r border-surface-200 bg-white p-5 overflow-y-auto">
          <div className="mb-5">
            <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-2">Currently Learning</h3>
            <p className="text-sm font-medium text-ink">{profile?.roadmap?.title || '—'}</p>
          </div>
          <div className="mb-5">
            <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-2">Level</h3>
            <p className="text-sm font-medium text-ink">{profile?.experienceLevel || 'Beginner'}</p>
          </div>
          {profile?.careerGoal && (
            <div className="mb-5">
              <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-2">Career Goal</h3>
              <p className="text-sm font-medium text-ink">{profile.careerGoal}</p>
            </div>
          )}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-2">Quick Actions</h3>
            <div className="space-y-1.5">
              {quickActions.map((action, i) => {
                const Icon = action.icon
                return (
                  <button
                    key={i}
                    onClick={() => sendMessage(action.prompt(buildLearnerContext(profile)))}
                    disabled={isTyping}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-ink-secondary hover:bg-surface-50 hover:text-ink transition-colors disabled:opacity-40"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {action.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-surface-50">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                  <Brain className="w-7 h-7 text-brand-600" />
                </div>
                <h2 className="text-lg font-bold text-ink mb-2">How can I help?</h2>
                <p className="text-sm text-ink-secondary max-w-sm mb-6">
                  Ask me to explain concepts, give examples, quiz you, or help with your learning path.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {quickActions.map((action, i) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={i}
                        onClick={() => sendMessage(action.prompt(buildLearnerContext(profile)))}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-surface-200 text-xs text-ink-secondary hover:text-ink hover:border-brand-200 transition-colors"
                      >
                        <Icon className="w-3 h-3" />
                        {action.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] md:max-w-[70%] rounded-xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'bg-white border border-surface-200 text-ink'
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.streaming && !msg.content ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-ink-tertiary animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-ink-tertiary animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-ink-tertiary animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && !messages[messages.length - 1]?.streaming && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-start"
              >
                <div className="bg-white border border-surface-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-ink-tertiary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-ink-tertiary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-ink-tertiary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && messages[messages.length - 1]?.content?.includes('temporarily unavailable') && (
              <div className="flex justify-start">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-100 text-xs text-ink-secondary hover:bg-surface-200 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Retry
                </button>
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          {/* Mobile Quick Actions */}
          <div className="md:hidden px-4 pb-2 flex gap-2 overflow-x-auto">
            {quickActions.map((action, i) => {
              const Icon = action.icon
              return (
                <button
                  key={i}
                  onClick={() => sendMessage(action.prompt(buildLearnerContext(profile)))}
                  disabled={isTyping}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-surface-200 text-xs text-ink-secondary hover:text-ink transition-colors disabled:opacity-40"
                >
                  <Icon className="w-3 h-3" />
                  {action.label}
                </button>
              )
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-surface-200 bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask your question..."
                className="flex-1 bg-surface-50 border border-surface-200 rounded-lg px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand-300 focus:ring-1 focus:ring-brand-300"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-lg bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
