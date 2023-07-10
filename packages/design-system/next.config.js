const path = require('path')

const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: './.env' })

const buildInfoConfig = {
  owner: 'jeromefitz',
  repo: 'jeromefitzgerald.com',
}

const serverComponentsExternalPackages = []
const transpilePackages = []

module.exports = require('@jeromefitz/next-config')({
  basePath: '',
  buildInfoConfig,
  pathDirName: path.join(__dirname),
  serverComponentsExternalPackages,
  transpilePackages,
})
