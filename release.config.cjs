const { getConfig } = require('@jeromefitz/semantic')
const isCI = require('is-ci')
const _map = require('lodash/map.js')

!isCI && require('dotenv').config({ path: './.env' })

const releaseBranchTypes = require('./config/release-branch-types/index.cjs')

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

const config = {
  branches,
}

// const _config = getConfig(config)

module.exports.config = config
module.exports.getConfig = getConfig
