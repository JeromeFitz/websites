import 'server-only'

import { isObjectEmpty } from '@jeromefitz/utils'

import { getDatabaseQuery as _getDatabaseQuery } from 'next-notion/queries/index'
import { cache } from 'react'

import { getCache, getKey, setCache } from '../../redis/index'

const OVERRIDE_CACHE = process.env.OVERRIDE_CACHE || false

const getDatabaseQuery = cache(
  async ({ database_id, draft, filterType, revalidate, segmentInfo }) => {
    let data

    const { segment, slug } = segmentInfo
    const prefix = `/notion/queries/${segment}${slug}`
    const key: string = getKey(prefix)
    const dataFromCache = await getCache({ slug: key })

    // console.dir(`> getCache: ${key}`)
    // console.dir(dataFromCache)

    const isCached = !!dataFromCache && !isObjectEmpty(dataFromCache)

    if (OVERRIDE_CACHE || draft || revalidate || !isCached) {
      // console.dir(
      //   `getDatabaseQuery: OVERRIDE_CACHE || draft || revalidate || !isCached`
      // )
      const dataFromNotion = await _getDatabaseQuery({
        database_id,
        filterType,
        segmentInfo,
      })
      // console.dir(`> dataFromNotion: ${database_id}`)
      // console.dir(dataFromNotion)

      if (!isObjectEmpty(dataFromNotion) && !draft) {
        // console.dir(`setCache: ${key}`)
        void setCache({ data: dataFromNotion, slug: key })
      }

      data = dataFromNotion
    } else {
      // console.dir(`gotCache: ${key}`)
      data = dataFromCache
    }
    return data
  },
)

export { getDatabaseQuery }
