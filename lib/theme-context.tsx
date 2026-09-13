'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const stored = localStorage.getItem('theme') as Theme | null
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = stored || systemPreference || 'dark'
    
    setTheme(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const htmlElement = document.documentElement
    if (newTheme === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return children
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
