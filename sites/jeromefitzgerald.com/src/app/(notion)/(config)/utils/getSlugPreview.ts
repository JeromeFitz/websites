import { getPropertyTypeData } from '../../../../../../../packages/next-notion/src/utils/getPropertyTypeData'

function getSlugPreview(properties) {
  return getPropertyTypeData(properties, 'Slug.Preview')
}

export { getPropertyTypeData, getSlugPreview }
