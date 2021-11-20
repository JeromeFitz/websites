import _find from 'lodash/find'
import _startsWith from 'lodash/startsWith'
import _title from 'title'

import getTypes from '~lib/notion/api/getTypes'
import { PROPERTIES } from '~lib/notion/schema'

const dataNormalized = (data: any, routeType = null, pageId = null) => {
  if (routeType === null) {
    console.dir(`dataNormalized(routeType is null)`)
  }
  if (pageId === null) {
    console.dir(`dataNormalized(pageId is null)`)
  }

  const { properties } = data

  const KEYS = Object.keys(properties)
  const DATA = {}

  KEYS.map((key) => {
    const found = _find(PROPERTIES, { notion: key })
    if (!found) {
      return
    }

    /**
     * @hack limit possible relations
     */
    if (_startsWith(found.key, 'relation')) {
      if (
        !_startsWith(
          found.key.toUpperCase(),
          `relation${_title(routeType)}__`.toUpperCase()
        )
      )
        return
    }
    /**
     * @hack limit possible rollups
     */
    if (_startsWith(found.key, 'rollup')) {
      if (
        !_startsWith(
          found.key.toUpperCase(),
          `rollup${_title(routeType)}__`.toUpperCase()
        )
      )
        return
    }

    const _data = getTypes[found.type](properties[key], pageId)

    DATA[found.key] = _data
  })

  return DATA
}

export default dataNormalized
