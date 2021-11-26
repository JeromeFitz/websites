const release = require('@jeromefitz/semantic/release.config.cjs')
const isCI = require('is-ci')
const _map = require('lodash/map.js')

!isCI && require('dotenv').config({ path: './.env' })

const releaseBranchTypes = require('./config/release-branch-types/index.cjs')
const { name } = require('./package.json')

const plugins = release.plugins

const branchTypes = _map(
  releaseBranchTypes,
  (releaseBranchType, releaseBranchTypeIndex) => {
    return _map(releaseBranchType, (branchType) => {
      return (
        !!branchType && {
          name: `${releaseBranchTypeIndex}/${branchType}`,
          prerelease: branchType,
        }
      )
    })[0]
  }
).filter((branchType) => !!branchType)

const branches = [
  { name: 'main' },
  { name: 'canary', prerelease: 'canary' },
  ...branchTypes,
]

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

module.exports = config
