const path = require('node:path')

const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: './.env', quiet: true })

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
