import { dirname, join } from 'node:path'
import { fileURLToPath } from 'url'

import nextConfig from '@jeromefitz/next-config/next.config.mjs'
import dotenv from 'dotenv'
import isCI from 'is-ci'
if (!isCI) {
  dotenv.config({ patch: './.env' })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const buildInfoConfig = {
  owner: 'jeromefitz',
  repo: 'jeromefitzgerald.com',
}

const serverComponentsExternalPackages = [
  '@jeromefitz/notion',
  '@notionhq/client',
  // 'emoji-regex',
  // 'node-emoji',
  'plaiceholder',
]
/**
 * @note(tailwind) lol, if we do not transpile locally,
 *  can we avoid the hack in app/design-system/page ?
 *  also -- which one is the good one here, haha
 */
const tp = ['@jeromefitz/ds', '@jeromefitz/shared', 'next-notion']
// const transpilePackages = isCI ? [] : []
const transpilePackages = tp
// const transpilePackages = isCI ? [] : tp
// const transpilePackages = isCI ? tp : []

const config = nextConfig({
  basePath: '',
  buildInfoConfig: {},
  pathDirName: join(__dirname),
  serverComponentsExternalPackages,
  transpilePackages,
})

export default config
