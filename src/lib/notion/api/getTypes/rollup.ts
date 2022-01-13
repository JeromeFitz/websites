import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'

import getTypes from '@jeromefitz/notion/api/getTypes'

const rollup = (data: any) => {
  return _sortBy(_map(data?.rollup?.array, (item) => getTypes[item.type](item)))
}

export default rollup
