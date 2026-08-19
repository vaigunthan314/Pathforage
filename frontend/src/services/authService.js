import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset as firebaseConfirmPasswordReset,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { getFirebaseAuth, getGoogleProvider, firebaseConfigured } from './firebase'

export const isAuthConfigured = firebaseConfigured

export class AuthError extends Error {
  constructor(message, code = 'auth_error') {
    super(message)
    this.code = code
  }
}

function toAppUser(firebaseUser) {
  if (!firebaseUser) return null
  return {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    avatar: firebaseUser.photoURL || '',
    provider: firebaseUser.providerData?.[0]?.providerId || 'unknown',
  }
}

// Single source of truth for the authentication state.
export function onAuthChange(callback) {
  if (!firebaseConfigured) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(getFirebaseAuth(), user => callback(toAppUser(user)))
}

export function getCurrentUser() {
  if (!firebaseConfigured) return null
  const auth = getFirebaseAuth()
  return toAppUser(auth.currentUser)
}

export async function signUp({ name, email, password }) {
  const auth = getFirebaseAuth()
  const credential = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
  if (name?.trim() && credential.user) {
    try {
      await updateProfile(credential.user, { displayName: name.trim() })
    } catch {
      // display name is best-effort; auth succeeded regardless
    }
  }
  return toAppUser(getFirebaseAuth().currentUser)
}

export async function signIn({ email, password }) {
  const auth = getFirebaseAuth()
  await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
  return toAppUser(auth.currentUser)
}

export async function signInWithGoogle() {
  const auth = getFirebaseAuth()
  try {
    const result = await signInWithPopup(auth, getGoogleProvider())
    console.log('Google authentication successful')
    console.log('UID:', result.user.uid)
    console.log('Email:', result.user.email)
    return toAppUser(result.user)
  } catch (error) {
    console.error('========== FIREBASE GOOGLE AUTH ERROR ==========')
    console.error('error:', error)
    console.error('name:', error?.name)
    console.error('code:', error?.code)
    console.error('message:', error?.message)
    console.error('customData:', error?.customData)
    console.error('serverResponse:', error?.serverResponse)
    console.error('stack:', error?.stack)
    console.error('==============================================')
    throw error
  }
}

export async function resetPassword(email) {
  const auth = getFirebaseAuth()
  const actionCodeSettings = {
    url: `${window.location.origin}/reset-password`,
    handleCodeInApp: true,
  }
  await sendPasswordResetEmail(auth, email.trim().toLowerCase(), actionCodeSettings)
}

export async function verifyResetCode(oobCode) {
  const auth = getFirebaseAuth()
  return verifyPasswordResetCode(auth, oobCode)
}

export async function confirmPasswordReset(oobCode, newPassword) {
  const auth = getFirebaseAuth()
  await firebaseConfirmPasswordReset(auth, oobCode, newPassword)
}

export async function signOut() {
  await firebaseSignOut(getFirebaseAuth())
}

const FRIENDLY_MESSAGES = {
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled in your Firebase project.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. The Google window was closed.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/popup-blocked': 'The Google sign-in popup was blocked. Please allow popups for this site and try again.',
  'auth/unauthorized-domain': 'This domain is not authorized for Google sign-in. Add it in Firebase Authentication settings.',
  'auth/invalid-api-key': 'Firebase configuration is invalid. Check your API key in the .env file.',
  'auth/configuration-not-found': 'Firebase Authentication is not enabled for this project.',
  'auth/account-exists-with-different-credential': 'An account with this email already exists using a different sign-in method. Sign in with that method instead.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/invalid-credential': 'Incorrect email or password.',
  'auth/internal-error': 'Firebase Authentication hit an internal error. See the browser console for details.',
  'auth/app/invalid-credential': 'Firebase credentials are invalid. Check the apiKey and appId in the .env file.',
  'auth/missing-email': 'Enter your email address.',
  'auth/invalid-recipient-email': 'Enter a valid email address.',
  'auth/missing-android-pkg-name': 'Password reset could not be completed.',
  'auth/missing-continue-uri': 'Password reset could not be completed.',
}

export function friendlyAuthError(error) {
  const code = error?.code || error?.message
  if (FRIENDLY_MESSAGES[code]) return FRIENDLY_MESSAGES[code]
  if (error instanceof AuthError) return error.message
  console.error('[auth] error:', error)
  // Firebase Auth internal race: the SDK closes its IndexedDB session store on
  // pagehide and a concurrent persistence write fails with this exact message.
  if (error?.message?.includes('Database is closing/hidden')) {
    return 'Sign-in was interrupted because the page was in the background. Please try again.'
  }
  // Expose the raw Firebase code and message when unmapped so the real cause is visible
  // instead of a generic message (helps debugging misconfiguration).
  if (error?.code) return `Authentication failed (${error.code}). ${error.message || ''}`.trim()
  if (error?.message) return `Authentication failed: ${error.message}`
  return 'Authentication failed (unknown error). Please try again.'
}
