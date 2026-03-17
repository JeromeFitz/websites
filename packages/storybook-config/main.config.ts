import { resolve } from 'node:path'

const __dirname = import.meta.dirname

const config = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  core: {
    disableTelemetry: true,
    enableCrashReports: true,
  },
  docs: {
    autodocs: true,
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: [resolve(__dirname, 'public')],
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
}

export default config
