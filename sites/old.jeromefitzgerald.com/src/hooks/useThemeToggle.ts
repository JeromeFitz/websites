import React from 'react'

function useThemeToggle({ setTheme, theme }) {
  return React.useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.style.setProperty('color-scheme', newTheme)
    setTheme(newTheme)
  }, [setTheme, theme])
}

export { useThemeToggle }
