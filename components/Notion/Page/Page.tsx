import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import _capitalize from 'lodash/capitalize'
import _map from 'lodash/map'
import _size from 'lodash/size'
import Image from 'next/image'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import ImageCaption from '~components/Notion/ImageCaption'
import Link from '~components/Notion/Link'
import Title from '~components/Notion/Title'
import Seo from '~components/Seo'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'
import { NotionBlock } from '~utils/notion'
import getContentType from '~utils/notion/getContentType'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

// import Breadcrumb from '~components/Notion/Breadcrumb'
// import Listing from '~components/Notion/Listing'
// import Meta from '~components/Notion/Meta'
// import getNextLink from '~utils/getNextLink'

const Page = ({ data, props }) => {
  const {
    // content: contentFallback,
    // info: infoFallback,
    images: imagesFallback,
    // items: itemsFallback,
    // hasMeta,
    isPage,
    isIndex,
    // meta,
    routeType,
    // slug,
    url,
  } = props

  /**
   * @images
   */
  const slugger = new Slugger()
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  useEffect(() => {
    mutate('images', { ...images, ...imagesFallback }, false)
  }, [images, imagesFallback, mutate])

  /**
   * @data
   */
  const { info = null, content = null, items = null } = data

  const isInfoObjectPage = !!info && info?.object === 'page'

  const {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cover,
    icon,
    id,
    data: properties,
  } = isInfoObjectPage ? info : info.results[0]
  const emoji = !!icon?.emoji ? icon.emoji : ''

  const {
    noIndex,
    published,
    seoDescription,
    seoImage,
    seoImageDescription,
    tags,
    title,
  } = properties

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
  // const isEvent = !isIndex
  // // const showId = !!properties['ShowIDs'] && getContentType(properties['ShowIDs'])
  // const peopleCast =
  //   !!properties['People.Cast'] && getContentType(properties['People.Cast'])

  // // console.dir(`showId`)
  // // console.dir(showId)
  // // console.dir(`peopleCast`)
  // // console.dir(peopleCast)

  // // console.dir(`id`)
  // // console.dir(id)

  return (
    <>
      {/* SEO Content */}
      <Seo {...seo} />
      {/* Template Content */}
      <Title emoji={emoji} id={id} title={title} />
      {/* Breadcrumb Content */}
      {/* {!isIndex && <Breadcrumb title={title} />} */}
      <motion.div
        key={id}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ delay: 0.25, duration: 1, type: 'linear' }}
        className={cx('flex flex-col')}
      >
        {!!seoImageData && !!seoImageData.base64 && (
          <div className="w-2/3 mx-auto">
            <Image
              alt={seoImageDescription}
              blurDataURL={seoImageData?.base64}
              key={seoImageSlug}
              placeholder="blur"
              title={seoImageDescription}
              {...seoImageData?.img}
            />
            <ImageCaption caption={seoImageDescription} />
          </div>
        )}
        {!!tags && _size(tags) > 0 && (
          <ul
            key="tagsKeyDog"
            className={cx('mb-5 flex flex-row flex-wrap gap-2.5')}
          >
            {_map(tags, (t, tindex) => {
              const tag = tags[tindex]
              return (
                <li
                  className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
                  key={tag.id}
                >
                  {tag.name}
                </li>
              )
            })}
          </ul>
        )}
        {/* Dynamic */}
        {/* Content */}
        {_map(content.results, (contentItem: NotionBlock) =>
          getContentType(contentItem, images)
        )}
        {/* Items */}
        {isIndex && !isPage && (
          <>
            <h5 className="text-3xl font-bold mt-2 pt-2 pb-2">
              {_capitalize(routeType)}
            </h5>
            {_map(items.results, (i, iIndex) => {
              const item = items.results[iIndex]
              if (item.data.slug === null || item.data.slug === undefined) {
                return null
              }
              return (
                <>
                  <Link key={iIndex} item={item} routeType={routeType} />
                </>
              )
            })}
          </>
        )}
        {/* {isEvent && showId && <Meta id={showId} />} */}
        {/* {isEvent && peopleCast && <Listing items={peopleCast} slug={slug} />} */}
        {/* {isEvent && peopleCast && (
            <>
              <h5>Cast</h5>
              {peopleCast.map((person) => (
                <Meta key={person.id} id={person.id} />
              ))}
            </>
          )} */}
      </motion.div>
    </>
  )
}

export default Page
