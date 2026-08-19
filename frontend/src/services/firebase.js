import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth, browserSessionPersistence, browserPopupRedirectResolver, GoogleAuthProvider } from 'firebase/auth'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const REQUIRED = ['apiKey', 'authDomain', 'projectId', 'appId']
const MISSING = REQUIRED.filter(k => !config[k])

export const firebaseConfigured = MISSING.length === 0

export function getFirebaseApp() {
  if (!firebaseConfigured) {
    throw new Error('Firebase is not configured. Add the VITE_FIREBASE_* keys to your .env file (see .env.example).')
  }
  return getApps().length > 0 ? getApps()[0] : initializeApp(config)
}

let authInstance = null

export function getFirebaseAuth() {
  if (!authInstance) {
    // Use sessionStorage (NOT IndexedDB) for auth persistence. The default
    // browserLocalPersistence stores state in IndexedDB, which the SDK closes
    // on pagehide; a concurrent persistence write then fails with the Firebase
    // internal error "Database is closing/hidden" (seen during Google popup
    // sign-in). sessionStorage survives page refresh but avoids that race.
    authInstance = initializeAuth(getFirebaseApp(), {
      persistence: browserSessionPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    })
  }
  return authInstance
}

export function getGoogleProvider() {
  const provider = new GoogleAuthProvider()
  provider.addScope('email')
  provider.addScope('profile')
  // Always show Google's account chooser so the user can pick which account to sign in with.
  provider.setCustomParameters({ prompt: 'select_account' })
  return provider
}
