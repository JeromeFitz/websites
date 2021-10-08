/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'
// @note(notion) took these away in 0.4.0
// import {
//   CheckboxPropertyValue,
//   DatePropertyValue,
//   FilesPropertyValue,
//   MultiSelectPropertyValue,
//   NumberPropertyValue,
//   PhoneNumberPropertyValue,
//   RelationProperty,
//   RichTextPropertyValue,
//   // RollupPropertyValue,
//   SelectPropertyValue,
//   TitlePropertyValue,
//   URLPropertyValue,
// } from '@notionhq/client/build/src/api-types'
import _addDays from 'date-fns/addDays'
import _addMonths from 'date-fns/addMonths'
import _addYears from 'date-fns/addYears'
import Slugger from 'github-slugger'
import _ from 'lodash'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _omit from 'lodash/omit'
// import _pick from 'lodash/pick'
import _size from 'lodash/size'

// import isUndefined from '~utils/isUndefined'
// import asyncForEach from '~lib/asyncForEach'
import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import { getCache, setCache } from '~lib/notion/getCache'
import getPathVariables from '~lib/notion/getPathVariables'
import getQuery from '~lib/notion/getQuery'
import { DATABASES, SEO, QUERIES, PROPERTIES, notion } from '~utils/notion/helper'

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

const slugger = new Slugger()

// @note(notion) need to set keys of objects that will get specific subkeys
const dataInitial = {
  address: {},
  name: {},
  social: {},
}

const addTime = (date, type) => {
  switch (type) {
    case 'year':
      return _addYears(date, 1).toISOString()
    case 'month':
      return _addMonths(date, 1).toISOString()
    case 'day':
      // @hack the TimeZone to UTC is ... not great.
      return _addDays(date, 2).toISOString()
  }
  return _addDays(date, -1).toISOString()
}

interface DateNormalized {
  start?: string
  end?: string
}

interface NormalizerProperties {
  /**
   * @address
   * - number
   * - rich_text
   * - select
   */
  address?: {
    city?: string
    lat?: number
    lng?: number
    neighborhood?: string
    zipCode?: number
    street?: string
    state?: {
      color?: string
      id?: string
      name?: string
      slug?: string
    }
  }
  /**
   * @checkbox
   */
  explicit?: boolean
  noIndex?: boolean
  published?: boolean
  /**
   * @date
   */
  date?: DateNormalized
  datePublished?: DateNormalized
  dateRecorded?: DateNormalized
  /**
   * @files
   */
  seoImage?: {
    expiryTime: string
    name: string
    url: string
  }
  mp3?: {
    expiryTime: string
    name: string
    url: string
  }
  /**
   * @multi_select
   */
  categories?: any
  festivals?: any
  tags?: any
  /**
   * @number
   */
  episode?: number
  season?: number
  /**
   * @relation
   */
  /**
   * @relation @__SHARED
   */
  peopleThanks?: string[]
  /**
   * @relation @_EPISODES
   */
  peopleGuest?: string[]
  peopleSoundEngineer?: string[]
  // peopleThanks?: string[]
  podcasts?: string[]
  venuesRecordedAt?: string[]
  /**
   * @relation @_EVENTS
   *
   */
  eventsLineupShowIds?: string[]
  shows?: string[]
  venues?: string[]
  venuesSlugs?: string[]
  /**
   * @relation @_PEOPLE
   */
  episodesPeopleGuest?: string[]
  episodesPeopleSoundEngineer?: string[]
  episodesPeopleThanks?: string[]
  podcastsPeopleHost?: string[]
  showsPeopleCast?: string[]
  showsPeopleCastPast?: string[]
  showsPeopleCrew?: string[]
  showsPeopleDirector?: string[]
  showsPeopleDirectorMusical?: string[]
  showsPeopleDirectorTechnical?: string[]
  showsPeopleMusic?: string[]
  showsPeopleProducer?: string[]
  showsPeopleThanks?: string[]
  showsPeopleWriter?: string[]
  showsTags?: string[]
  /**
   * @relation @_PODCASTS
   *
   */
  episodes?: string[]
  peopleHost?: string[]
  /**
   * @relation @_SHOWS
   */
  events?: string[]
  peopleCast?: string[]
  peopleCastPast?: string[]
  peopleCrew?: string[]
  peopleCrewPast?: string[]
  peopleDirector?: string[]
  peopleDirectorMusical?: string[]
  peopleDirectorTechnical?: string[]
  peopleMusic?: string[]
  peopleProducer?: string[]
  // peopleThanks?: string[]
  peopleWriter?: string[]
  /**
   * @relation @_VENUES
   */
  episodesVenues?: string[]
  phoneNumber?: string
  // events?: string[]
  /**
   * @rich_text
   */
  duration?: string
  food?: string
  email?: string
  name?: {
    first?: string
    last?: string
    preferred?: string
  }
  podcastAuthor?: string
  podcastAuthorEmail?: string
  seoDescription?: string
  seoImageDescription?: string
  spotifyShow?: string
  slug?: string
  tailwindColorBackground?: string
  /**
   * @select
   */
  type?: {
    color?: string
    id?: string
    name?: string
    slug?: string
  }
  /**
   * @title
   */
  title?: string
  /**
   * @url
   */
  social?: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  ticketUrl?: string
}

