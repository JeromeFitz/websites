import { isObjectEmpty } from '@jeromefitz/utils'
import type {
  TextRichTextItemResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'
import _title from 'title'

import { getPropertyTypeData, getEventData } from '~app/(notion)/(utils)/utils'

const BASE_URL = 'https://jeromefitzgerald.com'

type TextRequest = string
type ImageItemResponse =
  | {
      type: 'external'
      external: { url: TextRequest }
      caption: Array<RichTextItemResponse>
    }
  | {
      type: 'file'
      file: { url: string; expiry_time: string }
      caption: Array<RichTextItemResponse>
    }

// eslint-disable-next-line complexity
function getMetadata({ properties, segmentInfo }) {
  if (isObjectEmpty(properties)) return {}
  // console.dir(`[getMetadata] segmentInfo:`)
  // console.dir(segmentInfo)
  // console.dir(`[getMetadata] properties:`)
  // console.dir(properties)
  // console.dir(isObjectEmpty(properties) ? `y` : 'n')

  const canonical = `${BASE_URL}${segmentInfo?.slug}`

  const descriptionTemp: TextRichTextItemResponse = getPropertyTypeData(
    properties,
    'SEO.Description'
  )[0]?.plain_text
  const description: string = descriptionTemp?.toString()

  /**
   * @todo(notion) what if property does not exist?
   */
  let openGraph: any
  const hasImage = !isObjectEmpty(properties?.['SEO.Image'] ?? {})
  if (hasImage) {
    openGraph: true

    const imageData: ImageItemResponse = getPropertyTypeData(
      properties,
      'SEO.Image'
    )[0]
    // console.dir(`> imageData`)
    // console.dir(imageData)

    if (!!imageData) {
      const imageUrl =
        imageData.type === 'external' ? imageData.external.url : imageData.file.url
      const imageDescription: TextRichTextItemResponse = getPropertyTypeData(
        properties,
        'SEO.Image.Description'
      )[0]?.plain_text

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

  const isEvent = segmentInfo.segment === 'events' && !segmentInfo.isIndex

  let titleSeo = ''
  if (isEvent) {
    // console.dir(`segmentInfo:`)
    // console.dir(segmentInfo)
    // console.dir(`----`)
    // console.dir(properties)
    const {
      // dayOfWeek,
      dayOfWeekAbbr,
      dayOfMonth,
      // dayOfMonthOrdinal,
      month,
      // monthName,
      // href,
      title,
      time,
      // ticketUrl,
      // ...props
    } = getEventData(properties)
    // console.dir(title)
    // console.dir(props)

    if (!dayOfWeekAbbr) return null

    titleSeo = `${dayOfWeekAbbr.toUpperCase()} ${month}/${dayOfMonth} ${time}: ${title}`
  } else {
    titleSeo = getPropertyTypeData(properties, 'Title')[0]?.plain_text
  }

  const titleSuffix =
    segmentInfo.segment === 'pages' || segmentInfo.isIndex
      ? ` | Jerome (he/him)`
      : ` | ${_title(segmentInfo.segment)}`

  titleSeo = `${titleSeo?.toString()}${titleSuffix}`

  const metadata: Metadata = {
    alternates: {
      canonical,
    },
    title: titleSeo,
    description,
    openGraph,
  }

  // console.dir(`>metadata`)
  // console.dir(metadata)

  return metadata
}

export { getMetadata }
