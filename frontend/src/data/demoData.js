export const DEMO_LEARNER = {
  id: 'demo-1',
  name: 'Arjun',
  goal: 'Java Developer',
  currentLevel: 'Beginner',
  availableTime: '1 hour/day',
  targetTimeline: '3 months',
  learningStyle: 'Hands-on + Visual',
  priority: 'Career',
  currentSkills: [
    { name: 'Core Java', level: 70 },
    { name: 'SQL', level: 55 },
    { name: 'Spring Boot', level: 20 },
  ]
}

export const DEMO_SKILLS = [
  { id: 1, name: 'Core Java', category: 'Programming', icon: 'code' },
  { id: 2, name: 'Data Structures', category: 'Programming', icon: 'code' },
  { id: 3, name: 'SQL', category: 'Database', icon: 'database' },
  { id: 4, name: 'Spring Boot', category: 'Framework', icon: 'server' },
  { id: 5, name: 'REST API', category: 'Architecture', icon: 'globe' },
  { id: 6, name: 'System Design', category: 'Architecture', icon: 'layers' },
  { id: 7, name: 'Python', category: 'Programming', icon: 'code' },
  { id: 8, name: 'JavaScript', category: 'Programming', icon: 'code' },
  { id: 9, name: 'HTML', category: 'Web', icon: 'globe' },
  { id: 10, name: 'CSS', category: 'Web', icon: 'globe' },
  { id: 11, name: 'React', category: 'Framework', icon: 'code' },
  { id: 12, name: 'Node.js', category: 'Runtime', icon: 'server' },
  { id: 13, name: 'Git', category: 'DevOps', icon: 'git-branch' },
  { id: 14, name: 'Docker', category: 'DevOps', icon: 'box' },
  { id: 15, name: 'MySQL', category: 'Database', icon: 'database' },
  { id: 16, name: 'Hibernate', category: 'Framework', icon: 'database' },
  { id: 17, name: 'Maven', category: 'Build', icon: 'settings' },
  { id: 18, name: 'Linux', category: 'DevOps', icon: 'terminal' },
  { id: 19, name: 'Multithreading', category: 'Programming', icon: 'cpu' },
  { id: 20, name: 'Collections', category: 'Programming', icon: 'layers' },
]

export const DEMO_CAREER_ROLES = [
  {
    id: 1,
    name: 'Java Developer',
    description: 'Build robust backend applications with Java and Spring',
    requiredSkills: ['Core Java', 'Data Structures', 'SQL', 'Spring Boot', 'REST API', 'System Design'],
    salaryRange: '$70,000 - $130,000'
  },
  {
    id: 2,
    name: 'Full Stack Developer',
    description: 'Build end-to-end web applications',
    requiredSkills: ['Java', 'JavaScript', 'React', 'SQL', 'REST API', 'Spring Boot'],
    salaryRange: '$80,000 - $140,000'
  },
  {
    id: 3,
    name: 'Backend Engineer',
    description: 'Design and build scalable server-side systems',
    requiredSkills: ['Java', 'Spring Boot', 'SQL', 'System Design', 'REST API', 'Docker'],
    salaryRange: '$90,000 - $155,000'
  },
  {
    id: 4,
    name: 'DevOps Engineer',
    description: 'Bridge development and operations with automation',
    requiredSkills: ['Linux', 'Docker', 'Java', 'CI/CD', 'SQL'],
    salaryRange: '$95,000 - $160,000'
  },
]

export const DEMO_LEARNING_DNA = {
  goal: 'Java Developer',
  level: 'Beginner',
  learningStyle: 'Hands-on + Visual',
  weeklyCommitment: '7 hours',
  radar: {
    problemSolving: 85,
    consistency: 70,
    curiosity: 80,
    practicalLearning: 90,
    visualLearning: 75,
    theoreticalLearning: 55,
  },
  strengths: ['Problem Solving', 'Programming'],
  growthAreas: ['System Design', 'Cloud'],
  learningVelocity: 'Fast',
  learningStyleLabel: 'Visual + Practical',
  paceLabel: 'Steady',
  recommendedStyle: {
    practical: 70,
    theory: 20,
    assessment: 10
  }
}