const dataSorted = (data: NormalizerProperties) =>
  _(data).toPairs().sortBy(0).fromPairs().value()

const getTypeCheckboxNormalized = (data: any) => data.checkbox || false

const getTypeDateNormalized = (data: any) => data.date || null

const getTypeFilesNormalized = (data: any) =>
  _size(data.files) > 0 &&
  // @todo(zeroArray)
  (data.files[0].type === 'external'
    ? {
        name: data.files[0].name,
        url: data.files[0].external.url,
        expiryTime: null,
      }
    : {
        name: data.files[0].name,
        url: data.files[0].file.url,
        expiryTime: data.files[0].file.expiry_time,
      })

const getTypeMultiSelectNormalized = (data: any) => {
  const dataReturn = {}
  _map(data.multi_select, (multiSelect: any) => {
    const ms = multiSelect
    ms.slug = slugger.slug(ms.name)
    dataReturn[ms.id] = ms
  })
  return dataReturn
}
const getTypeNumberNormalized = (data: any) => data?.number || null

const getTypePhoneNumberNormalized = (data: any) => data?.phone_number || null

const getTypeRelationNormalized = (data: any) => {
  // console.dir(`getTypeRelationNormalized`)
  // console.dir(data)
  return _map(data.relation, (relation: any) => relation.id)
  // if (data.type === 'rollup') {
  //   // console.dir(`rollup`)
  //   // console.dir(data.rollup.array)
  //   // // @note(notion) This brings back the ID of the Relation
  //   // const foo = _map(data.rollup.array, (item) =>
  //   //   _map(item.type === 'relation' && item.relation, (relation: any) => relation.id)
  //   // )[0]
  //   // console.dir(foo)
  //   return []
  //   // return (
  //   //   data.rollup.type === 'array' &&
  //   //   _map(data.rollup.array, (relation: any) => relation.id)
  //   // )
  // } else {
  //   return _map(data.relation, (relation: any) => relation.id)
  // }
}

// const getTypeRollupNormalized = (data: RollupPropertyValue) => {
//   return null
//   // console.dir(`getTypeRollupNormalized x2`)
//   // console.dir(data)
//   // if (data?.type === 'rollup' && data?.rollup?.type === 'array') {
//   //   const rollupData = data?.rollup?.array[0]
//   //   const rollupType = rollupData.type
//   //   switch (rollupType) {
//   //     case 'multi_select':
//   //       return getTypeMultiSelectNormalized(rollupData)
//   //     // return null
//   //     default:
//   //       return null
//   //   }
//   // }
// }

const getTypeRichTextNormalized = (data: any) =>
  // @todo(zeroArray)
  data?.rich_text[0]?.plain_text || null

const getTypeSelectNormalized = (data: any) => {
  const s: any = data.select
  // console.dir(`getTypeSelectNormalized`)
  // console.dir(data)
  if (!!s) {
    s.slug = slugger.slug(data.select.name)
    return { [s.id]: s }
  } else {
    return null
  }
}

const getTypeTitleNormalized = (data: any) => {
  // console.dir(`getTypeTitleNormalized`)
  // console.dir(data)
  // @todo(zeroArray)
  return data?.title[0]?.plain_text || null
}

const getTypeUrlNormalized = (data: any) => {
  return data.url || null
}

