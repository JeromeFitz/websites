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
import _invert from 'lodash/invert'
import _map from 'lodash/map'
import _omit from 'lodash/omit'
import _size from 'lodash/size'
import _sortBy from 'lodash/sortBy'

// import isUndefined from '~utils/isUndefined'
// import asyncForEach from '~lib/asyncForEach'
import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import { getCache, setCache } from '~lib/notion/getCache'
import getImages from '~lib/notion/getImages'
import getPathVariables from '~lib/notion/getPathVariables'
import getQuery from '~lib/notion/getQuery'
import { DATABASES, SEO, QUERIES, PROPERTIES, notion } from '~utils/notion/helper'

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

const slugger = new Slugger()
const dataInitial = {}

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

const getTypeFilesNormalized = (data: any) => {
  // console.dir(`> getTypeFilesNormalized`)
  // console.dir(data)
  const returnData = _size(data.files) > 0 ? data?.files[0]?.name : null
  // console.dir(`> returnData`)
  // console.dir(returnData)
  return returnData
  // // @todo(zeroArray)
  // (data.files[0].type === 'external'
  //   ? {
  //       name: data.files[0].name,
  //       url: data.files[0].external.url,
  //       expiryTime: null,
  //     }
  //   : {
  //       name: data.files[0].name,
  //       url: data.files[0].file.url,
  //       expiryTime: data.files[0].file.expiry_time,
  //     })
}

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

const getTypeRichTextNormalized = (data: any) => {
  // // @todo(zeroArray)
  // console.dir(`data`)
  // console.dir(data)
  return !!data?.rich_text ? data?.rich_text[0]?.plain_text : null
}

const getTypeRollupNormalized = (data: any) => {
  // console.dir(`> getTypeRollupNormalized`)
  // console.dir(`data`)
  // console.dir(data?.rollup?.array)
  // _map(data?.rollup?.array, (item) => {
  //   // console.dir(item)
  //   // console.dir(item?.title[0]?.plain_text)
  // })
  return _sortBy(_map(data?.rollup?.array, (item) => getTypeTitleNormalized(item)))
}

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
  // // @todo(zeroArray)
  return !!data?.title ? data?.title[0]?.plain_text : null
}

const getTypeUrlNormalized = (data: any) => {
  // console.dir(`getTypeUrlNormalized`)
  // console.dir(data)
  return data.url || null
}

class Properties {
  constructor(private contentType: string) {}

  getProperty(): string {
    return this.contentType
  }

