import path from 'path'

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
    writeFileSyncRecursive(cacheFile(url), JSON.stringify(data), 'utf8')
  } catch (_) {
    /* not fatal */
  }

  return null
}

const setCacheRedis = (data, url) => {
  const key = `notion/${url}`.toLowerCase()
  // console.dir(`key: ${key}`)
  void redis.set(key, JSON.stringify(data), 'EX', getTimeInSeconds(ms('30d')))
}

const setCache = (data: any, url: string) => {
  setCacheJson(data, url.toLowerCase())
  setCacheRedis(data, url.toLowerCase())

  return null
}

const getCache = async (url) => {
  let cacheData = false
  const file = cacheFile(url.toLowerCase())
  try {
    // console.dir(`getCache: json => ${url.toLowerCase()}`)
    cacheData = JSON.parse(await readFile(file, 'utf8'))
  } catch (_) {
    // console.dir(`getCache: notFatal`)
    cacheData = false
  }
  return cacheData
}

export { getCache, setCache, setCacheJson, setCacheRedis }
export default getCache