export const DEMO_SKILL_GAPS = [
  { skill: 'Core Java', current: 70, required: 90, priority: 'medium' },
  { skill: 'Data Structures', current: 60, required: 85, priority: 'high' },
  { skill: 'SQL', current: 55, required: 80, priority: 'medium' },
  { skill: 'Spring Boot', current: 20, required: 80, priority: 'critical' },
  { skill: 'REST API', current: 30, required: 75, priority: 'critical' },
  { skill: 'System Design', current: 10, required: 70, priority: 'critical' },
]

export const DEMO_ROADMAP = {
  title: 'Java Developer',
  duration: '3 Months Plan',
  phases: [
    {
      id: 1,
      name: 'Phase 1: Foundation',
      duration: '2-3 weeks',
      color: '#6366f1',
      items: [
        { id: 'java-basics', name: 'Java Basics', status: 'completed', duration: '1 week', type: 'learning' },
        { id: 'oops', name: "OOPs Concepts", status: 'completed', duration: '1 week', type: 'learning' },
      ]
    },
    {
      id: 2,
      name: 'Phase 2: Core Java',
      duration: '3-4 weeks',
      color: '#6366f1',
      items: [
        { id: 'collections', name: 'Collections Framework', status: 'completed', duration: '1 week', type: 'learning' },
        { id: 'exception', name: 'Exception Handling', status: 'in-progress', duration: '1 week', type: 'learning' },
        { id: 'file', name: 'File Handling', status: 'locked', duration: '1 week', type: 'learning' },
      ]
    },
    {
      id: 3,
      name: 'Phase 3: Advanced',
      duration: '4-5 weeks',
      color: '#6366f1',
      items: [
        { id: 'multithreading', name: 'Multithreading', status: 'locked', duration: '2 weeks', type: 'learning' },
        { id: 'java8', name: 'Java 8+ Features', status: 'locked', duration: '2 weeks', type: 'learning' },
      ]
    },
    {
      id: 4,
      name: 'Phase 4: Backend',
      duration: '4-5 weeks',
      color: '#6366f1',
      items: [
        { id: 'jdbc', name: 'JDBC', status: 'locked', duration: '1 week', type: 'learning' },
        { id: 'spring', name: 'Spring Boot', status: 'locked', duration: '3 weeks', type: 'learning' },
        { id: 'rest', name: 'REST APIs', status: 'locked', duration: '2 weeks', type: 'learning' },
      ]
    },
    {
      id: 5,
      name: 'Phase 5: Capstone',
      duration: '2-3 weeks',
      color: '#6366f1',
      items: [
        { id: 'capstone', name: 'Build Production API', status: 'locked', duration: '3 weeks', type: 'project' },
      ]
    },
  ]
}

export const DEMO_COURSES = [
  {
    id: 1,
    title: 'Java Programming Masterclass',
    provider: 'Udemy',
    skill: 'Core Java',
    level: 'Beginner',
    duration: '12 hrs',
    type: 'course',
    rating: 4.6,
    url: '#',
    description: 'Complete Java course from basics to advanced'
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms in Java',
    provider: 'Coursera',
    skill: 'Data Structures',
    level: 'Intermediate',
    duration: '16 hrs',
    type: 'course',
    rating: 4.7,
    url: '#',
    description: 'Master data structures and algorithms'
  },
  {
    id: 3,
    title: 'Spring Boot 3 Complete Guide',
    provider: 'Udemy',
    skill: 'Spring Boot',
    level: 'Intermediate',
    duration: '10 hrs',
    type: 'course',
    rating: 4.5,
    url: '#',
    description: 'Build production-ready Spring Boot apps'
  },
  {
    id: 4,
    title: 'System Design Basics',
    provider: 'YouTube',
    skill: 'System Design',
    level: 'Beginner',
    duration: '8 hrs',
    type: 'video',
    rating: 4.8,
    url: '#',
    description: 'Learn system design fundamentals'
  },
  {
    id: 5,
    title: 'SQL Fundamentals',
    provider: 'Udemy',
    skill: 'SQL',
    level: 'Beginner',
    duration: '6 hrs',
    type: 'course',
    rating: 4.4,
    url: '#',
    description: 'Master SQL queries and database design'
  },
]

