import type { PropertiesVenue } from '~app/(notion)/(config)/segments'
import { getPropertyTypeData } from '~app/(notion)/(config)/utils'

function getPropertyTypeDataVenue(properties, property: keyof PropertiesVenue) {
  return getPropertyTypeData(properties, property)
}

export { getPropertyTypeDataVenue }
