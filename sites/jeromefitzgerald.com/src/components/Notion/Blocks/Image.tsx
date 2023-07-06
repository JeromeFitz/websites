import 'server-only'
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
import https from 'node:https'

import { Caption } from '@jeromefitz/ds/components/Caption'
// import { Image } from '@jeromefitz/ds/ui/blocks/index'
import { isObjectEmpty } from '@jeromefitz/utils'
import { Client } from '@notionhq/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Redis } from '@upstash/redis'
import stringify from 'fast-json-stable-stringify'
import { slug as _slug } from 'github-slugger'
import NextImage from 'next/image'
import { NotionEmoji as EmojiWrapper } from 'next-notion/src/blocks/Emoji'
import { isImageExpired } from 'next-notion/src/utils'
import validUrl from 'valid-url'

import { TIME } from '~app/(notion)/(config)/constants'

import { getImageAlt, getImageUrl, getImageExpiration } from './Image.utils'

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
   * - `expiry_time` is when it will expire
   * - Can also determine via convoluted way through X-Amz-Date
   *
   * If Expiration is hit:
   * - Get new Notion AWS Image
   * - Update Image Cache
   * - **DO NOT**  redo the plaicholder, should be same image
   * - - QUESTION: if we have cache with blurDataURL, could Suspend/SWR?
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
     * @todo(notion) Suspense or SWR; Not needed for SSR
     */
    const commentBlock = await notion?.comments?.list({
      block_id: block.id,
    })
    const alt = (!!commentBlock && getImageAlt(commentBlock?.results)) || ''

    image.alt = alt
  }

  /**
   * @note(redis) if we already have the image we do not
   *  need the dimensions and placeholder again (most likely)
   */
  // if (OVERRIDE_CACHE || (!isCached && !!imageUrl)) {
  if (!isCached && !!imageUrl) {
    const { getPlaiceholder } = await import('plaiceholder')
    const { base64, img } = await getPlaiceholder(imageUrl)

    image.blurDataURL = base64
    image = {
      ...image,
      ...img,
    }
  }

  if (isExpired) {
    image.src = imageUrl
    image.url = imageUrl
    image.expiry_time = imageExpiry
  } else {
    image.expiry_time = undefined
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

function Image({ ...props }) {
  // @note(notion) eject for html validity purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expiry, order, unoptimized, url, ...image } = props

  const isPriority = props?.priority ? props?.priority : order < 2 ? true : false
  const hack: any = {}
  hack.priority = isPriority
  hack.fetchPriority = isPriority ? 'high' : 'auto'
  // hack.loading = isPriority ? 'eager' : 'lazy'
  hack.quality = 90
  image.img = undefined
  // const preload = `/_next/image?url=${encodeURIComponent(props?.src)}&w=1920&q=${
  //   hack.quality
  // }`

  return (
    <>
      {/* @hack(next) NEXT-811 */}
      {/* https://github.com/vercel/next.js/issues/43134 */}
      {/* {!!hack.priority && <link rel="preload" href={preload} as="image" />} */}
      {/* @todo(types) */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <NextImage
        className="flex w-full justify-center"
        placeholder="blur"
        unoptimized={process.env.NODE_ENV !== 'production'}
        {...hack}
        {...image}
      />
    </>
  )
}

async function ImageImpl({
  block,
  order,
}: {
  block: BlockObjectResponse
  order: any
}) {
  // @todo(error-handling)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (block?.image?.external?.url === '') return null

  const imageUrl = getImageUrl(block)
  const imageCaption = !!block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  let image = {
    order,
    src: imageUrl,
    url: imageUrl,
  }

  const imageOptimized = await getImageFromBlock({ block, url: imageUrl })
  image = { ...image, ...imageOptimized }

  return (
    <>
      <Image {...image} />
      {!!imageCaption && (
        <Caption>
          <EmojiWrapper id={block.id} text={`${imageCaption}`} />
        </Caption>
      )}
    </>
  )
}

export { ImageImpl as Image }
export default ImageImpl
