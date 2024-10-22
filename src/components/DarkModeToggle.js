'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-200"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
    </button>
  )
}
