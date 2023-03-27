import 'server-only'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { Metadata } from 'next'
import { getStaticPropsCatchAll } from 'next-notion/src/getStaticPropsCatchAll'
import { cache } from 'react'
import _title from 'title'

import { notionConfig } from '~config/index'
// import { metadata as seo } from '~config/metadata'
import { BASE_URL } from '~lib/constants'
import { formatDateForSlug } from '~utils/formatDateForSlug'
// import { log } from '~utils/log'

// const DEBUG_KEY = 'getNotionData >> '

/**
 * @todo(next) this is running on `next build` which do not want
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const preload = ({ catchAll, options = {} }: { catchAll: any; options?: any }) => {
  // log(`${DEBUG_KEY} preload`, catchAll)
  // log(`${DEBUG_KEY} preload (options)`, options)
  // void getNotionData({ catchAll, options })
  return
}

const getNotionData = cache(
  // eslint-disable-next-line complexity
  async ({ catchAll, options = {} }: { catchAll: any; options?: any }) => {
    // log(`${DEBUG_KEY} cache`, catchAll)
    // log(`${DEBUG_KEY} cache (options)`, options)
    const { data, pathVariables } = await getStaticPropsCatchAll({
      catchAll,
      notionConfig,
      options,
    })

    const { isIndex, routeType, slug } = pathVariables
    const properties = data?.info?.properties || {}
    const is404 = isObjectEmpty(properties)

    if (is404) {
      return {
        robots: {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
        title: {
          default: '404',
        },
      }
    }

    const _canonical =
      routeType === 'pages' || slug === 'homepage'
        ? BASE_URL
        : `${BASE_URL}/${routeType}`
    let canonical = isIndex || !slug ? _canonical : `${_canonical}/${slug}`

    if (routeType === 'events' && !isIndex) {
      const yyyymmdd = formatDateForSlug(properties?.dateEvent?.start)
      canonical = `${BASE_URL}/${routeType}/${yyyymmdd}/${slug}`
    }

    // log(`${DEBUG_KEY} dataType`, dataType)
    // log(`${DEBUG_KEY} routeType`, routeType)
    // log(`${DEBUG_KEY} slug`, slug)
    // // log(`${DEBUG_KEY} params`, params)
    // log(`${DEBUG_KEY} properties`, properties)

    let openGraph: any
    const hasImage = !isObjectEmpty(properties?.seoImage)
    if (hasImage) {
      const imageSlug = Object.keys(properties?.seoImage)[0]
      const imageUrl = !!imageSlug && properties?.seoImage[imageSlug]?.url

      // log(`${DEBUG_KEY} imageSlug`, imageSlug)
      // log(`${DEBUG_KEY} imageUrl`, imageUrl)
      openGraph = {
        images: [
          {
            alt: properties?.seoImageDescription,
            url: imageUrl,
          },
        ],
      }
    }

    const description = properties?.seoDescription
    const title: any = {
      default:
        !isIndex && routeType !== 'pages'
          ? `${properties?.title} | ${_title(routeType)}`
          : properties?.title,
    }
    const keywords = properties?.seoKeywords
    const index = properties?.isIndexed === null ? false : properties?.isIndexed
    const follow = properties?.isPublished === null ? false : properties?.isPublished

    const _metadata: Metadata = {
      alternates: {
        canonical,
      },
      description,
      keywords,
      openGraph,
      robots: {
        index,
        follow,
        nocache: false,
        googleBot: {
          index,
          follow,
          noimageindex: false,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      title,
    }

    /**
     * @note(seo) Remove any empty / undefined to default to root layout
     */
    const metadata = Object.fromEntries(
      Object.entries(_metadata).filter(([, v]) => v != null)
    )

    return { data, metadata, pathVariables }
  }
)

export { getNotionData, preload }
