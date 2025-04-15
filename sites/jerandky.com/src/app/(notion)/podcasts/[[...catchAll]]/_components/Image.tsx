import https from 'node:https'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'
import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
import { isObjectEmpty } from '@jeromefitz/utils'

// import { Client } from '@notionhq/client'
import { Redis } from '@upstash/redis'
import { slug as _slug } from 'github-slugger'
// import { isImageExpired } from 'next-notion/src/utils/getAwsImage'
import { isHttpsUri } from 'valid-url'

import { getPropertyTypeDataEpisode } from '../../../_config'

// const notion = new Client({ auth: envServer.NOTION_API_KEY })

const redis = new Redis({
  agent: new https.Agent({ keepAlive: true }),
  token: envServer.UPSTASH_REDIS_REST_TOKEN,
  url: envServer.UPSTASH_REDIS_REST_URL,
})

const CACHE_KEY_PREFIX__IMAGE = `${envClient.NEXT_PUBLIC__SITE}/image`

// @todo(complexity) 12
// eslint-disable-next-line complexity
async function Image({ properties }) {
  /**
   * Image Information
   */
  const imageSeoDescription = getPropertyTypeDataEpisode(
    properties,
    'SEO.Image.Description',
  )
  const imageSeo = getPropertyTypeDataEpisode(properties, 'SEO.Image')[0]
  // console.dir(`imageSeo:`)
  // console.dir(imageSeo)
  /**
   * @todo(next) this image piece should be abstracted out and return nothing if undefined
   */
  const imageUrl = imageSeo ? imageSeo[imageSeo.type].url : undefined
  // console.dir(`imageSeoDescription:`)
  // console.dir(imageSeoDescription)
  // console.dir(`imageUrl:`)
  // console.dir(imageUrl)

  let key = '',
    slugImage = ''

  if (imageUrl) {
    if (isHttpsUri(imageUrl)) {
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
  let image = cache ? { ...cache } : {}

  // console.dir(`cache:`)
  // console.dir(cache)
  // console.dir(`isCached:`)
  // console.dir(isCached)
  // console.dir(`image:`)
  // console.dir(image)

  // const isExpired = isImageExpired(image)
  if (!isCached && !!imageUrl) {
    const { getImage } = await import('@jeromefitz/shared/plaiceholder/getImage')
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

  return <>{!!imageUrl && <NextImage order={1} {...image} />}</>
}

export { Image }
