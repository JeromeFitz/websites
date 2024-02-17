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
import 'server-only'

import https from 'node:https'

import { Caption } from '@jeromefitz/ds/components/Caption'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { Client } from '@notionhq/client'
import { Redis } from '@upstash/redis'
import stringify from 'fast-json-stable-stringify'
import { slug as _slug } from 'github-slugger'
import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import { isImageExpired } from 'next-notion/utils'
import validUrl from 'valid-url'

import { TIME } from '../../../lib/constants'
import { ImageClient as NextImage } from './Image.client'
import { getImageAlt, getImageExpiration, getImageUrl } from './Image.utils'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const redis = Redis.fromEnv({ agent: new https.Agent({ keepAlive: true }) })

/**
 * @note(next|redis) try to avoid breaking changes but if necessary
 *  run a build with:
 *  -  OVERRIDE_CACHE=true pnpm turbo run build --filter="..."
 */
const OVERRIDE_CACHE = process.env.OVERRIDE_CACHE || false

const CACHE_KEY_PREFIX__IMAGE = `${process.env.NEXT_PUBLIC__SITE}/image`

// async function getImage({ url }) {}

// eslint-disable-next-line complexity
async function getImageFromBlock({ block, url }) {
  let imageUrl = url
  let imageExpiry = null
  /**
   * @note(notion) image data
   * @todo(types)
   */

  let key = '',
    slugImage = ''

  if (validUrl.isHttpsUri(imageUrl)) {
    slugImage = _slug(imageUrl.includes('?') ? imageUrl.split('?')[0] : imageUrl)
    key = `${CACHE_KEY_PREFIX__IMAGE}/${slugImage}`.toLowerCase()
  }

  const cache: any = await redis.get(key)
  const isCached = !!cache && !isObjectEmpty(cache)
  let image = !!cache ? { ...cache } : {}

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

  if (OVERRIDE_CACHE || !isCached) {
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
  if (OVERRIDE_CACHE || (!isCached && !!imageUrl)) {
    const { getImage } = await import('../../../plaiceholder/getImage')
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

  if (OVERRIDE_CACHE || isExpired || !isCached) {
    void redis.set(key, stringify(image), {
      ex: TIME.MONTH,
    })
  }

  return image
}

async function ImageImpl({
  block,
  blocks,
  className = '',
  order,
}: {
  block: BlockObjectResponse
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

  const imageCaption = !!block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  let image: any = {
    order,
    src: imageUrl,
    url: imageUrl,
  }

  const imageOptimized = await getImageFromBlock({ block, url: imageUrl })
  image = { ...image, ...imageOptimized }

  return (
    <>
      <NextImage className={className} {...image} />
      {!!imageCaption && (
        <Caption className={classNameCaption}>
          <EmojiWrapper id={block.id} text={`${imageCaption}`} />
        </Caption>
      )}
    </>
  )
}

export { ImageImpl as Image }
export default ImageImpl
