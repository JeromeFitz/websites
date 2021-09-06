import {
  CheckboxPropertyValue,
  DatePropertyValue,
  FilesPropertyValue,
  MultiSelectPropertyValue,
  NumberPropertyValue,
  PhoneNumberPropertyValue,
  RelationProperty,
  RichTextPropertyValue,
  SelectPropertyValue,
  TitlePropertyValue,
  URLPropertyValue,
} from '@notionhq/client/build/src/api-types'
import Slugger from 'github-slugger'
import _ from 'lodash'
import _drop from 'lodash/drop'
import _dropRight from 'lodash/dropRight'
import _first from 'lodash/first'
import _includes from 'lodash/includes'
import _isInteger from 'lodash/isInteger'
import _last from 'lodash/last'
import _map from 'lodash/map'
import _omit from 'lodash/omit'
// import _pick from 'lodash/pick'
import _size from 'lodash/size'
import { NextApiRequest, NextApiResponse } from 'next'

import { routeTypes } from 'zzz/config/notion/website'

// import getSearch from '~lib/notion/api/getSearch'
import getBlocksByIdChildren from '~lib/notion/api/getBlocksByIdChildren'
import getDatabasesByIdQuery from '~lib/notion/api/getDatabasesByIdQuery'
import getPagesById from '~lib/notion/api/getPagesById'
import { DATABASES, SEO, QUERIES, PROPERTIES } from '~utils/notion/helper'

const slugger = new Slugger()

// @note(notion) need to set keys of objects that will get specific subkeys
const dataInitial = {
  address: {},
  name: {},
  social: {},
}

const routeTypesArray = [
  'blog',
  'episodes',
  'events',
  'pages',
  'people',
  'podcasts',
  'seo',
  'shows',
  'users',
  'venues',
]

