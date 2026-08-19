import { getWeeklyActivity, completeRoadmapItem } from '../src/services/derivedData.js'

const r = { phases: [ { id: 1, items: [ { id: 't1', name: 'Java Basics', status: 'in-progress' } ] }, { id: 2, items: [ { id: 't2', name: 'OOPs Concepts', status: 'locked' } ] } ] }
const base = { name: 'T', careerGoal: 'Java Developer', progress: { hoursLearned: 0, weeklyActivity: [], skillProgress: [] }, recentActivity: [], assessmentResults: [], roadmap: r }
const out = completeRoadmapItem(base, 't1')
console.log('weekly:', JSON.stringify(getWeeklyActivity(out)))
console.log('weeklyActivity raw:', JSON.stringify(out.progress.weeklyActivity))
console.log('hoursLearned:', out.progress.hoursLearned)