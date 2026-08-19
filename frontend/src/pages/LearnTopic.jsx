import { useState, useRef, useMemo } from 'react'
import { useParams, useSearchParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { getResourceByName, normalizeResourceId, getTopicDocsUrl } from '../data/contentResolver'
import { TOPIC_EXTRAS } from '../data/learningContent'
import { ArrowLeft, CheckCircle2, BookOpen, Code, HelpCircle, Check, Clock, Target, ListChecks, Wrench, Rocket, ArrowRight, GraduationCap, ExternalLink, Play, X } from 'lucide-react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function LearnTopic() {
  const { topicId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data, completeTopic, saveAssessment } = useActiveProfile()

  // Actual time spent in the lesson — the real source of Learning Time.
  const openedAtRef = useRef(Date.now())

  const topicName = searchParams.get('name') || null
  const resolved = useMemo(() => {
    if (topicName) return getResourceByName(topicName)
    const normalized = normalizeResourceId(topicId)
    const nameFromSlug = normalized.replace(/-/g, ' ')
    return getResourceByName(nameFromSlug)
  }, [topicName, topicId])

  const roadmap = data?.roadmap
  const allItems = roadmap?.phases?.flatMap(p => p.items) || []
  const normId = (id) => normalizeResourceId(id || '')
  const item = allItems.find(i => i.id === topicId) || allItems.find(i => normId(i.id) === normId(topicId))
  const roadmapItemId = item ? item.id : topicId
  const isCompleted = item?.status === 'completed'
  const phase = roadmap?.phases?.find(p => p.items?.some(i => i.id === roadmapItemId))

  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState({})
  const [completing, setCompleting] = useState(false)
  const [savedResult, setSavedResult] = useState(false)
  const savingRef = useRef(false)

  const content = resolved?.data || null

  if (!content) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <button onClick={() => navigate('/roadmap')} className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 transition-colors mb-3">
            <ArrowLeft className="w-4 h-4" /> Back to Roadmap
          </button>
          <h1 className="text-xl font-bold text-ink">{topicName || 'Topic'}</h1>
        </div>
        <div className="p-6 max-w-4xl">
          <div className="bg-white rounded-xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Content not available yet</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              We're still building content for this topic. Check the roadmap for other learning resources.
            </p>
            <Link to="/roadmap" className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Roadmap
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const practice = Array.isArray(content.practice) ? content.practice : []
  const totalQuestions = practice.length
  const answeredCount = Object.keys(quizSubmitted).filter(k => quizSubmitted[k]).length
  const correctCount = practice.filter((q, qIdx) => {
    const key = `q-${qIdx}`
    return quizSubmitted[key] && quizAnswers[key] === q.correctIndex
  }).length
  const quizComplete = totalQuestions > 0 && answeredCount === totalQuestions
  const quizScore = quizComplete ? Math.round((correctCount / totalQuestions) * 100) : null

  const fromPath = location.state?.from || null
  const goBack = () => {
    if (fromPath) navigate(fromPath)
    else if (window.history.length > 1) navigate(-1)
    else navigate('/roadmap')
  }

  const handleQuizAnswer = (qIdx, answerIdx) => {
    const key = `q-${qIdx}`
    if (quizSubmitted[key]) return
    setQuizAnswers({ ...quizAnswers, [key]: answerIdx })
  }

  const submitQuiz = (qIdx) => {
    const key = `q-${qIdx}`
    if (quizSubmitted[key] || quizAnswers[key] === undefined) return
    const next = { ...quizSubmitted, [key]: true }
    setQuizSubmitted(next)

    const allAnswered = Object.keys(next).filter(k => next[k]).length
    if (allAnswered === totalQuestions && !savedResult && !savingRef.current) {
      savingRef.current = true
      const correct = practice.filter((q, i) => next[`q-${i}`] && quizAnswers[`q-${i}`] === q.correctIndex).length
      const score = Math.round((correct / totalQuestions) * 100)
      const result = {
        topic: topicName || content.title || topicId,
        score,
        type: 'quiz',
      }
      Promise.resolve(saveAssessment(result)).then(() => {
        setSavedResult(true)
        savingRef.current = false
      })
    }
  }

  const handleComplete = async () => {
    if (completing || isCompleted) return
    // Never allow a locked topic to be force-completed via a direct URL.
    if (item && item.status === 'locked') {
      navigate('/roadmap')
      return
    }
    setCompleting(true)
    try {
      // Tracked minutes: elapsed time in the lesson, clamped to [5, 120].
      const elapsedMinutes = Math.round((Date.now() - openedAtRef.current) / 60000)
      await completeTopic(roadmapItemId || content.title, topicName || content.title, elapsedMinutes)
    } finally {
      setCompleting(false)
    }
  }

  const nextUp = allItems.find(i => i.status === 'in-progress' || i.status === 'available')
  const phaseCompleted = phase ? phase.items.filter(i => i.status === 'completed').length : 0
  const phaseTotal = phase?.items?.length || 0
  const phaseProgress = phaseTotal ? Math.round((phaseCompleted / phaseTotal) * 100) : 0

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent((topicName || content.title || '').replace(/\s+/g, '+') + '+tutorial')}`
  const docsUrl = content.docsUrl || getTopicDocsUrl(topicName || content.title)
  // Difficulty derived from roadmap phase position (real roadmap data).
  const phaseIdx = phase?.id != null ? Number(phase.id) : 0
  const difficultyLabel = item?.type === 'project'
    ? 'Project'
    : phaseIdx <= 1 ? 'Beginner' : phaseIdx <= 3 ? 'Intermediate' : 'Advanced'
  const difficultyColorMap = {
    Beginner: 'bg-green-50 text-success border-green-200',
    Intermediate: 'bg-brand-50 text-brand-700 border-brand-200',
    Advanced: 'bg-amber-50 text-warning border-amber-200',
    Project: 'bg-surface-100 text-ink-secondary border-surface-200',
  }

  return (
    <div className="page-enter pb-16">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white sticky top-0 z-10">
        <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-700 transition-colors mb-3">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-xl font-bold text-ink">{content.title || topicName}</h1>
        {content.subtitle && (
          <p className="text-sm text-ink-secondary mt-1 max-w-2xl">{content.subtitle}</p>
        )}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {content.estimatedTime && (
            <span className="inline-flex items-center gap-1 text-xs text-ink-tertiary">
              <Clock className="w-3 h-3" /> {content.estimatedTime}
            </span>
          )}
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold uppercase tracking-wide border ${difficultyColorMap[difficultyLabel] || difficultyColorMap.Beginner}`}>
            {difficultyLabel}
          </span>
          {phaseTotal > 0 && (
            <span className="inline-flex items-center gap-1.5 ml-auto">
              <span className="text-xs text-ink-tertiary">Phase progress: {phaseProgress}%</span>
              <span className="w-20 bg-surface-200 rounded-full h-1.5 overflow-hidden">
                <span className="block bg-brand-600 h-1.5 rounded-full" style={{ width: `${phaseProgress}%` }} />
              </span>
            </span>
          )}
        </div>
      </div>

      <div className="p-6 max-w-4xl space-y-6">
        {isCompleted && (
          <motion.div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3" {...fade(0)}>
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            <div>
              <p className="text-sm text-green-800">
                <span className="font-semibold">Great work!</span>
                {nextUp ? ` Topic complete. Next up: ${nextUp.name}.` : ' All roadmap topics finished — great job!'}
              </p>
            </div>
            {nextUp && (
              <Link
                to={`/learn/${nextUp.id}?name=${encodeURIComponent(nextUp.name)}`}
                className="ml-auto inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Continue to Next Topic <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {!nextUp && (
              <button onClick={goBack} className="ml-auto text-xs font-medium px-3 py-1.5 rounded-lg bg-white border border-green-200 text-success hover:bg-green-100 transition-colors">
                View Roadmap
              </button>
            )}
          </motion.div>
        )}

        {content.whyItMatters && (
          <motion.div className="bg-brand-50 rounded-xl border border-brand-200 p-5" {...fade(0.05)}>
            <h2 className="text-sm font-semibold text-brand-700 mb-2">Why This Matters</h2>
            <p className="text-sm text-ink-secondary leading-relaxed">{content.whyItMatters}</p>
          </motion.div>
        )}

        {content.learningObjectives && content.learningObjectives.length > 0 && (
          <motion.div className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.1)}>
            <h2 className="text-sm font-semibold text-ink mb-3">Learning Objectives</h2>
            <ul className="space-y-2">
              {content.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" /> {obj}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {content.sections && content.sections.map((section, sectionIdx) => (
          <motion.div key={sectionIdx} className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.15 + sectionIdx * 0.06)}>
            <h3 className="text-base font-semibold text-ink mb-2">{section.title}</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-4">{section.content}</p>
            {section.codeSnippet && (
              <div className="relative rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700">
                  <Code className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-2xs font-medium text-gray-400 uppercase tracking-wide">{section.codeSnippet.language || 'code'}</span>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm text-gray-200 font-mono leading-relaxed whitespace-pre">{section.codeSnippet.code}</code>
                </pre>
              </div>
            )}
            {section.examples && section.examples.length > 0 && (
              <div className="mt-4 space-y-1">
                <span className="text-2xs font-medium text-ink-secondary uppercase tracking-wide">Examples</span>
                <ul className="space-y-1">
                  {section.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-ink bg-surface-50 rounded-md px-3 py-1.5 font-mono">{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}

        {/* Real-World Use */}
        {(content.realWorldUse || TOPIC_EXTRAS[content.title]?.realWorldUse) && (
          <motion.div className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.42)}>
            <h2 className="text-sm font-semibold text-ink flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4 text-brand-600" /> Real-World Use
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {content.realWorldUse || TOPIC_EXTRAS[content.title].realWorldUse}
            </p>
          </motion.div>
        )}

        {/* Common Mistakes */}
        {(content.commonMistakes || TOPIC_EXTRAS[content.title]?.commonMistakes) && (
          <motion.div className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.44)}>
            <h2 className="text-sm font-semibold text-ink flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-warning" /> Common Mistakes
            </h2>
            <ul className="space-y-2">
              {(content.commonMistakes || TOPIC_EXTRAS[content.title].commonMistakes).map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                  <X className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" /> {m}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Watch & Explore */}
        <motion.div className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.4)}>
          <h2 className="text-sm font-semibold text-ink flex items-center gap-2 mb-4">
            <Play className="w-4 h-4 text-brand-600" /> Watch & Explore
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
            >
              <Play className="w-4 h-4" /> Watch on YouTube <ExternalLink className="w-3 h-3" />
            </a>
            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <BookOpen className="w-4 h-4" /> Official Docs <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>

        {content.keyTakeaways && content.keyTakeaways.length > 0 && (
          <motion.div className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.45)}>
            <h2 className="text-sm font-semibold text-ink mb-3">Key Takeaways & Summary</h2>
            <ul className="space-y-2">
              {content.keyTakeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                  <Check className="w-4 h-4 text-brand-600 mt-0.5 flex-shrink-0" /> {t}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Quiz Section */}
        {practice.length > 0 && (
          <motion.div className="bg-white rounded-xl border border-surface-200 p-5" {...fade(0.5)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                <h2 className="text-sm font-semibold text-ink">Quiz</h2>
              </div>
              {answeredCount > 0 && (
                <span className="text-xs text-ink-tertiary">{correctCount}/{totalQuestions} correct</span>
              )}
            </div>

            {quizComplete && quizScore !== null && (
              <div className={`mb-6 p-4 rounded-xl ${quizScore >= 60 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${quizScore >= 60 ? 'bg-green-100' : 'bg-amber-100'}`}>
                    <span className={`text-lg font-bold ${quizScore >= 60 ? 'text-success' : 'text-warning'}`}>{quizScore}%</span>
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${quizScore >= 60 ? 'text-green-800' : 'text-amber-800'}`}>Quiz Completed!</div>
                    <div className="text-xs text-ink-secondary">{correctCount}/{totalQuestions} questions correct</div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {practice.map((q, qIdx) => {
                const key = `q-${qIdx}`
                const selectedAnswer = quizAnswers[key]
                const isSubmitted = quizSubmitted[key]
                const isCorrect = selectedAnswer === q.correctIndex

                return (
                  <div key={qIdx} className="border border-surface-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-ink mb-3">{qIdx + 1}. {q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        let optionClass = 'border-surface-200 bg-white hover:border-brand-300'
                        if (isSubmitted) {
                          if (optIdx === q.correctIndex) optionClass = 'border-success bg-green-50'
                          else if (optIdx === selectedAnswer && !isCorrect) optionClass = 'border-red-300 bg-red-50'
                          else optionClass = 'border-surface-200 bg-surface-50 opacity-60'
                        } else if (selectedAnswer === optIdx) {
                          optionClass = 'border-brand-400 bg-brand-50'
                        }

                        return (
                          <label key={optIdx} className={`flex items-center gap-3 text-sm text-ink border rounded-lg px-3 py-2.5 cursor-pointer transition-all ${optionClass} ${isSubmitted ? 'pointer-events-none' : ''}`}>
                            <input type="radio" name={key} checked={selectedAnswer === optIdx} onChange={() => handleQuizAnswer(qIdx, optIdx)} disabled={isSubmitted} className="sr-only" />
                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedAnswer === optIdx
                                ? isSubmitted && isCorrect ? 'border-success bg-success'
                                : isSubmitted && !isCorrect ? 'border-red-400 bg-red-400'
                                : 'border-brand-600 bg-brand-600'
                                : 'border-surface-300'
                            }`}>
                              {selectedAnswer === optIdx && <span className="w-2 h-2 rounded-full bg-white" />}
                              {isSubmitted && optIdx === q.correctIndex && <Check className="w-3 h-3 text-white" />}
                            </span>
                            {opt}
                          </label>
                        )
                      })}
                    </div>
                    {!isSubmitted && (
                      <button onClick={() => submitQuiz(qIdx)} disabled={selectedAnswer === undefined}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                        Check Answer
                      </button>
                    )}
                    {isSubmitted && (
                      <div className={`mt-3 p-3 rounded-lg text-sm ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        <span className="font-medium">{isCorrect ? '✓ Correct!' : '✕ Incorrect'}</span>
                        {q.explanation && <span className="ml-1">{q.explanation}</span>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Navigation and Complete */}
        <motion.div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-surface-200" {...fade(0.55)}>
          <button onClick={goBack} className="inline-flex items-center gap-2 text-sm text-ink-secondary hover:text-ink transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            {!isCompleted && nextUp && nextUp.id !== topicId && (
              <Link
                to={`/learn/${nextUp.id}?name=${encodeURIComponent(nextUp.name)}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
              >
                <GraduationCap className="w-4 h-4" /> Next: {nextUp.name} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {!isCompleted && !quizComplete && totalQuestions > 0 && (
              <span className="text-xs text-ink-tertiary">Complete the {totalQuestions}-question quiz to mark this topic complete.</span>
            )}
            <button
              onClick={handleComplete}
              disabled={completing || isCompleted || (!quizComplete && totalQuestions > 0)}
              className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-green-50 text-success border border-green-200 cursor-default'
                  : (!quizComplete && totalQuestions > 0)
                  ? 'bg-surface-100 text-ink-tertiary cursor-not-allowed'
                  : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              {isCompleted ? (
                <><CheckCircle2 className="w-4 h-4" /> Topic Complete</>
              ) : (
                <><Check className="w-4 h-4" /> {completing ? 'Saving...' : 'Mark Topic Complete'}</>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
