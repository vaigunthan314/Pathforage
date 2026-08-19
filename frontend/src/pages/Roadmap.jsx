import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useActiveProfile } from '../hooks/useActiveProfile'
import { CheckCircle2, Clock, Lock, ChevronDown, ChevronUp, BookOpen, ExternalLink, Check, GraduationCap } from 'lucide-react'

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-success', bg: 'bg-green-50', border: 'border-green-200', line: 'bg-success' },
  'in-progress': { icon: Clock, color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-200', line: 'bg-brand-600' },
  available: { icon: BookOpen, color: 'text-ink-secondary', bg: 'bg-blue-50', border: 'border-blue-200', line: 'bg-blue-400' },
  locked: { icon: Lock, color: 'text-ink-muted', bg: 'bg-surface-100', border: 'border-surface-200', line: 'bg-surface-300' },
}

const TOPIC_GUIDES = {
  'Java Basics': {
    difficulty: 'Beginner',
    description: 'Core Java syntax, data types, operators, control flow, and the JVM.',
    objectives: ['Write and run your first Java program', 'Understand variables and primitive data types', 'Use operators and control flow statements'],
    resources: ['Official Java Tutorials — Oracle', 'Java for Beginners — Codecademy', 'First Java Program — w3schools'],
  },
  'OOP': {
    difficulty: 'Beginner',
    description: 'Classes, objects, inheritance, polymorphism, encapsulation, and abstraction.',
    objectives: ['Model real-world things with classes and objects', 'Apply the four OOP pillars', 'Use inheritance and interfaces effectively'],
    resources: ['Java OOP Concepts — GeeksforGeeks', 'Object Oriented Programming — Baeldung'],
  },
  'Collections Framework': {
    difficulty: 'Intermediate',
    description: 'Lists, sets, maps, queues, and choosing the right data structure.',
    objectives: ['Understand the collection interfaces and implementations', 'Choose the right collection per use case', 'Understand time complexity of common operations'],
    resources: ['Collections Framework — Oracle Docs', 'Java Collections Guide — Baeldung'],
  },
  'Exception Handling': {
    difficulty: 'Beginner',
    description: 'try/catch, throws, custom exceptions, and checked vs unchecked exceptions.',
    objectives: ['Use try-catch-finally correctly', 'Distinguish checked and unchecked exceptions', 'Create and throw custom exceptions'],
    resources: ['Exception Handling — Oracle Docs', 'Java Exceptions Guide — Baeldung'],
  },
  'Multithreading': {
    difficulty: 'Advanced',
    description: 'Threads, concurrency, synchronization, and the executor framework.',
    objectives: ['Create and manage threads', 'Synchronize shared state safely', 'Use executors and thread pools'],
    resources: ['Concurrency — Oracle Docs', 'Java Concurrency Guide — Baeldung'],
  },
  'Java 8+ Features': {
    difficulty: 'Intermediate',
    description: 'Lambda expressions, streams, Optional, and method references.',
    objectives: ['Write functional-style code with lambdas', 'Use the Stream API to process collections', 'Avoid nulls with Optional'],
    resources: ['Java 8 Features — Baeldung', 'Streams API — Oracle Docs'],
  },
  'JDBC': {
    difficulty: 'Intermediate',
    description: 'Connecting Java to relational databases and executing SQL.',
    objectives: ['Set up JDBC drivers and connections', 'Execute queries with PreparedStatement', 'Handle transactions'],
    resources: ['JDBC Basics — Oracle Docs', 'JDBC Tutorial — DigitalOcean'],
  },
  'SQL': {
    difficulty: 'Beginner',
    description: 'SELECT queries, joins, aggregations, and database design fundamentals.',
    objectives: ['Write SELECT queries with filters and sorting', 'Join multiple tables', 'Group and aggregate data'],
    resources: ['SQL Tutorial — w3schools', 'SQLBolt — Interactive lessons'],
  },
  'Spring Boot': {
    difficulty: 'Advanced',
    description: 'Building production Spring Boot applications with REST controllers and JPA.',
    objectives: ['Create Spring Boot applications', 'Build REST APIs with controllers', 'Persist data with Spring Data JPA'],
    resources: ['Spring Boot Docs — Official', 'Building REST Services — Spring Guides'],
  },
  'REST API': {
    difficulty: 'Intermediate',
    description: 'Designing stateless, resource-oriented HTTP APIs.',
    objectives: ['Design resource-based endpoints', 'Use proper HTTP methods and status codes', 'Handle request/response payloads'],
    resources: ['REST API Tutorial — REST API Tutorial', 'HTTP Status Codes — MDN'],
  },
  'HTML & CSS': {
    difficulty: 'Beginner',
    description: 'Semantic HTML, modern CSS layout, and responsive design.',
    objectives: ['Structure pages with semantic HTML', 'Style with CSS flexbox and grid', 'Build responsive layouts'],
    resources: ['HTML Basics — MDN', 'CSS Flexbox — MDN'],
  },
  'JavaScript': {
    difficulty: 'Beginner',
    description: 'Variables, functions, DOM manipulation, and asynchronous JavaScript.',
    objectives: ['Use variables, functions, and arrays', 'Manipulate the DOM', 'Work with promises and async/await'],
    resources: ['JavaScript Guide — MDN', 'JavaScript.info'],
  },
  'React': {
    difficulty: 'Intermediate',
    description: 'Components, props, state, hooks, and routing.',
    objectives: ['Build reusable components', 'Manage state with hooks', 'Handle routing and effects'],
    resources: ['React Docs — Official', 'React Hooks — React Docs'],
  },
  'Node.js': {
    difficulty: 'Intermediate',
    description: 'The Node runtime, modules, and building servers with Express.',
    objectives: ['Run JavaScript on the server', 'Use core modules and npm', 'Build an Express server'],
    resources: ['Node.js Docs — Official', 'Express Guide'],
  },
  'Linux': {
    difficulty: 'Beginner',
    description: 'The command line, filesystem, permissions, and process management.',
    objectives: ['Navigate the filesystem', 'Manage files and permissions', 'Inspect and manage processes'],
    resources: ['Linux Journey — Interactive', 'The Linux Command Line'],
  },
  'Networking': {
    difficulty: 'Intermediate',
    description: 'OSI model, IP addressing, DNS, and common protocols.',
    objectives: ['Explain the OSI model layers', 'Understand IP addressing and subnetting', 'Explain DNS and HTTP/HTTPS'],
    resources: ['Computer Networking — Khan Academy', 'Networking Basics — Cisco'],
  },
  'Docker': {
    difficulty: 'Intermediate',
    description: 'Containers, images, Dockerfiles, and container networking.',
    objectives: ['Build and run images', 'Write Dockerfiles', 'Manage containers and volumes'],
    resources: ['Docker Docs — Official', 'Docker Curriculum'],
  },
  'Kubernetes': {
    difficulty: 'Advanced',
    description: 'Pods, deployments, services, and cluster concepts.',
    objectives: ['Describe pods and deployments', 'Expose apps via services', 'Scale and update workloads'],
    resources: ['Kubernetes Docs — Official', 'Kubernetes Basics Tutorial'],
  },
  'Terraform': {
    difficulty: 'Advanced',
    description: 'Infrastructure as code with the HashiCorp Configuration Language.',
    objectives: ['Write Terraform configuration', 'Plan and apply changes', 'Manage state'],
    resources: ['Terraform Docs — Official', 'Terraform Up & Running'],
  },
  'Python': {
    difficulty: 'Beginner',
    description: 'Syntax, data structures, functions, and standard library essentials.',
    objectives: ['Write and run Python scripts', 'Use lists, dicts, and comprehensions', 'Write functions and modules'],
    resources: ['Python.org Tutorial', 'Automate the Boring Stuff'],
  },
  'Statistics': {
    difficulty: 'Intermediate',
    description: 'Descriptive statistics, distributions, hypothesis testing, and correlation.',
    objectives: ['Compute measures of central tendency and spread', 'Understand normal distributions', 'Interpret p-values and correlations'],
    resources: ['Statistics — Khan Academy', 'Statistics How To'],
  },
  'Pandas & NumPy': {
    difficulty: 'Intermediate',
    description: 'DataFrames, arrays, cleaning, and data manipulation.',
    objectives: ['Load data into DataFrames', 'Clean and filter data', 'Aggregate and merge datasets'],
    resources: ['Pandas Docs — Official', 'NumPy Quickstart'],
  },
  'Machine Learning': {
    difficulty: 'Intermediate',
    description: 'Supervised and unsupervised learning, and model selection.',
    objectives: ['Distinguish supervised vs unsupervised learning', 'Train and evaluate a model', 'Avoid overfitting'],
    resources: ['Machine Learning Crash Course — Google', 'scikit-learn Docs'],
  },
  'Neural Networks': {
    difficulty: 'Advanced',
    description: 'Perceptrons, backpropagation, CNNs, and training basics.',
    objectives: ['Explain how a neuron computes output', 'Understand backpropagation', 'Build a simple network'],
    resources: ['Neural Networks — 3Blue1Brown', 'PyTorch Tutorials'],
  },
  'scikit-learn': {
    difficulty: 'Intermediate',
    description: 'Practical ML workflows with the scikit-learn library.',
    objectives: ['Split data into train/test', 'Fit and evaluate models', 'Tune hyperparameters'],
    resources: ['scikit-learn Docs', 'scikit-learn User Guide'],
  },
  'LLM & RAG': {
    difficulty: 'Advanced',
    description: 'Large language models, embeddings, and retrieval-augmented generation.',
    objectives: ['Explain tokens and embeddings', 'Build a RAG pipeline', 'Engineer effective prompts'],
    resources: ['LLM Course — Cohere', 'RAG from Scratch — GitHub'],
  },
}

