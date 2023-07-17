import { getPropertyTypeData } from 'next-notion/src/utils'

import type { PropertiesVenue } from '../_config'

function getPropertyTypeDataVenue(properties, property: keyof PropertiesVenue) {
  return getPropertyTypeData(properties, property)
}

export { getPropertyTypeDataVenue }
