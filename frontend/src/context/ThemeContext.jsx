import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const themes = {
  default: { name: 'Default', accent: '#6366f1' },
  blue: { name: 'Ocean Blue', accent: '#3b82f6' },
  emerald: { name: 'Emerald', accent: '#10b981' },
  amber: { name: 'Amber', accent: '#f59e0b' },
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('pathforge-theme') || 'default'
  })

  useEffect(() => {
    localStorage.setItem('pathforge-theme', currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
