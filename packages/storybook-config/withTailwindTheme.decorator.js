import { cx } from '../design-system/src/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Theme } from '@radix-ui/themes/dist/esm/components/theme.js'
import React, { useEffect } from 'react'

export const DEFAULT_THEME = 'light'

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals

  useEffect(() => {
    const htmlTag = document.documentElement
    const bodyTag = document.body

    /**
     * @note(storybook) applies attributes to iframe
     */
    htmlTag.setAttribute('class', theme || DEFAULT_THEME)
    htmlTag.setAttribute('data-mode', theme || DEFAULT_THEME)
    htmlTag.setAttribute('style', `color-scheme: ${theme || DEFAULT_THEME};`)
    bodyTag.setAttribute('class', `radix-themes`)
  }, [theme])

  return (
    <Theme
      accentColor="pink"
      asChild
      grayColor="mauve"
      panelBackground="translucent"
      radius="medium"
      scaling="100%"
    >
      <Box
        className={cx(
          'overflow-y-auto overflow-x-hidden lg:overflow-y-auto',
          'selection:bg-gray-12 selection:text-gray-1',
          'bg-white dark:bg-black',
          'font-sans antialiased',
          '',
        )}
      >
        <Story />
      </Box>
    </Theme>
  )
}
