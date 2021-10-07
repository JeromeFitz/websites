import Slugger from 'github-slugger'
import _map from 'lodash/map'
import { getPlaiceholder } from 'plaiceholder'

import filterImages from '~lib/notion/filterImages'
/**
 * @plaiceholder/next
 */
const getImages = async ({ data, pathVariables }) => {
  const slugger = new Slugger()
  const mergeImages = {}

  /**
   * @info
   */
  const infoImagesFilter =
    data.info?.object === 'page'
      ? filterImages(data.info?.data, 'info')
      : filterImages(data.info?.results[0]?.properties, 'info')
  const infoImagesAwait =
    !!infoImagesFilter &&
    infoImagesFilter.map(async (imageResult) => {
      if (!imageResult) {
        return null
      }
      const url = !!imageResult && imageResult?.url

      if (!url) {
        return null
      }

      const { base64, img } = await getPlaiceholder(url)
      const id = slugger.slug(url)

      return { base64, id, img, url }
    })
  const infoImages = await Promise.all(infoImagesAwait)

  /**
   * @content
   */
  const contentImagesFilter =
    !pathVariables.isIndex && filterImages(data.content?.results, 'content')

  const contentImagesAwait =
    !!contentImagesFilter &&
    contentImagesFilter.map(async (imageResult) => {
      if (!imageResult) {
        return null
      }
      // console.dir(`imageResult`)
      // console.dir(imageResult)
      const imageExternalUrl =
        imageResult.image.type === 'external'
          ? imageResult.image.external.url
          : imageResult.image.file.url

      const { base64, img } = await getPlaiceholder(imageExternalUrl)
      const id = slugger.slug(imageExternalUrl)
      return { base64, id, img, url: imageExternalUrl }
    })
  const contentImages =
    !!contentImagesAwait && (await Promise.all(contentImagesAwait))

  /**
   * @items
   */
  if (!!data.items) {
    const itemsImagesFilter =
      data.items.object === 'page'
        ? filterImages(data.items?.data, 'items')
        : filterImages(data.items?.results, 'items')
    const itemsImagesAwait = itemsImagesFilter.map(async (imageResult) => {
      if (!imageResult) {
        return null
      }
      const url = !!imageResult && imageResult?.url

      if (!url) {
        return null
      }

      const { base64, img } = await getPlaiceholder(url)
      const id = slugger.slug(url)

      return { base64, id, img, url }
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

export default getImages