const normalizerProperties = (properties) => {
  const data: NormalizerProperties = dataInitial
  _map(properties, (value, key) => {
    switch (key) {
      /**
       * @checkbox
       */
      case PROPERTIES.explicit:
        data.explicit = getTypeCheckboxNormalized(value)
        break
      case PROPERTIES.noIndex:
        data.noIndex = getTypeCheckboxNormalized(value)
        break
      case PROPERTIES.published:
        data.published = getTypeCheckboxNormalized(value)
        break
      /**
       * @date
       */
      case PROPERTIES.date:
        data.date = getTypeDateNormalized(value)
        break
      case PROPERTIES.datePublished:
        data.datePublished = getTypeDateNormalized(value)
        break
      case PROPERTIES.dateRecorded:
        data.dateRecorded = getTypeDateNormalized(value)
        break
      /**
       * @files
       */
      case PROPERTIES.seoImage:
        data.seoImage = getTypeFilesNormalized(value)
        break
      case PROPERTIES.mp3:
        data.mp3 = getTypeFilesNormalized(value)
        break
      /**
       * @multi_select
       */
      case PROPERTIES.categories:
        data.categories = getTypeMultiSelectNormalized(value)
        break
      case PROPERTIES.festivals:
        data.festivals = getTypeMultiSelectNormalized(value)
        break
      case PROPERTIES.tags:
        // // data.tags = getTypeMultiSelectNormalized(value)
        data.tags = getTypeRelationNormalized(value)
        // data.tags = null
        break
      /**
       * @number
       */
      case PROPERTIES.address.lat:
        data.address.lat = getTypeNumberNormalized(value)
        break
      case PROPERTIES.address.lng:
        data.address.lng = getTypeNumberNormalized(value)
        break
      case PROPERTIES.address.zipCode:
        data.address.zipCode = getTypeNumberNormalized(value)
        break
      case PROPERTIES.season:
        data.season = getTypeNumberNormalized(value)
        break
      case PROPERTIES.episode:
        data.episode = getTypeNumberNormalized(value)
        break
      /**
       * @phone_number
       */
      case PROPERTIES.phoneNumber:
        data.phoneNumber = getTypePhoneNumberNormalized(value)
        break

      /**
       * @relation
       */
      /**
       * @relation @__SHARED
       */
      /**
       * @relation @_EPISODES
       */
      case PROPERTIES.peopleGuest:
        data.peopleGuest = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleSoundEngineer:
        data.peopleSoundEngineer = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleThanks:
        data.peopleThanks = getTypeRelationNormalized(value)
        break
      case PROPERTIES.podcasts:
        data.podcasts = getTypeRelationNormalized(value)
        break
      case PROPERTIES.venuesRecordedAt:
        data.venuesRecordedAt = getTypeRelationNormalized(value)
        break
      /**
       * @relation @_EVENTS
       */
      case PROPERTIES.shows:
        data.shows = getTypeRelationNormalized(value)
        break
      case PROPERTIES.venues:
        data.venues = getTypeRelationNormalized(value)
        break
      case PROPERTIES.eventsLineupShowIds:
        data.eventsLineupShowIds = getTypeRelationNormalized(value)
        break
      case PROPERTIES.venuesSlugs:
        data.venuesSlugs = getTypeRelationNormalized(value)
        break
      /**
       * @relation @_PEOPLE
       */
      case PROPERTIES.episodesPeopleGuest:
        data.episodesPeopleGuest = getTypeRelationNormalized(value)
        break
      case PROPERTIES.episodesPeopleSoundEngineer:
        data.episodesPeopleSoundEngineer = getTypeRelationNormalized(value)
        break
      case PROPERTIES.episodesPeopleThanks:
        data.episodesPeopleThanks = getTypeRelationNormalized(value)
        break
      case PROPERTIES.podcastsPeopleHost:
        data.podcastsPeopleHost = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleCast:
        data.showsPeopleCast = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleCastPast:
        data.showsPeopleCastPast = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleCrew:
        data.showsPeopleCrew = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleDirector:
        data.showsPeopleDirector = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleDirectorMusical:
        data.showsPeopleDirectorMusical = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleDirectorTechnical:
        data.showsPeopleDirectorTechnical = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleMusic:
        data.showsPeopleMusic = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleProducer:
        data.showsPeopleProducer = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleThanks:
        data.showsPeopleThanks = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleWriter:
        data.showsPeopleWriter = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsTags:
        // data.showsTags = getTypeRollupNormalized(value)
        data.showsTags = getTypeRelationNormalized(value)
        break
      /**
       * @relation @_PODCASTS
       */
      case PROPERTIES.episodes:
        data.episodes = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleHost:
        data.peopleHost = getTypeRelationNormalized(value)
        break
      /**
       * @relation @_SHOWS
       */
      // @todo(specify)
      case PROPERTIES.events:
        data.events = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleCast:
        data.peopleCast = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleCastPast:
        data.peopleCastPast = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleCrew:
        data.peopleCrew = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleCrewPast:
        data.peopleCrewPast = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleDirector:
        data.peopleDirector = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleDirectorMusical:
        data.peopleDirectorMusical = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleDirectorTechnical:
        data.peopleDirectorTechnical = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleMusic:
        data.peopleMusic = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleProducer:
        data.peopleProducer = getTypeRelationNormalized(value)
        break
      case PROPERTIES.peopleWriter:
        data.peopleWriter = getTypeRelationNormalized(value)
        break
      /**
       * @relation @_VENUES
       */
      case PROPERTIES.episodesVenues:
        data.episodesVenues = getTypeRelationNormalized(value)
        break
      /**
       * @rich_text
       */
      case PROPERTIES.slug:
        data.slug = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.seoDescription:
        data.seoDescription = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.seoImageDescription:
        data.seoImageDescription = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.spotifyShow:
        data.spotifyShow = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.address.city:
        data.address.city = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.address.neighborhood:
        data.address.neighborhood = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.address.street:
        data.address.street = getTypeRichTextNormalized(value)
        break
      // @todo(specify)
      case PROPERTIES.podcastAuthor:
        data.podcastAuthor = getTypeRichTextNormalized(value)
        break
      // @todo(specify)
      case PROPERTIES.podcastAuthorEmail:
        data.podcastAuthorEmail = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.email:
        data.email = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.food:
        data.food = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.name.first:
        data.name.first = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.name.last:
        data.name.last = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.name.preferred:
        data.name.preferred = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.duration:
        data.duration = getTypeRichTextNormalized(value)
        break
      case PROPERTIES.tailwindColorBackground:
        data.tailwindColorBackground = getTypeRichTextNormalized(value)
        break
      /**
       * @select
       */
      case PROPERTIES.address.state:
        data.address.state = getTypeSelectNormalized(value)
        break
      // @todo(specify)
      case PROPERTIES.type:
        data.type = getTypeSelectNormalized(value)
        break
      /**
       * @title
       */
      case PROPERTIES.title:
      case 'Name':
        data.title = getTypeTitleNormalized(value)
        break
      /**
       * @url
       */
      case PROPERTIES.social.facebook:
        data.social.facebook = getTypeUrlNormalized(value)
        break
      case PROPERTIES.social.instagram:
        data.social.instagram = getTypeUrlNormalized(value)
        break
      case PROPERTIES.social.twitter:
        data.social.twitter = getTypeUrlNormalized(value)
        break
      case PROPERTIES.ticketUrl:
        data.ticketUrl = getTypeUrlNormalized(value)
        break
      default:
        break
    }
  })

  // return data
  return dataSorted(data)
}

