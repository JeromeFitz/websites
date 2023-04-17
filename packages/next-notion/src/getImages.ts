import _map from 'lodash/map'
import _size from 'lodash/size'
import _uniqWith from 'lodash/uniqWith'

import { filterImages } from './filterImages'

const FILTER_TYPES = {
  CONTENT: 'content',
  INFO: 'info',
  ITEMS: 'items',
  PAGE: 'page',
}

/**
 * @refactor
 */

// @todo(complexity) 18
// eslint-disable-next-line complexity
const getImages = async ({ data, pathVariables }): Promise<any[]> => {
  // if (typeof window !== 'undefined') return []
  const mergeImages = {}
  let urls: any = []

  /**
   * @info
   */
  const infoImagesFilter =
    data?.info?.object === FILTER_TYPES.PAGE
      ? filterImages(data?.info?.properties, FILTER_TYPES.INFO)
      : !!data?.info?.results &&
        filterImages(data?.info?.results[0]?.properties, FILTER_TYPES.INFO)
  const infoImagesAwait =
    !!infoImagesFilter &&
    infoImagesFilter.map((imageResult) => {
      if (!imageResult) {
        return null
      }

      const url: string =
        !!imageResult && !!imageResult?.url ? imageResult?.url : imageResult

      if (!url) {
        return null
      }
      urls.push(url)
      return null
    })
  const infoImages = !!infoImagesAwait ? await Promise.all(infoImagesAwait) : []

  /**
   * @content
   */
  const contentImagesFilter =
    !pathVariables.isIndex && filterImages(data?.content, FILTER_TYPES.CONTENT)

  const contentImagesAwait =
    !!contentImagesFilter &&
    contentImagesFilter.map((imageResult) => {
      if (!imageResult) {
        return null
      }

      const { type } = imageResult
      const image = !!type && imageResult[type]

      // @todo(notion) rework content after refactor: getTypes[image]
      const url: string =
        !!imageResult && !!image?.external?.url ? image?.external?.url : null

      if (!url) {
        return null
      }
      urls.push(url)

      return null
    })
  const contentImages = !!contentImagesAwait
    ? await Promise.all(contentImagesAwait)
    : []

  /**
   * @items
   */
  if (!!data?.items) {
    const itemsImagesFilter =
      data?.items.object === FILTER_TYPES.PAGE
        ? filterImages(data?.items?.data, FILTER_TYPES.ITEMS)
        : filterImages(data?.items?.results, FILTER_TYPES.ITEMS)
    const itemsImagesAwait: any =
      !!itemsImagesFilter &&
      itemsImagesFilter.map((imageResult) => {
        if (!imageResult) {
          return null
        }

        const url: string =
          !!imageResult && !!imageResult?.url ? imageResult?.url : imageResult

        if (!url) {
          return null
        }
        urls.push(url)

        return null
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

  // @note(lodash) does not mutate
  urls = _uniqWith(
    _map(urls, (url) => {
      return url
    })
  )

  return _size(urls) < 1 ? [] : urls
}

export { getImages }
