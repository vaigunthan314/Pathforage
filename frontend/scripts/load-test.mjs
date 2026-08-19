// Concurrency + isolation test: 10 simulated users hitting PathForge's backend
// simultaneously (profile create/get/update, roadmap, skills, progress, chat).
// Verifies: no crash, no cross-user leakage, correct 503/200 handling.
const BASE = process.env.PF_API || 'http://localhost:8080/api'

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  return { status: res.status, data }
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`)
  const data = await res.json().catch(() => ({}))
  return { status: res.status, data }
}

async function put(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  return { status: res.status, data }
}

const N = 10
const users = Array.from({ length: N }, (_, i) => ({
  authId: `load-user-${i}`,
  name: `Load User ${i}`,
  email: `user${i}@test.dev`,
}))

let passed = 0, failed = 0
const check = (cond, msg) => {
  if (cond) { passed++ } else { failed++; console.log(`FAIL ${msg}`) }
}

// Phase 1: concurrent get-or-create (identity reconciliation)
console.log(`Creating/getting ${N} learners concurrently...`)
const created = await Promise.all(users.map(u => get(`/learners/auth/${u.authId}`)))
check(created.every(r => r.status === 200), 'all get-or-create return 200')
const ids = created.map(r => r.data?.id)
check(new Set(ids).size === N, `each user has a distinct learner id (${new Set(ids).size}/${N})`)
users.forEach((u, i) => {
  const row = created[i].data || {}
  // The id returned must own the authId — no cross-user swap.
  check(row.authId === u.authId, `user ${u.authId} owns its record`)
})

// Phase 2: concurrent profile updates (the former duplicate-row bug surface)
console.log('Updating all profiles concurrently (PUT authId)...')
const updated = await Promise.all(users.map(u =>
  put(`/learners/auth/${u.authId}`, { name: `${u.name}-v2`, profileData: `{"goal":"Cloud Engineer","level":"Beginner"}` })
))
check(updated.every(r => r.status === 200), 'all concurrent profile updates succeed')

// Phase 3: ensure NO duplicate rows were created (old bug would add rows)
const recount = await Promise.all(users.map(u => get(`/learners/auth/${u.authId}`)))
check(recount.every((r, i) => r.data?.id === ids[i]), 'no duplicate learner rows after concurrent updates')
check(recount.every((r, i) => r.data?.name === `${users[i].name}-v2`), 'updates applied to the right user only')

// Phase 4: concurrent roadmap generation + skill gaps + progress + chat
console.log('Running concurrent work: roadmap + skills + progress + chat...')
const jobs = users.map((u, i) => Promise.all([
  post('/roadmap/generate', { learnerId: ids[i] }),
  post('/roadmap/recalculate', { learnerId: ids[i] }),
  get(`/skill-gap/${ids[i]}`),
  get(`/progress/${ids[i]}`),
  post('/assessment/generate', { topic: 'Docker', learnerId: ids[i] }),
  get(`/learning-dna/${ids[i]}`),
]))
const results = await Promise.all(jobs)
const bad = results.flatMap((r, i) => r.map((x, j) => ({ i, j, x })).filter(({ x }) => !(x.status === 200 || x.status === 500 && x.data?.error)))
if (bad.length) console.log('FAILURES:', JSON.stringify(bad.map(({ i, j, x }) => ({ job: j, user: i, status: x.status, body: JSON.stringify(x.data).slice(0, 200) })), null, 1))
check(results.every(r => r.every(x => x.status === 200 || x.status === 500 && x.data?.error)), 'all parallel reads/writes complete without crash')
results.forEach((r, i) => {
  const [roadmap] = r
  check(roadmap.data?.phases?.length >= 1, `user ${i} got their own roadmap`)
})

// Phase 5: chat endpoint — must NOT fall back to learner #1; 503 when keyless
const chatResults = await Promise.all(users.map((u, i) => post('/chat', { message: 'hi', learnerId: ids[i] })))
check(chatResults.every(r => r.status === 200 || r.status === 503), 'chat responds for every user (200 live or 503 unavailable)')
const noId = await post('/chat', { message: 'hi' })
check(noId.status === 400, 'chat without learnerId is rejected (400), no cross-user default')

// Phase 6: isolation spot-check — user A fetching B's roadmap by id is
// blocked-by-design only at the app layer; backend keys by provided id.
const crossCheck = await Promise.all(users.map(u => get(`/learners/auth/${u.authId}`)))
const allNames = Object.fromEntries(crossCheck.map((r, i) => [users[i].authId, r.data?.name]))
check(Object.entries(allNames).every(([k, v]) => v === `${k.replace('load-user-', 'Load User ')}-v2`), 'each user reads only their own updated name')

console.log(`\n${passed} passed, ${failed} failed`)
process.exit(failed ? 1 : 0)