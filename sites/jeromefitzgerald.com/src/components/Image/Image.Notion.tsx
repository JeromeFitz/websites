import NextImage from 'next/image'

import type { Segment } from '@/utils/getBySegment'

/**
 * @note Image
 *
 * Is this an AWS Image hosted with: expiry_time
 *
 * NO => Load as normal
 *
 * YES =>  Jump through hoops
 *
 */
import { isEmpty } from '@/utils/isEmpty'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ImagePlaceholder {
  alt?: string
  blurDataURL?: string
  ['data-key']?: string
  height?: number
  isImageExpired?: boolean
  key?: string
  placeholder?: 'blur'
  priority?: boolean
  src?: string
  width?: number
}
import type {
  Blog,
  Book,
  Episode,
  Event,
  NotionSeoImage,
  Podcast,
  Show,
  Venue,
} from '@/lib/drizzle/schemas/types'

import { getNotionSeoImage } from '@/lib/drizzle/schemas/_notion/queries'
import {
  overrideImageKeyValueToCache,
  pre_addImageKeyValueToCache,
} from '@/lib/drizzle/schemas/cache-images/actions'
import { getKeyValue, overrideItemToCache } from '@/lib/drizzle/utils'
// import { isEmpty } from '@/utils/isEmpty'
import {
  isAwsImage as _isAwsImage,
  isImageExpired as _isImageExpired,
} from '@/lib/notion/getAwsImage'

function getIsImageExpired({ image }: { image: any }) {
  let isImageExpired = false
  const SEO_IMAGE_IS_AWS = image ? _isAwsImage(image[image?.type]?.url) : false
  if (SEO_IMAGE_IS_AWS) {
    isImageExpired = _isImageExpired({
      expiry_time:
        image?.type === 'external' ? null : image[image?.type]?.expiry_time,
      src: image[image.type].url,
    })
  }
  return isImageExpired
}
async function getImagePlaceholder({ image }: { image: any }) {
  const _imagePlaceholder: any = await pre_addImageKeyValueToCache({
    image,
  })
  return {
    blurDataURL: _imagePlaceholder.blurDataURL,
    ['data-key']: _imagePlaceholder.key,
    height: parseInt(_imagePlaceholder.height),
    src: _imagePlaceholder.src,
    width: parseInt(_imagePlaceholder.width),
  }
}

export async function ImageNotion({
  item,
  segment,
}: {
  item: Blog | Book | Episode | Event | Podcast | Show | Venue
  segment: Segment
}) {
  /**
   * @hack this is pretty intense
   */
  let image: any = item.seoImage
  if (
    image === null ||
    image === undefined ||
    // isEmpty(image[image?.type]) ||
    image[image?.type]?.url.length === 0
  ) {
    return null
  }
  let isImageExpired = getIsImageExpired({ image })
  const imagePlaceholder = await getImagePlaceholder({ image })

  if (isImageExpired) {
    console.log(
      `isImageExpired(${isImageExpired ? 'y' : 'n'}): ${image.file.expiry_time}`,
    )
    const properties: NotionSeoImage = await getNotionSeoImage({
      segment,
      slug: item.slugPreview,
    })
    const key = properties['Slug.Preview'].formula.string
    const row = await getKeyValue({ key, segment })
    const result: any = row[0]
    const value = [
      {
        ...result.value[0],
        properties: {
          ...result.value[0].properties,
          ...properties,
        },
      },
    ]

    image = properties['SEO.Image'].files[0]
    // image = value[0].properties['SEO.Image'].files[0]
    isImageExpired = false

    if (isEmpty(image)) {
      await overrideItemToCache({ key, segment, value })
      await overrideImageKeyValueToCache({ value: image })
    }
  }
  /**
   * @note This is either the original, or updated one.
   */
  imagePlaceholder.src = image[image.type].url

  return (
    <>
      {!isImageExpired && (
        <NextImage
          alt="TBD"
          blurDataURL={imagePlaceholder.blurDataURL}
          className="rounded-sm"
          height={imagePlaceholder.height}
          placeholder="blur"
          priority={false}
          src={imagePlaceholder.src}
          width={imagePlaceholder.width}
        />
      )}
    </>
  )
}
