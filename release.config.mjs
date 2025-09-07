import { getConfig } from '@jeromefitz/semantic'

import isCI from 'is-ci'
import _map from 'lodash/map.js'

import releaseBranchTypes from './config/release-branch-types/index.cjs'

if (!isCI) {
  const dotenv = await import('dotenv')
  dotenv.config({ path: './.env', quiet: true })
}

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
  },
).filter((branchType) => !!branchType)

const branches = [
  { name: 'main' },
  { name: 'canary', prerelease: 'canary' },
  { name: 'NICE-67', prerelease: 'NICE-67' },
  { name: 'deps/semantic-release-24.x', prerelease: 'canary' },
  ...branchTypes,
]

const config = {
  branches,
  contributorsProhibitList: {
    email: [],
    login: ['BotJerome', 'JeromeFitz'],
  },
  enableNpm: false,
}

// const _config = getConfig(config)

const _config = config
export { _config as config }
const _getConfig = getConfig
export { _getConfig as getConfig }
