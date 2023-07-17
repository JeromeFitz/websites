'use client'
import { MoonIcon, SunIcon } from '@jeromefitz/ds/components/Icon'
import { useThemeToggle } from '@jeromefitz/shared/src/hooks/useThemeToggle'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

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
        className="hover:text-radix-pink11 flex"
        onClick={() => handleThemeToggle()}
      >
        <span className="flex flex-row-reverse items-center justify-end gap-1 align-middle">
          <span className="">Toggle Theme</span>
          <span className="mr-2 h-4 w-4">
            {loaded && <Icon className="text-inherit" />}
          </span>
        </span>
      </button>
    </>
  )
}

export { ThemeToggle }
