const TEMPLATES = {
  'Java Developer': {
    phases: [
      { name: 'Phase 1: Foundation', duration: '2-3 weeks', items: [
        { name: 'Java Basics', duration: '1 week', type: 'learning' },
        { name: 'OOPs Concepts', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 2: Core Java', duration: '3-4 weeks', items: [
        { name: 'Collections Framework', duration: '1 week', type: 'learning' },
        { name: 'Exception Handling', duration: '1 week', type: 'learning' },
        { name: 'File Handling', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 3: Advanced', duration: '4-5 weeks', items: [
        { name: 'Multithreading', duration: '2 weeks', type: 'learning' },
        { name: 'Java 8+ Features', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 4: Backend', duration: '4-5 weeks', items: [
        { name: 'JDBC', duration: '1 week', type: 'learning' },
        { name: 'Spring Boot', duration: '3 weeks', type: 'learning' },
        { name: 'REST API', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 5: Capstone', duration: '2-3 weeks', items: [
        { name: 'Build Production API', duration: '3 weeks', type: 'project' },
      ] },
    ],
  },
  'Full Stack Developer': {
    phases: [
      { name: 'Phase 1: Web Foundation', duration: '2-3 weeks', items: [
        { name: 'HTML & CSS', duration: '1 week', type: 'learning' },
        { name: 'JavaScript Basics', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 2: Frontend', duration: '3-4 weeks', items: [
        { name: 'React Fundamentals', duration: '2 weeks', type: 'learning' },
        { name: 'State & Routing', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 3: Backend', duration: '3-4 weeks', items: [
        { name: 'Node.js & Express', duration: '2 weeks', type: 'learning' },
        { name: 'REST API', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 4: Database', duration: '2-3 weeks', items: [
        { name: 'SQL Fundamentals', duration: '1 week', type: 'learning' },
        { name: 'MongoDB', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 5: Capstone', duration: '2-3 weeks', items: [
        { name: 'Full Stack Project', duration: '3 weeks', type: 'project' },
      ] },
    ],
  },
  'Cloud Engineer': {
    phases: [
      { name: 'Phase 1: Foundation', duration: '2-3 weeks', items: [
        { name: 'Linux Fundamentals', duration: '1 week', type: 'learning' },
        { name: 'Networking Basics', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 2: Cloud Core', duration: '3-4 weeks', items: [
        { name: 'Cloud Concepts', duration: '1 week', type: 'learning' },
        { name: 'Compute & Storage', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 3: Containers', duration: '3-4 weeks', items: [
        { name: 'Docker', duration: '1 week', type: 'learning' },
        { name: 'Kubernetes', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 4: Automation', duration: '3-4 weeks', items: [
        { name: 'Infrastructure as Code', duration: '2 weeks', type: 'learning' },
        { name: 'CI/CD Fundamentals', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 5: Capstone', duration: '2-3 weeks', items: [
        { name: 'Cloud Architecture Project', duration: '3 weeks', type: 'project' },
      ] },
    ],
  },
  'Data Scientist': {
    phases: [
      { name: 'Phase 1: Foundation', duration: '2-3 weeks', items: [
        { name: 'Python Basics', duration: '2 weeks', type: 'learning' },
        { name: 'Statistics Fundamentals', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 2: Data Toolkit', duration: '3-4 weeks', items: [
        { name: 'Pandas & NumPy', duration: '2 weeks', type: 'learning' },
        { name: 'Data Visualization', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 3: Machine Learning', duration: '4-5 weeks', items: [
        { name: 'Machine Learning Fundamentals', duration: '2 weeks', type: 'learning' },
        { name: 'Model Evaluation', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 4: Advanced', duration: '3-4 weeks', items: [
        { name: 'Deep Learning Basics', duration: '2 weeks', type: 'learning' },
        { name: 'Feature Engineering', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 5: Capstone', duration: '2-3 weeks', items: [
        { name: 'End-to-End ML Project', duration: '3 weeks', type: 'project' },
      ] },
    ],
  },
  'DevOps Engineer': {
    phases: [
      { name: 'Phase 1: Foundation', duration: '2-3 weeks', items: [
        { name: 'Linux Fundamentals', duration: '1 week', type: 'learning' },
        { name: 'Shell Scripting', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 2: Version Control', duration: '2-3 weeks', items: [
        { name: 'Git & Version Control', duration: '1 week', type: 'learning' },
        { name: 'CI/CD Fundamentals', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 3: Automation', duration: '3-4 weeks', items: [
        { name: 'Docker', duration: '1 week', type: 'learning' },
        { name: 'Kubernetes', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 4: Cloud & IaC', duration: '3-4 weeks', items: [
        { name: 'Cloud Concepts', duration: '2 weeks', type: 'learning' },
        { name: 'Infrastructure as Code', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 5: Capstone', duration: '2-3 weeks', items: [
        { name: 'DevOps Pipeline Project', duration: '3 weeks', type: 'project' },
      ] },
    ],
  },
  'AI/ML Engineer': {
    phases: [
      { name: 'Phase 1: Foundation', duration: '2-3 weeks', items: [
        { name: 'Python for AI', duration: '2 weeks', type: 'learning' },
        { name: 'Linear Algebra', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 2: ML Core', duration: '3-4 weeks', items: [
        { name: 'Machine Learning Fundamentals', duration: '2 weeks', type: 'learning' },
        { name: 'scikit-learn', duration: '1 week', type: 'learning' },
      ] },
      { name: 'Phase 3: Deep Learning', duration: '4-5 weeks', items: [
        { name: 'Neural Networks', duration: '2 weeks', type: 'learning' },
        { name: 'TensorFlow / PyTorch', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 4: LLMs', duration: '3-4 weeks', items: [
        { name: 'Prompt Engineering', duration: '1 week', type: 'learning' },
        { name: 'RAG & LLM Apps', duration: '2 weeks', type: 'learning' },
      ] },
      { name: 'Phase 5: Capstone', duration: '2-3 weeks', items: [
        { name: 'AI Application Project', duration: '3 weeks', type: 'project' },
      ] },
    ],
  },
}

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export function generateRoadmap({ goal, timeline }) {
  const tpl = TEMPLATES[goal] || TEMPLATES['Java Developer']
  const phases = tpl.phases.map((phase, i) => ({
    id: i + 1,
    name: phase.name,
    duration: phase.duration,
    color: '#2563eb',
    items: phase.items.map((item, j) => ({
      id: `${slugify(item.name)}-${i}-${j}`,
      name: item.name,
      status: (i === 0 && j === 0) ? 'in-progress' : (i === 0 ? 'available' : 'locked'),
      duration: item.duration,
      type: item.type,
    })),
  }))
  return {
    title: goal,
    duration: `${timeline || '3 months'} plan`,
    phases,
  }
}

export const EMPTY_PROGRESS = {
  overallProgress: 0,
  currentStreak: 0,
  hoursLearned: 0,
  skillsMastered: 0,
  projectsCompleted: 0,
  topicsCompleted: 0,
  assessmentScore: null,
  roadmapCompletion: 0,
  weeklyActivity: [],
  skillProgress: [],
  completedProjects: [],
}
