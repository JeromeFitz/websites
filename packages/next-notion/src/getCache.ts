import stringify from 'fast-json-stable-stringify'

import { CACHE_TYPES, TIME } from './constants'
import redis from './lib/redis'

const setCacheRedis = (data, key) => {
  // console.dir(`setCacheRedis => key: ${key}`)
  // console.dir(`setCacheRedis => data`)
  // // console.dir(data)
  // console.dir(`---`)
  // // @todo(redis) get the TTL by the routeType
  // // void redis.set(key, stringify(data), 'EX', TIME.MONTH)
  void redis.set(key, stringify(data), {
    ex: TIME.MONTH,
  })
}

const setCache = ({ cacheType, data, key }) => {
  if (cacheType === CACHE_TYPES.REDIS) {
    setCacheRedis(data, key)
  }
  return null
}

const getCacheRedis = async (key) => {
  let cacheData = false
  // console.dir(`getCacheRedis => key: ${key}`)
  // console.dir(`getCacheRedis => data`)
  // // console.dir(data)
  // console.dir(`---`)
  // // const cache = await redis.get(key)
  const cache: any = await redis.get(key)
  // console.dir(`getCacheRedis => cache`)
  // console.dir(cache)

  try {
    // console.dir(`getCacheRedis: redis => ${key}`)
    /**
     * @note(redis) hey ... this is already a json object!!!!
     */
    // cacheData = await JSON.parse(cache)
    cacheData = cache
    // console.dir(`getCacheRedis => cacheData`)
    // console.dir(cacheData)
  } catch (_) {
    // console.dir(`getCacheRedis: notFatal`)
    cacheData = false
    // console.dir(`getCacheRedis: notFatal => cacheData`)
    // console.dir(cacheData)
    // console.dir(`____`)
    // console.dir(_)
  }
  return cacheData
}

const getCache: any = async ({ cacheType, key }) => {
  // console.dir(`getCache: ${key}`)
  if (cacheType === CACHE_TYPES.REDIS) {
    return await getCacheRedis(key)
  }
  return null
}

export { getCache, getCacheRedis, setCache, setCacheRedis }
