import release, { plugins as _plugins } from '@jeromefitz/semantic/release.config.js'
import isCI from 'is-ci'
!isCI && require('dotenv').config({ path: './.env.build' })

import { name } from './package.json'

const plugins = _plugins

const branches = [{ name: 'main' }, { name: 'develop', prerelease: 'develop' }]

// const ci = true
// const dryRun = false
const _extends = ['semantic-release-commit-filter']

const pluginsOverride = [
  [
    '@semantic-release/npm',
    {
      npmPublish: false,
    },
  ],
  [
    '@semantic-release/github',
    { labels: false, releasedLabels: false, successComment: false },
  ],
]

/**
 * @refactor This mutates plugins which is not ideal
 */
plugins.map((plugin, pluginIndex) => {
  const pluginName = plugin[0]
  pluginsOverride.map((pluginOverride) => {
    pluginName === pluginOverride[0] ? (plugins[pluginIndex] = pluginOverride) : null
  })
})

const config = {
  ...release,
  branches,
  // ci,
  // dryRun,
  extends: _extends,
  plugins,
  repositoryUrl: `https://github.com/${name.replace('@', '')}`,
  tagFormat: 'website-v${version}',
}

export default config
