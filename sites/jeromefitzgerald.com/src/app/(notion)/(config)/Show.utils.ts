import { getPropertyTypeData } from 'next-notion/src/utils'

import type { PropertiesShow } from '~app/(notion)/(config)'

function getPropertyTypeDataShow(properties, property: keyof PropertiesShow) {
  return getPropertyTypeData(properties, property)
}
function getShowData(properties) {
  // if (!properties) return {}
  const data = {
    href: getPropertyTypeDataShow(properties, 'Slug.Preview'),
    id: getPropertyTypeDataShow(properties, 'ID'),
    title: getPropertyTypeDataShow(properties, 'Title'),
    /**
     * Is Information
     */
    isActive: getPropertyTypeDataShow(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataShow(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataShow(properties, 'Is.Published'),
    /**
     * SEO Information
     */
    seoDescription: getPropertyTypeDataShow(properties, 'SEO.Description'),
    seoKeywords: getPropertyTypeDataShow(properties, 'SEO.Keywords'),
    seoImageDescription: getPropertyTypeDataShow(
      properties,
      'SEO.Image.Description'
    ),
    seoImage: getPropertyTypeDataShow(properties, 'SEO.Image')[0],
    /**
     * Tag Information
     */
    tags: getPropertyTypeDataShow(properties, 'Tags'),
    /**
     * Testing
     */
    rollupCastTitles: getPropertyTypeDataShow(
      properties,
      'Rollup.People.Cast.Title'
    ),
    rollupCastSlugs: getPropertyTypeDataShow(properties, 'Rollup.People.Cast.Slug'),
  }
  /**
   * testing
   * @note(notion) there is a way to stich this all together without another db call
   * --> BUT WHY WOULD YOU WANT TO DO THIS?
   */
  // console.dir(`testing`)
  // console.dir(data?.rollupCastTitles)
  // console.dir(data?.rollupCastSlugs)

  return data
}

export { getShowData, getPropertyTypeDataShow }
