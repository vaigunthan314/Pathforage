import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(authService.isAuthConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signInWithEmail = useCallback(async (credentials) => {
    setError(null)
    try {
      const user = await authService.signIn(credentials)
      setCurrentUser(user)
      return user
    } catch (e) {
      const message = authService.friendlyAuthError(e)
      setError(message)
      throw new Error(message)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    setError(null)
    try {
      const user = await authService.signInWithGoogle()
      setCurrentUser(user)
      return user
    } catch (e) {
      const message = authService.friendlyAuthError(e)
      setError(message)
      throw new Error(message)
    }
  }, [])

  const signUp = useCallback(async (details) => {
    setError(null)
    try {
      const user = await authService.signUp(details)
      setCurrentUser(user)
      return user
    } catch (e) {
      const message = authService.friendlyAuthError(e)
      setError(message)
      throw new Error(message)
    }
  }, [])

  const resetPassword = useCallback(async (email) => {
    setError(null)
    try {
      await authService.resetPassword(email)
    } catch (e) {
      const message = authService.friendlyAuthError(e)
      setError(message)
      throw new Error(message)
    }
  }, [])

  const signOut = useCallback(async () => {
    await authService.signOut()
    setCurrentUser(null)
    setError(null)
  }, [])

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    loading,
    error,
    signInWithEmail,
    signInWithGoogle,
    signUp,
    resetPassword,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
