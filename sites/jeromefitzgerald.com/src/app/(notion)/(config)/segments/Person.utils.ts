import type { PropertiesPerson } from '~app/(notion)/(config)/segments'
import { getPropertyTypeData } from '~app/(notion)/(config)/utils'

function getPropertyTypeDataPerson(properties, property: keyof PropertiesPerson) {
  return getPropertyTypeData(properties, property)
}
function getPersonData(properties) {
  // if (!properties) return {}
  const data = {
    href: getPropertyTypeDataPerson(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPerson(properties, 'ID'),
    title: getPropertyTypeDataPerson(properties, 'Title'),
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPerson(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPerson(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPerson(properties, 'Is.Published'),
    /**
     * Tag Information
     */
    tags: [],
  }
  return data
}

export { getPersonData, getPropertyTypeDataPerson }
