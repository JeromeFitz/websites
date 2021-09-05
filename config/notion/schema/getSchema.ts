import _find from 'lodash/find'
import _findKey from 'lodash/findKey'
import _map from 'lodash/map'
import _merge from 'lodash/merge'

import { routeTypes } from '~config/notion/website'

import schema from './index'

const getSchemaKey = (item) => {
  return _findKey(schema, { name: item })
}

const getSchemaItem = (item) => {
  const key = getSchemaKey(item)
  const value = _find(schema, { name: item })
  return {
    [key]: value,
  }
}

const getSchemaSlug = (item = 'Slug') => {
  return getSchemaItem(item)
}

/**
 * @note lol, this is really the most worthless one right?
 */
const getSchemaCollectionViewId = (
  routeType,
  collectionIdSlug = 'collectionViewId__published'
) => {
  return routeType['collectionViewIds'][collectionIdSlug]
}

// @todo any
const getSchema = (items): any => {
  const schema = {}
  // console.dir(`! getSchema`)
  // console.dir(`! > items`)
  // console.dir(items)
  _map(items, (item) => {
    // console.dir(`! ! > item`)
    // console.dir(item)
    return !!item && _merge(schema, getSchemaItem(item))
  })
  // // console.dir(`! > data`)
  // // console.dir(data)
  // console.dir(`! > schema`)
  // console.dir(schema)
  return schema
}

async function getSchemaCollectionId(routeType: string) {
  // console.dir(`getSchemaCollectionId`)
  // console.dir(`routeType: ${routeType}`)
  // console.dir(routeTypes)
  const data = await routeTypes[routeType].collectionId
  // console.dir(data)
  return data
}

export {
  getSchemaCollectionId,
  getSchemaCollectionViewId,
  getSchemaItem,
  getSchemaKey,
  getSchemaSlug,
}
export default getSchema
