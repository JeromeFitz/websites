import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

const KEY__PREFIX = env.NEXT_PUBLIC__SITE

function getKey(slug: string) {
  const key = slug.includes(KEY__PREFIX) ? slug : `${KEY__PREFIX}${slug}`
  // console.dir(`> slug: ${slug}`)
  // console.dir(`> key:  ${key}`)
  return key
}

export { getKey }
