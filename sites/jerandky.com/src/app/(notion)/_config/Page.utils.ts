import { getPropertyTypeData } from 'next-notion/utils'

import type { PropertiesPage } from '../_config'

// @todo(types)
function getPageData(properties): any {
  /**
   * @hack(notion) Depending on how this is queried this may not be a "real" page?
   */
  if (!properties) return {}

  const data = {
    href: getPropertyTypeDataPage(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPage(properties, 'ID'),
    isActive: getPropertyTypeDataPage(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPage(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPage(properties, 'Is.Published'),
    selectTest: getPropertyTypeDataPage(properties, 'Select.Test'),
    seoDescription: getPropertyTypeDataPage(properties, 'SEO.Description'),
    seoImage: getPropertyTypeDataPage(properties, 'SEO.Image')[0],
    seoImageDescription: getPropertyTypeDataPage(
      properties,
      'SEO.Image.Description',
    ),
    seoKeywords: getPropertyTypeDataPage(properties, 'SEO.Keywords'),
    tags: [],
    title: getPropertyTypeDataPage(properties, 'Title'),
  }
  return data
}
// @todo(types)
function getPropertyTypeDataPage(properties, property: keyof PropertiesPage) {
  return getPropertyTypeData(properties, property)
}

export { getPageData, getPropertyTypeDataPage }
