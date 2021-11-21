import _filter from 'lodash/filter'

import deepFetchAllChildren from '~lib/notion/deepFetchAllChildren'
import { getCache, setCache } from '~lib/notion/getCache'
import { DATA_TYPES } from '~lib/notion/getDataType'

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

/**
 * @hack some reason everything is coming here, is it `notion/index.ts`?
 */
const nextWeirdRoutingSkipData = ['favicon.ico', 'true']

// @todo(next) preview
// @todo(complexity) 16
// eslint-disable-next-line complexity
const getCatchAll = async ({
  cache = false,
  catchAll,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear,
  pathVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  preview,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  retrieveImages = true,
}) => {
  const isCache = useCache && cache
  const { slug } = pathVariables
  if (nextWeirdRoutingSkipData.includes(slug)) return null

  let data
  /**
   * @cache pre
   */
  if (isCache) {
    const url = catchAll.join('/')
    const cacheData = await getCache(url)
    if (!!cacheData) {
      data = cacheData
    }
  }

  if (!data || data === undefined) {
    let content = null,
      images = null,
      info = null,
      items = null

    const { dataType, meta, routeType, slug } = pathVariables

    // @question(js) does this need to go w/in function?
    const getDATATYPES = new DATA_TYPES('')

    if (getDATATYPES[dataType]) {
      const DATATYPE_DATA = await getDATATYPES[dataType]({
        meta,
        pathVariables,
        routeType,
        slug,
      })
      content = DATATYPE_DATA?.content || null
      images = DATATYPE_DATA?.images || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }

    if (!!items) {
      items.results = _filter(items.results, { properties: { isPublished: true } })
    }

    // data = { info, content, items }

    // if (retrieveImages) {
    //   const images = !!data ? await getImages({ data, pathVariables }) : {}
    //   data = { ...data, images }
    // }

    data = { info, content, items, images }

    /**
     * @cache post
     */
    if (isCache) {
      // console.dir(`*** useCache x1 ***`)
      const url = catchAll.join('/')
      // console.dir(url)
      const isCacheExists = await getCache(url)
      // console.dir(isCacheExists)
      if (!isCacheExists || isCacheExists === undefined) {
        setCache(data, url)
      }
    }
  }
  return data
}

export { deepFetchAllChildren }
export default getCatchAll
