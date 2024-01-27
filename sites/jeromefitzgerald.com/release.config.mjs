import { getConfig } from '@jeromefitz/semantic'

import isCI from 'is-ci'

import { config as configDefault } from '../../release.config.mjs'

if (!isCI) {
  const dotenv = await import('dotenv')
  dotenv.config({ path: '../../.env' })
}

// const require = createRequire(import.meta.url)
// const pkg = require('./package.json')
// // const { name } = require('./package.json')
// const { name } = pkg

const configPassed = {
  ...configDefault,
  repositoryUrl: `https://github.com/JeromeFitz/websites`,
  tagFormat: 'website-v${version}',
}

const config = getConfig(configPassed)

export default config