// const normalizer = (data) => {
//   const normalizedData = _omit(data, 'results')
//   normalizedData.results = {}
//   _map(data?.results, (item) => {
//     const itemData = _omit(item, 'properties')
//     const itemPropertiesData = normalizerProperties(item?.properties)
//     normalizedData.results[item.id] = itemData
//     normalizedData.results[item.id].data = itemPropertiesData
//     // normalizedData.results[item.id].properties = item?.properties
//   })
//   return normalizedData
// }

const normalizerContent = (data) => {
  const normalizedData = _omit(data, 'properties')
  normalizedData.data = normalizerProperties(data?.properties)
  return normalizedData
}

const normalizerContentResults = (results) => {
  const normalizedResults = results
  _map(results, (result, index) => {
    const normalizedResult = _omit(result, 'properties')
    normalizedResult.data = normalizerProperties(result?.properties)
    normalizedResults[index] = normalizedResult
  })
  return normalizedResults
}

const deepFetchAllChildren = async (blocks: any[]): Promise<Array<any[] | any>> => {
  const fetchChildrenMap = blocks
    .filter((block) => block.has_children)
    .map((block) => {
      return {
        promise: notion.blocks.children.list({
          block_id: block.id,
          page_size: 100,
        }),
        parent_block: block,
      }
    })

  const results = await Promise.all<any>(
    fetchChildrenMap.map((value) => value.promise)
  )

  for (let i = 0; i < results.length; i++) {
    const childBlocks = results[i].results
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await deepFetchAllChildren(childBlocks)
    if (fetchChildrenMap[i]) {
      const parent: any = fetchChildrenMap[i].parent_block
      parent[parent.type].children = childBlocks
    }
  }
  return blocks
}

