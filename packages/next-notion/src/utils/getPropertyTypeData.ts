/**
 * @todo(notion) getFormulaData
 */
import 'server-only'

import type {
  CheckboxPropertyItemObjectResponse,
  DatePropertyItemObjectResponse,
  FilesPropertyItemObjectResponse,
  // FormulaPropertyItemObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  NumberPropertyItemObjectResponse,
  RelationPropertyItemObjectResponse,
  RichTextItemResponse,
  // RichTextPropertyItemObjectResponse,
  // RollupPropertyItemObjectResponse,
  // SelectPropertyItemObjectResponse,
  // TitlePropertyItemObjectResponse,
  UrlPropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'

import type {
  DateResponse,
  EmptyObject,
  RollupFunction,
  SelectPropertyResponse,
} from '../Notion.types'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import { isObjectEmpty } from '@jeromefitz/utils'

import _orderBy from 'lodash/orderBy.js'

interface CheckboxData {
  checkbox: boolean
  id: string
  type: 'checkbox'
}
interface DateData {
  date: DateResponse | null
  id: string
  type: 'date'
}

interface FilesData {
  id: string
  type: 'url'
  url: null | string
}
interface MultiSelectData {
  id: string
  multi_select: SelectPropertyResponse[]
  type: 'multi_select'
}

interface NumberData {
  id: string
  number: null | number
  type: 'number'
}
interface RelationData {
  has_more?: boolean
  id: string
  relation: {
    id: string
  }[]
  type: 'relation'
}

interface RichTextData {
  has_more?: boolean
  id: string
  relation: {
    id: string
  }[]
  type: 'relation'
}

interface RollupData {
  id: string
  object: 'property_item'
  rollup:
    | {
        array: EmptyObject[]
        function: RollupFunction
        type: 'array'
      }
    | {
        date: DateResponse | null
        function: RollupFunction
        type: 'date'
      }
    | {
        function: RollupFunction
        incomplete: EmptyObject
        type: 'incomplete'
      }
    | {
        function: RollupFunction
        number: null | number
        type: 'number'
      }
    | {
        function: RollupFunction
        type: 'unsupported'
        unsupported: EmptyObject
      }
  type: 'rollup'
}
interface SelectData {
  id: string
  select: null | SelectPropertyResponse
  type: 'select'
}

interface TitleData {
  id: string
  title: RichTextItemResponse[]
  type: 'title'
}
interface UrlData {
  id: string
  type: 'url'
  url: null | string
}

function getCheckboxData({ data, type }: { data: CheckboxData; type: string }) {
  // properties['Is.Published']
  const typeData = data[type]
  const dataReturn: CheckboxPropertyItemObjectResponse = typeData
  return dataReturn
}
function getDateData({ data, type }: { data: DateData; type: string }) {
  // properties['Date.XYZ']
  const typeData = data[type]
  // @note(notion) this returns DateResponse...
  const dataReturn: DatePropertyItemObjectResponse = typeData
  // { end: null, start: '2016-04-26', time_zone: null }
  return dataReturn
}

function getFilesData({ data, type }: { data: FilesData; type: string }) {
  // properties['SEO.Image']
  const typeData = data[type]
  const dataReturn: FilesPropertyItemObjectResponse = typeData
  return dataReturn
}
// @todo(types)
function getFormulaData({ data, type }: { data: any; type: string }) {
  // // properties['Slug.Preview']
  // // properties['Slug.Preview'].formula.string
  const typeData = data[type]
  const dataReturn: any = typeData

  /**
   * @question(notion) is there any other type of return?
   */
  if (dataReturn.type === 'number' || dataReturn.type === 'string') {
    return dataReturn[dataReturn.type]
  }

  console.dir(
    `[info] getFormulaData return is not a number|string: ${dataReturn.type}`,
  )
  return dataReturn[dataReturn.type]
}

function getMultiSelectData({
  data,
  type,
}: {
  data: MultiSelectData
  type: string
}) {
  // properties['Tags']
  const typeData = data[type]
  const dataReturn: MultiSelectPropertyItemObjectResponse = typeData
  return dataReturn
}
function getNumberData({ data, type }: { data: NumberData; type: string }) {
  // properties['Address.PostalCode']
  const typeData = data[type]
  const dataReturn: NumberPropertyItemObjectResponse = typeData
  return dataReturn
}

// @todo(types)
function getPropertyTypeData(properties, property) {
  // null
  if (!properties) return null
  const type = properties[property]?.type
  if (!type) return null
  const data = properties[property]

  // // @debug
  // console.dir(`[utils]       getPropertyTypeData`)
  // console.dir(`type:         ${type}`)

  /**
   * @todo(switch) move away from switch eventually
   *
   */
  switch (type) {
    case 'checkbox':
      return getCheckboxData({ data, type })
    case 'date':
      return getDateData({ data, type })
    case 'files':
      return getFilesData({ data, type })
    case 'formula':
      return getFormulaData({ data, type })
    case 'multi_select':
      return getMultiSelectData({ data, type })
    case 'number':
      return getNumberData({ data, type })
    case 'relation':
      return getRelationData({ data, type })
    case 'rich_text':
      return getRichTextData({ data, type })
    case 'rollup':
      return getRollupData({ data, type })
    case 'select':
      return getSelectData({ data, type })
    case 'title':
      return getTitleData({ data, type })
    case 'url':
      return getUrlData({ data, type })
    default:
      break
  }

  /**
   * @todo(notion) debug + callout
   */
  const typeData = properties[property][type]
  const typeDataType = typeData?.type

  if (env.IS_DEV) {
    console.dir(`> debug:        getPropertyTypeData`)
    console.dir(`> type:         ${type}`)
    // console.dir(`> properties:`)
    // console.dir(properties)
    console.dir(`> typeDataType: ${typeDataType}`)
    // console.dir(`> typeData:`)
    // console.dir(typeData)
  }

  const returnData = { [typeDataType]: typeData[typeDataType] }
  return returnData
}
function getRelationData({ data, type }: { data: RelationData; type: string }) {
  // properties['Relation.Shows.Cast']
  const typeData = data[type]
  const dataReturn: RelationPropertyItemObjectResponse[] = typeData
  return dataReturn
}

function getRichTextData({ data, type }: { data: RichTextData; type: string }) {
  // properties['SEO.Description']
  const typeData = data[type]
  // @todo(notion) proper fallback -- should probably warn here
  // const dataReturn: RichTextPropertyItemObjectResponse[] = typeData
  const dataReturn = typeData[0]?.plain_text ?? ''

  // // @debug
  // console.dir(`type: ${type}`)
  // console.dir(typeData)
  // console.dir(dataReturn)
  // console.dir(`----`)

  return dataReturn
}
function getRollupData({ data, type }: { data: RollupData; type: string }) {
  // properties['Rollup.People.Cast.Title']
  const typeData = data[type]
  let dataReturn: any = typeData

  /**
   * @hack(notion) this is where you lose me on ever wanting to do any of this
   */
  if (dataReturn.type === 'array' || dataReturn.type === 'multi_select') {
    dataReturn = dataReturn[dataReturn.type]

    if (!isObjectEmpty(dataReturn)) {
      const tempData: any = []
      // @todo(complexity) 16
      // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migrate
      dataReturn.map((item) => {
        // console.dir(`[info] getRollupData !isObjectEmpty: ${item.type}`)
        if (item.type === 'multi_select') {
          dataReturn = getMultiSelectData({ data: item, type: item.type })
        }
        if (item.type === 'rich_text') {
          dataReturn = getRichTextData({ data: item, type: item.type })
          tempData.push(dataReturn)
        }
        if (item.type === 'title') {
          dataReturn = getTitleData({ data: item, type: item.type })
          tempData.push(dataReturn)
        }
        if (item.type === 'relation') {
          // console.dir(`[info] relation (dataReturn)`)
          // console.dir(dataReturn)
          // console.dir(`[info] relation (item)`)
          // console.dir(item)
          dataReturn = getRelationData({ data: item, type: item.type })
          tempData.push(dataReturn)
        }
      })
      if (!isObjectEmpty(tempData)) {
        dataReturn = _orderBy(tempData)
      }
    }

    return dataReturn
  }

  console.dir(
    `[info] getRollupData return is not a array|multi_select: ${dataReturn.type}`,
  )
  dataReturn = dataReturn[dataReturn.type]

  return dataReturn
}

function getSelectData({ data, type }: { data: SelectData; type: string }) {
  // properties['Select.Test']
  const typeData = data[type]
  const dataReturn: SelectPropertyResponse = typeData
  return dataReturn
}
function getTitleData({ data, type }: { data: TitleData; type: string }) {
  // properties['Title']
  const typeData = data[type]
  // const dataReturn: TitlePropertyItemObjectResponse[] = typeData
  const dataReturn = typeData[0]?.plain_text ?? ''
  return dataReturn
}

function getUrlData({ data, type }: { data: UrlData; type: string }) {
  // properties['URL.Ticket']
  const typeData = data[type]
  const dataReturn: UrlPropertyItemObjectResponse[] = typeData
  return dataReturn
}

export { getPropertyTypeData }
