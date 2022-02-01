import _map from 'lodash/map'

import filterImages from './filterImages'
import getImage from './getImage'

/**
 * @refactor
 */

// @todo(complexity) 18
// eslint-disable-next-line complexity
const getImages = async ({ data, pathVariables }) => {
  if (typeof window !== 'undefined') return {}
  const mergeImages = {}

  /**
   * @info
   */
  const infoImagesFilter =
    data.info?.object === 'page'
      ? filterImages(data.info?.properties, 'info')
      : !!data.info?.results &&
        filterImages(data.info?.results[0]?.properties, 'info')
  const infoImagesAwait =
    !!infoImagesFilter &&
    infoImagesFilter.map(async (imageResult) => {
      if (!imageResult) {
        return null
      }

      // console.dir(`>> imageResult: infoImagesFilter`)
      // console.dir(imageResult)

      const url =
        !!imageResult && !!imageResult?.url ? imageResult?.url : imageResult

      if (!url) {
        return null
      }

      return getImage(url)
    })
  const infoImages = !!infoImagesAwait ? await Promise.all(infoImagesAwait) : []

  /**
   * @content
   */
  const contentImagesFilter =
    !pathVariables.isIndex && filterImages(data?.content, 'content')

  const contentImagesAwait =
    !!contentImagesFilter &&
    contentImagesFilter.map(async (imageResult) => {
      if (!imageResult) {
        return null
      }

      // console.dir(`>> imageResult: contentImagesAwait`)
      // console.dir(imageResult)

      const { type } = imageResult
      const image = !!type && imageResult[type]

      // @todo(notion) rework content after refactor: getTypes[image]
      const url =
        !!imageResult && !!image?.external?.url ? image?.external?.url : null

      if (!url) {
        return null
      }

      return getImage(url)
    })
  const contentImages = !!contentImagesAwait
    ? await Promise.all(contentImagesAwait)
    : []

  /**
   * @items
   */
  if (!!data.items) {
    const itemsImagesFilter =
      data.items.object === 'page'
        ? filterImages(data.items?.data, 'items')
        : filterImages(data.items?.results, 'items')
    const itemsImagesAwait: any =
      !!itemsImagesFilter &&
      itemsImagesFilter.map(async (imageResult) => {
        if (!imageResult) {
          return null
        }

        // console.dir(`>> imageResult: itemsImagesAwait`)
        // console.dir(imageResult)

        const url =
          !!imageResult && !!imageResult?.url ? imageResult?.url : imageResult

        if (!url) {
          return null
        }

        return getImage(url)
      })
    const itemsImages = await Promise.all(itemsImagesAwait)
    !!itemsImages &&
      itemsImages[0] &&
      _map(itemsImages, (image: any) => (mergeImages[image.id] = image))
  }

  !!infoImages &&
    infoImages[0] &&
    _map(infoImages, (image: any) => (mergeImages[image.id] = image))
  !!contentImages &&
    contentImages[0] &&
    _map(contentImages, (image: any) => (mergeImages[image.id] = image))

  // console.dir(`mergeImages`)
  // console.dir(mergeImages)

  return mergeImages
}

export { getImages }
export default getImages
