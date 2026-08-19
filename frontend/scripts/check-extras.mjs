import { TOPIC_CONTENT } from '../src/data/learningContent.js'
import { TOPIC_EXTRAS } from '../src/data/learningContent.js'

const topics = Object.keys(TOPIC_CONTENT)
const extras = Object.keys(TOPIC_EXTRAS)
const missing = topics.filter(t => !extras.includes(t))
const extraOnly = extras.filter(t => !topics.includes(t))
console.log(`topics: ${topics.length}, extras: ${extras.length}`)
console.log('missing extras:', missing.length ? missing : 'none')
console.log('extras without content (aliases ok):', extraOnly.length ? extraOnly : 'none')
process.exit(missing.length ? 1 : 0)