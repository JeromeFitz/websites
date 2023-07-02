import { isObjectEmpty } from '@jeromefitz/utils'
import type { Metadata } from 'next'
import { getNotion } from 'next-notion/src/helper'
import _title from 'title'

import { notionConfig } from '~config/index'
import { HOST_APIS, BASE_URL } from '~lib/constants'
import { formatDateForSlug } from '~utils/formatDateForSlug'
// import { log } from '~utils/log'

// const DEBUG_KEY = `getMetadata >> `

async function getDataCms(catchAll) {
  const url = `${HOST_APIS.CMS}/${catchAll.join('/')}`
  // log(`${DEBUG_KEY} getDataCms > url`, url)

  const res = await fetch(url)
  if (!res.ok) {
    // @note(next) activates closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

// @todo(types)
// eslint-disable-next-line complexity
const getMetadata = ({ catchAll, data }): any => {
  const notion = getNotion(notionConfig)
  const pathVariables = notion.custom.getPathVariables({ catchAll })

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

  /**
   * @note(notion) if absolutely needed can mutate/alter data return?
   */
  return { metadata, pathVariables }
}

export { getDataCms, getMetadata }
