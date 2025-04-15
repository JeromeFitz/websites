/**
 * @note(next) Please avoid making this a Client Component
 *
 * To keep as RSC and avoid onError:
 *
 * If image is from Notion AWS (has: AMZ-DATE && AMZ-EXPIRES)
 *   - Get Image Data from Block in realtime
 *   - Override Cache with new Image Data (if using)
 *
 */
/**
 * @note(next|redis) try to avoid breaking changes but if necessary
 *  run a build with:
 *  -  OVERRIDE_CACHE=true pnpm turbo run build --filter="..."
 */

import 'server-only'

import https from 'node:https'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { Client } from '@notionhq/client'
import { Redis } from '@upstash/redis'
import stringify from 'fast-json-stable-stringify'
import { slug as _slug } from 'github-slugger'
import { isHttpsUri } from 'valid-url'

import { Callout } from '@/components/Callout/index'
import { CameraIcon } from '@/components/Icon/index'
import { NotionEmoji as EmojiWrapper } from '@/lib/notion/blocks/Emoji'
import { isImageExpired } from '@/lib/notion/getAwsImage'
import { isObjectEmpty } from '@/utils/isObjectEmpty'

import { TIME } from '../../../lib/constants'
import { ImageClient as NextImage } from './Image.client'
import { getImageAlt, getImageExpiration, getImageUrl } from './Image.utils'

const notion = new Client({ auth: envServer.NOTION_API_KEY })

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

// async function getImage({ url }) {}

// eslint-disable-next-line complexity
async function getImageFromBlock({ block, url }: { block: any; url: string }) {
  let imageUrl = url
  let imageExpiry = null
  /**
   * @note(notion) image data
   * @todo(types)
   */

  let key = '',
    slugImage = ''

  if (isHttpsUri(imageUrl)) {
    slugImage = _slug(imageUrl.includes('?') ? imageUrl.split('?')[0] : imageUrl)
    key = `${CACHE_KEY_PREFIX__IMAGE}/${slugImage}`.toLowerCase()
  }

  const cache: any = await redis.get(key)
  const isCached = !!cache && !isObjectEmpty(cache)
  let image = cache ? { ...cache } : {}

  /**
   * @note(notion) AWS, Notion, and Cache
   *
   * If Notion locally hosts the Image it has an expiration (3600)
   * - `_time_time` is when it will expire
   * - Can also determine via convoluted way through X-Amz-Date
   *
   * If Expiration is hit:
   * - Get new Notion AWS Image
   * - Update Image Cache
   * - Since it is the same image, do not need to redo the plaiceholder if you do not want
   * - - QUESTION: if we have cache with blurDataURL, could Suspend/SWR?
   * - - ANSWER: probably neglible perf but if site is large and in charge perhaps
   */
  const isExpired = isImageExpired(image)

  if (isExpired) {
    const blockRefreshData = await notion?.blocks?.retrieve({
      block_id: block.id,
    })
    imageUrl = getImageUrl(blockRefreshData)
    imageExpiry = getImageExpiration(blockRefreshData)
  }

  if (envClient.OVERRIDE_CACHE || !isCached) {
    /**
     * @note(notion) Get Image Comments
     * @todo(notion) Can we store this with Redis KV?
     * @todo(notion) Suspense or SWR; Not needed for SSR
     */
    const commentBlock = await notion?.comments?.list({
      block_id: block.id,
    })
    const alt = (!!commentBlock && getImageAlt(commentBlock?.results)) || ''

    image.alt = alt
  }

  /**
   * @note(redis) if image is already cached we are
   *  most likely just getting a new AWS expiration
   * from notion if this an extension and not a new image
   *
   * would recommend not having the "hit" here
   */
  if (envClient.OVERRIDE_CACHE || (!isCached && !!imageUrl)) {
    const { getImage } = await import('../../../lib/plaiceholder/getImage')
    const imageData = await getImage(imageUrl)
    image.blurDataURL = imageData?.base64
    image = {
      ...image,
      ...imageData?.img,
    }
  }

  if (isExpired) {
    image.src = imageUrl
    image.url = imageUrl
    image._time_time = imageExpiry
  } else {
    image._time_time = undefined
  }
  image.id = key

  /**
   * Cache
   */

  if (envClient.OVERRIDE_CACHE || isExpired || !isCached) {
    void redis.set(key, stringify(image), {
      ex: TIME.MONTH,
    })
  }

  return image
}

// @todo(complexity) 15
// eslint-disable-next-line complexity
async function ImageImpl({
  block,
  blocks,
  className = '',
  order,
}: {
  block: any | BlockObjectResponse
  blocks?: any
  className?: string
  order: any
}) {
  // @todo(error-handling)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (block?.image?.external?.url === '') return null

  const classNameCaption = blocks?.caption?.className || ''

  const imageUrl = getImageUrl(block)
  if (!imageUrl) return null

  const imageCaption = block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  let image: any = {
    order,
    src: imageUrl,
    url: imageUrl,
  }

  const imageOptimized = await getImageFromBlock({ block, url: imageUrl })
  image = { ...image, ...imageOptimized }

  // console.dir(`image:`)
  // console.dir(image)

  return (
    <>
      <NextImage className={className} {...image} />
      {!!imageCaption && (
        <Callout className={classNameCaption} icon={CameraIcon}>
          <EmojiWrapper id={block.id} text={`${imageCaption}`} />
        </Callout>
      )}
    </>
  )
}

export { ImageImpl as Image }
export default ImageImpl
