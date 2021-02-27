const release = require('@jeromefitz/semantic/release.config.js')
const _extends = ['semantic-release-commit-filter', 'semantic-release-monorepo']
const plugins = [
  [
    '@semantic-release/commit-analyzer',
    {
      releaseRules,
      parserOpts,
    },
  ],
  [
    '@semantic-release/release-notes-generator',
    {
      parserOpts,
      writerOpts,
    },
  ],
  [
    '@semantic-release/git',
    {
      assets: ['package.json'],
      message: `🔖️ {PACKAGE_NAME}@{VERSION} [skip ci]\n\nhttps://github.com/jeromefitz/semantic/releases/tag/{RELEASE_TAG}\n\n{RELEASE_NOTES}`,
    },
  ],
]

module.exports = { ...release, ci: false, dryRun: true, extends: _extends, plugins }
