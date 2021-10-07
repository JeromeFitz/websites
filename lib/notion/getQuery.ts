import _map from 'lodash/map'
import _size from 'lodash/size'

import { normalizerContentResults } from '~lib/notion/getCatchAll'
import avoidRateLimit from '~utils/avoidRateLimit'
import { DATABASES, notion } from '~utils/notion/helper'

// const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE
// const useCache = false

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

  const database_id = DATABASES[databaseType]
  if (!database_id) return null

  let data, items
  let filter
  // @todo(notion) sorts dynamic
  let sorts: any[] = [
    {
      property: 'Slug',
      direction: 'ascending',
    },
  ]

  const { routeType, key, value } = reqQuery
  let k, v

  // console.dir(`reqQuery`)
  // console.dir(reqQuery)

  /**
   * @todo(notion) make this DRY
   */
  switch (databaseType) {
    case 'episodes':
      const { podcasts: e__podcasts } = reqQuery

      const filterTagEpisodesByPodcasts = []
      const e__podcastIds = []
      !!e__podcasts && e__podcastIds.push(...e__podcasts?.split(','))
      _size(e__podcastIds) > 0 &&
        _map(e__podcastIds, (id) =>
          filterTagEpisodesByPodcasts.push({
            property: 'PodcastIDs',
            relation: {
              contains: id,
            },
          })
        )
      filter = { or: [...filterTagEpisodesByPodcasts] }

      break
    case 'venues':
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

      break
    case 'shows':
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

      break
    case 'people':
      switch (key) {
        /**
         * @shows
         */
        case 'peopleCast':
          k = 'Shows.People.Cast'
          v = value
          break
        case 'peopleCrew':
          k = 'Shows.People.Crew'
          v = value
          break
          v = value
          break
        case 'peopleDirector':
          k = 'Shows.People.Director'
          v = value
          break
        case 'peopleDirectorMusical':
          k = 'Shows.People.DirectorMusical'
          v = value
          break
        case 'peopleDirectorTechnical':
          k = 'Shows.People.DirectorTechnical'
          v = value
          break
        case 'peopleHost':
          k = 'Podcasts.People.Host'
          v = value
          break
        case 'peopleMusic':
          k = 'Shows.People.Music'
          v = value
          break
        case 'peopleProducer':
          k =
            routeType === 'podcasts' ? 'Podcasts.Producer' : 'Shows.People.Producer'
          v = value
          break
        case 'peopleThanks':
          k =
            routeType === 'podcasts'
              ? 'Podcasts.People.Thanks'
              : 'Shows.People.Thanks'
          v = value
          break
        // @todo(notion) dry
        case 'peopleGuest':
          k = 'Episodes.People.Guest'
          v = value
          break
        case 'peopleWriter':
          k = 'Shows.People.Writer'
          v = value
          break
        default:
          hasError = true
          break
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
      break
    case 'tags':
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

      break

    case 'events':
      sorts = [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ]
      break
    default:
      hasError = true
      break
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        database_id,
        filter,
        sorts,
      })
      // data = normalizerContent(contentData)
      data = contentData
      items = normalizerContentResults(contentData.results)
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
