import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import nextConfig from '@jeromefitz/next-config/next.config.mjs'

import isCI from 'is-ci'

if (!isCI) {
  const dotenv = await import('dotenv')
  dotenv.config({ path: './.env' })
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const buildInfoConfig = {
  owner: 'jeromefitz',
  repo: 'jeromefitzgerald.com',
}

const serverComponentsExternalPackages = [
  '@jeromefitz/notion',
  // '@jeromefitz/utils',
  '@notionhq/client',
  // 'emoji-regex',
  // 'node-emoji',
  'plaiceholder',
  'prettier',
]
/**
 * @note(tailwind) lol, if we do not transpile locally,
 *  can we avoid the hack in app/design-system/page ?
 *  also -- which one is the good one here, haha
 */
// const tp = ['@jeromefitz/ds', '@jeromefitz/shared', 'next-notion']
const tp = []
// const transpilePackages = isCI ? [] : []
const transpilePackages = tp
// const transpilePackages = isCI ? [] : tp
// const transpilePackages = isCI ? tp : []

const redirects = [
  {
    destination: '/currently/reading',
    permanent: false,
    source: '/books',
  },
  {
    destination: '/currently/listening-to',
    permanent: false,
    source: '/music',
  },
]

const config = nextConfig({
  basePath: '',
  buildInfoConfig,
  pathDirName: join(__dirname),
  redirects,
  serverComponentsExternalPackages,
  transpilePackages,
})

export default config
