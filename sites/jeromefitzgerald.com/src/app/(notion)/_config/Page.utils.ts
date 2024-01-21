import { getPropertyTypeData } from 'next-notion/utils'

import type { PropertiesPage } from '~app/(notion)/_config'

// @todo(types)
function getPropertyTypeDataPage(properties, property: keyof PropertiesPage) {
  return getPropertyTypeData(properties, property)
}
// @todo(types)
function getPageData(properties): any {
  /**
   * @hack(notion) Depending on how this is queried this may not be a "real" page?
   */
  if (!properties) return {}

  const data = {
    href: getPropertyTypeDataPage(properties, 'Slug.Preview'),
    id: getPropertyTypeDataPage(properties, 'ID'),
    title: getPropertyTypeDataPage(properties, 'Title'),
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataPage(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataPage(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataPage(properties, 'Is.Published'),
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataPage(properties, 'SEO.Description'),
    seoKeywords: getPropertyTypeDataPage(properties, 'SEO.Keywords'),
    seoImageDescription: getPropertyTypeDataPage(
      properties,
      'SEO.Image.Description',
    ),
    seoImage: getPropertyTypeDataPage(properties, 'SEO.Image')[0],
    /**
     * Tag Information
     */
    tags: [],
    /**
     * Testing
     */
    selectTest: getPropertyTypeDataPage(properties, 'Select.Test'),
  }
  return data
}

export { getPageData, getPropertyTypeDataPage }
