import { format, parseISO } from 'date-fns'
import Slugger from 'github-slugger'
import useSWR from 'swr'

import PageHeading from '~components/PageHeading'
import Seo from '~components/Seo'
import { ROUTE_TYPES } from '~utils/notion/helper'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ id, children, data, routeType, url }) => {
  const slugger = new Slugger()
  const { data: images } = useSWR('images')

  const {
    isIndexed,
    isPublished,
    seoDescription: description,
    seoImage,
    seoImageDescription,
    title,
  } = data

  // @todo(external)
  const seoImageSlug = slugger.slug(seoImage)
  const seoImageData = !!images && images[seoImageSlug]

  const seoUrl = `https://jeromefitzgerald.com/${url}`

  let seoDescription = description
  if (routeType === ROUTE_TYPES.events && data?.slug !== ROUTE_TYPES.events) {
    // const date = format(parseISO(data?.date?.start), `EEEE, MMMM do`)
    const date = format(
      parseISO(data?.date?.start),
      `EEE MM/dd hh:mma`
    ).toUpperCase()
    seoDescription = `${date} – ${seoDescription}`
  }

  const seo = {
    canonical: seoUrl,
    description: seoDescription,
    image: seoImage,
    noindex: !isPublished || !isIndexed,
    openGraph: {
      description: seoDescription,
      images: [
        {
          alt: seoImageDescription,
          height: seoImageData?.img?.height,
          url: seoImage,
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
