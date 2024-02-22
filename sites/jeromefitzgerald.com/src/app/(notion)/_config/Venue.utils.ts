import { getPropertyTypeData } from 'next-notion/utils/index'

import type { PropertiesVenue } from '@/app/(notion)/_config/index'

function getPropertyTypeDataVenue(properties, property: keyof PropertiesVenue) {
  return getPropertyTypeData(properties, property)
}

export { getPropertyTypeDataVenue }
