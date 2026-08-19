import { initializeApp } from 'firebase/app'
import fs from 'node:fs'

const env = {}
for (const line of fs.readFileSync('/Users/vaigunthansl/Desktop/hcl/frontend/.env', 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_]+)=(.*)$/)
  if (m) env[m[1]] = m[2].trim()
}
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}
const app = initializeApp(config)
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('firebase/auth')
const auth = getAuth(app)

const email = `live-${Date.now()}@example.com`
const password = 'PathforgeTest123!'

try {
  const c = await createUserWithEmailAndPassword(auth, email, password)
  console.log('SIGNUP OK uid:', c.user.uid)
  const signIn = await signInWithEmailAndPassword(auth, email, password)
  console.log('SIGNIN OK uid:', signIn.user.uid)
} catch (e) {
  console.log('ERROR code:', JSON.stringify(e.code))
  console.log('ERROR message:', JSON.stringify(e.message))
}
