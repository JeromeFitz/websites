/* eslint-disable complexity */
import https from 'node:https'

import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
// import {
//   getImageAlt,
//   getImageExpiration,
//   getImageUrl,
import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'
// } from '@jeromefitz/shared/components/Notion/Blocks/Image.utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Client } from '@notionhq/client'
import { Redis } from '@upstash/redis'
import { slug as _slug } from 'github-slugger'
import _isArray from 'lodash/isArray.js'
import { isAwsImage, isImageExpired } from 'next-notion/utils/index'
import validUrl from 'valid-url'

import { getPropertyTypeDataEvent } from '@/app/(notion)/_config/index'

const notion = new Client({ auth: envServer.NOTION_API_KEY })
// const notion = new Client({ auth: envServer.NOTION_API_KEY })

const redis = new Redis({
  agent: new https.Agent({ keepAlive: true }),
  retry: {
    backoff: (retryCount) => Math.exp(retryCount) * 50,
    retries: 5,
  },
  token: envServer.UPSTASH_REDIS_REST_TOKEN,
  url: envServer.UPSTASH_REDIS_REST_URL,
})

const CACHE_KEY_PREFIX__IMAGE = `${envClient.NEXT_PUBLIC__SITE}/image`

async function Image({ className = '', properties }) {
  // console.dir(properties)
  /**
   * Image Information
   */
  const imageSeoDescription = _isArray(properties['SEO.Image.Description'])
    ? getPropertyTypeDataEvent(properties, 'SEO.Image.Description')
    : properties['SEO.Image.Description']
  /**
   * @hack(notion) this probably _is not_ files all the time :X
   */
  let imageSeo = _isArray(properties['SEO.Image'])
    ? getPropertyTypeDataEvent(properties, 'SEO.Image')[0]
    : properties['SEO.Image']
  if (imageSeo.type === 'file') {
    // console.dir(imageSeo)
  } else {
    imageSeo = imageSeo?.files[0]
  }

  /**
   * Custom Check:
   * - If SEO Image is AWS, re-set cache
   */
  let isExpired = false
  const SEO_IMAGE_IS_AWS = !!imageSeo
    ? isAwsImage(imageSeo[imageSeo?.type]?.url)
    : false
  if (SEO_IMAGE_IS_AWS) {
    isExpired = isImageExpired({
      expiry_time:
        imageSeo?.type === 'external' ? null : imageSeo[imageSeo?.type]?.expiry_time,
      src: imageSeo[imageSeo.type].url,
    })
  }

  if (SEO_IMAGE_IS_AWS && isExpired) {
    console.dir(isExpired)
    const imageDataRefresh: any = await notion?.pages?.retrieve({
      page_id: properties['ID'],
    })
    imageSeo = imageDataRefresh.properties['SEO.Image'].files[0]
  }

  /**
   * @todo(next) this image piece should be abstracted out and return nothing if undefined
   */
  const imageUrl = !!imageSeo ? imageSeo[imageSeo.type].url : undefined
  // console.dir(`imageSeoDescription:`)
  // console.dir(imageSeoDescription)
  // console.dir(`imageUrl:`)
  // console.dir(imageUrl)

  let key = '',
    slugImage = ''

  if (imageUrl) {
    if (validUrl.isHttpsUri(imageUrl)) {
      slugImage = _slug(imageUrl.includes('?') ? imageUrl.split('?')[0] : imageUrl)
      key = `${CACHE_KEY_PREFIX__IMAGE}/${slugImage}`.toLowerCase()
    }
  }

  // console.dir(`key:`)
  // console.dir(key)
  // console.dir(`slugImage:`)
  // console.dir(slugImage)

  const cache: any = await redis.get(key)
  const isCached = !!cache && !isObjectEmpty(cache)
  let image = !!cache ? { ...cache } : {}

  // console.dir(`cache:`)
  // console.dir(cache)
  // console.dir(`isCached:`)
  // console.dir(isCached)
  // console.dir(`image:`)
  // console.dir(image)

  // const isExpired = isImageExpired(image)
  if (!isCached && !!imageUrl) {
    const { getImage } = await import('@jeromefitz/shared/plaiceholder/index')
    const imageData = await getImage(imageUrl)
    image.blurDataURL = imageData?.base64
    image = {
      alt: imageSeoDescription,
      ...image,
      ...imageData?.img,
    }
  }

  // console.dir(`isExpired:`)
  // console.dir(isExpired)
  // console.dir(`image:`)
  // console.dir(image)

  return (
    <>{!!imageUrl && <NextImage className={className} order={1} {...image} />}</>
  )
}

export { Image }
