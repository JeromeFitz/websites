import { PageHeading } from '@jeromefitz/design-system/components'
import { format, parseISO } from 'date-fns'
import useSWR from 'swr'

import Seo from '~components/Seo'
import { notionConfig } from '~config/websites'

const { NOTION } = notionConfig

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ id, children, properties, routeType, url }) => {
  const { data: images } = useSWR('images')

  const {
    isIndexed,
    isPublished,
    seoDescription: description,
    seoImage: _seoImage,
    seoImageDescription,
    slug,
    title,
  } = properties

  // @todo(external) first key is image slug
  const seoImageSlug = !!_seoImage ? Object.keys(_seoImage)[0] : ''
  const seoImageData = !!images && images[seoImageSlug]
  const seoUrl = `https://jeromefitzgerald.com/${!!url ? url : ''}`

  let seoDescription = description
  if (routeType === NOTION.EVENTS.routeType && slug !== NOTION.EVENTS.routeType) {
    const date = format(
      parseISO(properties?.dateEvent?.start),
      `EEE MM/dd hh:mma`
    ).toUpperCase()
    seoDescription = `${date} – ${seoDescription}`
  }

  const noindex = !isPublished || !isIndexed
  // console.dir(`noindex: ${noindex}`)

  const seoImage = !!_seoImage ? _seoImage[seoImageSlug]?.url : null
  const openGraphImages = !!seoImage
    ? [
        {
          alt: seoImageDescription,
          height: seoImageData?.img?.height,
          url: _seoImage[seoImageSlug]?.url,
          width: seoImageData?.img?.width,
        },
      ]
    : null

  const seo = {
    canonical: seoUrl,
    description: seoDescription,
    image: seoImage,
    noindex,
    openGraph: {
      description: seoDescription,
      images: openGraphImages,
      title,
      url: seoUrl,
    },
    title,
  }

  return (
    <>
      <Seo {...seo} />
      <PageHeading title={seo.title} description={description} />
      {children}
    </>
  )
}

export default Layout