  /**
   * @checkbox
   */
  checkbox(value) {
    return getTypeCheckboxNormalized(value)
  }
  [PROPERTIES.explicit](value) {
    return this.checkbox(value)
  }
  [PROPERTIES.noIndex](value) {
    return this.checkbox(value)
  }
  [PROPERTIES.published](value) {
    return this.checkbox(value)
  }
  /**
   * @date
   */
  date(value) {
    return getTypeDateNormalized(value)
  }
  [PROPERTIES.date](value) {
    return this.date(value)
  }
  [PROPERTIES.datePublished](value) {
    return this.date(value)
  }
  [PROPERTIES.dateRecorded](value) {
    return this.date(value)
  }
  /**
   * @files
   */
  files(value) {
    return getTypeFilesNormalized(value)
  }
  [PROPERTIES.seoImage](value) {
    return this.files(value)
  }
  [PROPERTIES.mp3](value) {
    return this.files(value)
  }
  /**
   * @multi_select
   */
  multiSelect(value) {
    return getTypeMultiSelectNormalized(value)
  }
  [PROPERTIES.categories](value) {
    return this.multiSelect(value)
  }
  [PROPERTIES.festivals](value) {
    return this.multiSelect(value)
  }
  [PROPERTIES.tags](value) {
    return this.multiSelect(value)
  }
  /**
   * @number
   */
  number(value) {
    return getTypeNumberNormalized(value)
  }
  [PROPERTIES.addressLatitude](value) {
    return this.number(value)
  }
  [PROPERTIES.addressLongitude](value) {
    return this.number(value)
  }
  [PROPERTIES.addressZipCode](value) {
    return this.number(value)
  }
  [PROPERTIES.season](value) {
    return this.number(value)
  }
  [PROPERTIES.episode](value) {
    return this.number(value)
  }
  /**
   * @phone_number
   */
  phoneNumber(value) {
    return getTypePhoneNumberNormalized(value)
  }
  [PROPERTIES.phoneNumber](value) {
    return this.phoneNumber(value)
  }
  /**
   * @relation
   */
  relation(value) {
    return getTypeRelationNormalized(value)
  }
  /**
   * @relation @__SHARED
   */
  /**
   * @relation @_EPISODES
   */
  [PROPERTIES.peopleGuest](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleSoundEngineer](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleThanks](value) {
    return this.relation(value)
  }
  [PROPERTIES.podcasts](value) {
    return this.relation(value)
  }
  [PROPERTIES.venuesRecordedAt](value) {
    return this.relation(value)
  }
  /**
   * @relation @_EVENTS
   */
  [PROPERTIES.shows](value) {
    return this.relation(value)
  }
  [PROPERTIES.venues](value) {
    return this.relation(value)
  }
  [PROPERTIES.eventsLineupShowIds](value) {
    return this.relation(value)
  }
  [PROPERTIES.venuesSlugs](value) {
    return this.relation(value)
  }
  /**
   * @relation @_PEOPLE
   */
  [PROPERTIES.episodesPeopleGuest](value) {
    return this.relation(value)
  }
  [PROPERTIES.episodesPeopleSoundEngineer](value) {
    return this.relation(value)
  }
  [PROPERTIES.episodesPeopleThanks](value) {
    return this.relation(value)
  }
  [PROPERTIES.podcastsPeopleHost](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleCast](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleCastPast](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleCrew](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleDirector](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleDirectorMusical](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleDirectorTechnical](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleMusic](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleProducer](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleThanks](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsPeopleWriter](value) {
    return this.relation(value)
  }
  [PROPERTIES.showsTags](value) {
    return this.relation(value)
  }
  /**
   * @relation @_PODCASTS
   */
  [PROPERTIES.episodes](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleHost](value) {
    return this.relation(value)
  }
  /**
   * @relation @_SHOWS
   */
  // @todo(specify)
  [PROPERTIES.events](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleCast](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleCastPast](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleCrew](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleCrewPast](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleDirector](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleDirectorMusical](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleDirectorTechnical](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleMusic](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleProducer](value) {
    return this.relation(value)
  }
  [PROPERTIES.peopleWriter](value) {
    return this.relation(value)
  }
  /**
   * @relation @_VENUES
   */
  [PROPERTIES.episodesVenues](value) {
    return this.relation(value)
  }
  /**
   * @rich_text
   */
  richText(value) {
    return getTypeRichTextNormalized(value)
  }
  [PROPERTIES.slug](value) {
    return this.richText(value)
  }
  [PROPERTIES.seoDescription](value) {
    return this.richText(value)
  }
  [PROPERTIES.seoImageDescription](value) {
    return this.richText(value)
  }
  [PROPERTIES.spotifyShow](value) {
    return this.richText(value)
  }
  [PROPERTIES.addressCity](value) {
    return this.richText(value)
  }
  [PROPERTIES.addressNeighborhood](value) {
    return this.richText(value)
  }
  [PROPERTIES.addressStreet](value) {
    return this.richText(value)
  }
  // @todo(specify)
  [PROPERTIES.podcastAuthor](value) {
    return this.richText(value)
  }
  // @todo(specify)
  [PROPERTIES.podcastAuthorEmail](value) {
    return this.richText(value)
  }
  [PROPERTIES.email](value) {
    return this.richText(value)
  }
  [PROPERTIES.food](value) {
    return this.richText(value)
  }
  [PROPERTIES.nameFirst](value) {
    return this.richText(value)
  }
  [PROPERTIES.nameLast](value) {
    return this.richText(value)
  }
  [PROPERTIES.namePreferred](value) {
    return this.richText(value)
  }
  [PROPERTIES.duration](value) {
    return this.richText(value)
  }
  [PROPERTIES.tailwindColorBackground](value) {
    return this.richText(value)
  }
  /**
   * @rollup
   */
  rollup(value) {
    return getTypeRollupNormalized(value)
  }
  [PROPERTIES.rollupCast](value) {
    return this.rollup(value)
  }
  /**
   * @select
   */
  select(value) {
    return getTypeSelectNormalized(value)
  }
  // @question(object) w/in object
  [PROPERTIES.addressState](value) {
    return this.select(value)
  }
  // @todo(specify)
  [PROPERTIES.type](value) {
    return this.select(value)
  }
  /**
   * @title
   */
  title(value) {
    return getTypeTitleNormalized(value)
  }
  [PROPERTIES.title](value) {
    return this.title(value)
  }
  ['Name'](value) {
    return this.title(value)
  }
  /**
   * @url
   */
  url(value) {
    return getTypeUrlNormalized(value)
  }
  [PROPERTIES.socialFacebook](value) {
    return this.url(value)
  }
  [PROPERTIES.socialInstagram](value) {
    return this.url(value)
  }
  [PROPERTIES.socialTwitter](value) {
    return this.url(value)
  }
  [PROPERTIES.ticketUrl](value) {
    return this.url(value)
  }
}

