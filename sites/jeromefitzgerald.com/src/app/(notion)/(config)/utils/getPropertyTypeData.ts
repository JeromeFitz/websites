import 'server-only'
/**
 * @todo(notion) getFormulaData
 */
// import { isObjectEmpty } from '@jeromefitz/utils'
import type {
  CheckboxPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import _merge from 'lodash/merge'
import _size from 'lodash/size'
import _uniq from 'lodash/uniq'

import type {
  PropertiesEvent,
  PropertiesPerson,
  PropertiesShow,
  PropertiesVenue,
} from '~app/(notion)/(config)/types'

// function getCalloutData(){}
// function getCheckboxData(){}
// function getChildPageData(){}
// function getFormulaData(){}
// function getImageData(){}
// function getMultiSelectData(){}
// function getRelationData(){}
// function getRollupData(){}
// function getRichTextData(){} // @note(notion) formerly TextAnnotations
// function getSelectData(){}
// function getQuoteData(){}

// @todo(complexity) 12
// @todo(types)
// eslint-disable-next-line complexity
function getPropertyTypeData(properties, property) {
  null
  if (!properties) return null
  const type = properties[property]?.type
  if (!type) return null
  const typeData = properties[property][type]

  const typeDataType = typeData?.type
  // let typeDataData

  // // @debug
  // console.dir(`[utils]       getPropertyTypeData`)
  // console.dir(`type:         ${type}`)
  // console.dir(typeData)
  // console.dir(`typeDataType: ${typeDataType}`)

  // if (typeDataType === 'formula') {
  //   // properties['Slug.Preview'].formula.string
  //   typeDataData = typeData[typeDataType]
  // }
  if (type === 'relation') {
    // properties['Relation.Shows.Producer']
    const returnData: RelationPropertyItemObjectResponse = typeData
    return returnData
  }
  // if (typeDataType === 'select') {
  //   // properties['Pronouns'].select
  //   // const returnData = { [typeDataType]: typeDataData }
  //   return typeDataType?.name
  // }
  if (type === 'checkbox') {
    // properties['Is.Published']
    const returnData: CheckboxPropertyItemObjectResponse = typeData
    return returnData
  }
  if (type === 'files') {
    // properties['SEO.Image']
    // console.dir(`> files`)
    // console.dir(typeData)
    const returnData: any = typeData
    return returnData
  }
  if (type === 'multi_select') {
    // properties['Tags'].multi_select
    // const returnData = { [typeDataType]: typeDataData }
    const returnData: any = typeData
    return returnData
  }
  if (type === 'number') {
    // properties['Address.PostalCode']
    const returnData: NumberPropertyItemObjectResponse = typeData
    return returnData
  }
  if (type === 'rich_text') {
    // properties['SEO.Description']
    const returnData: RichTextPropertyItemObjectResponse = typeData
    return returnData
  }
  if (type === 'title') {
    // properties['Title']
    const returnData: TitlePropertyItemObjectResponse = typeData
    return returnData
  }
  if (type === 'url') {
    // properties['URL.Ticket']
    const returnData: UrlPropertyItemObjectResponse = typeData
    return returnData
  }
  /**
   * @note(notion) i think this is wrong, why do we go away from `type`?
   */
  if (typeDataType === 'string') {
    const returnData = typeData[typeDataType]
    return returnData
  }
  // if (typeDataType === 'number') {
  //   const returnData = typeData[typeDataType]
  //   return returnData
  // }

  // // @debug
  // console.dir(`[utils]       getPropertyTypeData`)
  // console.dir(`type:         ${type}`)
  // console.dir(typeData)
  // console.dir(`typeDataType: ${typeDataType}`)
  // // console.dir(`> debug: getPropertyTypeData`)
  // // console.dir(properties)
  // // console.dir(property)
  // // console.dir(typeData)
  // // console.dir(typeDataType)
  const returnData = { [typeDataType]: typeData[typeDataType] }
  return returnData
}

/**
 * @todo(typescript) Instead of this hack pass-through functions
 *  are there ways to do this all at once through extraction?
 */
function getPropertyTypeDataEvent(properties, property: keyof PropertiesEvent) {
  return getPropertyTypeData(properties, property)
}
function getEventData(properties) {
  // if (!properties) return {}
  /**
   * @todo(notion) little more convulted than I thought here for Override.Slug
   *
   * Considering we need to _query_ Notion we need to know that, heh.
   * So ... just keep as `Slug.Preview` as the check now.
   */
  // const overrideSlug = getPropertyTypeDataEvent(properties, 'Override.Slug')
  // const overideTags = getPropertyTypeDataEvent(properties, 'Override.Tags')
  const overrideTitle = getPropertyTypeDataEvent(properties, 'Override.Title')

  // const tags = []
  const tagsPrimary: any[] =
    properties['Rollup.Shows.Primary.Tags']?.rollup?.array[0]?.multi_select || []
  const tagsSecondary: any[] =
    properties['Rollup.Shows.Supporting.Tags']?.rollup?.array[0]?.multi_select || []
  const tags = _uniq(_merge(tagsPrimary, tagsSecondary))

  let venueTitle = getPropertyTypeDataEvent(properties, 'Rollup.Venues.Title')
  venueTitle = !!venueTitle ? venueTitle?.array[0]?.title[0]?.plain_text : null

  let title = getPropertyTypeDataEvent(properties, 'Title')[0]?.plain_text
  const titleFromPrimary = getPropertyTypeDataEvent(
    properties,
    'Rollup.Shows.Primary.Title'
  )

  const hasTitleFromPrimary = _size(titleFromPrimary) > 0
  title = overrideTitle
    ? title
    : hasTitleFromPrimary
    ? titleFromPrimary?.array[0]?.title[0]?.plain_text
    : title

  const daysUntilEvent = getPropertyTypeDataEvent(
    properties,
    'Date.DaysUntilEvent'
  )?.number
  const hoursUntilEvent = getPropertyTypeDataEvent(
    properties,
    'Date.HoursUntilEvent'
  )?.number
  const isEventOver = hoursUntilEvent < 0

  const data = {
    href: getPropertyTypeDataEvent(properties, 'Slug.Preview'),
    id: getPropertyTypeDataEvent(properties, 'ID'),
    title,
    /**
     * Date Information
     */
    dateIso: getPropertyTypeDataEvent(properties, 'Date.ISO'),
    dayOfMonth: getPropertyTypeDataEvent(properties, 'Date.DayOfMonth'),
    dayOfMonthOrdinal: getPropertyTypeDataEvent(
      properties,
      'Date.DayOfMonthOrdinal'
    ),
    dayOfWeek: getPropertyTypeDataEvent(properties, 'Date.DayOfWeek'),
    dayOfWeekAbbr: getPropertyTypeDataEvent(properties, 'Date.DayOfWeekAbbr'),
    month: getPropertyTypeDataEvent(properties, 'Date.Month'),
    monthName: getPropertyTypeDataEvent(properties, 'Date.MonthName'),
    monthNameAbbr: getPropertyTypeDataEvent(properties, 'Date.MonthNameAbbr'),
    time: getPropertyTypeDataEvent(properties, 'Date.Time'),
    timezone: getPropertyTypeDataEvent(properties, 'Date.Timezone'),
    year: getPropertyTypeDataEvent(properties, 'Date.Year'),
    //
    daysUntilEvent,
    hoursUntilEvent,
    isEventOver,
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPerson(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPerson(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPerson(properties, 'Is.Published'),
    /**
     * Show Information
     */
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataEvent(properties, 'SEO.Description')[0]
      ?.plain_text,
    seoKeywords: getPropertyTypeDataEvent(properties, 'SEO.Keywords')[0]?.plain_text,
    seoImageDescription: getPropertyTypeDataEvent(
      properties,
      'SEO.Image.Description'
    )[0]?.plain_text,
    seoImage: getPropertyTypeDataEvent(properties, 'SEO.Image')[0],
    /**
     * Tag Information
     */
    tags,
    /**
     * Ticket Information
     */
    ticketUrl: getPropertyTypeDataEvent(properties, 'URL.Ticket'),
    /**
     * Venue Information
     */
    venueTitle,
    venues: getPropertyTypeDataEvent(properties, 'Relation.Venues'),
  }
  return data
}

// @todo(types)
function getPropertyTypeDataPage(properties, property) {
  return getPropertyTypeData(properties, property)
}
// @todo(types)
function getPageData(properties): any {
  /**
   * @hack(notion) Depending on how this is queried this may not be a "real" page?
   */
  if (!properties) return {}

  const data = {
    href: getPropertyTypeDataPage(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPage(properties, 'ID'),
    title: getPropertyTypeDataPage(properties, 'Title')[0]?.plain_text || '',
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPage(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPage(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPage(properties, 'Is.Published'),
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataShow(properties, 'SEO.Description')[0]
      ?.plain_text,
    seoKeywords: getPropertyTypeDataShow(properties, 'SEO.Keywords')[0]?.plain_text,
    seoImageDescription: getPropertyTypeDataShow(
      properties,
      'SEO.Image.Description'
    )[0]?.plain_text,
    seoImage: getPropertyTypeDataShow(properties, 'SEO.Image')[0],
    /**
     * Tag Information
     */
    tags: [],
  }
  return data
}

function getPropertyTypeDataPerson(properties, property: keyof PropertiesPerson) {
  return getPropertyTypeData(properties, property)
}
function getPersonData(properties) {
  // if (!properties) return {}
  const data = {
    href: getPropertyTypeDataPerson(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPerson(properties, 'ID'),
    title: getPropertyTypeDataPerson(properties, 'Title')[0]?.plain_text,
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPerson(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPerson(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPerson(properties, 'Is.Published'),
    /**
     * Tag Information
     */
    tags: [],
  }
  return data
}

function getPropertyTypeDataShow(properties, property: keyof PropertiesShow) {
  return getPropertyTypeData(properties, property)
}
function getShowData(properties) {
  // if (!properties) return {}
  const data = {
    href: getPropertyTypeDataShow(properties, 'Slug.Preview'),
    id: getPropertyTypeDataShow(properties, 'ID'),
    title: getPropertyTypeDataShow(properties, 'Title')[0]?.plain_text,
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPerson(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPerson(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPerson(properties, 'Is.Published'),
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataShow(properties, 'SEO.Description')[0]
      ?.plain_text,
    seoKeywords: getPropertyTypeDataShow(properties, 'SEO.Keywords')[0]?.plain_text,
    seoImageDescription: getPropertyTypeDataShow(
      properties,
      'SEO.Image.Description'
    )[0]?.plain_text,
    seoImage: getPropertyTypeDataShow(properties, 'SEO.Image')[0],
    /**
     * Tag Information
     */
    tags: getPropertyTypeDataShow(properties, 'Tags'),
  }
  return data
}

function getPropertyTypeDataVenue(properties, property: keyof PropertiesVenue) {
  return getPropertyTypeData(properties, property)
}

export {
  getEventData,
  getPageData,
  getPersonData,
  getShowData,
  getPropertyTypeData,
  getPropertyTypeDataEvent,
  getPropertyTypeDataPage,
  getPropertyTypeDataPerson,
  getPropertyTypeDataShow,
  getPropertyTypeDataVenue,
}
