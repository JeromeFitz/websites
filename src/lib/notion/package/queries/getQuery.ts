// import _map from 'lodash/map'
import _omit from 'lodash/omit'
// import _size from 'lodash/size'

import { notionPleaseDeprecate as notion } from '../helper'
import { PROPERTIES } from '../schema'
import avoidRateLimit from '../utils/avoidRateLimit'
import dataNormalizedResults from '../utils/dataNormalizedResults'

// // const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE
// // const useCache = false

// // console.dir(NOTION)

// const SORT = {
//   ASCENDING: 'ascending',
//   DESCENDING: 'descending',
// }

// const SORTS: any[] = [
//   {
//     property: PROPERTIES.slug.notion,
//     direction: SORT.ASCENDING,
//   },
// ]

// class DATABASE_TYPES {
//   constructor(private databaseType: string) {}

//   getDatabaseType(): string {
//     return this.databaseType
//   }

//   [DATABASES.EPISODES]({ reqQuery }) {
//     let filter = {}
//     const sorts = SORTS
//     const { podcasts: e__podcasts } = reqQuery

//     const filterTagEpisodesByPodcasts = []
//     const e__podcastIds = []
//     !!e__podcasts && e__podcastIds.push(...e__podcasts?.split(','))
//     _size(e__podcastIds) > 0 &&
//       _map(e__podcastIds, (id) =>
//         filterTagEpisodesByPodcasts.push({
//           property: PROPERTIES.relationEpisodes__Podcast.notion,
//           relation: {
//             contains: id,
//           },
//         })
//       )
//     filter = { or: [...filterTagEpisodesByPodcasts] }
//     // console.dir(`> filter`)
//     // console.dir(filterTagEpisodesByPodcasts)
//     return {
//       filter,
//       sorts,
//     }
//   }
// }

const getQuery = async ({ config, reqQuery }) => {
  // const { DATABASES, NOTION } = config
  const { NOTION } = config
  const { databaseType } = reqQuery
  const routeType = databaseType
  /**
   * @debug
   */
  let hasError = false
  // console.dir(`databaseType`)
  // console.dir(databaseType)
  // console.dir(`reqQuery`)
  // console.dir(reqQuery)

  /**
   * @setup
   */
  const DATABASE_TYPE = databaseType.toUpperCase()
  const database_id = NOTION[DATABASE_TYPE].database_id
  if (!database_id) return []

  // @todo(types) any
  let data: Pick<any, string | number | symbol>, items: any[]
  let filter: any, sorts: any

  // console.dir(`reqQuery`)
  // console.dir(reqQuery)

  // // @question(constructor) needs to be reset each time
  // const getDBTYPE = new DATABASE_TYPES('')

  // if (databaseType) {
  //   if (getDBTYPE[databaseType]) {
  //     const DBTYPE_DATA = getDBTYPE[DATABASE_TYPE]({ reqQuery })
  //     filter = DBTYPE_DATA?.filter
  //     sorts = DBTYPE_DATA?.sorts
  //   } else {
  //     hasError = true
  //   }
  // }

  // /**
  //  * @cache pre
  //  */
  // if (useCache) {
  //   const url = catchAll.join('/')
  //   const cacheData = await getCache(url)
  //   if (!!cacheData) {
  //     data = cacheData
  //   }
  // }

  if (!hasError && (!data || data === undefined)) {
    await avoidRateLimit()
    // @todo(types) any
    let contentData: Pick<any, string | number | symbol>
    if (!!filter) {
      // console.dir(`filter`)
      // console.dir(filter)
      // console.dir(`sorts`)
      // console.dir(sorts)
      // @hack(notion)-do-not-return'
      if (filter?.or.length === 0) {
        filter = {
          and: [
            {
              property: PROPERTIES.slug.notion,
              rich_text: { equals: '@hack(notion)-do-not-return' },
            },
          ],
        }
      }
      contentData = await notion.databases.query({
        database_id,
        filter,
        sorts,
      })

      data = contentData
      items = dataNormalizedResults({
        config,
        results: contentData.results,
        routeType,
      })
      data = _omit(data, 'results')
      data['results'] = items
    } else {
      // console.dir(`no filter`)
      hasError = true
    }

    // /**
    //  * @cache post
    //  */
    // if (useCache && !!data) {
    //   const url = catchAll.join('/')
    //   // console.dir(url)
    //   const isCacheExists = await getCache(url)
    //   // console.dir(isCacheExists)
    //   if (!isCacheExists || isCacheExists === undefined) {
    //     setCache(data, url)
    //   }
    // }
  }

  return data
}

export default getQuery
