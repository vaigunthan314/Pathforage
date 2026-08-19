import { getCareer } from '../data/careers'
import { getResourceId, isResourceAvailable } from '../data/contentResolver'

// ═══════════════════════════════════════════════════════════════════════════
// TOPIC → SKILL MAPPING
// Maps every roadmap topic name to the career skill it contributes to.
// ═══════════════════════════════════════════════════════════════════════════
const TOPIC_SKILL_MAP = {
  // Java Developer
  'Java Basics': 'Core Java',
  'OOPs Concepts': 'OOP',
  'Collections Framework': 'Data Structures',
  'Exception Handling': 'Core Java',
  'Multithreading': 'Core Java',
  'Java 8+ Features': 'Core Java',
  'JDBC': 'SQL',
  'File Handling': 'Core Java',
  'REST API': 'REST API',
  'REST APIs': 'REST API',
  'Spring Boot': 'Spring Boot',
  'Build Production API': 'Spring Boot',
  'SQL': 'SQL',
  'System Design': 'System Design',
  // Full Stack Developer
  'HTML & CSS': 'HTML & CSS',
  'JavaScript Basics': 'JavaScript',
  'React Fundamentals': 'React',
  'State & Routing': 'React',
  'Node.js & Express': 'Node.js',
  'SQL Fundamentals': 'SQL',
  'MongoDB': 'MongoDB',
  'Full Stack Project': 'React',
  'React': 'React',
  'Node.js': 'Node.js',
  // Cloud Engineer
  'Linux Fundamentals': 'Linux',
  'Networking Basics': 'Networking',
  'Cloud Concepts': 'Cloud Concepts',
  'Compute & Storage': 'Compute & Storage',
  'Docker': 'Docker',
  'Kubernetes': 'Kubernetes',
  'Infrastructure as Code': 'Infrastructure as Code',
  'CI/CD': 'CI/CD',
  'CI/CD Pipelines': 'CI/CD',
  'Cloud Architecture Project': 'Cloud Concepts',
  // Data Scientist
  'Python Basics': 'Python',
  'Statistics Fundamentals': 'Statistics',
  'Pandas & NumPy': 'Pandas & NumPy',
  'Data Visualization': 'Data Visualization',
  'Machine Learning Fundamentals': 'Machine Learning',
  'ML Fundamentals': 'Machine Learning',
  'Model Evaluation': 'Model Evaluation',
  'Deep Learning Basics': 'Deep Learning',
  'Feature Engineering': 'Machine Learning',
  'End-to-End ML Project': 'Machine Learning',
  // DevOps Engineer
  'Shell Scripting': 'Shell Scripting',
  'Git & Version Control': 'Git',
  'Git': 'Git',
  'CI/CD Fundamentals': 'CI/CD',
  'Cloud Fundamentals': 'Cloud Concepts',
  'Terraform': 'Terraform',
  'DevOps Pipeline Project': 'CI/CD',
  // AI/ML Engineer
  'Python for AI': 'Python',
  'Linear Algebra': 'Linear Algebra',
  'Machine Learning Fundamentals': 'Machine Learning',
  'scikit-learn': 'scikit-learn',
  'Neural Networks': 'Neural Networks',
  'TensorFlow / PyTorch': 'TensorFlow / PyTorch',
  'Prompt Engineering': 'LLM & RAG',
  'RAG & LLM Apps': 'LLM & RAG',
  'AI Application Project': 'LLM & RAG',
}

// Boost per topic completion (out of 100)
const TOPIC_BOOST = 18

