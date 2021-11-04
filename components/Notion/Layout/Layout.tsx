import { Heading, Paragraph } from '@modulz/design-system'
import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import useSWR from 'swr'

import Seo from '~components/Seo'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'
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
    image: seoImage?.url,
    noindex: !published || noIndex,
    openGraph: {
      description: seoDescription,
      images: [
        {
          alt: seoImageDescription,
          height: seoImageData?.img?.height,
          url: seoImage?.url,
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
      {/* SEO Content */}
      <Seo {...seo} />
      <motion.div
        key={id}
        initial="enter"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ delay: 0, duration: 0.25, type: 'linear' }}
        className={cx(routeType, 'flex flex-col')}
      >
        <Heading size="4">{seo.title}</Heading>
        <Paragraph size="2" as="p" css={{ mt: '$2', mb: '$7' }}>
          {seo.description}
        </Paragraph>
        {children}
      </motion.div>
    </>
  )
}

export default Layout
