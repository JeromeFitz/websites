import { resolve } from 'node:path'

// console.dir(`***`)
// console.dir(resolve(__dirname, '../../sites/jeromefitzgerald.com/next.config.js'))

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: true,
        backgrounds: false,
        controls: true,
        docs: true,
        toolbars: true,
        viewport: true,
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    // '@storybook/addon-styling',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: true,
      },
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
    // options: {
    //   // // nextConfigPath: resolve(__dirname, '../next.config.js'),
    //   nextConfigPath: resolve(__dirname, '../next.config.js'),
    // },
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: true,
  },
  docs: {
    autodocs: true,
  },
  staticDirs: [resolve(__dirname, 'public')],
}

export default config
