import { INITIAL_VIEWPORTS as viewports } from 'storybook/viewport'

import * as themes from './themes'
import { DEFAULT_THEME, withTailwindTheme } from './withTailwindTheme.decorator'

import './preview.css'

/** @type { import('@storybook/react').Preview } */
const config = {
  decorators: [withTailwindTheme],
  globalTypes: {
    theme: {
      defaultValue: DEFAULT_THEME,
      description: 'Global theme for components',
      name: 'Theme',
      toolbar: {
        // Change title based on selected value
        dynamicTitle: true,
        icon: 'paintbrush',
        // Array of plain string values or MenuItem shape (see below)
        items: [
          { left: '🌞', title: 'Light', value: 'light' },
          { left: '🌛', title: 'Dark', value: 'dark' },
        ],
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
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      viewports,
    },
  },
}

export default config
