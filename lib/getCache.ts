import path from 'path'

import { readFile, writeFileSyncRecursive } from '~lib/fs-helpers'

const cacheFile = (filename) =>
  path.join(
    process.cwd(),
    '.cache',
    process.env.NEXT_PUBLIC__SITE,
    `${filename === '/' ? 'index' : filename}.json`
    // `${filename === '/' ? 'index' : filename}.js`
  )

const setCache = (data, url) => {
  // console.dir(` *** setCache ***`)
  try {
    writeFileSyncRecursive(cacheFile(url), JSON.stringify(data), 'utf8')
    // const file = `const gitmoji = #REPLACE#; exports.default = gitmoji;`.replace(
    //   '#REPLACE#',
    //   JSON.stringify(data)
    // )
    // writeFileSyncRecursive(cacheFile(url), file, 'utf8')
  } catch (_) {
    /* not fatal */
    // console.dir(`setCache(500): ${url}`)
  }

  return null
}

const getCache = async (url) => {
  // console.dir(` *** getCache ***`)
  let cacheData = false
  const file = cacheFile(url)
  // console.dir(file)
  try {
    cacheData = JSON.parse(await readFile(file, 'utf8'))
  } catch (_) {
    /* not fatal */
    // console.dir(`getCache(404): ${url}`)
    cacheData = false
  }
  return cacheData
}

export { getCache, setCache }
export default getCache
