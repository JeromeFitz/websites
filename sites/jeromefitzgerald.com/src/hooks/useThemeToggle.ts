import React from 'react'

function useThemeToggle({ darkTheme, setTheme, theme }) {
  return React.useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle(darkTheme?.className)
    document.documentElement.classList.toggle('light-theme')
    document.documentElement.style.setProperty('color-scheme', newTheme)
    setTheme(newTheme)
  }, [darkTheme, setTheme, theme])
}

export { useThemeToggle }
