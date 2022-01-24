import Slugger from 'github-slugger'
import Redis from 'ioredis'
import type { NextApiResponse } from 'next'
import { getPlaiceholder } from 'plaiceholder'

import { getCache, setCacheJson } from '~lib/notion/getCache'

const redis = new Redis(process.env.REDIS_URL)
const keyPrefix = 'image'

const imagesApi = async (req: any, res: NextApiResponse) => {
  const { url } = req.query
  const slug = Slugger.slug(url.toString())

  if (!url || url === 'undefined') return res.status(404).json({})

  const key = `${keyPrefix}/${slug}`

  let cache: any
  let data: any = {}
  let start = Date.now()

  // console.dir(`@cache(get) json`)
  cache = await getCache(key)
  if (cache) {
    data = cache
    const debug = {
      key,
      latency: Date.now() - start,
      type: cache ? 'cache' : 'api',
    }
    return res.status(200).json({ ...data, debug })
  }

  // console.dir(`@cache(get) redis`)
  start = Date.now()
  cache = await redis.get(key)
  if (cache) {
    // console.dir(`@cache(set) json`)
    const data = JSON.parse(cache)
    setCacheJson(data, key)
    const debug = {
      key,
      latency: Date.now() - start,
      type: cache ? 'cache' : 'api',
    }
    return res.status(200).json({ ...data, debug })
  }

  start = Date.now()
  const { base64, img } = await getPlaiceholder(url)
  data = { base64, img, slug, url }

  setCacheJson(data, key)
  void redis.set(key, JSON.stringify(data))
  const debug = {
    key,
    latency: Date.now() - start,
    type: cache ? 'cache' : 'api',
  }
  return res.status(200).json({ ...data, debug })
}

export default imagesApi