// @todo(next) preview
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCatchAll = async ({ cache = false, catchAll, clear, preview }) => {
  // console.dir(`> getCatchAll`)
  // console.dir(catchAll)
  const isCache = useCache && cache
  const { hasMeta, isPage, isIndex, meta, routeType, slug } =
    getPathVariables(catchAll)

  /**
   * @hack some reason everything is coming here, is it `notion/index.ts`?
   */
  if (slug === 'favicon.ico') return null

  /**
   * @resume
   */
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
    /**
     * @hack
     */
    let info: Pick<any, string | number | symbol>,
      // content: ListBlockChildrenResponse,
      content: any,
      items: Pick<any, string | number | symbol> = null

    let dataType: number
    /**
     * @test cases
     */
    // 1 = /colophon
    // 2 = /blog, /events, /podcasts
    // 3 = /blog/2020, /blog/2020/05, /blog/2020/05/09
    //     /events/2020, /events/2020/05, /events/2020/05/09,
    // 4 = /blog/2020/05/09/title, /events/2020/05/09/title,
    //     /podcasts/knockoffs/i-know-what-you-did-last-summer
    // 5 = /shows/alex-o-jerome, /events/2020/05/09/jerome-and, /podcasts/knockoffs
    if (isPage) {
      dataType = 1
    } else if (isIndex && !hasMeta) {
      dataType = 2
    } else if (isIndex && hasMeta) {
      dataType = 3
    } else if (hasMeta) {
      dataType = 4
    } else {
      dataType = 5
    }
    // console.dir(`routeType: ${routeType}`)
    // console.dir(`dataType: ${dataType}`)
    // console.dir(`slug: ${slug}`)
    /**
     * @info
     * used for seo information and immediate display above the fold
     */
    const dateTimestamp = new Date().toISOString()
    // @todo(date-fns) make this the first date of the year dynamically
    const dateTimestampBlog = new Date('2020-01-01').toISOString()

    // const contentChildren = []

    switch (dataType) {
      case 1:
      case 5:
        const info1: any = await getDatabasesByIdQuery({
          databaseId: DATABASES[routeType],
          filter: {
            and: [
              {
                ...QUERIES.slug,
                text: { equals: slug },
              },
            ],
          },
        })
        const info1a = info1?.object === 'list' && info1.results[0]
        info = normalizerContent(info1a)
        content = await getBlocksByIdChildren({ blockId: info.id })
        // // @todo(notion) do we need to do a children?
        // await asyncForEach(content.results, async (item: any) => {
        //   if (item.has_children) {
        //     console.dir(`has_children: ${item?.id}`)
        //     const blockChildren = await getBlocksByIdChildren({ blockId: item?.id })
        //     console.dir(blockChildren)
        //     contentChildren.push({
        //       [item?.id]: blockChildren,
        //     })
        //   }
        // }).catch(() => {})
        // //
        const blocks = [...(await deepFetchAllChildren(content.results))]
        content = blocks

        // while (content.has_more && content.next_cursor) {
        //   content = await notion.blocks.children.list({
        //     block_id: page.id,
        //     page_size: 50,
        //     start_cursor: content.next_cursor,
        //   })

        //   const results = content.results
        //   blocks = blocks.concat(await deepFetchAllChildren(results))
        // }
        break
      case 2:
        const info2 = await getPagesById({ pageId: SEO[routeType] })
        info = info2.object === 'page' && normalizerContent(info2)
        content = await getBlocksByIdChildren({ blockId: info.id })
        const items2: any = await getDatabasesByIdQuery({
          databaseId: DATABASES[routeType],
          filter: {
            and: [
              {
                property:
                  routeType === 'events'
                    ? PROPERTIES.date
                    : PROPERTIES.datePublished,
                date: {
                  on_or_after:
                    routeType === 'events' ? dateTimestamp : dateTimestampBlog,
                },
              },
            ],
          },
        })
        const items2Data = {}
        _map(
          items2.results,
          (item) => (items2Data[item.id] = normalizerContent(item))
        )
        const items2Omit = _omit(items2, 'results')
        // @ts-ignore
        items2Omit.results = items2Data
        items = _omit(items2Omit, 'data')
        break
      case 3:
        const info3 = await getPagesById({ pageId: SEO[routeType] })
        const info3a = info3.object === 'page' && normalizerContent(info3)
        info = info3a
        content = await getBlocksByIdChildren({ blockId: info.id })
        /**
         * @filter
         * @note events|blog only for now
         */
        const metaCount = _size(meta)
        const [year3, month3, day3] = meta
        const timestampQuery3 = new Date(
          `${!!year3 ? year3 : dateTimestamp.slice(0, 4)}-${
            !!month3 ? month3 : '01'
          }-${!!day3 ? day3 : '01'}`
        )
        let filter
        const sorts3 = [
          {
            property: PROPERTIES.date,
            direction: 'descending',
          },
        ]

        switch (metaCount) {
          case 1:
            filter = {
              and: [
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    on_or_after: addTime(timestampQuery3, ''),
                  },
                },
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    before: addTime(timestampQuery3, 'year'),
                  },
                },
              ],
            }
            break
          case 2:
            filter = {
              and: [
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    on_or_after: addTime(timestampQuery3, ''),
                  },
                },
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    before: addTime(timestampQuery3, 'month'),
                  },
                },
              ],
            }
            break
          case 3:
            filter = {
              and: [
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    on_or_after: addTime(timestampQuery3, ''),
                  },
                },
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    before: addTime(timestampQuery3, 'day'),
                  },
                },
              ],
            }
            break
          default:
            filter = {
              and: [
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    on_or_after: addTime(timestampQuery3, ''),
                  },
                },
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    before: addTime(timestampQuery3, 'day'),
                  },
                },
                {
                  ...QUERIES.slug,
                  text: { equals: slug },
                },
              ],
            }
            break
        }
        const items3: any = await getDatabasesByIdQuery({
          databaseId: DATABASES[routeType],
          filter,
          sorts: sorts3,
        })
        const items3Data = {}
        _map(
          items3.results,
          (item) => (items3Data[item.id] = normalizerContent(item))
        )
        const items3Omit = _omit(items3, 'results')
        // @ts-ignore
        items3Omit.results = items3Data
        items = _omit(items3Omit, 'data')
        /***
         * @hack
         */
        break

      case 4:
        if (routeType === 'podcasts') {
          const [podcastSlug, episodeSlug] = meta
          const hasEpisode = _size(meta) === 2
          const info4__p: any = await getDatabasesByIdQuery({
            databaseId: DATABASES[hasEpisode ? 'episodes' : routeType],
            filter: {
              and: [
                {
                  ...QUERIES.slug,
                  text: { equals: hasEpisode ? episodeSlug : podcastSlug },
                },
              ],
            },
          })
          const info4__pa = info4__p.object === 'list' && info4__p.results[0]
          info = normalizerContent(info4__pa)
          content = await getBlocksByIdChildren({ blockId: info.id })
          // @hack(podcasts)
          if (!hasEpisode) {
            let items4__p = null
            if (routeType === 'podcasts') {
              items4__p = await getQuery({
                reqQuery: {
                  podcasts: info.id,
                  databaseType: 'episodes',
                },
              })
              const items4__pData = {}
              _map(items4__p.results, (item) => (items4__pData[item.id] = item))
              const items4__pOmit = _omit(items4__p, 'results')
              // @ts-ignore
              items4__pOmit.results = items4__pData
              items = _omit(items4__pOmit, 'data')
            }
          }
        }
        if (routeType === 'events' || routeType === 'blog') {
          const [year, month, day] = meta
          const timestampQuery = new Date(
            `${!!year ? year : dateTimestamp.slice(0, 4)}-${
              !!month ? month : '01'
            }-${!!day ? day : '01'}`
          )
          const info4__be: any = await getDatabasesByIdQuery({
            databaseId: DATABASES[routeType],
            filter: {
              and: [
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    on_or_after: addTime(timestampQuery, ''),
                  },
                },
                {
                  property:
                    routeType === 'events'
                      ? PROPERTIES.date
                      : PROPERTIES.datePublished,
                  date: {
                    before: addTime(timestampQuery, 'day'),
                  },
                },
                {
                  ...QUERIES.slug,
                  text: { equals: slug },
                },
              ],
            },
          })
          const info4__bea = info4__be.object === 'list' && info4__be.results[0]
          info = normalizerContent(info4__bea)
          content = await getBlocksByIdChildren({ blockId: info.id })
        }

        break
      default:
        break
    }

    if (!!items) {
      items.results = _filter(items.results, { data: { published: true } })
    }

    data = { info, content, items }

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

export { normalizerContent, normalizerContentResults }
export default getCatchAll
