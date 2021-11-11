import Slugger from 'github-slugger'
import useSWR from 'swr'

import PageHeading from '~components/PageHeading'
import Seo from '~components/Seo'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = ({ id, children, data, routeType, url }) => {
  const slugger = new Slugger()
  const { data: images } = useSWR('images')

  const {
    noIndex,
    published,
    seoDescription,
    seoImage,
    seoImageDescription,
    title,
  } = data

  // @todo(external)
  const seoImageSlug = slugger.slug(seoImage)
  const seoImageData = !!images && images[seoImageSlug]

  const seoUrl = `https://jeromefitzgerald.com/${url}`
  const seo = {
    canonical: seoUrl,
    description: seoDescription,
    image: seoImage,
    noindex: !published || noIndex,
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
      <PageHeading title={seo.title} description={seo.description} />
      {children}
    </>
  )
}

export default Layout
