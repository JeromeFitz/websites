import { getPropertyTypeData } from 'next-notion/utils/index'

function getSlugPreview(properties) {
  return getPropertyTypeData(properties, 'Slug.Preview')
}

export { getPropertyTypeData, getSlugPreview }
