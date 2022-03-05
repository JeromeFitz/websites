import { asyncForEach } from '@jeromefitz/utils'
import _noop from 'lodash/noop'

import { getImage } from './getImage'

const getDataReturn = async ({ data, pathVariables }) => {
  let images = !!data?.images ? {} : data?.images
  const { getImages } = await import('./getImages')
  const urls = await getImages({ data, pathVariables })

  await asyncForEach(urls, async (url: string) => {
    const image = await getImage(url)
    if (!!image) {
      images[image.id] = image
    }
  }).catch(_noop)

  if (!images || images === undefined) {
    images = {}
  }

  return { ...data, images }
}

export { getDataReturn }
