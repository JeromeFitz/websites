// http://localhost:3000/api/notion/query/tags?events=1446dc938dc04018b3762d37b154fc92&shows=2cc25eed-12e6-4ccb-b949-21391d0e3174&eventsLineupShowIds=aa68b27a-f337-4cdb-8d34-c5c0f47c3d1b,4c9d65b3-8a36-4ae8-8a4a-503c9724d409,51a67c70-5b4c-4cea-92df-ca3e0daf8a59,cba93218-d432-45a0-b440-49e2d8eea17b,ca84ce27-c264-4935-8cad-2c55c8b20264,5805f58e-dad5-4afe-aa10-6afe78886f42,bf2d4594-b66f-4914-aa48-62f8a219e52d,e4695f66-92c4-4c03-b677-c514694863b8

// import _omit from 'lodash/omit'
import { Sort } from '@notionhq/client/build/src/api-types'
import _map from 'lodash/map'
import _size from 'lodash/size'
import { NextApiRequest, NextApiResponse } from 'next'

// import { getCache, setCache } from '~lib/notion/getCache'
// import { normalizerContent, normalizerContentResults } from '~lib/notion/getCatchAll'
import { normalizerContentResults } from '~lib/notion/getCatchAll'
// import omitFields from '~lib/notion/omitFields'
import avoidRateLimit from '~utils/avoidRateLimit'
import { DATABASES, notion } from '~utils/notion/helper'

// const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE
// const useCache = false

interface RequestQueryProps {
  databaseType?: string
  // @_meta
  routeType?: string
  // @events
  events?: string
  eventsLineupShowIds?: string
  shows?: string
  // @people
  key?: string
  value?: string
}

const notionQueryRouteType = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.dir(`notionQueryRouteType`)
  // console.dir(req.query)
  const reqQuery: RequestQueryProps = req?.query
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
  let data, items
  let filter
  // @todo(notion) sorts dynamic
  const sorts: Sort[] = [
    {
      property: 'Slug',
      direction: 'ascending',
    },
  ]

  const { routeType, key, value } = reqQuery
  let k, v

  /**
   * @todo(notion) make this DRY
   */
  switch (databaseType) {
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

  try {
    /**
     * @json should this be omitted at write time?
     */
    // const dataOmittted = _omit(data, omitFields['people'])
    const dataOmittted = data
    res.status(200).json({
      ...dataOmittted,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      error: {
        code: 404,
        message: `Not found: ${databaseType}`,
      },
    })
  }
}

export default notionQueryRouteType
