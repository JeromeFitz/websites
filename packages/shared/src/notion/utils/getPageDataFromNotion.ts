import 'server-only'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import { isObjectEmpty } from '@jeromefitz/utils'

import { getPageData as _getPageData } from 'next-notion/queries/index'
import { cache } from 'react'

import { getCache, getKey, setCache } from '../../redis/index'

/**
 * @todo(next) draft | revalidate
 */
const getPageDataFromNotion = cache(async (id) => {
  let data

  const prefix = `/notion/pages/${id}`
  const key: string = getKey(prefix)
  const dataFromCache = await getCache({ slug: key })

  // console.dir(`> getCache: ${key}`)
  // console.dir(dataFromCache)

  const isCached = !!dataFromCache && !isObjectEmpty(dataFromCache)

  if (env.OVERRIDE_CACHE || !isCached) {
    const dataFromNotion = await _getPageData(id)
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

export { getPageDataFromNotion }
