'use client'
import { MoonIcon, SunIcon } from '@jeromefitz/ds/components/Icon'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { useThemeToggle } from '~hooks/useThemeToggle'

export const useLoaded = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => setLoaded(true), [])
  return loaded
}

function ThemeToggle() {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const handleThemeToggle = useThemeToggle({ setTheme, theme })
  const loaded = useLoaded()

  const Icon = theme === 'light' ? SunIcon : MoonIcon

  return (
    <>
      <button
        className="hover:text-radix-pink11 flex flex-row items-center gap-1 align-middle"
        onClick={() => handleThemeToggle()}
      >
        <span className="mr-2 h-4 w-4">
          {loaded && <Icon className="text-inherit" />}
        </span>
        <span className="">Toggle Theme</span>
      </button>
    </>
  )
}

export { ThemeToggle }
