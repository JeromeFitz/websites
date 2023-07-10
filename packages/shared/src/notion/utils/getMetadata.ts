import { isObjectEmpty } from '@jeromefitz/utils'
import type {
  TextRichTextItemResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Metadata } from 'next'
import { getPropertyTypeData } from 'next-notion/src/utils'
import _title from 'title'

// import { getEventData } from '../index'

const BASE_URL = `https://${process.env.NEXT_PUBLIC__SITE}`

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

function getMetadata({ properties, segmentInfo }) {
  if (isObjectEmpty(properties)) return {}
  // console.dir(`[getMetadata] segmentInfo:`)
  // console.dir(segmentInfo)
  // console.dir(`[getMetadata] properties:`)
  // console.dir(properties)
  // console.dir(isObjectEmpty(properties) ? `y` : 'n')

  const canonical =
    segmentInfo?.slug === '/homepage' ? BASE_URL : `${BASE_URL}${segmentInfo?.slug}`

  const descriptionTemp: TextRichTextItemResponse = getPropertyTypeData(
    properties,
    'SEO.Description'
  )
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
    title: titleSeo,
    description,
    openGraph,
  }

  // console.dir(`>metadata`)
  // console.dir(metadata)

  return metadata
}

export { getMetadata }