export const DEMO_PROJECTS = [
  {
    id: 1,
    name: 'Student Management System',
    difficulty: 'Beginner',
    duration: '4-6 hrs',
    skills: ['Java', 'MySQL', 'Swing'],
    techStack: 'Java, MySQL, Swing',
    description: 'A simple CRUD app to manage student records',
    whyRecommended: 'Practice Java fundamentals with database integration',
    expectedOutcome: 'Solid understanding of Java basics and JDBC'
  },
  {
    id: 2,
    name: 'Task Manager Web App',
    difficulty: 'Intermediate',
    duration: '8-10 hrs',
    skills: ['Spring Boot', 'MySQL', 'HTML'],
    techStack: 'Spring Boot, MySQL, HTML',
    description: 'A web app to manage daily tasks and priorities',
    whyRecommended: 'Build a real web app with Spring Boot',
    expectedOutcome: 'Experience with Spring MVC and database design'
  },
  {
    id: 3,
    name: 'E-Commerce Backend',
    difficulty: 'Advanced',
    duration: '15-20 hrs',
    skills: ['Spring Boot', 'JWT', 'MySQL'],
    techStack: 'Spring Boot, JWT, MySQL',
    description: 'RESTful API for an e-commerce platform',
    whyRecommended: 'Advanced project combining all learned skills',
    expectedOutcome: 'Production-ready API with authentication'
  },
]

export const DEMO_ASSESSMENT = {
  id: 'assess-1',
  topic: 'Java Collections',
  questions: [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Which interface is the root of the Java Collections Framework?',
      options: ['Collection', 'List', 'Set', 'Map'],
      correctAnswer: 0
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Which collection maintains insertion order and allows duplicates?',
      options: ['Set', 'List', 'Map', 'Queue'],
      correctAnswer: 1
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Which implementation of Map provides the best average-case performance?',
      options: ['TreeMap', 'Hashtable', 'HashMap', 'LinkedHashMap'],
      correctAnswer: 2
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'What is the time complexity of ArrayList.get(index)?',
      options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
      correctAnswer: 2
    },
    {
      id: 'q5',
      type: 'mcq',
      question: 'Which class is thread-safe for single-threaded scenarios?',
      options: ['ArrayList', 'LinkedList', 'Vector', 'CopyOnWriteArrayList'],
      correctAnswer: 2
    },
  ]
}

export const DEMO_PROGRESS = {
  overallProgress: 42,
  currentStreak: 7,
  hoursLearned: 28,
  skillsMastered: 5,
  projectsCompleted: 1,
  assessmentScore: 82,
  roadmapCompletion: 35,
  weeklyActivity: [
    { day: 'Week 1', hours: 5 },
    { day: 'Week 2', hours: 8 },
    { day: 'Week 3', hours: 7 },
    { day: 'Week 4', hours: 8 },
  ],
  skillProgress: [
    { name: 'Core Java', level: 70 },
    { name: 'Data Structures', level: 60 },
    { name: 'SQL', level: 55 },
    { name: 'Spring Boot', level: 20 },
    { name: 'REST API', level: 30 },
    { name: 'System Design', level: 10 },
  ]
}

export const DEMO_CHAT_HISTORY = [
  {
    role: 'assistant',
    content: "Hello! I'm your Java learning assistant. I can help you understand concepts, give examples, or quiz you. What would you like to know?"
  }
]
