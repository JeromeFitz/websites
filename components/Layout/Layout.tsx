import { format, parseISO } from 'date-fns'
import useSWR from 'swr'

import { PageHeading } from '~components/Layout'
import Seo from '~components/Seo'
import { ROUTE_TYPES } from '~lib/notion/helper'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ id, children, properties, routeType, url }) => {
  const { data: images } = useSWR('images')

  const {
    isIndexed,
    isPublished,
    seoDescription: description,
    seoImage,
    seoImageDescription,
    slug,
    title,
  } = properties

  // @todo(external)
  const seoImageSlug = Object.keys(seoImage)[0] || ''
  const seoImageData = !!images && images[seoImageSlug]
  const seoUrl = `https://jeromefitzgerald.com/${!!url ? url : ''}`

  let seoDescription = description
  if (routeType === ROUTE_TYPES.events && slug !== ROUTE_TYPES.events) {
    const date = format(
      parseISO(properties?.dateEvent?.start),
      `EEE MM/dd hh:mma`
    ).toUpperCase()
    seoDescription = `${date} – ${seoDescription}`
  }

  const noindex = !isPublished || !isIndexed
  // console.dir(`noindex: ${noindex}`)

  const seo = {
    canonical: seoUrl,
    description: seoDescription,
    image: seoImage[seoImageSlug]?.url,
    noindex,
    openGraph: {
      description: seoDescription,
      images: [
        {
          alt: seoImageDescription,
          height: seoImageData?.img?.height,
          url: seoImage[seoImageSlug]?.url,
          width: seoImageData?.img?.width,
        },
      ],
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
