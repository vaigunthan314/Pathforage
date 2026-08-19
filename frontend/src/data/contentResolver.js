// Unified content resolver — the single source of truth for mapping a
// display name (roadmap item, recommendation, project title) to a stable
// resource ID and its actual learning content.
//
//   lesson  →  learningContent.js  (TOPIC_CONTENT keyed by name)
//   project →  careers.js          (project catalog keyed by title)
//
// All routes, recommendations, roadmap items and progress tracking must use
// the canonical ID returned by getResourceId(name) so the same topic is
// always reached through the same URL.

import { TOPIC_CONTENT, hasTopicContent, getTopicContent } from './learningContent'
import { getAllProjects } from '../data/careers'

export function slugify(name) {
  return (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Display names that differ from their canonical content key. This keeps
// existing profiles (whose roadmap items were generated with the alias name)
// fully functional while new roadmaps use canonical names.
const CONTENT_ALIASES = {
  'REST APIs': 'REST API',
  'ML Fundamentals': 'Machine Learning Fundamentals',
  'CI/CD Pipelines': 'CI/CD Fundamentals',
  'Cloud Fundamentals': 'Cloud Concepts',
  'Terraform': 'Infrastructure as Code',
}

const PROJECT_BY_TITLE = (() => {
  const map = {}
  for (const p of getAllProjects()) {
    map[slugify(p.title)] = p
    if (p.id) map[p.id] = p
  }
  return map
})()

export function getProjectByTitle(title) {
  return PROJECT_BY_TITLE[slugify(title)] || null
}

// Look up a project by its stable route ID (e.g. "cloud-engineer-kubernetes-deployment").
export function getProjectById(projectId) {
  if (!projectId) return null
  const p = PROJECT_BY_TITLE[slugify(projectId)]
  return p || null
}

export function resolveTopicName(name) {
  if (!name) return null
  if (hasTopicContent(name)) return name
  const alias = CONTENT_ALIASES[name]
  if (alias && hasTopicContent(alias)) return alias
  const lower = name.toLowerCase()
  const key = Object.keys(TOPIC_CONTENT).find(k => k.toLowerCase() === lower)
  if (key) return key
  const aliasKey = Object.entries(CONTENT_ALIASES).find(([a]) => a.toLowerCase() === lower)
  if (aliasKey) return aliasKey[1]
  return null
}

// Canonical, stable resource ID used everywhere (routes, progress, recs).
export function getResourceId(name) {
  return slugify(resolveTopicName(name) || name)
}

// Official documentation per topic (keyed by canonical content name).
// Every URL is a stable, well-known official source — no "#", no dead links.
const TOPIC_DOCS = {
  'Java Basics': 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/index.html',
  'OOPs Concepts': 'https://docs.oracle.com/javase/tutorial/java/concepts/',
  'Collections Framework': 'https://docs.oracle.com/javase/tutorial/collections/',
  'Exception Handling': 'https://docs.oracle.com/javase/tutorial/essential/exceptions/',
  'File Handling': 'https://docs.oracle.com/javase/tutorial/essential/io/',
  'Multithreading': 'https://docs.oracle.com/javase/tutorial/essential/concurrency/',
  'Java 8+ Features': 'https://www.oracle.com/java/technologies/javase/8-whats-new.html',
  'JDBC': 'https://docs.oracle.com/javase/tutorial/jdbc/basics/',
  'REST API': 'https://spring.io/guides/gs/rest-service/',
  'Spring Boot': 'https://docs.spring.io/spring-boot/index.html',
  'Build Production API': 'https://spring.io/guides/gs/rest-service/',
  'SQL': 'https://dev.mysql.com/doc/refman/en/tutorial.html',
  'HTML & CSS': 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
  'JavaScript Basics': 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  'React Fundamentals': 'https://react.dev/learn',
  'State & Routing': 'https://reactrouter.com/',
  'Node.js & Express': 'https://nodejs.org/en/learn',
  'SQL Fundamentals': 'https://dev.mysql.com/doc/refman/en/tutorial.html',
  'MongoDB': 'https://www.mongodb.com/docs/manual/tutorial/',
  'Full Stack Project': 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs',
  'Linux Fundamentals': 'https://man7.org/linux/man-pages/',
  'Networking Basics': 'https://learn.microsoft.com/en-us/training/paths/network-fundamentals/',
  'Cloud Concepts': 'https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html',
  'Compute & Storage': 'https://docs.aws.amazon.com/ec2/',
  'Docker': 'https://docs.docker.com/get-started/',
  'Kubernetes': 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
  'Infrastructure as Code': 'https://developer.hashicorp.com/terraform/tutorials',
  'CI/CD': 'https://docs.github.com/en/actions',
  'CI/CD Fundamentals': 'https://docs.github.com/en/actions',
  'Cloud Architecture Project': 'https://docs.aws.amazon.com/wellarchitected/',
  'Git': 'https://git-scm.com/doc',
  'Git & Version Control': 'https://git-scm.com/doc',
  'Shell Scripting': 'https://www.gnu.org/software/bash/manual/bash.html',
  'Python Basics': 'https://docs.python.org/3/tutorial/',
  'Statistics Fundamentals': 'https://online.stat.psu.edu/stat200/',
  'Pandas & NumPy': 'https://pandas.pydata.org/docs/',
  'Data Visualization': 'https://matplotlib.org/stable/users/index.html',
  'Machine Learning Fundamentals': 'https://scikit-learn.org/stable/tutorial/',
  'Model Evaluation': 'https://scikit-learn.org/stable/modules/model_evaluation.html',
  'Deep Learning Basics': 'https://www.tensorflow.org/tutorials',
  'Feature Engineering': 'https://scikit-learn.org/stable/modules/preprocessing.html',
  'End-to-End ML Project': 'https://scikit-learn.org/stable/tutorial/',
  'Python for AI': 'https://docs.python.org/3/tutorial/',
  'Linear Algebra': 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',
  'scikit-learn': 'https://scikit-learn.org/stable/',
  'Neural Networks': 'https://pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html',
  'TensorFlow / PyTorch': 'https://www.tensorflow.org/learn',
  'Prompt Engineering': 'https://platform.openai.com/docs/guides/prompt-engineering',
  'RAG & LLM Apps': 'https://python.langchain.com/docs/',
  'AI Application Project': 'https://python.langchain.com/docs/',
}

export function getTopicDocsUrl(name) {
  if (!name) return null
  const resolved = resolveTopicName(name)
  if (!resolved) return null
  return TOPIC_DOCS[resolved] || null
}

// Resolve a resource by its display name.
// Returns { type: 'lesson'|'project', data } or null when no content exists.
export function getResourceByName(name) {
  if (!name) return null
  const resolved = resolveTopicName(name)
  if (resolved) return { type: 'lesson', data: getTopicContent(resolved) }
  const project = getProjectByTitle(name)
  if (project) return { type: 'project', data: project }
  return null
}

export function isResourceAvailable(name) {
  return getResourceByName(name) !== null
}

// Normalize a raw route ID ("cloud-concepts-2-0", "cloud-concepts", ...)
// back to a canonical resource ID by extracting the leading slug segment.
export function normalizeResourceId(rawId) {
  if (!rawId) return ''
  return slugify(rawId)
    .split('-')
    .filter(s => !/^\d+$/.test(s))
    .join('-')
}
