import { getPropertyTypeData } from 'next-notion/utils'

import type { PropertiesVenue } from '../_config'

function getPropertyTypeDataVenue(properties, property: keyof PropertiesVenue) {
  return getPropertyTypeData(properties, property)
}

export { getPropertyTypeDataVenue }
