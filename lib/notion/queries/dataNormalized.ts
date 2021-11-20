import _map from 'lodash/map'

import getTypes from '~lib/notion/api/getTypes'
import { LOOKUP } from '~lib/notion/schema'

const dataNormalized = (data: any, routeType = null, pageId = null) => {
  const DATA_NORMALIZED = {}
  if (!data?.properties) return DATA_NORMALIZED

  const { properties } = data

  _map(LOOKUP[routeType.toUpperCase()], (item) => {
    let dataToNormalize = null

    const dataFromNotion = properties[item.notion]

    /**
     * @note(notion)
     * ensure data from cms exists before normalizing
     */
    if (!!dataFromNotion) {
      dataToNormalize = getTypes[item.type](dataFromNotion, pageId)
    }

    DATA_NORMALIZED[item.key] = dataToNormalize
  })

  return DATA_NORMALIZED
}

export default dataNormalized