const getPathVariables = (catchAll: any) => {
  const size: number = _size(catchAll)
  const first: string = _first(catchAll)
  const last: string = _last(catchAll)

  return {
    meta:
      size > 1 && _includes(['podcasts', 'events'], first)
        ? _drop(catchAll)
        : _drop(_dropRight(catchAll)),
    routeType:
      first === last && !_includes(routeTypesArray, first) ? 'pages' : first,
    slug: first !== last && !_isInteger(parseInt(last)) ? last : false,
  }
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
  categories?: any[]
  festivals?: any[]
  tags?: any[]
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
  shows?: string[]
  venues?: string[]
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
  showsPeopleProducer?: string[]
  showsPeopleThanks?: string[]
  showsPeopleWriter?: string[]
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
  slug?: string
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

// const getTypeCheckbox = (data: CheckboxPropertyValue) => data
const getTypeCheckboxNormalized = (data: CheckboxPropertyValue) => data.checkbox

// const getTypeDate = (data: DatePropertyValue) => data
const getTypeDateNormalized = (data: DatePropertyValue) => data.date

// const getTypeFiles = (data: FilesPropertyValue) => data
const getTypeFilesNormalized = (data: FilesPropertyValue) =>
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

const getTypeMultiSelectNormalized = (data: MultiSelectPropertyValue) =>
  _map(data.multi_select, (multiSelect: any) => {
    const ms = multiSelect
    ms.slug = slugger.slug(ms.name)
    return { [ms.id]: ms }
  })

const getTypeNumberNormalized = (data: NumberPropertyValue) => data?.number

const getTypePhoneNumberNormalized = (data: PhoneNumberPropertyValue) =>
  data?.phone_number

// const getTypeRelation = (data: RelationProperty) => data
const getTypeRelationNormalized = (data: RelationProperty) =>
  _map(data.relation, (relation: any) => relation.id)

// const getTypeRichText = (data: RichTextPropertyValue) => data
const getTypeRichTextNormalized = (data: RichTextPropertyValue) =>
  // @todo(zeroArray)
  data?.rich_text[0]?.plain_text

const getTypeSelectNormalized = (data: SelectPropertyValue) => {
  const s: any = data.select
  s.slug = slugger.slug(data.select.name)
  return { [s.id]: s }
}

// const getTypeTitle = (data: TitlePropertyValue) => data
const getTypeTitleNormalized = (data: TitlePropertyValue) =>
  // @todo(zeroArray)
  data?.title[0]?.plain_text

// const getTypeUrl = (data: URLPropertyValue) => data
const getTypeUrlNormalized = (data: URLPropertyValue) => {
  return data.url
}

const normalizerProperties = (properties) => {
  console.dir(`normalizerProperties`)
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
        data.tags = getTypeMultiSelectNormalized(value)
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
      case PROPERTIES.showsPeopleProducer:
        data.showsPeopleProducer = getTypeRelationNormalized(value)
        break
      case PROPERTIES.showsPeopleThanks:
        data.showsPeopleThanks = getTypeRelationNormalized(value)
        break
        break
      case PROPERTIES.showsPeopleWriter:
        data.showsPeopleWriter = getTypeRelationNormalized(value)
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

const normalizer = (data, type) => {
  console.dir(`normalizer`)
  const normalizedData = _omit(data, 'results')
  normalizedData.results = {}
  _map(data?.results, (item) => {
    const itemData = _omit(item, 'properties')
    const itemPropertiesData = normalizerProperties(item?.properties)
    normalizedData.results[item.id] = itemData
    normalizedData.results[item.id].data = itemPropertiesData
    // normalizedData.results[item.id].properties = item?.properties
  })
  return normalizedData
}

const normalizerContent = (data) => {
  console.dir(`normalizerContent`)
  const normalizedData = _omit(data, 'properties')
  normalizedData.data = normalizerProperties(data?.properties)
  console.dir(normalizedData)
  // normalizedData.results = {}
  // _map(data?.results, (item) => {
  //   const itemData = _omit(item, 'properties')
  //   const itemPropertiesData = normalizerProperties(item?.properties)
  //   normalizedData.results[item.id] = itemData
  //   normalizedData.results[item.id].data = itemPropertiesData
  //   // normalizedData.results[item.id].properties = item?.properties
  // })
  return normalizedData
}

const notionSearch = async (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionSearch New`)
  console.dir(`note: this routes data`)
  try {
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = req.query.catchAll

    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    console.dir(`preview`)
    console.dir(preview)
    console.dir(`clear`)
    console.dir(clear)
    console.dir(`catchAll`)
    console.dir(catchAll)
    // const data = await getSearch({ query: 'alex-o-jerome' })
    const { meta, routeType, slug } = getPathVariables(catchAll)
    console.dir(`routeType`)
    console.dir(routeType)
    console.dir(`slug`)
    console.dir(slug)
    console.dir(`meta`)
    console.dir(meta)
    /**
     * @hack
     */
    let info, content, items

    const isPage = routeType === 'pages'
    const isIndex = slug === false
    const hasMeta = !!meta && _size(meta) !== 0

    let dataType
    /**
     * @test cases
     */
    // 1 = /colophon
    // 2 = /events, /podcasts
    // 3 = /events/2020, events/2020/05, events/2020/05/09, podcasts/knockoffs/s01e01--i-know-what-you-did-last-summer
    // 4 = /shows/alex-o-jerome, /events/2020/05/09/jerome-and, podcasts/knockoffs
    if (isPage) {
      dataType = 1
    } else if (isIndex && !hasMeta) {
      dataType = 2
    } else if (hasMeta) {
      dataType = 3
    } else {
      dataType = 4
    }
    console.dir(`!! dataType: ${dataType}`)
    /**
     * @info
     * used for seo information and immediate display above the fold
     */
    let infoData, contentData, itemsData
    switch (dataType) {
      case 1:
        break
      case 2:
        break
      case 3:
        break
      case 4:
      default:
        const temp = await getDatabasesByIdQuery({
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
        console.dir(`temp`)
        console.dir(temp.results[0])
        infoData = temp.object === 'list' && temp.results[0]
        infoData = normalizerContent(temp.results[0])
        info = infoData
        contentData = null
        itemsData = null
        break
    }

    // const infoNormalizer = normalizer(infoData)

    // const infoSize = _size(infoNormalizer.results)
    // let infoStatus
    // if (infoSize <= 0) {
    //   infoStatus = 'error'
    // }
    // if (infoSize === 1) {
    //   infoStatus = 'item'
    // }
    // if (infoSize > 1) {
    //   infoStatus = 'page'
    // }
    // console.dir(`infoNormalizer.object`)
    // console.dir(infoNormalizer.object)
    // console.dir(`infoStatus`)
    // console.dir(infoStatus)
    // console.dir(`infoNormalizer.results`)
    // console.dir(infoNormalizer.results)
    /**
     * @content
     */
    // const contentData = await getPagesById({ pageId: SEO.shows })
    // const contentNormalizer = normalizerContent(contentData)
    // const contentNormalizer = await getBlocksByIdChildren({
    //   blockId: infoNormalizer.results[0].id,
    // })
    // const contentNormalizer = null

    /**
     * @items
     */

    // if (infoNormalizer.object === 'list') {
    //   // info = contentNormalizer
    //   // content = await getBlocksByIdChildren({ blockId: info.id })
    //   // items = infoNormalizer
    //   info = infoNormalizer
    //   content = contentNormalizer
    //   items = null
    // } else {
    //   info = infoNormalizer
    //   content = contentNormalizer
    //   items = null
    // }

    res.status(200).json({ info, content, items })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    })
  }
}

export default notionSearch
