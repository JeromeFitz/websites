const release = require('@jeromefitz/semantic/release.config.cjs').default
const isCI = require('is-ci')
const _map = require('lodash/map.js')

!isCI && require('dotenv').config({ path: './.env' })

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

const configPassed = {
  ...configDefault,
  branches,
  repositoryUrl: `https://github.com/JeromeFitz/websites`,
  tagFormat: 'website-v${version}',
}

const config = getConfig(configPassed)

module.exports = config
