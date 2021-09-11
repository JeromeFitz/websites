import path from 'path'

import { readFile, writeFileSyncRecursive } from '~lib/fs-helpers'

const cacheFile = (filename) =>
  path.join(
    process.cwd(),
    '.cache',
    process.env.NEXT_PUBLIC__SITE,
    `${filename === '/' ? 'index' : filename}.json`
  )

const setCache = (data, url) => {
  // console.dir(` *** setCache ***`)
  try {
    writeFileSyncRecursive(cacheFile(url), JSON.stringify(data), 'utf8')
  } catch (_) {
    /* not fatal */
    // console.dir(`setCache(500): ${url}`)
  }

  return null
}

const getCache = async (url) => {
  // console.dir(` *** getCache ***`)
  let cacheData = false
  try {
    cacheData = JSON.parse(await readFile(cacheFile(url), 'utf8'))
  } catch (_) {
    /* not fatal */
    // console.dir(`getCache(404): ${url}`)
    cacheData = false
  }
  return cacheData
}

export { getCache, setCache }
export default getCache
