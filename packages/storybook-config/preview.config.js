// import { withThemeByClassName } from '@storybook/addon-styling'
import { MINIMAL_VIEWPORTS as viewports } from '@storybook/addon-viewport'

import * as themes from './themes'
import { DEFAULT_THEME, withTailwindTheme } from './withTailwindTheme.decorator'
import './preview.css'

/** @type { import('@storybook/react').Preview } */
const config = {
  decorators: [withTailwindTheme],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: DEFAULT_THEME,
      toolbar: {
        icon: 'paintbrush',
        // Array of plain string values or MenuItem shape (see below)
        items: [
          { value: 'light', title: 'Light', left: '🌞' },
          { value: 'dark', title: 'Dark', left: '🌛' },
        ],
        // Change title based on selected value
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
    viewport: {
      viewports,
    },
  },
}

export default config
