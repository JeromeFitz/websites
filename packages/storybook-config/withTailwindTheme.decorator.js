import React, { useEffect } from 'react'

export const DEFAULT_THEME = 'light'

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals

  useEffect(() => {
    const htmlTag = document.documentElement

    /**
     * @note(storybook) applies attributes to iframe
     */
    htmlTag.setAttribute('class', theme || DEFAULT_THEME)
    htmlTag.setAttribute('data-mode', theme || DEFAULT_THEME)
    htmlTag.setAttribute('style', `color-scheme: ${theme || DEFAULT_THEME};`)
  }, [theme])

  return <Story />
}
