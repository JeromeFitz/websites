import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import _capitalize from 'lodash/capitalize'
import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _size from 'lodash/size'
import Image from 'next/image'
import { getPlaiceholder } from 'plaiceholder'
import { useEffect } from 'react'
import useSWR, { useSWRConfig } from 'swr'

import Layout from '~components/Layout'
import ImageCaption from '~components/Notion/ImageCaption'
import Link from '~components/Notion/Link'
// import Meta from '~components/Notion/Meta'
// import Listing from '~components/Notion/Listing'
import Title from '~components/Notion/Title'
import Seo from '~components/Seo'
import { MOTION_PAGE_VARIANTS } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getPathVariables from '~lib/notion/getPathVariables'
import { NotionBlock } from '~utils/notion'
import getContentType from '~utils/notion/getContentType'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'
import { getStaticPathsCatchAll } from '~utils/notion/prepareNotionData'
// import Breadcrumb from '~components/Notion/Breadcrumb'
// import getNextLink from '~utils/getNextLink'

/**
 * @plaiceholder
 */

const filterImages = (data, type) => {
  switch (type) {
    case 'info':
      return !!data && [data?.seoImage]
    case 'content':
      return !!data && _filter(data, { object: 'block', type: 'image' })
    case 'items':
    default:
      return []
  }
}

const CatchAll = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
    images: imagesFallback,
    items: itemsFallback,
    // hasMeta,
    isPage,
    isIndex,
    // meta,
    routeType,
    // slug,
    url,
  } = props

  console.dir(`props`)
  console.dir(props)

  /**
   * @info Odd behavior, but if listing page we need data swapped
   */
  const { data, error } = useSWR(
    () => (!!url ? `/api/notion/${url}` : null),
    fetcher,
    {
      fallbackData: {
        info: infoFallback,
        content: contentFallback,
        items: itemsFallback,
      },
      revalidateOnFocus: true,
    }
  )

  const slugger = new Slugger()
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  // console.dir(`images`)
  // console.dir(images)

  useEffect(() => {
    mutate('images', { ...images, ...imagesFallback }, false)
  }, [images, imagesFallback, mutate])

  /**
   * @error or @loading
   */
  if (error || !data || data?.content === undefined || data?.info === undefined)
    return (
      <>
        <Layout>
          <h1 key={`error-loading-h1`}>{error ? <>Error</> : <>Loading...</>}</h1>
        </Layout>
      </>
    )

  // console.dir(data)

  const { info = null, content = null, items = null } = data

  // // const { results: info } = data?.info
  // // const { results: content } = data?.content
  // // const { results: content } = data?.content

  // console.dir(`info`)
  // console.dir(info)

  // console.dir(`content`)
  // console.dir(content)

  // console.dir(`items`)
  // console.dir(items)

  const isInfoObjectPage = !!info && info?.object === 'page'
  // console.dir(info?.object)

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
          height: 1500,
          url: seoImage,
          width: 1500,
        },
      ],
      title,
      url: seoUrl,
    },
    title,
  }

  // @todo(external)
  const seoImageSlug = slugger.slug(seoImage?.url)
  const seoImageData = images[seoImageSlug]
  console.dir(`images`)
  console.dir(images)

  const isEvent = !isIndex
  // const showId = !!properties['ShowIDs'] && getContentType(properties['ShowIDs'])
  const peopleCast =
    !!properties['People.Cast'] && getContentType(properties['People.Cast'])

  // console.dir(`showId`)
  // console.dir(showId)
  // console.dir(`peopleCast`)
  // console.dir(peopleCast)

  // console.dir(`id`)
  // console.dir(id)

  return (
    <>
      <Layout>
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
          {!!seoImageData && (
            <div className="w-2/3 mx-auto">
              <Image
                alt={seoImageDescription}
                blurDataURL={seoImageData.base64}
                key={seoImageSlug}
                placeholder="blur"
                title={seoImageDescription}
                {...seoImageData.img}
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
            getContentType(contentItem)
          )}
          {/* Items */}
          {isIndex && !isPage && (
            <>
              <h5 className="text-3xl font-bold mt-2 pt-2 pb-2">
                {_capitalize(routeType)}
              </h5>
              {_map(items.results, (i, iIndex) => {
                const item = items.results[iIndex]
                console.dir(`i`)
                console.dir(i)
                console.dir(`item`)
                console.dir(item)
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
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  const { catchAll } = props.params
  const clear = false
  const pathVariables = getPathVariables(catchAll)
  const data = await getCatchAll({ preview, clear, catchAll })

  /**
   * @plaiceholder/next
   */
  // const images = []
  const slugger = new Slugger()
  const infoImagesFilter =
    data.info.object === 'page'
      ? filterImages(data.info?.data, 'info')
      : filterImages(data.info?.results[0]?.properties, 'info')
  console.dir(`infoImagesFilter`)
  console.dir(infoImagesFilter)

  const infoImagesAwait = infoImagesFilter.map(async (imageResult) => {
    if (!imageResult) {
      return null
    }
    const url = !!imageResult && imageResult?.url

    if (!url) {
      return null
    }

    const { base64, img } = await getPlaiceholder(url)
    const id = slugger.slug(url)

    return { base64, id, img, url }
  })
  const infoImages = await Promise.all(infoImagesAwait)
  // console.dir(`infoImages`)
  // console.dir(infoImages)

  // const contentImagesFilter =
  //   !pathVariables.isIndex && filterImages(content?.results, 'content')
  // const contentImagesAwait =
  //   !!contentImagesFilter &&
  //   contentImagesFilter.map(async (imageResult) => {
  //     const imageExternalUrl =
  //       imageResult.image.type === 'external'
  //         ? imageResult.image.external.url
  //         : imageResult.image.external.url

  //     const { base64, img } = await getPlaiceholder(imageExternalUrl)
  //     const id = slugger.slug(imageExternalUrl)
  //     return { base64, id, img, url: imageExternalUrl }
  //   })
  // const contentImages =
  //   !!contentImagesAwait && (await Promise.all(contentImagesAwait))
  // // console.dir(`contentImages`)
  // // console.dir(contentImages)

  // // _map(newImages, (image) => console.dir(image))
  // // const mergeImages = _merge(...infoImages, ...contentImages)
  const mergeImages = {}
  !!infoImages &&
    infoImages[0] &&
    _map(infoImages, (image: any) => (mergeImages[image.id] = image))
  // _map(contentImages, (image: any) => (mergeImages[image.id] = image))

  const dataReturn = { ...data, images: mergeImages }
  return { props: { preview, ...dataReturn, ...pathVariables, ...props } }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
