// Canonical demo learner profile used ONLY for unauthenticated demo mode.
//
// It mirrors the exact shape persisted for real users (see
// profileService.defaultProfile) so every page can consume one canonical
// profile object regardless of mode. Authenticated users NEVER see this data.

import { DEMO_ROADMAP } from './demoData'

export const DEMO_PROFILE = {
  userId: 'demo-user',
  uid: 'demo-user',
  name: 'Arjun',
  email: 'arjun@demo.pathforge.app',
  avatar: '',
  careerGoal: 'Java Developer',
  experienceLevel: 'Beginner',
  learningHours: '1 hour/day',
  targetDuration: '3 months',
  learningPreference: 'hands-on',
  priority: 'Career Switch',
  currentSkills: [
    { name: 'Core Java', level: 70 },
    { name: 'Data Structures', level: 60 },
    { name: 'SQL', level: 55 },
    { name: 'Spring Boot', level: 20 },
  ],
  roadmap: DEMO_ROADMAP,
  progress: {
    overallProgress: 27,
    roadmapCompletion: 27,
    currentStreak: 4,
    hoursLearned: 12,
    skillsMastered: 2,
    projectsCompleted: 1,
    topicsCompleted: 3,
    assessmentScore: 60,
    weeklyActivity: [
      { day: 'Week 1', hours: 2 },
      { day: 'Week 2', hours: 3 },
      { day: 'Week 3', hours: 4 },
      { day: 'Week 4', hours: 3 },
    ],
    skillProgress: [
      { name: 'Core Java', level: 70 },
      { name: 'Data Structures', level: 60 },
      { name: 'SQL', level: 55 },
      { name: 'Spring Boot', level: 20 },
    ],
    completedProjects: [],
  },
  assessmentResults: [
    {
      topic: 'Java Basics',
      score: 60,
      percentage: 60,
      correct: 3,
      total: 5,
      topicPerformance: { topic: 'Java Basics', score: 60 },
      takenAt: new Date().toISOString(),
    },
  ],
  learningDNA: null,
  projects: [],
  onboardingCompleted: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const DEMO_QUICK_ACTIONS = ['explain simply', 'give example', 'quiz me', 'why do i need this?']
