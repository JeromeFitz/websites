import { getPropertyTypeData } from 'next-notion/utils'

import type { PropertiesShow } from '@/app/(notion)/_config'

function getPropertyTypeDataShow(properties, property: keyof PropertiesShow) {
  return getPropertyTypeData(properties, property)
}
function getShowData(properties) {
  // if (!properties) return {}
  const data = {
    href: getPropertyTypeDataShow(properties, 'Slug.Preview'),
    id: getPropertyTypeDataShow(properties, 'ID'),
    isActive: getPropertyTypeDataShow(properties, 'Is.Active'),
    isIndexed: getPropertyTypeDataShow(properties, 'Is.Indexed'),
    isPublished: getPropertyTypeDataShow(properties, 'Is.Published'),
    /**
     * Testing
     */
    rollupCastSlugs: getPropertyTypeDataShow(properties, 'Rollup.People.Cast.Slug'),
    rollupCastTitles: getPropertyTypeDataShow(
      properties,
      'Rollup.People.Cast.Title',
    ),
    seoDescription: getPropertyTypeDataShow(properties, 'SEO.Description'),
    seoImage: getPropertyTypeDataShow(properties, 'SEO.Image')[0],
    seoImageDescription: getPropertyTypeDataShow(
      properties,
      'SEO.Image.Description',
    ),
    seoKeywords: getPropertyTypeDataShow(properties, 'SEO.Keywords'),
    tags: getPropertyTypeDataShow(properties, 'Tags'),
    title: getPropertyTypeDataShow(properties, 'Title'),
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

export { getPropertyTypeDataShow, getShowData }
