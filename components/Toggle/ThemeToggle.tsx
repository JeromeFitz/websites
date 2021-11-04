import { darkTheme, IconButton, Tooltip } from '@modulz/design-system'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import React from 'react'

const ThemeToggle = (props) => {
  const { theme, setTheme } = useTheme()
  const content = `Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`

  return (
    <Tooltip content={content} side="bottom" align="end">
      <IconButton
        aria-label={content}
        onClick={() => {
          const newTheme = theme === 'dark' ? 'light' : 'dark'
          document.documentElement.classList.toggle(darkTheme.className)
          document.documentElement.classList.toggle('light-theme')
          document.documentElement.style.setProperty('color-scheme', newTheme)
          setTheme(newTheme)
        }}
        variant="ghost"
        {...props}
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