export function getTopicGuide(name) {
  return TOPIC_GUIDES[name] || {
    difficulty: 'Intermediate',
    description: `Master ${name} with focused lessons and hands-on practice.`,
    objectives: [`Understand the core concepts of ${name}`, `Apply ${name} in practice`, `Validate your skills with an assessment`],
    resources: ['Official documentation', 'Hands-on tutorials', 'Practice exercises'],
  }
}

export default function Roadmap() {
  const { data, loading } = useActiveProfile()
  const navigate = useNavigate()
  const roadmap = data?.roadmap || null
  const [expandedItem, setExpandedItem] = useState(null)

  const allItems = roadmap?.phases?.flatMap(p => p.items) || []
  const completedCount = allItems.filter(i => i.status === 'completed').length
  const totalItems = allItems.length

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  if (loading) {
    return (
      <div className="p-6 max-w-4xl space-y-4" aria-busy="true">
        <div className="h-6 w-56 bg-surface-200 rounded animate-pulse" />
        <div className="h-24 bg-white rounded-xl border border-surface-200 animate-pulse" />
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-white rounded-xl border border-surface-200 animate-pulse" />
        ))}
      </div>
    )
  }

  if (!roadmap) {
    return (
      <div className="page-enter">
        <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
          <h1 className="text-xl font-bold text-ink">Your Personalized Roadmap</h1>
        </div>
        <div className="p-6 max-w-4xl">
          <div className="bg-white rounded-2xl border border-surface-200 p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-brand-600" />
            </div>
            <h2 className="text-base font-semibold text-ink mb-1">Your roadmap is not ready yet.</h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-5">
              Complete your onboarding to generate a personalized roadmap around your career goal.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter">
      <div className="px-6 pt-6 pb-4 border-b border-surface-200 bg-white">
        <h1 className="text-xl font-bold text-ink">Your Personalized Roadmap</h1>
        <p className="text-sm text-ink-secondary mt-1">{roadmap.title} · {roadmap.duration}</p>
      </div>

      <div className="p-6 max-w-4xl">
        {/* Progress */}
        <div className="bg-white rounded-xl border border-surface-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-ink-secondary">Overall Progress</span>
            <span className="text-xs font-medium text-ink">{completedCount}/{totalItems} items</span>
          </div>
          <div className="w-full bg-surface-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-brand-600 h-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${totalItems ? (completedCount / totalItems) * 100 : 0}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-surface-200 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {roadmap.phases.map((phase, phaseIdx) => (
            <div key={phase.id} className="relative mb-6 last:mb-0">
              <motion.div
                className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: phaseIdx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center z-10 flex-shrink-0">
                  <span className="text-white text-xs font-bold">{phaseIdx + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-ink">{phase.name}</h3>
                  <span className="text-xs text-ink-tertiary">{phase.duration}</span>
                </div>
              </motion.div>

              <div className="ml-11 space-y-2">
                {phase.items.map((item, itemIdx) => {
                  const config = statusConfig[item.status]
                  const Icon = config.icon
                  const isExpanded = expandedItem === item.id
                  const guide = getTopicGuide(item.name)

                  return (
                    <motion.div
                      key={item.id}
                      className="relative"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.35, delay: phaseIdx * 0.12 + itemIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="absolute left-[-29px] top-3 w-6 h-0.5 bg-surface-200" />

                      <button
                        onClick={() => toggleItem(item.id)}
                        className={`w-full text-left bg-white rounded-lg border ${config.border} p-3 hover:shadow-card transition-all`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                          </div>
                          <span className={`text-sm font-medium ${item.status === 'locked' ? 'text-ink-tertiary' : 'text-ink'} flex-1`}>
                            {item.name}
                          </span>
                          {item.status === 'completed' ? (
                            <span className="text-xs font-medium text-success flex items-center gap-1">
                              <Check className="w-3 h-3" /> Done
                            </span>
                          ) : (
                            <span className="text-xs text-ink-tertiary">{item.duration}</span>
                          )}
                           {isExpanded ? <ChevronUp className="w-4 h-4 text-ink-muted" /> : <ChevronDown className="w-4 h-4 text-ink-muted" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="ml-9 mt-2 bg-surface-50 rounded-lg border border-surface-200 p-4 slide-up space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-2xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-700">
                              {guide.difficulty}
                            </span>
                            <span className="text-xs text-ink-tertiary">Duration: {item.duration}</span>
                            <span className="text-xs text-ink-tertiary capitalize">Type: {item.type}</span>
                          </div>

                          <p className="text-sm text-ink-secondary leading-relaxed">{guide.description}</p>

                          <div>
                            <div className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-1.5">Learning objectives</div>
                            <ul className="space-y-1">
                              {guide.objectives.map((o, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                                  <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                                  {o}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <div className="text-xs font-medium text-ink-secondary uppercase tracking-wide mb-1.5">Recommended resources</div>
                            <ul className="space-y-1">
                              {guide.resources.map((r, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-ink-secondary">
                                  <ExternalLink className="w-3 h-3 text-ink-muted flex-shrink-0" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 border-t border-surface-200 flex items-center justify-between">
                            {item.status === 'locked' && (
                              <span className="text-xs text-ink-muted">Complete the previous topic to unlock this one</span>
                            )}
                            {(item.status === 'in-progress' || item.status === 'available') && (
                              <button
                                onClick={() => navigate(`/learn/${item.id}?name=${encodeURIComponent(item.name)}`, { state: { from: '/roadmap' } })}
                                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                              >
                                <BookOpen className="w-4 h-4" />
                                Start Learning
                              </button>
                            )}
                            {item.status === 'completed' && (
                              <button
                                onClick={() => navigate(`/learn/${item.id}?name=${encodeURIComponent(item.name)}`, { state: { from: '/roadmap' } })}
                                className="inline-flex items-center gap-2 text-sm font-medium text-success hover:text-green-700"
                              >
                                <BookOpen className="w-4 h-4" />
                                Review
                              </button>
                            )}
                            <div>
                              {(item.status === 'in-progress' || item.status === 'available') && (
                                <button
                                  onClick={() => navigate(`/learn/${item.id}?name=${encodeURIComponent(item.name)}`, { state: { from: '/roadmap' } })}
                                  className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
                                >
                                  <BookOpen className="w-4 h-4" />
                                  Open Lesson
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
