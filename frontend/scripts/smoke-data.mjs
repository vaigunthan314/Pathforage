import { getAllProjects } from '../src/data/careers.js'
import { TOPIC_CONTENT, TOPIC_EXTRAS } from '../src/data/learningContent.js'
import { resolveTopicName, getTopicDocsUrl, getProjectById } from '../src/data/contentResolver.js'
import { getWeeklyActivity, getTotalLearningTime, getSkillsMastered, isSkillMastered, completeRoadmapItem, addAssessmentToProfile, updateProjectStatus, migrateProfile, resetRoadmapProgress, computeSkillGaps } from '../src/services/derivedData.js'

let fail = 0
const ok = (cond, msg) => { console.log(`${cond ? 'PASS' : 'FAIL'} ${msg}`); if (!cond) fail++ }

const projects = getAllProjects()
ok(projects.length === 122, `122 projects (got ${projects.length})`)
const missing = projects.filter(p => !p.problemStatement || !p.techStack?.length || !p.howToBuild?.length || !p.implementationSteps?.length || !p.expectedResult)
ok(missing.length === 0, `all projects fully enriched (${missing.length} missing fields)`)
const ids = new Set(projects.map(p => p.id))
ok(ids.size === 122, `unique project ids (${ids.size})`)
ok(projects.every(p => p.careerPath && p.career), 'careerPath + career present everywhere')
ok(getProjectById(projects[0].id)?.id === projects[0].id, 'getProjectById works')

const aliasChecks = [
  ['REST APIs', 'REST API'], ['ML Fundamentals', 'Machine Learning Fundamentals'],
  ['CI/CD Pipelines', 'CI/CD Fundamentals'], ['Cloud Fundamentals', 'Cloud Concepts'],
  ['Terraform', 'Infrastructure as Code'], ['rest api', 'REST API'],
]
for (const [from, to] of aliasChecks) ok(resolveTopicName(from) === to, `resolveTopicName('${from}') -> ${to}`)

ok(TOPIC_CONTENT['File Handling'] && TOPIC_CONTENT['File Handling'].sections?.length === 4, 'File Handling topic exists with 4 sections')
ok(TOPIC_CONTENT.MongoDB && TOPIC_CONTENT.MongoDB.practice?.length === 5, 'MongoDB topic exists with 5 quiz questions')
const allTopics = new Set(Object.keys(TOPIC_CONTENT))
for (const [name] of aliasChecks.concat([['SQL', 'SQL'], ['Spring Boot', 'Spring Boot'], ['Docker', 'Docker']])) {
  const resolved = resolveTopicName(name)
  ok(resolved && allTopics.has(resolved), `roadmap name '${name}' resolves to existing content (${resolved})`)
}
const dl = Object.keys(TOPIC_CONTENT).filter(t => getTopicDocsUrl(t))
ok(dl.length >= 40, `docs URLs for ${dl.length}/48 topics`)

// Profile plumbing smoke tests
const migrated = migrateProfile({})
ok(migrated && typeof migrated.progress === 'object', 'migrateProfile({}) normalizes empty profile')
const fullProfile = migrateProfile({ name: 'Tester', progress: { hoursLearned: 2 }, recentActivity: [] })
ok(fullProfile.progress.hoursLearned === 2, 'migrateProfile preserves existing fields')

const roadmap = {
  phases: [
    { id: 1, title: 'Foundations', items: [{ id: 't1', name: 'Java Basics', type: 'topic', status: 'in-progress' }] },
    { id: 2, title: 'Core', items: [{ id: 't2', name: 'OOPs Concepts', type: 'topic', status: 'locked' }] },
    { id: 3, title: 'Advanced', items: [{ id: 't3', name: 'Multithreading', type: 'topic', status: 'locked' }] },
  ],
}
const base = {
  name: 'Tester', careerGoal: 'Java Developer', learningStyle: 'visual', topicTarget: 120,
  progress: { hoursLearned: 0, weeklyActivity: [], skillProgress: [] }, recentActivity: [],
  assessmentResults: [], roadmap,
}
const done = completeRoadmapItem(base, 't1', 45)
ok(done.progress.topicsCompleted === 1, `completeRoadmapItem bumps topics (${done.progress.topicsCompleted})`)
ok(done.roadmap.phases[0].items[0].status === 'completed', 'item flips to completed')
ok(done.roadmap.phases[1].items[0].status === 'in-progress', 'next phase first item becomes current task (' + done.roadmap.phases[1].items[0].status + ')')
ok(done.progress.learningActivity?.[0]?.type === 'TOPIC_COMPLETED' && done.progress.learningActivity[0].durationMinutes === 45, 'completion records structured 45-min activity')
ok(Math.abs(getTotalLearningTime(done) - 0.8) < 0.01, `total time = tracked minutes (${getTotalLearningTime(done)}h)`)
ok(Math.abs(done.progress.hoursLearned - 0.8) < 0.01, `hoursLearned canonical (${done.progress.hoursLearned})`)
const weekly = getWeeklyActivity(done)
ok(weekly.length === 7 && weekly.some(d => d.hours > 0 && d.topics > 0), 'getWeeklyActivity returns last-7-days with tracked minutes')
const assessed = addAssessmentToProfile(done, { topic: 'Java Basics', score: 80, type: 'quiz' })
ok(assessed.progress.learningActivity.some(e => e.type === 'ASSESSMENT_COMPLETED'), 'assessment activity recorded')
ok(Math.abs(getTotalLearningTime(assessed) - 0.8) < 0.01, 'assessments add no fake minutes')
const weeklyAfter = getWeeklyActivity(assessed)
ok(weeklyAfter.some(d => d.assessments > 0), 'assessment activity visible in weekly chart')
ok(getSkillsMastered(base) === getSkillsMastered(assessed), 'getSkillsMastered shared function stable')
ok(typeof isSkillMastered === 'function' && isSkillMastered({ current: 95, required: 100, gap: 5 }) && !isSkillMastered({ current: 50, required: 100, gap: 50 }), 'isSkillMastered uses gap<=10 rule')
const allTopicNames = Object.keys(TOPIC_CONTENT)
const missingExtras = allTopicNames.filter(t => !TOPIC_EXTRAS[t])
ok(missingExtras.length === 0, `all ${allTopicNames.length} topics have real-world/mistakes extras (${missingExtras.length} missing)`)
const proj = getAllProjects().find(p => p.careerPath === 'Java Developer')
const withProj = updateProjectStatus(done, proj.id, 'completed', proj)
ok(withProj.progress.projectsCompleted === 1 && withProj.progress.completedProjects?.length === 1, 'updateProjectStatus records completion')
ok(withProj.progress.hoursLearned > done.progress.hoursLearned, 'completion adds project hours')
ok(withProj.recentActivity.some(e => e.type === 'project'), 'recentActivity event recorded')
const reset = resetRoadmapProgress(done, roadmap)
ok(reset.progress.topicsCompleted === 0 && reset.progress.hoursLearned > 0, 'resetRoadmapProgress preserves hours, resets topics')

console.log(fail === 0 ? '\nALL DATA-LAYER CHECKS PASSED' : `\n${fail} CHECKS FAILED`)
process.exit(fail === 0 ? 0 : 1)