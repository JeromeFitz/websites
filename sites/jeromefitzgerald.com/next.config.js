const path = require('path')

const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: './.env' })

const buildInfoConfig = {
  owner: 'jeromefitz',
  repo: 'jeromefitzgerald.com',
}

const serverComponentsExternalPackages = [
  '@jeromefitz/notion',
  '@notionhq/client',
  'plaiceholder',
]
/**
 * @note(tailwind) lol, if we do not transpile locally,
 *  can we avoid the hack in app/design-system/page ?
 */
const tp = ['@jeromefitz/ds', '@jeromefitz/shared', 'next-notion']
const transpilePackages = isCI ? [] : tp

module.exports = require('@jeromefitz/next-config')({
  basePath: '',
  buildInfoConfig,
  pathDirName: path.join(__dirname),
  serverComponentsExternalPackages,
  transpilePackages,
})
