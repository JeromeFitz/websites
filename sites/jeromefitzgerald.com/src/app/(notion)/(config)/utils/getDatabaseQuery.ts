import 'server-only'

import { getCache, setCache, getKey } from '@jeromefitz/shared/src/lib/redis'
import { isObjectEmpty } from '@jeromefitz/utils'
import { getDatabaseQuery as _getDatabaseQuery } from 'next-notion/src/queries'
import { cache } from 'react'

const OVERRIDE_CACHE = process.env.OVERRIDE_CACHE || false

const getDatabaseQuery = cache(
  async ({ database_id, draft, filterType, revalidate, segmentInfo }) => {
    let data

    const { slug } = segmentInfo
    const prefix = `/notion/queries${slug}`
    const key: string = getKey(prefix)
    const dataFromCache = await getCache({ slug: key })

    // console.dir(`> getCache: ${key}`)
    // console.dir(dataFromCache)

    const isCached = !!dataFromCache && !isObjectEmpty(dataFromCache)

    if (OVERRIDE_CACHE || draft || revalidate || !isCached) {
      const dataFromNotion = await _getDatabaseQuery({
        database_id,
        filterType,
        segmentInfo,
      })
      // console.dir(`> dataFromNotion: ${id}`)
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
  }
)

export { getDatabaseQuery }
