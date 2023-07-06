// import { slug as _slug } from 'github-slugger'

const KEY__PREFIX = process.env.NEXT_PUBLIC__SITE ?? ''

// const getKeysByJoin = ({ keyData, keyJoin = '/', keyPrefix }) =>
//   `${keyPrefix}/${keyData.join(keyJoin)}`.toLowerCase()

// const getKeysBySlugger = ({ keyData, keyPrefix }) =>
//   `${keyPrefix}/${_slug(keyData)}`.toLowerCase()

function getKey(slug: string) {
  const key = slug.includes(KEY__PREFIX) ? slug : `${KEY__PREFIX}${slug}`
  // console.dir(`> slug: ${slug}`)
  // console.dir(`> key:  ${key}`)
  return key
}

export { getKey }
