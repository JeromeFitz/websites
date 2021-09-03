import { useEffect } from 'react'
import cx from 'clsx'
import Image from 'next/image'
import _map from 'lodash/map'
import useSWR, { useSWRConfig } from 'swr'

import Layout from '~components/Layout'
import Breadcrumb from '~components/Notion/Breadcrumb'
import Meta from '~components/Notion/Meta'
import Link from '~components/Notion/Link'
import Seo from '~components/Seo'

import fetcher from '~lib/fetcher'

// import getNextLink from '~utils/getNextLink'
import {
  getPathVariables,
  getStaticPathsCatchAll,
} from '~utils/notion/prepareNotionData'
import getPage from '~utils/notion/getPage'
import getSearch from '~utils/notion/getSearch'
import getContentType from '~utils/notion/getContentType'
import { NotionBlock } from '~utils/notion'

/**
 * @plaiceholder
 */
import Slugger from 'github-slugger'
import { getPlaiceholder } from 'plaiceholder'
import _filter from 'lodash/filter'

const filterImages = (data, type) => {
  switch (type) {
    case 'info':
      return data['SEO.Image']
    case 'content':
      return _filter(data, { object: 'block', type: 'image' })
    case 'list':
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isIndex,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isPage,
    relativeUrl,
    routeType,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    slug,
    url,
  } = props

  // console.dir(`props`)
  // console.dir(props)

  /**
   * @info Odd behavior, but if listing page we need data swapped
   */

  const { data, error } = useSWR(() => `/api/notion/${url}`, fetcher, {
    fallbackData: {
      info: infoFallback,
      content: contentFallback,
      items: itemsFallback,
    },
    revalidateOnFocus: true,
  })

  const slugger = new Slugger()
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images', { fallbackData: imagesFallback })
  console.dir(`images`)
  console.dir(images)

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
          <h1>{error ? <>Error</> : <>Loading...</>}</h1>
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cover, icon, id, properties } = isInfoObjectPage ? info : info.results[0]

  // const coverImage = cover?.external?.url
  const emoji = !!icon?.emoji ? `${icon.emoji} ` : ''
  const title = getContentType(properties.Title)
  const seoDescription = getContentType(properties['SEO.Description'])
  const seoImage = getContentType(properties['SEO.Image'])
  const seoImageDescription = getContentType(properties['SEO.Image.Description'])
  // const twitterUrl = getContentType(properties['Social.Twitter'])
  // const datePublished = getContentType(properties['Date.Published'])
  const published = getContentType(properties['Published'])
  const noIndex = getContentType(properties['NoIndex'])
  const tags = getContentType(properties['Tags'])

  const seoUrl = `https://jeromefitzgerald.com/${relativeUrl}`
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
  const seoImageSlug = slugger.slug(properties['SEO.Image']?.files[0]?.external.url)
  const seoImageData = images[seoImageSlug]

  const _title = `${emoji} ${title}`

  const isEvent = !isIndex
  const showId = !!properties['ShowIDs'] && getContentType(properties['ShowIDs'])

  return (
    <>
      <Layout>
        {/* SEO Content */}
        <Seo {...seo} />
        {/* Breadcrumb Content */}
        <Breadcrumb emoji={emoji} title={title} />
        {/* Template Content */}
        <h1 key={id}>{_title}</h1>
        {!!seoImageData && (
          <Image
            alt={seoImageDescription}
            blurDataURL={seoImageData.base64}
            key={seoImageSlug}
            placeholder="blur"
            title={seoImageDescription}
            {...seoImageData.img}
          />
        )}

        {!!tags && (
          <ul className={cx('mb-5 flex flex-row flex-wrap gap-2.5')}>{tags}</ul>
        )}
        {/* Dynamic Content */}
        {isIndex &&
          _map(items.results, (item) => <Link item={item} routeType={routeType} />)}
        {/*  */}
        {!isIndex &&
          _map(content.results, (contentItem: NotionBlock) =>
            getContentType(contentItem)
          )}
        {isEvent && <Meta id={showId} />}
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  // console.dir(`getStaticProps`)
  // console.dir(props)
  const { catchAll } = props.params
  // const catchAll = ['shows', 'jfle']
  // const catchAll = ['events', '2020']
  // const catchAll = ['events', '2020', '05', '01', 'jerome-and']
  const pathVariables = getPathVariables(catchAll)
  // console.dir(`pathVariables`)
  // console.dir(pathVariables)
  let info = await getSearch(pathVariables, preview)
  console.dir(`info`)
  console.dir(info)
  const pageId = pathVariables.isIndex ? undefined : info.results[0].id
  let content = await getPage(pathVariables, pageId)
  // console.dir(`content`)
  // console.dir(content)
  let items = null

  /**
   * @isIndex override (blog|events)
   */
  if (pathVariables.isIndex) {
    const _info = info
    info = content
    content = await getPage(pathVariables, info?.id)
    items = _info
  }

  /**
   * @plaiceholder/next
   */
  // const images = []
  const slugger = new Slugger()
  const infoImagesFilter =
    info.object === 'page'
      ? filterImages(info?.properties, 'info')
      : filterImages(info?.results[0]?.properties, 'info')
  console.dir(`infoImagesFilter`)
  console.dir(infoImagesFilter)
  console.dir(info)
  const infoImagesAwait = infoImagesFilter.files.map(async (imageResult) => {
    console.dir(`imageResult`)
    console.dir(imageResult)
    const imageExternalUrl =
      imageResult.type === 'external'
        ? imageResult.external.url
        : imageResult.external.url

    const { base64, img } = await getPlaiceholder(imageExternalUrl)
    const id = slugger.slug(imageExternalUrl)
    return { base64, id, img, url: imageExternalUrl }
  })
  const infoImages = await Promise.all(infoImagesAwait)
  console.dir(`infoImages`)
  console.dir(infoImages)

  const contentImagesFilter =
    !pathVariables.isIndex && filterImages(content?.results, 'content')
  const contentImagesAwait =
    !!contentImagesFilter &&
    contentImagesFilter.map(async (imageResult) => {
      const imageExternalUrl =
        imageResult.image.type === 'external'
          ? imageResult.image.external.url
          : imageResult.image.external.url

      const { base64, img } = await getPlaiceholder(imageExternalUrl)
      const id = slugger.slug(imageExternalUrl)
      return { base64, id, img, url: imageExternalUrl }
    })
  const contentImages =
    !!contentImagesAwait && (await Promise.all(contentImagesAwait))
  console.dir(`contentImages`)
  console.dir(contentImages)

  // _map(newImages, (image) => console.dir(image))
  // const mergeImages = _merge(...infoImages, ...contentImages)
  const mergeImages = {}
  _map(infoImages, (image: any) => (mergeImages[image.id] = image))
  _map(contentImages, (image: any) => (mergeImages[image.id] = image))

  const data = { info, content, images: mergeImages, items }
  return { props: { preview, ...data, ...pathVariables, ...props } }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
