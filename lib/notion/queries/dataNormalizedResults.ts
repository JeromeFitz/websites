import _map from 'lodash/map'
import _omit from 'lodash/omit'

import dataNormalized from '~lib/notion/queries/dataNormalized'
import dataSorted from '~lib/notion/queries/dataSorted'

const dataNormalizedResults = (results, routeType) => {
  const normalizedResults = []
  _map(results, (result) => {
    const normalizedResult = _omit(result, 'properties')
    normalizedResult['properties'] = dataSorted(
      dataNormalized(result, routeType, result?.id)
    )
    normalizedResults.push(normalizedResult)
  })
  return normalizedResults
}

export default dataNormalizedResults
