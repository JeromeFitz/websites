import _map from 'lodash/map'
import _size from 'lodash/size'

import { dataNormalizedResults } from '~pages/api/notion/secret/get/[...catchAll]'
import avoidRateLimit from '~utils/avoidRateLimit'
import { DB, ROUTE_TYPES, notion } from '~utils/notion/helper'

// const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE
// const useCache = false

const SORTS: any[] = [
  {
    property: 'Slug',
    direction: 'ascending',
  },
]

class RELATIONS_TYPES {
  constructor(private relationType: string) {}

  getRelationType(): string {
    return this.relationType
  }

  ['peopleCast']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.Cast',
      v: value,
    }
  }
  ['peopleCrew']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.Crew',
      v: value,
    }
  }
  ['peopleDirector']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.Director',
      v: value,
    }
  }
  ['peopleDirectorMusical']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.DirectorMusical',
      v: value,
    }
  }
  ['peopleDirectorTechnical']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.DirectorTechnical',
      v: value,
    }
  }
  ['peopleHost']({ reqQuery: { value } }) {
    return {
      k: 'Podcasts.People.Host',
      v: value,
    }
  }
  ['peopleMusic']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.Music',
      v: value,
    }
  }
  ['peopleProducer']({ reqQuery: { routeType, value } }) {
    return {
      k:
        routeType === ROUTE_TYPES.podcasts
          ? 'Podcasts.Producer'
          : 'Shows.People.Producer',
      v: value,
    }
  }
  ['peopleThanks']({ reqQuery: { routeType, value } }) {
    return {
      k:
        routeType === ROUTE_TYPES.podcasts
          ? 'Podcasts.People.Thanks'
          : 'Shows.People.Thanks',
      v: value,
    }
  }
  ['peopleGuest']({ reqQuery: { value } }) {
    return {
      k: 'Episodes.People.Guest',
      v: value,
    }
  }
  ['peopleWriter']({ reqQuery: { value } }) {
    return {
      k: 'Shows.People.Writer',
      v: value,
    }
  }
}

class DATABASE_TYPES {
  constructor(private databaseType: string) {}

  getDatabaseType(): string {
    return this.databaseType
  }

  ['episodes']({ reqQuery }) {
    let filter = {}
    const sorts = SORTS
    const { podcasts: e__podcasts } = reqQuery

    const filterTagEpisodesByPodcasts = []
    const e__podcastIds = []
    !!e__podcasts && e__podcastIds.push(...e__podcasts?.split(','))
    _size(e__podcastIds) > 0 &&
      _map(e__podcastIds, (id) =>
        filterTagEpisodesByPodcasts.push({
          property: 'Podcasts',
          relation: {
            contains: id,
          },
        })
      )
    filter = { or: [...filterTagEpisodesByPodcasts] }
    return {
      filter,
      sorts,
    }
  }

  ['events']() {
    return {
      filter: {},
      sorts: [
        {
          property: 'Date.Event',
          direction: 'ascending',
        },
      ],
    }
  }

  ['people']({ reqQuery }) {
    let filter = {}
    const sorts = SORTS

    let k = null,
      v = null

    // @question(constructor) this needs to be reset each time
    const getRELATIONSTYPES = new RELATIONS_TYPES('')
    const { key } = reqQuery
    if (key) {
      if (getRELATIONSTYPES[key]) {
        const RELATIONSTYPE_DATA = getRELATIONSTYPES[key]({ reqQuery })
        k = RELATIONSTYPE_DATA?.k
        v = RELATIONSTYPE_DATA?.v
      } else {
        // hasError = true
      }
    }

    const filterPeopleShows = []
    !!k &&
      !!v &&
      filterPeopleShows.push({
        property: k,
        relation: {
          contains: v,
        },
      })
    filter = { or: [...filterPeopleShows] }
    return {
      filter,
      sorts,
    }
  }

  ['shows']({ reqQuery }) {
    let filter = {}
    const sorts = SORTS

    const { key, value } = reqQuery
    let k: string, v: any
    switch (key) {
      /**
       * @events
       */
      case 'eventsLineupShowIds':
        k = 'Events.Lineup'
        v = value
        break
      case 'shows':
        k = 'EventIDs'
        v = value
        break
    }
    const filterEventsShows = []
    !!k &&
      !!v &&
      filterEventsShows.push({
        property: k,
        relation: {
          contains: v,
        },
      })
    filter = { or: [...filterEventsShows] }
    return {
      filter,
      sorts,
    }
  }

  ['venues']({ reqQuery }) {
    let filter = {}
    const sorts = SORTS
    const { events: eventsV } = reqQuery

    const filterTagEventsV = []
    const eventVIds = []
    !!eventsV && eventVIds.push(...eventsV?.split(','))
    _size(eventVIds) > 0 &&
      _map(eventVIds, (id) =>
        filterTagEventsV.push({
          property: 'EventIDs',
          relation: {
            contains: id,
          },
        })
      )
    filter = { or: [...filterTagEventsV] }
    return {
      filter,
      sorts,
    }
  }

  ['tags']({ reqQuery }) {
    let filter = {}
    const sorts = SORTS
    const { events, eventsLineupShowIds: showLineup, shows } = reqQuery

    const filterTagShows = []
    const filterTagEvents = []

    const showIds = []
    !!shows && showIds.push(...shows?.split(','))
    !!showLineup && showIds.push(...showLineup?.split(','))
    _size(showIds) > 0 &&
      _map(showIds, (id) =>
        filterTagShows.push({
          property: 'Tags.Shows',
          relation: {
            contains: id,
          },
        })
      )

    const eventIds = []
    !!events && eventIds.push(...events?.split(','))
    _size(eventIds) > 0 &&
      _map(eventIds, (id) =>
        filterTagEvents.push({
          property: 'Tags.Events',
          relation: {
            contains: id,
          },
        })
      )

    filter = { or: [...filterTagEvents, ...filterTagShows] }
    return {
      filter,
      sorts,
    }
  }
}

const getQuery = async ({ reqQuery }) => {
  const { databaseType } = reqQuery
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

  const database_id = DB[databaseType.toUpperCase()].id
  if (!database_id) return []

  let data, items
  let filter, sorts

  // console.dir(`reqQuery`)
  // console.dir(reqQuery)

  // @question(constructor) this needs to be reset each time
  const getDBTYPE = new DATABASE_TYPES('')

  if (databaseType) {
    if (getDBTYPE[databaseType]) {
      const DBTYPE_DATA = getDBTYPE[databaseType]({ reqQuery })
      filter = DBTYPE_DATA?.filter
      sorts = DBTYPE_DATA?.sorts
    } else {
      hasError = true
    }
  }

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
    let contentData
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
              property: 'Slug',
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
      // data = normalizerContent(contentData)
      data = contentData
      // @hack(notion) routeType should be dynamic
      items = dataNormalizedResults(contentData.results, 'episodes')
      // console.dir(`items`)
      // console.dir(items)
      data.results = items
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
