import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

const nextSeo = { url: `https://${env.NEXT_PUBLIC__SITE}` }
const domain = new URL(nextSeo.url)

const isExternalUrl = (href: string | string[]) =>
  !href.includes(domain.hostname.replace('www.', '')) || href.includes('bsky.app')

export { isExternalUrl }
