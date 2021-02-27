const isCI = require('is-ci')
require('dotenv').config({ path: './.env' })
const release = require('@jeromefitz/semantic/release.config.js')

// const ci = true
// const dryRun = false
const _extends = ['semantic-release-commit-filter']

// @todo Uh, this pretty jank dude.
const plugins = [
  release.plugins[0],
  release.plugins[1],
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
  [
    '@semantic-release/git',
    {
      assets: ['package.json'],
      message: `🔖️ {PACKAGE_NAME}@{VERSION} [skip ci]\n\nhttps://github.com/jeromefitz/website/releases/tag/{RELEASE_TAG}\n\n{RELEASE_NOTES}`,
    },
  ],
]

module.exports = {
  ...release,
  // ci,
  // dryRun,
  extends: _extends,
  plugins,
}
