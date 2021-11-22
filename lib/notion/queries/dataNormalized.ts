import _map from 'lodash/map'

import getTypes from '~lib/notion/api/getTypes'
import { LOOKUP, PROPERTIES_LOOKUP } from '~lib/notion/schema'

const dataNormalized = (data: any, routeType = null, pageId = null) => {
  const DATA_NORMALIZED = {}
  if (!data?.properties) return DATA_NORMALIZED

  const { properties } = data

  const items = !!routeType ? LOOKUP[routeType.toUpperCase()] : PROPERTIES_LOOKUP
  _map(items, (item) => {
    let dataToNormalize = null

    const dataFromNotion = properties[item.notion]
    /**
     * @note(notion)
     * ensure key populates in api
     * only populate w/ data if exists in notion
     */
    DATA_NORMALIZED[item.key] = null
    if (!!dataFromNotion) {
      dataToNormalize = getTypes[item.type](dataFromNotion, pageId)
      DATA_NORMALIZED[item.key] = !!dataToNormalize ? dataToNormalize : null
    }
  })

  return DATA_NORMALIZED
}

export default dataNormalized