const normalizerProperties = (properties) => {
  const data: NormalizerProperties = dataInitial
  // @question(constructor) this needs to be reset each time
  const getProperties = new Properties('')
  const PROPERTIES_INVERT = _invert(PROPERTIES)
  _map(properties, (value, key) => {
    // if (value === null || value === undefined) return null

    if (getProperties[key]) {
      const _propertyValue = getProperties[key](value)
      data[PROPERTIES_INVERT[key]] =
        _propertyValue === undefined ? null : _propertyValue
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
  if (blocks === null || blocks === undefined) return blocks
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

class DATA_TYPES {
  constructor(private dataType: string) {}

  getDataType(): string {
    return this.dataType
  }

  async ['getBySlug']({ routeType, slug }) {
    let content = null,
      info = null,
      // eslint-disable-next-line prefer-const
      items = null
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
    // eslint-disable-next-line prefer-const
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

    return {
      content,
      info,
      items,
    }
  }
  1(props) {
    return this.getBySlug(props)
  }
  5(props) {
    return this.getBySlug(props)
  }

  async ['getByListing']({ routeType }) {
    let content = null,
      info = null,
      items = null
    const dateTimestamp = new Date().toISOString()
    // @todo(date-fns) make this the first date of the year dynamically
    const dateTimestampBlog = new Date('2020-01-01').toISOString()

    const info2 = await getPagesById({ pageId: SEO[routeType] })
    // eslint-disable-next-line prefer-const
    info = info2.object === 'page' && normalizerContent(info2)
    // eslint-disable-next-line prefer-const
    content = await getBlocksByIdChildren({ blockId: info.id })
    const items2: any = await getDatabasesByIdQuery({
      databaseId: DATABASES[routeType],
      filter: {
        and: [
          {
            property:
              routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
            date: {
              on_or_after:
                routeType === 'events' ? dateTimestamp : dateTimestampBlog,
            },
          },
        ],
      },
    })
    const items2Data = {}
    _map(items2.results, (item) => (items2Data[item.id] = normalizerContent(item)))
    const items2Omit = _omit(items2, 'results')
    // @ts-ignore
    items2Omit.results = items2Data
    // eslint-disable-next-line prefer-const
    items = _omit(items2Omit, 'data')

    return {
      content,
      info,
      items,
    }
  }
  2(props) {
    return this.getByListing(props)
  }

  // @todo(complexity) 15
  // eslint-disable-next-line complexity
  async ['getByListingWithDate']({ meta, routeType, slug }) {
    let content = null,
      info = null,
      items = null
    const dateTimestamp = new Date().toISOString()

    const info3 = await getPagesById({ pageId: SEO[routeType] })
    const info3a = info3.object === 'page' && normalizerContent(info3)
    // eslint-disable-next-line prefer-const
    info = info3a
    // eslint-disable-next-line prefer-const
    content = await getBlocksByIdChildren({ blockId: info.id })
    /**
     * @filter
     * @note events|blog only for now
     */
    const metaCount = _size(meta)
    const [year3, month3, day3] = meta
    const timestampQuery3 = new Date(
      `${!!year3 ? year3 : dateTimestamp.slice(0, 4)}-${!!month3 ? month3 : '01'}-${
        !!day3 ? day3 : '01'
      }`
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
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
              date: {
                on_or_after: addTime(timestampQuery3, ''),
              },
            },
            {
              property:
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
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
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
              date: {
                on_or_after: addTime(timestampQuery3, ''),
              },
            },
            {
              property:
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
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
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
              date: {
                on_or_after: addTime(timestampQuery3, ''),
              },
            },
            {
              property:
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
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
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
              date: {
                on_or_after: addTime(timestampQuery3, ''),
              },
            },
            {
              property:
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
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
    _map(items3.results, (item) => (items3Data[item.id] = normalizerContent(item)))
    const items3Omit = _omit(items3, 'results')
    // @ts-ignore
    items3Omit.results = items3Data
    // eslint-disable-next-line prefer-const
    items = _omit(items3Omit, 'data')
    /***
     * @hack
     */
    return {
      content,
      info,
      items,
    }
  }
  3(props) {
    return this.getByListingWithDate(props)
  }

  // @todo(complexity) 15
  // eslint-disable-next-line complexity
  async ['getBySlugWithRouteType']({ meta, routeType, slug }) {
    let content = null,
      info = null,
      items = null
    const dateTimestamp = new Date().toISOString()

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
        `${!!year ? year : dateTimestamp.slice(0, 4)}-${!!month ? month : '01'}-${
          !!day ? day : '01'
        }`
      )
      const info4__be: any = await getDatabasesByIdQuery({
        databaseId: DATABASES[routeType],
        filter: {
          and: [
            {
              property:
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
              date: {
                on_or_after: addTime(timestampQuery, ''),
              },
            },
            {
              property:
                routeType === 'events' ? PROPERTIES.date : PROPERTIES.datePublished,
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
    return {
      content,
      info,
      items,
    }
  }
  4(props) {
    return this.getBySlugWithRouteType(props)
  }
}

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
}) => {
  // console.dir(`> getCatchAll`)
  // console.dir(catchAll)
  const isCache = useCache && cache
  const { dataType, meta, routeType, slug } = getPathVariables(catchAll)

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

    // console.dir(`routeType: ${routeType}`)
    // console.dir(`dataType: ${dataType}`)
    // console.dir(`slug: ${slug}`)
    /**
     * @info
     * used for seo information and immediate display above the fold
     */
    // const dateTimestamp = new Date().toISOString()
    // // @todo(date-fns) make this the first date of the year dynamically
    // const dateTimestampBlog = new Date('2020-01-01').toISOString()

    // const contentChildren = []

    const getDATATYPES = new DATA_TYPES('')
    if (getDATATYPES[dataType]) {
      const DATATYPE_DATA = await getDATATYPES[dataType]({ meta, routeType, slug })
      content = DATATYPE_DATA?.content || null
      info = DATATYPE_DATA?.info || null
      items = DATATYPE_DATA?.items || null
    }

    if (!!items) {
      items.results = _filter(items.results, { data: { published: true } })
    }

    data = { info, content, items }
    // console.dir(`data`)
    // console.dir(data)
    // console.dir(`pathVariables`)
    // console.dir(pathVariables)
    const images = !!data ? await getImages({ data, pathVariables }) : {}
    // console.dir(`images`)
    // console.dir(images)
    data = { ...data, images }

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
