import path from 'path'

import stringify from 'fast-json-stable-stringify'
import ms from 'ms'

import { readFile, writeFileSyncRecursive } from '~lib/fs-helpers'
import redis from '~lib/redis'

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => time / 1000 ?? 0

const cacheFile = (filename) =>
  path.join(
    process.cwd(),
    '.cache',
    // @cache(note) add this if multi-site within same repo / folder
    // process.env.NEXT_PUBLIC__SITE,
    `${filename === '/' ? 'index' : filename}.json`
    // `${filename === '/' ? 'index' : filename}.js`
  )

const setCacheJson = (data, url) => {
  try {
    writeFileSyncRecursive(cacheFile(url.toLowerCase()), stringify(data), 'utf8')
  } catch (_) {
    /* not fatal */
  }

  return null
}

const setCacheRedis = (data, key) => {
  // console.dir(`setCacheRedis => key: ${key}`)
  void redis.set(key, stringify(data), 'EX', getTimeInSeconds(ms('30d')))
}

const setCache = (data: any, url: string) => {
  setCacheJson(data, url.toLowerCase())
  setCacheRedis(data, url.toLowerCase())

  return null
}

const getCacheJson = async (url) => {
  let cacheData = false
  const file = cacheFile(url.toLowerCase())
  try {
    // console.dir(`getCacheJson: json => ${url.toLowerCase()}`)
    cacheData = JSON.parse(await readFile(file, 'utf8'))
  } catch (_) {
    // console.dir(`getCacheJson: notFatal`)
    cacheData = false
  }
  return cacheData
}

const getCacheRedis = async (key) => {
  let cacheData = false
  // console.dir(`getCache: redis => ${key}`)
  const cache = await redis.get(key)
  try {
    // console.dir(`getCacheRedis: redis => ${key}`)
    cacheData = await JSON.parse(cache)
  } catch (_) {
    // console.dir(`getCacheRedis: notFatal`)
    cacheData = false
  }
  return cacheData
}

export { getCacheJson, getCacheRedis, setCache, setCacheJson, setCacheRedis }
export default getCacheJson
