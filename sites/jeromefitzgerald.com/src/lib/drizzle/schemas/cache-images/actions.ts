/** biome-ignore-all assist/source/useSortedKeys: migrate */
import { envServer } from '@jeromefitz/next-config/env.server.mjs'

import { and, eq, sql } from 'drizzle-orm'

import { drizzle } from '@/lib/drizzle/index'
import { cacheImages } from '@/lib/drizzle/schemas'
import { getImageKeyValue } from '@/lib/drizzle/schemas/cache-images/queries'
import { getImageKeySlug } from '@/lib/drizzle/utils/getImageKeySlug'
import { getPlaceholder } from '@/utils/getPlaceholder'
import { isEmpty } from '@/utils/isEmpty'

export async function pre_addImageKeyValueToCache({ image }: { image: any }) {
  /**
   * @todo() Check if Exists
   */
  const imageUrl = image[image?.type]?.url
  const { key, slug } = getImageKeySlug(imageUrl)
  const imageKeyValue = await getImageKeyValue({ key })
  const logMessage = `addItemToCache(images)[X]: ${key}`

  if (isEmpty(imageKeyValue)) {
    console.log(logMessage.replace('[X]', '[insert]'))
    const placeholderImage = await getPlaceholder(image[image.type].url)
    const imageCache = {
      ...placeholderImage,
      key,
      slug,
    }
    await addImageKeyValueToCache(imageCache)
    return imageCache
  } else {
    // @todo(notion) all logic for expired images goes here and only here
    console.log(logMessage.replace('[X]', '[skip..]'))
    return imageKeyValue[0].value[0]
  }
}

export async function addImageKeyValueToCache(imageCache: any) {
  await drizzle.insert(cacheImages).values({
    siteId: envServer.POSTGRES_SITE_ID,
    key: imageCache.key,
    value: [imageCache],
    blurDataUrl: imageCache.blurDataURL,
    slug: imageCache.slug,
    src: imageCache.src,
    width: imageCache.width,
    height: imageCache.height,
  })
}
export async function overrideImageKeyValueToCache({ value }: { value: any }) {
  const imageUrl = value[value.type].url
  const { key, slug } = getImageKeySlug(imageUrl)
  const logMessage = `overrideImageKeyValueToCache(images)[X]: ${key}`
  console.log(logMessage.replace('[X]', '[override]'))

  const placeholderImage = await getPlaceholder(imageUrl)
  const imageCache: any = {
    ...placeholderImage,
    key,
    slug,
  }

  await drizzle
    .update(cacheImages)
    .set({
      key: imageCache.key,
      value: [imageCache],
      updatedAt: sql`NOW()`,
      blurDataUrl: imageCache.blurDataURL,
      slug: imageCache.slug,
      src: imageCache.src,
      width: imageCache.width,
      height: imageCache.height,
    })
    .where(
      and(
        eq(cacheImages.siteId, envServer.POSTGRES_SITE_ID),
        eq(cacheImages.key, key),
      ),
    )
}
