/**
 * @hack(next) quick hack to fix SEO/OG
 *
 * This needs to be moved elsewhere
 *
 */
import https from 'node:https'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'
import { envServer } from '@jeromefitz/next-config/env.server.mjs'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Redis } from '@upstash/redis'
import { slug as _slug } from 'github-slugger'
import _title from 'title'
import validUrl from 'valid-url'

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

// @todo(complexity) 17
// eslint-disable-next-line complexity
async function generateMetadataCustom({ data, pageData, segmentInfo }) {
  const hasImage = !!pageData?.seoImage
  const images: any = undefined
  if (hasImage) {
    /**
     * @todo(notion) check against cache first
     */
    const imageUrl = !!pageData?.seoImage
      ? pageData?.seoImage[pageData?.seoImage?.type]?.url
      : undefined

    let key = '',
      slugImage = ''

    if (imageUrl) {
      if (validUrl.isHttpsUri(imageUrl)) {
        slugImage = _slug(imageUrl.includes('?') ? imageUrl.split('?')[0] : imageUrl)
        key = `${CACHE_KEY_PREFIX__IMAGE}/${slugImage}`.toLowerCase()
      }
    }

    const cache: any = await redis.get(key)
    const isCached = !!cache && !isObjectEmpty(cache)
    const images = !!cache ? cache : []

    if (!isCached && !!imageUrl) {
      // console.dir(`[generateMetadataCustom] !isCached && !!imageUrl`)
      const { getImage } = await import('@jeromefitz/shared/plaiceholder/index')
      const imageData = await getImage(imageUrl)
      // image.blurDataURL = imageData?.base64
      // image = {
      //   alt: imageSeoDescription,
      //   ...image,
      //   ...imageData?.img,
      // }
      images.push({
        alt: pageData?.seoImageDescription,
        height: imageData?.img?.height,
        url: imageData?.img?.src,
        width: imageData?.img?.width,
      })
    } else {
      // console.dir(`[generateMetadataCustom] isCached`)
    }
    /**
     * @todo(notion) setCache
     */

    // const { getImage } = await import('@jeromefitz/shared/plaiceholder/index')
    // // console.dir(`imageUrl:`)
    // // console.dir(imageUrl)
    // const imageData = await getImage(imageUrl)
    // // console.dir(`imageData:`)
    // // console.dir(imageData)
    // images = [
    //   {
    //     alt: pageData?.seoImageDescription,
    //     height: imageData?.img?.height,
    //     url: imageData?.img?.src,
    //     width: imageData?.img?.width,
    //   },
    // ]
  }

  let titleSeo = ''
  const isEvent = segmentInfo.segment === 'events' && !segmentInfo.isIndex
  if (isEvent) {
    const { dayOfMonth, dayOfWeekAbbr, month, time, title } = pageData

    if (!dayOfWeekAbbr) return null
    titleSeo = `${dayOfWeekAbbr.toUpperCase()} ${month}/${dayOfMonth} ${time}: ${title}`
  } else {
    titleSeo = pageData.title
  }

  const titleSuffix =
    segmentInfo.segment === 'pages' || segmentInfo.isIndex
      ? segmentInfo.slug === '/homepage'
        ? ` | Actor. Comedian. Writer.`
        : ` | Jerome Fitzgerald (he/him)`
      : ` | ${_title(segmentInfo.segment)}`

  titleSeo = `${titleSeo?.toString()}${titleSuffix}`

  const seo = {
    ...data?.seo,
    keywords: pageData?.seoKeywords,
    metadataBase: new URL(`https://${envClient.NEXT_PUBLIC__SITE}`),
    openGraph: {
      description: pageData?.seoDescription,
      images,
      title: titleSeo,
      type: 'website',
    },
    title: titleSeo,
    twitter: {
      card: hasImage ? 'summary_large_image' : 'summary',
      creator: '@JeromeFitz',
      site: '@JeromeFitz',
    },
  }

  return seo
}

export { generateMetadataCustom }
