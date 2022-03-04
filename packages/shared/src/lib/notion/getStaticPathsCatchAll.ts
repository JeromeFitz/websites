import { asyncForEach } from '@jeromefitz/utils'
import _find from 'lodash/find'
import _isEqual from 'lodash/isEqual'
import _map from 'lodash/map'
import _noop from 'lodash/noop'
import _uniqWith from 'lodash/uniqWith'

import { getCatchAll, getNotion } from './index'

const isDev = process.env.NODE_ENV !== 'production'

/**
 * @note(notion)
 *
 * For each `DATA_TYPES.LISTING` return,
 *  create the `next` route dynamically
 *
 */
const getStaticPathsDefault = ({
  items,
  routeParentInfo,
  routeType,
  notionConfig,
}) => {
  const data = []
  const { NOTION, ROUTE_TYPES_BY_DATA_TYPES } = notionConfig
  const isListingByDate = ROUTE_TYPES_BY_DATA_TYPES.LISTING_BY_DATE.includes(
    routeType.toUpperCase()
  )

  /**
   * @hack
   *
   * - !!routeParentInfo => isChild
   * - - ex.) PODCAST (Parent) => EPISODE (Child)
   * - isListingByDate
   * - - ex.) BLOG|EVENT
   *
   * If neither of those return default
   *
   */
  if (!!routeParentInfo) {
    _map(items, (item) => {
      const childSlug =
        item?.properties[NOTION[routeType.toUpperCase()].isChildInfoType.key][0]

      !!childSlug &&
        data.push(
          `/${routeParentInfo.routeType}/${childSlug}/${item?.properties?.slug}`
        )
    })

    return data
  }

  if (isListingByDate) {
    const dates = []
    _map(items, (item) => {
      const date = item.properties[
        NOTION[routeType.toUpperCase()].infoType.key
      ]?.start.slice(0, 10)

      const [year, month, day] = date?.split('-')
      data.push(`/${routeType}/${year}/${month}/${day}/${item?.properties?.slug}`)
      dates.push(`/${routeType}/${year}/${month}/${day}`)
      dates.push(`/${routeType}/${year}/${month}`)
      dates.push(`/${routeType}/${year}`)
    })
    _uniqWith(dates, _isEqual).map((route) => data.push(route))

    return data
  }

  _map(items, (item) => {
    data.push(`/${routeType}/${item?.properties?.slug}`)
  })

  return data
}

const getStaticPathsCatchAll = async (notionConfig) => {
  const notion = getNotion(notionConfig)
  const { NOTION, PAGES, ROUTE_TYPES } = notionConfig
  const getParentRouteInfo = (routeTypeName: string) => {
    // @todo(next-notion) move to `isChild`
    return _find(NOTION, { hasChild: routeTypeName })
  }
  const paths = []

  /**
   * @note(next) do _not_ run in development mode
   */
  if (!isDev) {
    /**
     * @todo(notion) api this up somehow please
     */
    _map(PAGES, (p) => paths.push(`/${p}`))
    // // @debug(error-boundary) uncomment this when debugging builds locally
    // return {
    //   paths,
    //   fallback: 'blocking',
    // }

    await asyncForEach(ROUTE_TYPES, async (routeType: string) => {
      const routeInfo = NOTION[routeType.toUpperCase()]
      const routeParentInfo = getParentRouteInfo(routeInfo.name)

      /**
       * @hack
       * - Child Route Types do not have a traditional Listing Page
       */
      if (!routeParentInfo) {
        paths.push(`/${routeType.toLowerCase()}`)
      }

      /**
       * @hack
       * - Check if we should: skipStaticPaths
       */

      if (routeInfo.skipStaticPaths) {
        console.dir(`@todo(notion) skipStaticPaths: ${routeType}`)
      } else {
        const catchAll = [routeType]
        const pathVariables = notion.custom.getPathVariables({
          catchAll,
        })
        const data = await getCatchAll({
          catchAll,
          clear: false,
          notionConfig,
          pathVariables,
          preview: false,
        })
        const items = data?.items?.results
        const slugs = getStaticPathsDefault({
          items,
          notionConfig,
          routeParentInfo,
          routeType: routeType.toLowerCase(),
        })
        paths.push(...slugs)
      }
    }).catch(_noop)
  }

  console.dir(`paths:`)
  console.dir(paths)

  return {
    paths,
    fallback: 'blocking',
  }
}

export { getStaticPathsCatchAll }
