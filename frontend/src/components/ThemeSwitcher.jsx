import { useTheme } from '../context/ThemeContext'
import { Palette, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const themeColors = {
  forest: '#22c55e',
  ocean: '#3b82f6',
  sunset: '#f97316',
  cyber: '#06b6d4',
  minimal: '#94a3b8'
}

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        title="Change Theme"
      >
        <Palette className="w-4 h-4 text-dark-400 hover:text-white transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 py-1.5 glass rounded-xl shadow-xl border border-white/10 z-50">
          <div className="px-3 py-1.5 text-xs text-dark-500 font-medium">Theme</div>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => {
                setTheme(key)
                setIsOpen(false)
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-offset-1 ring-offset-dark-900"
                  style={{
                    backgroundColor: themeColors[key],
                    ringColor: currentTheme === key ? themeColors[key] : 'transparent'
                  }}
                />
                <span className={currentTheme === key ? 'text-white' : 'text-dark-300'}>
                  {theme.name}
                </span>
              </div>
              {currentTheme === key && (
                <Check className="w-3.5 h-3.5 text-white" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
