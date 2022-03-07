/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Note, PageHeading } from '@jeromefitz/design-system/components'
import { format, parseISO } from 'date-fns'
import useSWR from 'swr'

import Seo from '~components/Seo'
import { nextSeo, notionConfig } from '~config/index'

const { NOTION } = notionConfig

// eslint-disable-next-line complexity
const Layout = ({ id, children, info, preview = false, routeType, url }) => {
  const { data: images } = useSWR('images')
  const { properties } = info
  if (properties === undefined) return null

  const {
    isIndexed,
    isPublished,
    seoDescription: pageHeadingDescription,
    seoImage: _seoImage,
    seoImageDescription,
    slug,
    title,
  } = properties

  // @todo(external) first key is image slug
  const seoImageSlug = !!_seoImage ? Object.keys(_seoImage)[0] : ''
  const seoImageData = !!images && images[seoImageSlug]
  const seoUrl = `${nextSeo.url}/${!!url ? url : ''}`

  /**
   * @note SEO Description
   * For SEO we want some additive information for certain routes
   * Visually we _do not_ want those additives to duplicate information
   *
   * - pageHeadingDescription => Visual
   * - seoDescription => SEO
   */
  let seoDescription = pageHeadingDescription
  if (routeType === NOTION.EVENTS.routeType && slug !== NOTION.EVENTS.routeType) {
    const date = format(
      parseISO(properties?.dateEvent?.start),
      `EEE MM/dd hh:mma`
    ).toUpperCase()
    seoDescription = `${date} – ${seoDescription}`
  }

  const noindex = !isPublished || !isIndexed
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
      {preview && (
        <Note>
          Preview Mode.{' '}
          <Button
            as="a"
            css={{
              cursor: 'pointer',
              ml: '$8',
              mt: '$1',
              '@bp1': { ml: '$3', mt: '0' },
            }}
            ghost
            href="/api/v1/cms/preview-clear?clear=true"
            size="2"
            variant="red"
          >
            Exit Preview Mode
          </Button>
        </Note>
      )}
      <PageHeading title={seo.title} description={pageHeadingDescription} />
      {children}
    </>
  )
}

export default Layout
