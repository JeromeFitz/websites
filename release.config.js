const release = require('@jeromefitz/semantic/release.config.js')
const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: './.env.build' })

const plugins = release.plugins

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

module.exports = {
  ...release,
  // ci,
  // dryRun,
  extends: _extends,
  plugins,
}