// ═══════════════════════════════════════════════════════════════════════════
// REAL LEARNING RESOURCES
// ═══════════════════════════════════════════════════════════════════════════
const RESOURCES = {
  'Linux Fundamentals': [
    { title: 'Linux Full Course for Beginners', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=linux+full+course+for+beginners', topic: 'Linux Fundamentals', difficulty: 'Beginner', duration: '3 hrs' },
    { title: 'Linux Journey', provider: 'Linux Journey', type: 'course', url: 'https://linuxjourney.com/', topic: 'Linux Fundamentals', difficulty: 'Beginner', duration: '5 hrs' },
    { title: 'The Linux Command Line', provider: 'LinuxCommand.org', type: 'book', url: 'https://linuxcommand.org/tlcl.php', topic: 'Linux Fundamentals', difficulty: 'Beginner', duration: '8 hrs' },
  ],
  'Networking Basics': [
    { title: 'Computer Networking Full Course', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=computer+networking+full+course', topic: 'Networking Basics', difficulty: 'Beginner', duration: '4 hrs' },
    { title: 'Networking Basics — Cisco', provider: 'Cisco Networking Academy', type: 'course', url: 'https://www.netacad.com/courses/networking', topic: 'Networking Basics', difficulty: 'Beginner', duration: '6 hrs' },
    { title: 'Computer Networking — Khan Academy', provider: 'Khan Academy', type: 'course', url: 'https://www.khanacademy.org/computing/computers-and-internet', topic: 'Networking Basics', difficulty: 'Beginner', duration: '3 hrs' },
  ],
  'Cloud Concepts': [
    { title: 'AWS Cloud Practitioner Full Course', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=aws+cloud+practitioner+full+course', topic: 'Cloud Concepts', difficulty: 'Beginner', duration: '4 hrs' },
    { title: 'AWS Cloud Practitioner Essentials', provider: 'AWS Skill Builder', type: 'course', url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials', topic: 'Cloud Concepts', difficulty: 'Beginner', duration: '6 hrs' },
    { title: 'Cloud Computing — Microsoft Learn', provider: 'Microsoft Learn', type: 'course', url: 'https://learn.microsoft.com/en-us/training/paths/describe-cloud-concepts/', topic: 'Cloud Concepts', difficulty: 'Beginner', duration: '3 hrs' },
  ],
  'Compute & Storage': [
    { title: 'AWS EC2 and S3 Tutorial', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=aws+ec2+and+s3+tutorial', topic: 'Compute & Storage', difficulty: 'Beginner', duration: '2 hrs' },
    { title: 'AWS EC2 Documentation', provider: 'AWS', type: 'docs', url: 'https://docs.aws.amazon.com/ec2/', topic: 'Compute & Storage', difficulty: 'Intermediate', duration: '2 hrs' },
  ],
  'Docker': [
    { title: 'Docker Tutorial for Beginners', provider: 'TechWorld with Nana', type: 'video', url: 'https://www.youtube.com/results?search_query=docker+tutorial+for+beginners', topic: 'Docker', difficulty: 'Beginner', duration: '2 hrs' },
    { title: 'Docker Getting Started', provider: 'Docker', type: 'docs', url: 'https://docs.docker.com/get-started/', topic: 'Docker', difficulty: 'Beginner', duration: '1 hr' },
    { title: 'Docker Curriculum', provider: 'Docker Curriculum', type: 'course', url: 'https://docker-curriculum.com/', topic: 'Docker', difficulty: 'Beginner', duration: '3 hrs' },
  ],
  'Kubernetes': [
    { title: 'Kubernetes Tutorial for Beginners', provider: 'TechWorld with Nana', type: 'video', url: 'https://www.youtube.com/results?search_query=kubernetes+tutorial+for+beginners', topic: 'Kubernetes', difficulty: 'Intermediate', duration: '4 hrs' },
    { title: 'Kubernetes Basics Tutorial', provider: 'Kubernetes', type: 'docs', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', topic: 'Kubernetes', difficulty: 'Intermediate', duration: '2 hrs' },
  ],
  'Infrastructure as Code': [
    { title: 'Terraform Tutorial for Beginners', provider: 'TechWorld with Nana', type: 'video', url: 'https://www.youtube.com/results?search_query=terraform+tutorial+for+beginners', topic: 'Infrastructure as Code', difficulty: 'Intermediate', duration: '3 hrs' },
    { title: 'Terraform Up & Running', provider: 'O\'Reilly', type: 'book', url: 'https://www.terraformupandrunning.com/', topic: 'Infrastructure as Code', difficulty: 'Intermediate', duration: '10 hrs' },
  ],
  'CI/CD Pipelines': [
    { title: 'CI/CD Pipeline Tutorial', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=cicd+pipeline+tutorial', topic: 'CI/CD', difficulty: 'Intermediate', duration: '2 hrs' },
    { title: 'GitHub Actions Documentation', provider: 'GitHub', type: 'docs', url: 'https://docs.github.com/en/actions', topic: 'CI/CD', difficulty: 'Intermediate', duration: '2 hrs' },
  ],
  'CI/CD Fundamentals': [
    { title: 'CI/CD Pipeline Tutorial', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=cicd+fundamentals+tutorial', topic: 'CI/CD', difficulty: 'Intermediate', duration: '2 hrs' },
    { title: 'GitHub Actions Documentation', provider: 'GitHub', type: 'docs', url: 'https://docs.github.com/en/actions', topic: 'CI/CD', difficulty: 'Intermediate', duration: '2 hrs' },
  ],
  'Java Basics': [
    { title: 'Java Tutorial for Beginners', provider: 'Programming with Mosh', type: 'video', url: 'https://www.youtube.com/results?search_query=java+tutorial+for+beginners', topic: 'Java Basics', difficulty: 'Beginner', duration: '3 hrs' },
    { title: 'Java Tutorials — Oracle', provider: 'Oracle', type: 'docs', url: 'https://docs.oracle.com/javase/tutorial/', topic: 'Java Basics', difficulty: 'Beginner', duration: '5 hrs' },
    { title: 'Java for Beginners — Codecademy', provider: 'Codecademy', type: 'course', url: 'https://www.codecademy.com/learn/learn-java', topic: 'Java Basics', difficulty: 'Beginner', duration: '4 hrs' },
  ],
  'OOPs Concepts': [
    { title: 'Object Oriented Programming in Java', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=oop+java+tutorial', topic: 'OOP', difficulty: 'Beginner', duration: '2 hrs' },
    { title: 'Java OOP Concepts — GeeksforGeeks', provider: 'GeeksforGeeks', type: 'docs', url: 'https://www.geeksforgeeks.org/object-oriented-programming-java/', topic: 'OOP', difficulty: 'Beginner', duration: '3 hrs' },
  ],
  'Collections Framework': [
    { title: 'Java Collections Framework Tutorial', provider: 'Telusko', type: 'video', url: 'https://www.youtube.com/results?search_query=java+collections+framework+tutorial', topic: 'Collections Framework', difficulty: 'Intermediate', duration: '2 hrs' },
    { title: 'Collections Tutorial — Oracle', provider: 'Oracle', type: 'docs', url: 'https://docs.oracle.com/javase/tutorial/collections/', topic: 'Collections Framework', difficulty: 'Intermediate', duration: '3 hrs' },
  ],
  'Spring Boot': [
    { title: 'Spring Boot Tutorial for Beginners', provider: 'Java Brains', type: 'video', url: 'https://www.youtube.com/results?search_query=spring+boot+tutorial+for+beginners', topic: 'Spring Boot', difficulty: 'Intermediate', duration: '3 hrs' },
    { title: 'Spring Boot Reference Guide', provider: 'Spring', type: 'docs', url: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/', topic: 'Spring Boot', difficulty: 'Intermediate', duration: '5 hrs' },
  ],
  'REST API': [
    { title: 'REST API Tutorial', provider: 'Traversy Media', type: 'video', url: 'https://www.youtube.com/results?search_query=rest+api+tutorial', topic: 'REST API', difficulty: 'Intermediate', duration: '1 hr' },
    { title: 'REST API Design — Microsoft', provider: 'Microsoft', type: 'docs', url: 'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design', topic: 'REST API', difficulty: 'Intermediate', duration: '2 hrs' },
  ],
  'SQL': [
    { title: 'SQL Tutorial — Full Database Course for Beginners', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=sql+tutorial+full+course', topic: 'SQL', difficulty: 'Beginner', duration: '4 hrs' },
    { title: 'SQL Tutorial — W3Schools', provider: 'W3Schools', type: 'docs', url: 'https://www.w3schools.com/sql/', topic: 'SQL', difficulty: 'Beginner', duration: '3 hrs' },
  ],
  'Python Basics': [
    { title: 'Python Tutorial for Beginners', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=python+tutorial+for+beginners', topic: 'Python Basics', difficulty: 'Beginner', duration: '4 hrs' },
    { title: 'Python.org Tutorial', provider: 'Python', type: 'docs', url: 'https://docs.python.org/3/tutorial/', topic: 'Python Basics', difficulty: 'Beginner', duration: '5 hrs' },
  ],
  'Statistics Fundamentals': [
    { title: 'Statistics Fundamentals — freeCodeCamp', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=statistics+fundamentals+tutorial', topic: 'Statistics Fundamentals', difficulty: 'Beginner', duration: '3 hrs' },
    { title: 'Statistics — Khan Academy', provider: 'Khan Academy', type: 'course', url: 'https://www.khanacademy.org/math/statistics-probability', topic: 'Statistics Fundamentals', difficulty: 'Beginner', duration: '5 hrs' },
  ],
  'Machine Learning Fundamentals': [
    { title: 'Machine Learning Full Course', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=machine+learning+full+course', topic: 'Machine Learning', difficulty: 'Intermediate', duration: '4 hrs' },
    { title: 'Machine Learning Crash Course — Google', provider: 'Google', type: 'course', url: 'https://developers.google.com/machine-learning/crash-course', topic: 'Machine Learning', difficulty: 'Intermediate', duration: '6 hrs' },
  ],
  'Deep Learning Basics': [
    { title: 'Deep Learning Full Course', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=deep+learning+full+course', topic: 'Deep Learning', difficulty: 'Intermediate', duration: '4 hrs' },
    { title: 'Deep Learning — fast.ai', provider: 'fast.ai', type: 'course', url: 'https://course.fast.ai/', topic: 'Deep Learning', difficulty: 'Intermediate', duration: '8 hrs' },
  ],
  'React Fundamentals': [
    { title: 'React Tutorial for Beginners', provider: 'Traversy Media', type: 'video', url: 'https://www.youtube.com/results?search_query=react+tutorial+for+beginners', topic: 'React', difficulty: 'Intermediate', duration: '3 hrs' },
    { title: 'React Official Tutorial', provider: 'React', type: 'docs', url: 'https://react.dev/learn', topic: 'React', difficulty: 'Intermediate', duration: '4 hrs' },
  ],
  'Node.js & Express': [
    { title: 'Node.js and Express.js Full Course', provider: 'freeCodeCamp', type: 'video', url: 'https://www.youtube.com/results?search_query=nodejs+express+full+course', topic: 'Node.js', difficulty: 'Intermediate', duration: '3 hrs' },
    { title: 'Express.js Guide', provider: 'Express', type: 'docs', url: 'https://expressjs.com/en/guide/routing.html', topic: 'Node.js', difficulty: 'Intermediate', duration: '2 hrs' },
  ],
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL GAP COMPUTATION
// ═══════════════════════════════════════════════════════════════════════════
export function computeSkillGaps(profile) {
  const career = profile?.careerGoal ? getCareer(profile.careerGoal) : null
  if (!career) return []

  const skillsMap = {}
  // Source 1: onboarding skills (baseline)
  ;(profile?.currentSkills || []).forEach(s => {
    if (s.name) skillsMap[s.name] = Math.max(skillsMap[s.name] || 0, s.level)
  })
  // Source 2: topic-completion-derived skill progress
  ;(profile?.progress?.skillProgress || []).forEach(s => {
    if (s.name) skillsMap[s.name] = Math.max(skillsMap[s.name] || 0, s.level)
  })

  return career.requiredSkills.map(rs => {
    const current = Math.min(100, Math.max(0, skillsMap[rs.name] ?? 0))
    const gap = rs.target - current
    const priority = gap >= 50 ? 'critical' : gap >= 25 ? 'high' : gap >= 10 ? 'medium' : 'low'
    return {
      skill: rs.name,
      current,
      required: rs.target,
      gap: Math.max(0, gap),
      priority,
    }
  })
}

export function computeCareerReadiness(profile) {
  const gaps = computeSkillGaps(profile)
  if (gaps.length === 0) return 0
  const total = gaps.reduce((acc, g) => acc + Math.min(100, (g.current / g.required) * 100), 0)
  return Math.round(total / gaps.length)
}

// ═══════════════════════════════════════════════════════════════════════════
// PROGRESS STATS
// ═══════════════════════════════════════════════════════════════════════════

// ONE shared rule for whether a skill gap is closed (mastered): the skill's
// gap to the career requirement is <= 10 (>= 90% of required level).
export function isSkillMastered(gap) {
  if (gap == null) return false
  const gapValue = typeof gap.gap === 'number' ? gap.gap : (gap.required - gap.current)
  return gapValue <= 10
}

// ONE shared definition of "skill mastered": the skill's gap to the career
// requirement is <= 10 (i.e. >= 90% of the required level). Dashboard, Skills,
// Progress, Career Readiness, and Learning DNA all use this single function —
// never a per-page copy.
export function getSkillsMastered(profile) {
  const progress = profile?.progress || {}
  const derived = computeSkillGaps(profile).filter(g => isSkillMastered(g)).length
  return derived || progress.skillsMastered || 0
}

// ONE shared definition of "Learning Time" (hours). Real tracked minutes come
// from structured learningActivity records; a profile without activity records
// (legacy) falls back to the stored hoursLearned counter. This drives the
// Dashboard card, Progress page, and Learning DNA — never a hardcoded number.
// Always returns a safe finite number (never NaN or Infinity).
export function getTotalLearningTime(profile) {
  const progress = profile?.progress || {}
  const activity = Array.isArray(progress.learningActivity) ? progress.learningActivity : []
  if (activity.length) {
    const minutes = activity.reduce((sum, e) => sum + safeNumber(e.durationMinutes), 0)
    return Math.round((minutes / 60) * 10) / 10
  }
  return safeNumber(progress.hoursLearned)
}

export function computeProgressStats(profile) {
  const roadmap = profile?.roadmap
  const allItems = roadmap?.phases?.flatMap(p => p.items) || []
  const completed = allItems.filter(i => i.status === 'completed').length
  const total = allItems.length
  const roadmapCompletion = total ? Math.round((completed / total) * 100) : 0

  const progress = profile?.progress || {}
  const assessments = profile?.assessmentResults || []
  const scored = assessments.filter(a => typeof a.score === 'number')
  const avgAssessment = scored.length ? Math.round(scored.reduce((s, a) => s + a.score, 0) / scored.length) : null

  const skillsMastered = getSkillsMastered(profile)

  const overall = total
    ? Math.round(roadmapCompletion * 0.7 + (avgAssessment ?? 0) * 0.3)
    : progress.overallProgress || 0

  const skillProgress = computeSkillGaps(profile).map(g => ({ name: g.skill, level: g.current }))
  const activeSkills = progress.skillProgress || []
  const mergedSkills = [...activeSkills]
  skillProgress.forEach(sp => {
    const existing = mergedSkills.find(m => m.name === sp.name)
    if (existing) existing.level = Math.max(existing.level || 0, sp.level)
    else mergedSkills.push(sp)
  })

  return {
    overallProgress: Math.min(100, overall),
    roadmapCompletion,
    topicsCompleted: completed || progress.topicsCompleted || 0,
    totalTopics: total,
    hoursLearned: getTotalLearningTime(profile),
    skillsMastered,
    projectsCompleted: progress.projectsCompleted || 0,
    assessmentScore: avgAssessment,
    assessmentsTaken: assessments.length,
    weeklyActivity: progress.weeklyActivity || [],
    skillProgress: mergedSkills,
    completedProjects: progress.completedProjects || [],
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RECOMMEND PROJECTS
// ═══════════════════════════════════════════════════════════════════════════
export function recommendProjects(profile) {
  const career = profile?.careerGoal ? getCareer(profile.careerGoal) : null
  if (!career) return []

  const skillsMap = {}
  ;(profile?.currentSkills || []).forEach(s => { if (s.name) skillsMap[s.name] = s.level })
  ;(profile?.progress?.skillProgress || []).forEach(s => { if (skillsMap[s.name] == null && s.name) skillsMap[s.name] = s.level })

  const mastery = (name) => skillsMap[name] ?? 0
  const roadmap = profile?.roadmap
  const items = roadmap?.phases?.flatMap(p => p.items) || []
  const roadmapProgress = items.length ? (items.filter(i => i.status === 'completed').length / items.length) * 100 : 0

  return career.projects.map((p, idx) => ({
    id: idx + 1,
    ...p,
    readiness: Math.round(p.skills.reduce((acc, s) => acc + mastery(s), 0) / Math.max(1, p.skills.length)),
    unlockHint: roadmapProgress >= 25 ? 'Ready to start' : 'Complete some roadmap topics first',
  }))
}

// ═══════════════════════════════════════════════════════════════════════════
// RECOMMENDATIONS (with real URLs)
// ═══════════════════════════════════════════════════════════════════════════
export function buildRecommendations(profile) {
  const roadmap = profile?.roadmap
  const gaps = computeSkillGaps(profile).filter(g => g.gap > 0)
  if (!roadmap && gaps.length === 0) return []

  const items = roadmap?.phases?.flatMap(p => p.items) || []
  const upcoming = items
    .filter(i => i.status !== 'completed')
    .map(i => i.name)
    .filter(isResourceAvailable)

  const gapTopics = gaps
    .slice()
    .sort((a, b) => b.gap - a.gap)
    .map(g => g.skill)
    .filter(isResourceAvailable)

  const topics = [...new Set([...gapTopics, ...upcoming])].slice(0, 10)

  return topics.map((topic, i) => {
    const resources = RESOURCES[topic] || []
    const primaryResource = resources[0] || null
    return {
      id: getResourceId(topic),
      title: topic,
      provider: primaryResource?.provider || 'PathForge',
      skill: topic,
      skillId: getResourceId(topic),
      level: profile?.experienceLevel || 'Beginner',
      duration: primaryResource?.duration || `${3 + (i % 3) * 2} hrs`,
      type: primaryResource?.type || (i % 3 === 0 ? 'course' : i % 3 === 1 ? 'video' : 'practice'),
      rating: Number((4.4 + (i % 5) * 0.1).toFixed(1)),
      url: primaryResource?.url || '',
      contentAvailable: true,
      description: primaryResource?.title || `Resources for ${topic}`,
      resources,
    }
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// LEARNING DNA
// ═══════════════════════════════════════════════════════════════════════════
export function computeLearningDNA(profile) {
  const gaps = computeSkillGaps(profile)
  const progress = profile?.progress || {}
  const assessments = profile?.assessmentResults || []
  const currentSkills = profile?.currentSkills || []

  const roadmap = profile?.roadmap
  const topicsCompleted = roadmap?.phases?.flatMap(p => p.items).filter(i => i.status === 'completed').length || progress.topicsCompleted || 0
  const assessmentsTaken = assessments.length
  const hasActivity = topicsCompleted > 0 || assessmentsTaken > 0 || progress.hoursLearned > 0

  const scored = assessments.filter(a => typeof a.score === 'number')
  const avgAssessment = scored.length ? Math.round(scored.reduce((s, a) => s + a.score, 0) / scored.length) : null

  const strongSkills = gaps.filter(g => g.required > 0 && g.current / g.required >= 0.7).map(g => g.skill)
  const weakSkills = gaps.filter(g => g.current / Math.max(1, g.required) < 0.5).map(g => g.skill)

  const pref = (profile?.learningPreference || '').toLowerCase()
  const learningStyle =
    pref.includes('visual') ? 'Visual'
    : pref.includes('reading') ? 'Reading'
    : pref.includes('hands') ? 'Hands-on'
    : pref.includes('mixed') ? 'Mixed'
    : 'Hands-on'

  const consistency = Math.min(100, topicsCompleted * 8 + assessmentsTaken * 5)
  const consistencyLabel = consistency >= 60 ? 'Excellent' : consistency >= 30 ? 'Good' : consistency > 0 ? 'Getting started' : 'Not started'

  const avgSkill = currentSkills.length ? Math.round(currentSkills.reduce((s, x) => s + (x.level || 0), 0) / currentSkills.length) : 0
  const radar = {
    problemSolving: currentSkills.length ? Math.min(100, Math.round((topicsCompleted * 8) + avgSkill * 0.6)) : 0,
    consistency,
    curiosity: hasActivity ? Math.min(100, assessmentsTaken * 15 + topicsCompleted * 5) : 0,
    practicalLearning: Math.min(100, (progress.projectsCompleted || 0) * 20 + topicsCompleted * 6),
    visualLearning: learningStyle === 'Visual' ? 80 : learningStyle === 'Mixed' ? 60 : 40,
    theoreticalLearning: learningStyle === 'Reading' ? 80 : learningStyle === 'Mixed' ? 60 : 40,
  }

  const mix =
    learningStyle === 'Visual' ? { practical: 55, theory: 25, assessment: 20 }
    : learningStyle === 'Reading' ? { practical: 35, theory: 45, assessment: 20 }
    : { practical: 55, theory: 25, assessment: 20 }

  return {
    goal: profile?.careerGoal || 'Your goal',
    level: profile?.experienceLevel || 'Beginner',
    learningStyle,
    weeklyCommitment: profile?.learningHours ? `${profile.learningHours}` : 'Not set',
    radar,
    strengths: strongSkills.slice(0, 3),
    growthAreas: weakSkills.slice(0, 3),
    consistencyLabel,
    learningStyleLabel: learningStyle,
    paceLabel: consistencyLabel,
    recommendedStyle: mix,
    topicsCompleted,
    assessmentsTaken,
    avgAssessment,
    hasActivity,
    recommendedApproach: recommendApproach({ learningStyle, strongSkills, weakSkills, goal: profile?.careerGoal }),
  }
}

function recommendApproach({ learningStyle, strongSkills, weakSkills, goal }) {
  const parts = []
  if (strongSkills.length) parts.push(`Lean on your strength in ${strongSkills[0]} to build momentum.`)
  if (weakSkills.length) parts.push(`Prioritize closing the gap in ${weakSkills[0]}.`)
  parts.push(`Use a ${learningStyle.toLowerCase()}-focused mix of short lessons and hands-on practice.`)
  if (goal) parts.push(`Keep every topic tied back to your ${goal} goal.`)
  return parts.join(' ')
}

// ═══════════════════════════════════════════════════════════════════════════
// SAFE NUMBER + TIME FORMATTING
// Single source for all learning-time display. Handles null, undefined,
// NaN, Infinity, negative, and numeric strings without ever producing
// "NaNh NaNm" or any other broken output.
// ═══════════════════════════════════════════════════════════════════════════
function safeNumber(v) {
  const n = Number(v)
  return Number.isFinite(n) ? Math.max(0, n) : 0
}

/**
 * Format a minutes value into a human-readable "Xh Ym" / "Xh" / "Ym" / "0h"
 * string. Safe against every edge case — never returns NaN, undefined, or
 * Infinity.
 *
 * @param {number|string|null|undefined} minutes
 * @returns {string}
 */
export function formatLearningTime(minutes) {
  const m = Math.round(safeNumber(minutes))
  const h = Math.floor(m / 60)
  const rem = m % 60
  if (h === 0 && rem === 0) return '0h'
  if (rem === 0) return `${h}h`
  return `${h}h ${rem}m`
}

// Alias: format hours (decimal) as "Xh Ym". Used by Dashboard/Progress where
// upstream data is already in decimal hours.
export function formatHours(hours) {
  return formatLearningTime(safeNumber(hours) * 60)
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Local (not UTC) calendar date key — toISOString() shifts across midnight in
// UTC+ timezones, making "today's" activity land on yesterday in charts.
function localDateKey(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Last 7 calendar days (today-6 … today), each with learning minutes, topics
// completed, and assessment activity. The canonical Learning Activity chart:
// derived from structured learningActivity records when present, otherwise
// from legacy aggregate weeklyActivity entries.
export function getWeeklyActivity(profile) {
  const progress = profile?.progress || {}
  const activity = Array.isArray(progress.learningActivity) ? progress.learningActivity : []
  const legacyWeekly = Array.isArray(progress.weeklyActivity) ? progress.weeklyActivity : []
  const useActivity = activity.length > 0
  const days = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    d.setHours(0, 0, 0, 0)
    const dateKey = localDateKey(d)

    let hours = 0
    let topics = 0
    let assessments = 0
    if (useActivity) {
      const dayRecords = activity.filter(e => {
        const ts = new Date(e.timestamp)
        return !isNaN(ts.getTime()) && localDateKey(ts) === dateKey
      })
      hours = Math.round(dayRecords.reduce((s, e) => s + safeNumber(e.durationMinutes), 0) / 6) / 10
      topics = dayRecords.reduce((s, e) => s + safeNumber(e.topics), 0)
      assessments = dayRecords.filter(e => e.type === 'ASSESSMENT_COMPLETED').length
    } else {
      const dayRecords = legacyWeekly.filter(e => e.day === dateKey)
      hours = dayRecords.reduce((sum, e) => sum + (e.hours || 0), 0)
      topics = dayRecords.reduce((sum, e) => sum + (e.topics || 0), 0)
    }

    days.push({
      date: dateKey,
      label: DAY_NAMES[d.getDay()],
      dateLabel: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      hours,
      topics,
      assessments,
      hasActivity: hours > 0 || topics > 0 || assessments > 0,
    })
  }

  return days
}

export function getLearningHours(profile) {
  const progress = profile?.progress || {}
  const weekly = Array.isArray(progress.weeklyActivity) ? progress.weeklyActivity : []
  const total = getTotalLearningTime(profile)
  const now = new Date()
  const startOfWeek = new Date(now)
  const day = startOfWeek.getDay()
  const diff = day === 0 ? 6 : day - 1
  startOfWeek.setDate(startOfWeek.getDate() - diff)
  startOfWeek.setHours(0, 0, 0, 0)

  const thisWeek = weekly
    .filter(e => {
      const d = new Date(e.day)
      return !isNaN(d.getTime()) && d >= startOfWeek
    })
    .reduce((sum, e) => sum + safeNumber(e.hours), 0)

  return { total, thisWeek }
}

export function getUpcomingMilestones(profile) {
  const roadmap = profile?.roadmap
  const items = roadmap?.phases?.flatMap(p => p.items) || []
  return items
    .filter(i => i.status === 'in-progress' || i.status === 'available')
    .slice(0, 5)
}

export function getRecentActivity(profile) {
  const roadmap = profile?.roadmap
  const items = roadmap?.phases?.flatMap(p => p.items) || []
  const completed = items
    .filter(i => i.status === 'completed')
    .slice(-5)
    .reverse()
    .map(i => ({
      id: i.id,
      text: `Completed ${i.name}`,
      symbol: '✓',
      className: 'text-success',
      type: 'lesson',
    }))

  const assessments = (profile?.assessmentResults || [])
    .slice(-3)
    .reverse()
    .map(a => ({
      id: `assess-${a.topic}-${a.score}`,
      text: `${a.topic} — ${a.score}%`,
      symbol: '📝',
      className: 'text-ink-secondary',
      type: 'assessment',
    }))

  // Persisted events (e.g. project completions) carry timestamps.
  const events = (profile?.recentActivity || []).slice(-3).reverse()

  return [...events, ...completed, ...assessments].slice(0, 8)
}

// ═══════════════════════════════════════════════════════════════════════════
// PROFILE MUTATIONS
// ═══════════════════════════════════════════════════════════════════════════

// Derive skillProgress from completed topics + assessments
function deriveSkillProgress(profile) {
  const roadmap = profile?.roadmap
  const allItems = roadmap?.phases?.flatMap(p => p.items) || []
  const completedItems = allItems.filter(i => i.status === 'completed')
  const assessments = profile?.assessmentResults || []

  // Build a map: skillName → { topicLevel, assessmentScore }
  const skillData = {}

  // From completed topics
  completedItems.forEach(item => {
    const skillName = TOPIC_SKILL_MAP[item.name]
    if (!skillName) return
    if (!skillData[skillName]) skillData[skillName] = { topicLevel: 0, assessmentScore: null }
    skillData[skillName].topicLevel = Math.min(100, skillData[skillName].topicLevel + TOPIC_BOOST)
  })

  // From assessments (average score per topic skill)
  assessments.forEach(a => {
    if (typeof a.score !== 'number' || !a.topic) return
    const skillName = TOPIC_SKILL_MAP[a.topic] || a.topic
    if (!skillData[skillName]) skillData[skillName] = { topicLevel: 0, assessmentScore: null }
    if (skillData[skillName].assessmentScore === null) {
      skillData[skillName].assessmentScore = a.score
    } else {
      skillData[skillName].assessmentScore = Math.round(
        (skillData[skillName].assessmentScore + a.score) / 2
      )
    }
  })

  // Compute final skill level: topic completion (60%) + assessment (40%)
  const result = []
  Object.entries(skillData).forEach(([name, data]) => {
    const topicPart = data.topicLevel * 0.6
    const assessPart = (data.assessmentScore ?? data.topicLevel) * 0.4
    result.push({
      name,
      level: Math.min(100, Math.round(topicPart + assessPart)),
    })
  })

  return result
}

export function completeRoadmapItem(profile, topicId, minutes = null) {
  const roadmap = profile?.roadmap
  if (!roadmap) return profile

  const phases = roadmap.phases.map(phase => ({
    ...phase,
    items: phase.items.map(item =>
      item.id === topicId ? { ...item, status: 'completed' } : item
    ),
  }))

  const updatedPhases = phases.map((phase, phaseIdx) => {
    const items = phase.items.map((item, itemIdx) => {
      if (item.status === 'completed') return item
      if (item.status === 'in-progress') return item

      const currentIdx = phase.items.findIndex(it => it.status === 'in-progress')

      if (currentIdx >= 0 && itemIdx < currentIdx) {
        return { ...item, status: 'available' }
      }

      const allPreviousDone = phase.items.slice(0, itemIdx).every(it => it.status === 'completed')
      if (allPreviousDone) {
        return { ...item, status: 'available' }
      }

      if (phaseIdx > 0) {
        const prevPhase = phases[phaseIdx - 1]
        const prevAllDone = prevPhase.items.every(it => it.status === 'completed')
        if (prevAllDone && itemIdx === 0) {
          return { ...item, status: 'available' }
        }
      }

      return item
    })

    const hasInProgress = items.some(it => it.status === 'in-progress')
    if (!hasInProgress) {
      const firstAvailableIdx = items.findIndex(it => it.status === 'available')
      if (firstAvailableIdx >= 0) {
        items[firstAvailableIdx] = { ...items[firstAvailableIdx], status: 'in-progress' }
      }
    }

    return { ...phase, items }
  })

  const allItems = updatedPhases.flatMap(p => p.items)
  const completed = allItems.filter(i => i.status === 'completed').length
  const total = allItems.length

  const progress = profile?.progress || {}

  // Derive skillProgress from completed topics + assessments
  const derivedSkillProgress = deriveSkillProgress({
    ...profile,
    roadmap: { ...roadmap, phases: updatedPhases },
  })

  // Merge derived with any existing skillProgress not in the mapping
  const existingSkillProgress = (progress.skillProgress || []).filter(
    s => !derivedSkillProgress.find(d => d.name === s.name)
  )
  const mergedSkillProgress = [...derivedSkillProgress, ...existingSkillProgress]

  const roadmapCompletion = total ? Math.round((completed / total) * 100) : 0
  const scored = (profile?.assessmentResults || []).filter(a => typeof a.score === 'number')
  const avgAssessment = scored.length ? Math.round(scored.reduce((s, a) => s + a.score, 0) / scored.length) : null
  // Same formula as computeProgressStats: 70% roadmap, 30% assessment average.
  const overall = total
    ? Math.round(roadmapCompletion * 0.7 + (avgAssessment ?? 0) * 0.3)
    : progress.overallProgress || 0

  // Structured, traceable activity record — the canonical source for both
  // Learning Time and the Learning Activity chart. Minutes are the ACTUAL time
  // spent in the lesson (tracked by LearnTopic), clamped to a sane range.
  // Callers without a tracked value fall back to a documented 30-minute
  // estimate; nothing is inflated.
  const completedTopic = allItems.find(i => i.id === topicId)
  const durationMinutes = minutes != null
    ? Math.min(120, Math.max(5, Math.round(minutes)))
    : 30
  const event = {
    id: `topic-${topicId}-${Date.now()}`,
    type: 'TOPIC_COMPLETED',
    topicId,
    name: completedTopic?.name || 'Topic',
    durationMinutes,
    topics: 1,
    timestamp: new Date().toISOString(),
  }
  const learningActivity = [...(progress.learningActivity || []), event].slice(-200)

  return {
    ...profile,
    roadmap: { ...roadmap, phases: updatedPhases },
    progress: {
      ...progress,
      roadmapCompletion,
      topicsCompleted: completed,
      overallProgress: Math.min(100, overall),
      hoursLearned: getTotalLearningTime({
        ...profile,
        progress: { ...progress, learningActivity },
      }),
      learningActivity,
      skillProgress: mergedSkillProgress,
      weeklyActivity: addWeeklyHours(progress.weeklyActivity, durationMinutes / 60, 1),
    },
    updatedAt: new Date().toISOString(),
  }
}

export function addAssessmentToProfile(profile, result) {
  const results = [...(profile?.assessmentResults || []), { ...result, takenAt: new Date().toISOString() }]
  const scored = results.filter(a => typeof a.score === 'number')
  const avgAssessment = scored.length ? Math.round(scored.reduce((s, a) => s + a.score, 0) / scored.length) : null

  // Derive skillProgress with updated assessments
  const derivedSkillProgress = deriveSkillProgress({
    ...profile,
    assessmentResults: results,
  })

  const progress = profile?.progress || {}
  const existingSkillProgress = (progress.skillProgress || []).filter(
    s => !derivedSkillProgress.find(d => d.name === s.name)
  )
  const mergedSkillProgress = [...derivedSkillProgress, ...existingSkillProgress]

  // Assessments contribute activity (but never fake learning minutes).
  const event = {
    id: `assessment-${Date.now()}`,
    type: 'ASSESSMENT_COMPLETED',
    topic: result?.topic || 'Assessment',
    score: typeof result?.score === 'number' ? result.score : null,
    durationMinutes: 0,
    topics: 0,
    timestamp: new Date().toISOString(),
  }
  const learningActivity = [...(progress.learningActivity || []), event].slice(-200)

  return {
    ...profile,
    assessmentResults: results,
    progress: {
      ...progress,
      assessmentScore: avgAssessment,
      learningActivity,
      skillProgress: mergedSkillProgress,
      skillsMastered: Math.max(progress.skillsMastered || 0, getSkillsMastered({ ...profile, assessmentResults: results })),
    },
    updatedAt: new Date().toISOString(),
  }
}

export function addWeeklyHours(weeklyActivity, hours, topics = 0) {
  const list = Array.isArray(weeklyActivity) ? weeklyActivity.slice() : []
  const now = new Date()
  const dateKey = localDateKey(now)
  const existing = list.find(x => x.day === dateKey)
  if (existing) {
    existing.hours = safeNumber(existing.hours) + safeNumber(hours)
    existing.topics = safeNumber(existing.topics) + safeNumber(topics)
  } else {
    list.push({ day: dateKey, hours: safeNumber(hours), topics: safeNumber(topics) })
  }
  return list.slice(-60)
}

// ═══════════════════════════════════════════════════════════════════════════
// ROADMAP RESET — used when the learner changes career goal. Replaces topic
// progress counters and re-derives skills against the NEW roadmap while
// preserving all real learner data: hours, assessments, projects, activity.
// ═══════════════════════════════════════════════════════════════════════════
export function resetRoadmapProgress(profile, roadmap) {
  const p = profile || {}
  const progress = p.progress || {}
  const roadmapCompletion = 0

  const derivedSkillProgress = deriveSkillProgress({
    ...p,
    roadmap,
    progress: { ...progress, topicsCompleted: 0, roadmapCompletion, overallProgress: 0 },
  })
  const existingSkillProgress = (progress.skillProgress || []).filter(
    s => !derivedSkillProgress.find(d => d.name === s.name)
  )

  return {
    ...p,
    roadmap,
    progress: {
      ...progress,
      topicsCompleted: 0,
      roadmapCompletion,
      overallProgress: roadmapCompletion,
      skillProgress: [...derivedSkillProgress, ...existingSkillProgress],
      hoursLearned: progress.hoursLearned || 0,
      weeklyActivity: progress.weeklyActivity || [],
      assessmentScore: progress.assessmentScore ?? null,
      projectsCompleted: progress.projectsCompleted || 0,
      completedProjects: progress.completedProjects || [],
    },
    updatedAt: new Date().toISOString(),
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT STATUS — persisted per UID. Completing a project feeds back into
// skillProgress, hours, weekly activity, completedProjects, and activity feed
// so Projects/Dashboard/Progress/Skills stay consistent.
// ═══════════════════════════════════════════════════════════════════════════
const PROJECT_BOOST = 6
const PROJECT_HOURS = 4

export function updateProjectStatus(profile, projectId, status, project = null) {
  const p = profile || {}
  const progress = p.progress || {}
  const prev = p.projectProgress || {}
  const entry = {
    ...(prev[projectId] || {}),
    status,
    updatedAt: new Date().toISOString(),
  }
  if (status === 'started') entry.startedAt = prev[projectId]?.startedAt || new Date().toISOString()
  if (status === 'completed') entry.completedAt = new Date().toISOString()

  const projectProgress = { ...prev, [projectId]: entry }
  const projectsCompleted = Object.values(projectProgress).filter(e => e.status === 'completed').length

  if (status !== 'completed') {
    return { ...p, projectProgress, updatedAt: entry.updatedAt }
  }

  // Completion feedback into shared learner state.
  const completedProjects = Array.isArray(progress.completedProjects) ? progress.completedProjects.slice() : []
  if (!completedProjects.includes(projectId)) completedProjects.push(projectId)

  const skillNames = Array.isArray(project?.skills) ? project.skills : []
  let skillProgress = Array.isArray(progress.skillProgress)
    ? progress.skillProgress.map(s => skillNames.includes(s.name)
        ? { ...s, level: Math.min(100, (s.level || 0) + PROJECT_BOOST) }
        : s)
    : []
  skillNames.forEach(name => {
    if (!skillProgress.find(s => s.name === name)) {
      skillProgress.push({ name, level: Math.min(100, PROJECT_BOOST) })
    }
  })

  const event = {
    id: `project-${projectId}-${Date.now()}`,
    text: `Completed ${project?.title || projectId}`,
    symbol: '🚀',
    className: 'text-ink-secondary',
    type: 'project',
  }
  const activityEvent = {
    id: `project-${projectId}-${Date.now()}`,
    type: 'PROJECT_COMPLETED',
    projectId,
    name: project?.title || projectId,
    // Documented estimate for the project build-out; part of the single
    // canonical Learning Time source (getTotalLearningTime).
    durationMinutes: PROJECT_HOURS * 60,
    topics: 0,
    timestamp: new Date().toISOString(),
  }
  const learningActivity = [...(progress.learningActivity || []), activityEvent].slice(-200)

  const recentActivity = [...(p.recentActivity || []), event].slice(-30)

  return {
    ...p,
    projectProgress,
    recentActivity,
    progress: {
      ...progress,
      projectsCompleted,
      completedProjects,
      skillProgress,
      learningActivity,
      hoursLearned: getTotalLearningTime({ ...p, progress: { ...progress, learningActivity } }),
      weeklyActivity: addWeeklyHours(progress.weeklyActivity, PROJECT_HOURS),
    },
    updatedAt: entry.updatedAt,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PROFILE MIGRATION — normalize missing fields on load
// ═══════════════════════════════════════════════════════════════════════════
export function migrateProfile(profile) {
  if (!profile) return profile
  let changed = false
  const p = { ...profile }

  if (!p.progress) { p.progress = {}; changed = true }

  if (!p.roadmap) return p

  const derived = deriveSkillProgress(p)
  const existing = p.progress.skillProgress || []
  const merged = [...derived]
  existing.forEach(s => {
    if (!merged.find(m => m.name === s.name)) merged.push(s)
  })
  if (JSON.stringify(merged) !== JSON.stringify(existing)) {
    p.progress.skillProgress = merged
    changed = true
  }

  const allItems = p.roadmap?.phases?.flatMap(phase => phase.items) || []
  const completed = allItems.filter(i => i.status === 'completed').length
  if (p.progress.topicsCompleted !== completed) {
    p.progress.topicsCompleted = completed
    p.progress.roadmapCompletion = allItems.length ? Math.round((completed / allItems.length) * 100) : 0
    p.progress.overallProgress = p.progress.roadmapCompletion
    changed = true
  }

  if (p.progress.currentStreak && p.progress.currentStreak > 0 && !p.progress.weeklyActivity?.length) {
    p.progress.currentStreak = 0
    changed = true
  }

  // Backfill weeklyActivity for existing completed topics if missing
  if (completed > 0 && (!p.progress.weeklyActivity || p.progress.weeklyActivity.length === 0)) {
    const weekly = []
    const now = new Date()
    for (let i = 0; i < completed && i < 14; i++) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateKey = localDateKey(d)
      weekly.push({ day: dateKey, hours: 1, topics: 1 })
    }
    p.progress.weeklyActivity = weekly
    changed = true
  }

  // Ensure hoursLearned is at least proportional to completed topics
  if (completed > 0 && (!p.progress.hoursLearned || p.progress.hoursLearned < completed)) {
    p.progress.hoursLearned = Math.max(p.progress.hoursLearned || 0, completed)
    changed = true
  }

  return changed ? p : profile
}
