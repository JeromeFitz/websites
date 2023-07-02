import { getPropertyTypeData } from './getPropertyTypeData'

function getSlugPreview(properties) {
  return getPropertyTypeData(properties, 'Slug.Preview')
}

export { getPropertyTypeData, getSlugPreview }
