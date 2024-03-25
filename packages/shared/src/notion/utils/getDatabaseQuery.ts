import 'server-only'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import { isObjectEmpty } from '@jeromefitz/utils'

import { getDatabaseQuery as _getDatabaseQuery } from 'next-notion/queries/index'
import { cache } from 'react'

import { getCache, getKey, setCache } from '../../redis/index'

const getDatabaseQuery = cache(
  async ({ database_id, draft, filterType, revalidate, segmentInfo }) => {
    let data

    const { isIndex, segment, slug } = segmentInfo

    const prefixSlug = isIndex || segment === slug ? segment : `${segment}${slug}`
    const prefix = `/notion/queries/${prefixSlug}`
    const key: string = getKey(prefix)
    const dataFromCache = await getCache({ slug: key })
    const isCached = !!dataFromCache && !isObjectEmpty(dataFromCache)

    // console.dir(`> getCache: ${key} (${prefix})`)
    // console.dir(`> isCached: ${isCached ? 'y' : 'n'}`)
    // console.dir(dataFromCache)

    if (env.OVERRIDE_CACHE || draft || revalidate || !isCached) {
      // console.dir(
      //   `getDatabaseQuery: env.OVERRIDE_CACHE || draft || revalidate || !isCached`
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
