import { resolve } from 'node:path'

// console.dir(`***`)
// console.dir(resolve(__dirname, '../../sites/jeromefitzgerald.com/next.config.js'))

/** @type { import('@storybook/nextjs').StorybookConfig } */
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
    // options: {
    //   // // nextConfigPath: resolve(__dirname, '../next.config.js'),
    //   nextConfigPath: resolve(__dirname, '../next.config.js'),
    // },
  },
  staticDirs: [resolve(__dirname, 'public')],
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx}'],
}

export default config
