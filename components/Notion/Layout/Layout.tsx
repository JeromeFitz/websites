import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import useSWR from 'swr'

import Seo from '~components/Seo'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'
const Layout = ({ id, children, data, url }) => {
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
  const seoImageSlug = slugger.slug(seoImage?.url)
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
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ delay: 0.25, duration: 1, type: 'linear' }}
        className={cx('flex flex-col')}
      >
        {children}
      </motion.div>
    </>
  )
}

export default Layout
