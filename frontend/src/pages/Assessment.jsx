import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { getAssessmentTopics, getQuestionsForTopic } from '../data/assessmentBank'
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy, ClipboardList, BookOpen } from 'lucide-react'

const questionVariants = {
  enter: { x: 32, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -32, opacity: 0 },
}

export default function Assessment() {
  const { data: profile, saveAssessment } = useActiveProfile()
  const [phase, setPhase] = useState('select') // 'select', 'quiz', 'results'
  const [topic, setTopic] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [saved, setSaved] = useState(false)

  const careerGoal = profile?.careerGoal || 'Java Developer'
  const topics = useMemo(() => getAssessmentTopics(careerGoal), [careerGoal])
  const pastResults = profile?.assessmentResults || []

  const questions = useMemo(() => (topic ? getQuestionsForTopic(topic) : []), [topic])
  const total = questions.length
  const question = questions[currentQ]
  const selected = answers[currentQ]

  const startQuiz = (t) => {
    setTopic(t)
    setAnswers([])
    setCurrentQ(0)
    setShowResult(false)
    setSaved(false)
    setPhase('quiz')
  }

  const selectAnswer = (idx) => {
    if (showResult) return
    setAnswers(prev => {
      const next = prev.slice()
      next[currentQ] = idx
      return next
    })
  }

  const goPrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1)
      setShowResult(false)
    }
  }

  const goNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(currentQ + 1)
      setShowResult(false)
    } else {
      setPhase('results')
    }
  }

  const correctCount = answers.filter((a, i) => a === questions[i]?.correctAnswer).length
  const score = total ? Math.round((correctCount / total) * 100) : 0
  const answeredCount = answers.filter(a => a !== undefined).length

  const saveResult = async () => {
    await saveAssessment({
      topic,
      score,
      percentage: score,
      correct: correctCount,
      total,
      topicPerformance: { topic, score },
      recommendedTopics: score >= 70
        ? questions.map(q => 'Next: ' + q.question.split(' ').slice(0, 4).join(' '))
        : [topic],
    })
    setSaved(true)
  }

  // ---------- SELECT PHASE ----------
  if (phase === 'select') {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Assessments</h1>
          <p className="text-sm text-ink-secondary mt-1">Pick a topic from your {careerGoal} roadmap.</p>
        </div>
        <div className="p-6 max-w-4xl space-y-6">
          {pastResults.length > 0 && (
            <div className="bg-white rounded-xl border border-surface-200 p-5">
              <h2 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-3">Your recent scores</h2>
              <div className="flex flex-wrap gap-2">
                {pastResults.slice(-8).reverse().map((r, i) => (
                  <span key={i} className="text-2xs font-medium px-2.5 py-1 rounded-full bg-surface-100 text-ink-secondary">
                    {r.topic}: <strong className={r.score >= 70 ? 'text-success' : 'text-warning'}>{r.score}%</strong>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-3">Available topics</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map(t => {
                const last = pastResults.filter(r => r.topic === t).pop()
                return (
                  <button
                    key={t}
                    onClick={() => startQuiz(t)}
                    className="text-left bg-white rounded-xl border border-surface-200 p-4 hover:shadow-card hover:border-brand-200 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-ink group-hover:text-brand-700 transition-colors">{t}</span>
                      <ClipboardList className="w-4 h-4 text-ink-muted group-hover:text-brand-600 transition-colors" />
                    </div>
                    <span className="text-xs text-ink-tertiary">
                      {last ? `Last score: ${last.score}%` : `${getQuestionsForTopic(t).length} questions`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---------- RESULTS PHASE ----------
  if (phase === 'results') {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Assessment Results</h1>
        </div>
        <div className="p-6 max-w-2xl">
          <div className="bg-white rounded-xl border border-surface-200 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-brand-600" />
            </div>
            <h2 className="text-2xl font-bold text-ink mb-2">{topic}</h2>
            <div className="text-4xl font-bold text-brand-600 mb-1">{score}%</div>
            <p className="text-sm text-ink-secondary mb-6">{correctCount} of {total} correct</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-surface-50 rounded-lg p-3">
                <div className="text-lg font-bold text-ink">{correctCount}</div>
                <div className="text-xs text-ink-secondary">Correct</div>
              </div>
              <div className="bg-surface-50 rounded-lg p-3">
                <div className="text-lg font-bold text-ink">{total - correctCount}</div>
                <div className="text-xs text-ink-secondary">Incorrect</div>
              </div>
              <div className="bg-surface-50 rounded-lg p-3">
                <div className="text-lg font-bold text-ink">{score >= 70 ? 'Passed' : 'Keep Going'}</div>
                <div className="text-xs text-ink-secondary">Status</div>
              </div>
            </div>

            {!saved ? (
              <button onClick={saveResult} className="bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors">
                Save Result
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-success font-medium">Result saved to your profile.</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => startQuiz(topic)} className="text-sm font-medium text-brand-600 hover:text-brand-700 inline-flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4" /> Retake
                  </button>
                  <button onClick={() => setPhase('select')} className="text-sm font-medium text-ink-secondary hover:text-ink inline-flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> All topics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ---------- QUIZ PHASE ----------
  if (!question) return null

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">{topic} Quiz</h1>
        <p className="text-sm text-ink-secondary mt-1">Question {currentQ + 1} of {total}</p>
      </div>

      <div className="p-6 max-w-2xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-ink-secondary">Progress</span>
            <span className="text-xs font-medium text-ink">{Math.round((answeredCount / total) * 100)}%</span>
          </div>
          <div className="w-full bg-surface-200 rounded-full h-1.5">
            <div className="bg-brand-600 h-1.5 rounded-full transition-all" style={{ width: `${(answeredCount / total) * 100}%` }} />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            variants={questionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl border border-surface-200 p-6 mb-5"
          >
            <p className="text-sm font-medium text-ink mb-5">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((opt, i) => {
                let classes = 'border-surface-200 hover:border-surface-300'
                const isSelected = selected === i
                const isCorrectAnswer = i === question.correctAnswer
                if (showResult && isCorrectAnswer) classes = 'border-success bg-green-50'
                else if (showResult && isSelected) classes = 'border-error bg-red-50'
                else if (isSelected) classes = 'border-brand-600 bg-brand-50'

                return (
                  <button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${classes}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-surface-300 flex items-center justify-center text-xs font-medium text-ink-secondary flex-shrink-0">
                        {showResult && isCorrectAnswer ? (
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        ) : showResult && isSelected ? (
                          <XCircle className="w-4 h-4 text-error" />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className="text-ink">{opt}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentQ === 0}
            className="flex items-center gap-1.5 text-sm font-medium text-ink-secondary hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={() => {
              if (currentQ === total - 1) setShowResult(true)
            }}
            className="text-xs text-ink-tertiary hover:text-ink transition-colors"
          >
            {answeredCount}/{total} answered
          </button>
          {currentQ < total - 1 ? (
            <button
              onClick={goNext}
              disabled={answers[currentQ] === undefined}
              className="flex items-center gap-1.5 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={goNext}
              disabled={answers[currentQ] === undefined}
              className="flex items-center gap-1.5 bg-brand-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              See Results <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
