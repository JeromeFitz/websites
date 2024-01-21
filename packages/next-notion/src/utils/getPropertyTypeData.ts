import 'server-only'
/**
 * @todo(notion) getFormulaData
 */
import { isObjectEmpty } from '@jeromefitz/utils'
import type {
  CheckboxPropertyItemObjectResponse,
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
import _orderBy from 'lodash/orderBy.js'

import type {
  DateResponse,
  EmptyObject,
  RollupFunction,
  SelectPropertyResponse,
} from '../Notion.types'

type CheckboxData = {
  type: 'checkbox'
  checkbox: boolean
  id: string
}
function getCheckboxData({ data, type }: { data: CheckboxData; type: string }) {
  // properties['Is.Published']
  const typeData = data[type]
  const dataReturn: CheckboxPropertyItemObjectResponse = typeData
  return dataReturn
}

type FilesData = {
  type: 'url'
  url: string | null
  id: string
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

type MultiSelectData = {
  type: 'multi_select'
  multi_select: Array<SelectPropertyResponse>
  id: string
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

type NumberData = {
  type: 'number'
  number: number | null
  id: string
}
function getNumberData({ data, type }: { data: NumberData; type: string }) {
  // properties['Address.PostalCode']
  const typeData = data[type]
  const dataReturn: NumberPropertyItemObjectResponse = typeData
  return dataReturn
}

type RelationData = {
  type: 'relation'
  relation: Array<{
    id: string
  }>
  id: string
  has_more?: boolean
}
function getRelationData({ data, type }: { data: RelationData; type: string }) {
  // properties['Relation.Shows.Cast']
  const typeData = data[type]
  const dataReturn: RelationPropertyItemObjectResponse[] = typeData
  return dataReturn
}

type RichTextData = {
  type: 'relation'
  relation: Array<{
    id: string
  }>
  id: string
  has_more?: boolean
}
function getRichTextData({ data, type }: { data: RichTextData; type: string }) {
  // properties['SEO.Description']
  const typeData = data[type]
  // @todo(notion) proper fallback -- should probably warn here
  // const dataReturn: RichTextPropertyItemObjectResponse[] = typeData
  const dataReturn = typeData[0]?.plain_text ?? ''
  return dataReturn
}

type RollupData = {
  type: 'rollup'
  rollup:
    | {
        type: 'number'
        number: number | null
        function: RollupFunction
      }
    | {
        type: 'date'
        date: DateResponse | null
        function: RollupFunction
      }
    | {
        type: 'array'
        array: Array<EmptyObject>
        function: RollupFunction
      }
    | {
        type: 'unsupported'
        unsupported: EmptyObject
        function: RollupFunction
      }
    | {
        type: 'incomplete'
        incomplete: EmptyObject
        function: RollupFunction
      }
  object: 'property_item'
  id: string
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

type SelectData = {
  type: 'select'
  select: SelectPropertyResponse | null
  id: string
}
function getSelectData({ data, type }: { data: SelectData; type: string }) {
  // properties['Select.Test']
  const typeData = data[type]
  const dataReturn: SelectPropertyResponse = typeData
  return dataReturn
}

type TitleData = {
  type: 'title'
  title: Array<RichTextItemResponse>
  id: string
}
function getTitleData({ data, type }: { data: TitleData; type: string }) {
  // properties['Title']
  const typeData = data[type]
  // const dataReturn: TitlePropertyItemObjectResponse[] = typeData
  const dataReturn = typeData[0]?.plain_text ?? ''
  return dataReturn
}

type UrlData = {
  type: 'url'
  url: string | null
  id: string
}
function getUrlData({ data, type }: { data: UrlData; type: string }) {
  // properties['URL.Ticket']
  const typeData = data[type]
  const dataReturn: UrlPropertyItemObjectResponse[] = typeData
  return dataReturn
}

// @todo(complexity) 13
// @todo(types)
// eslint-disable-next-line complexity
function getPropertyTypeData(properties, property) {
  null
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
  console.dir(`> debug:        getPropertyTypeData`)
  console.dir(`> type:         ${type}`)
  // console.dir(`> properties:`)
  // console.dir(properties)
  console.dir(`> typeDataType: ${typeDataType}`)
  // console.dir(`> typeData:`)
  // console.dir(typeData)
  const returnData = { [typeDataType]: typeData[typeDataType] }
  return returnData
}

export { getPropertyTypeData }
