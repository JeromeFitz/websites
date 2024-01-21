import { getPropertyTypeData } from 'next-notion/utils'

function getSlugPreview(properties) {
  return getPropertyTypeData(properties, 'Slug.Preview')
}

export { getPropertyTypeData, getSlugPreview }
