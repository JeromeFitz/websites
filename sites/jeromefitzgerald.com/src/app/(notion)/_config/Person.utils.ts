import { getPropertyTypeData } from 'next-notion/utils'

import type { PropertiesPerson } from '~app/(notion)/_config'

function getPropertyTypeDataPerson(properties, property: keyof PropertiesPerson) {
  return getPropertyTypeData(properties, property)
}
function getPersonData(properties) {
  // if (!properties) return {}
  const data = {
    href: getPropertyTypeDataPerson(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPerson(properties, 'ID'),
    isActive: getPropertyTypeDataPerson(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPerson(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPerson(properties, 'Is.Published'),
    tags: [],
    title: getPropertyTypeDataPerson(properties, 'Title'),
  }
  return data
}

export { getPersonData, getPropertyTypeDataPerson }
