/**
 * @plaiceholder
 */
import _filter from 'lodash/filter'
import _map from 'lodash/map'

const filterImages = (data, type) => {
  // console.dir(`data`)
  // console.dir(data)
  // console.dir(`type`)
  // console.dir(type)
  switch (type) {
    case 'info':
      return !!data && [data?.seoImage]
    case 'content':
      return !!data && _filter(data, { object: 'block', type: 'image' })
    case 'items':
      const itemsImages = []
      _map(data, (item) => {
        return !!item?.data?.seoImage && itemsImages.push(item?.data?.seoImage)
      })
      return itemsImages
    default:
      return []
  }
}

export default filterImages
