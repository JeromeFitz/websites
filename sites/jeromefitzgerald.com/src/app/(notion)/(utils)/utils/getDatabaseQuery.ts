import { isObjectEmpty } from '@jeromefitz/utils'
import { getDatabaseQuery as _getDatabaseQuery } from 'next-notion/src/queries/index'
import { cache } from 'react'

import { getCache, setCache, getKey } from '~app/(cache)/getCustom'

const OVERRIDE_CACHE = process.env.OVERRIDE_CACHE || false

const getDatabaseQuery = cache(async ({ database_id, filterType, segmentInfo }) => {
  let data

  const { slug } = segmentInfo
  const prefix = `/notion/queries${slug}`
  const key: string = getKey(prefix)
  const dataFromCache = await getCache({ slug: key })

  // console.dir(`> getCache: ${key}`)
  // console.dir(dataFromCache)

  const isCached = !!dataFromCache && !isObjectEmpty(dataFromCache)

  if (OVERRIDE_CACHE || !isCached) {
    const dataFromNotion = await _getDatabaseQuery({
      database_id,
      filterType,
      segmentInfo,
    })
    // console.dir(`> dataFromNotion: ${id}`)
    // console.dir(dataFromNotion)

    if (!isObjectEmpty(dataFromNotion)) {
      // console.dir(`setCache: ${key}`)
      void setCache({ data: dataFromNotion, slug: key })
    }

    data = dataFromNotion
  } else {
    // console.dir(`gotCache: ${key}`)
    data = dataFromCache
  }
  return data
})

export { getDatabaseQuery }
