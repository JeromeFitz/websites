import type {
  RichTextItemResponse,
  TextRichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import type { Metadata } from 'next'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'
import { isObjectEmpty } from '@jeromefitz/utils'

import { getPropertyTypeData } from 'next-notion/utils/index'
import _title from 'title'

// import { getEventData } from '../index'

type ImageItemResponse =
  | {
      caption: RichTextItemResponse[]
      external: { url: TextRequest }
      type: 'external'
    }
  | {
      caption: RichTextItemResponse[]
      file: { expiry_time: string; url: string }
      type: 'file'
    }
type TextRequest = string

// @todo(complexity) 15
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: migrate
function getMetadata({ properties, segmentInfo }) {
  if (isObjectEmpty(properties)) return {}
  // console.dir(`[getMetadata] segmentInfo:`)
  // console.dir(segmentInfo)
  // console.dir(`[getMetadata] properties:`)
  // console.dir(properties)
  // console.dir(isObjectEmpty(properties) ? `y` : 'n')

  const canonical =
    segmentInfo?.slug === '/homepage'
      ? env.NEXT_PUBLIC__BASE_URL
      : `${env.NEXT_PUBLIC__BASE_URL}${segmentInfo?.slug}`

  const descriptionTemp: TextRichTextItemResponse = getPropertyTypeData(
    properties,
    'SEO.Description',
  )

  const description: string = descriptionTemp?.toString()

  /**
   * @todo(notion) what if property does not exist?
   */
  let openGraph: any
  const hasImage = !isObjectEmpty(properties?.['SEO.Image'] ?? {})
  if (hasImage) {
    const imageData: ImageItemResponse = getPropertyTypeData(
      properties,
      'SEO.Image',
    )[0]
    // console.dir(`> imageData`)
    // console.dir(imageData)

    if (imageData) {
      const imageUrl =
        imageData.type === 'external' ? imageData.external.url : imageData.file.url
      const imageDescription: TextRichTextItemResponse = getPropertyTypeData(
        properties,
        'SEO.Image.Description',
      )

      openGraph = {
        images: [
          {
            alt: imageDescription,
            url: imageUrl,
          },
        ],
      }
    }
  }

  /**
   * @todo(notion) EVENT override
   */
  // const overrideTitle = getPropertyTypeDataEvent(properties, 'Override.Title')

  let titleSeo = ''
  // const isEvent = segmentInfo.segment === 'events' && !segmentInfo.isIndex
  // if (isEvent) {
  //   // console.dir(`segmentInfo:`)
  //   // console.dir(segmentInfo)
  //   // console.dir(`----`)
  //   // console.dir(properties)
  //   const {
  //     // dayOfWeek,
  //     dayOfWeekAbbr,
  //     dayOfMonth,
  //     // dayOfMonthOrdinal,
  //     month,
  //     // monthName,
  //     // href,
  //     title,
  //     time,
  //     // ticketUrl,
  //     // ...props
  //   } = getEventData(properties)
  //   // console.dir(title)
  //   // console.dir(props)

  //   if (!dayOfWeekAbbr) return null

  //   titleSeo = `${dayOfWeekAbbr.toUpperCase()} ${month}/${dayOfMonth} ${time}: ${title}`
  // } else {
  //   titleSeo = getPropertyTypeData(properties, 'Title')
  // }
  titleSeo = getPropertyTypeData(properties, 'Title')

  const titleSuffix =
    segmentInfo.segment === 'pages' || segmentInfo.isIndex
      ? segmentInfo.slug === '/homepage'
        ? ` | Actor. Comedian. Writer.`
        : ` | Jerome (he/him)`
      : ` | ${_title(segmentInfo.segment)}`

  titleSeo = `${titleSeo?.toString()}${titleSuffix}`

  const metadata: Metadata = {
    // metadataBase: new URL(BASE_URL),
    alternates: {
      canonical,
    },
    description,
    openGraph,
    title: titleSeo,
  }

  // console.dir(`>metadata`)
  // console.dir(metadata)

  return metadata
}

export { getMetadata }
