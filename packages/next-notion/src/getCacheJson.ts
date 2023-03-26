import path from 'path'

import stringify from 'fast-json-stable-stringify'

import { CACHE_TYPES } from './constants'
import { readFile, writeFileSyncRecursive } from './lib/fs-helpers'

const cacheFile = (filename) =>
  path.join(
    process.cwd(),
    '.cache',
    process.env.NEXT_PUBLIC__SITE,
    `${filename === '/' ? 'index' : filename}.json`
  )

const setCacheJson = (data, key) => {
  try {
    writeFileSyncRecursive(cacheFile(key), stringify(data), 'utf8')
  } catch (_) {
    /* not fatal */
  }

  return null
}

const setCache = ({ cacheType, data, key }) => {
  if (cacheType === CACHE_TYPES.JSON) {
    setCacheJson(data, key)
  }
  return null
}

const getCacheJson = async (key) => {
  let cacheData = false
  const file = cacheFile(key)
  try {
    // console.dir(`getCacheJson: json => ${key}`)
    cacheData = JSON.parse(await readFile(file, 'utf8'))
  } catch (_) {
    // console.dir(`getCacheJson: notFatal`)
    cacheData = false
  }
  return cacheData
}

const getCache: any = async ({ cacheType, key }) => {
  // console.dir(`getCache: ${key}`)
  if (cacheType === CACHE_TYPES.JSON) {
    return await getCacheJson(key)
  }
  return null
}

export { getCache, getCacheJson, setCache, setCacheJson }
