import cx from 'clsx'
import Image from 'next/image'
import _map from 'lodash/map'
import useSWR from 'swr'

import Layout from '~components/Layout'
import Seo from '~components/Seo'

import fetcher from '~lib/fetcher'

import { getPathVariables } from '~utils/notion/prepareNotionData'
import getPage from '~utils/notion/getPage'
import getSearch from '~utils/notion/getSearch'
import getContentType from '~utils/notion/getContentType'
import { NotionBlock } from '~utils/notion'

const CatchAll = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
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
    slug,
    url,
  } = props

  const { data, error } = useSWR(() => `/api/notion/${url}`, fetcher, {
    fallbackData: {
      info: infoFallback,
      content: contentFallback,
      items: itemsFallback,
    },
    revalidateOnFocus: false,
  })

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { info = null, content = null, items = null } = data
  const isInfoObjectPage = !!info && info?.object === 'page'
  // console.dir(info?.object)

  const { cover, icon, id, properties } = isInfoObjectPage ? info : info.results[0]

  const coverImage = cover?.external?.url
  const emoji = !!icon?.emoji ? `${icon.emoji} ` : ''
  const title = getContentType(properties.Title)
  const seoDescription = getContentType(properties['SEO.Description'])
  const seoImage = getContentType(properties['SEO.Image'])
  const seoImageDescription = getContentType(properties['SEO.Image.Description'])
  // const twitterUrl = getContentType(properties['Social.Twitter'])
  const datePublished = getContentType(properties['Date.Published'])
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
  return (
    <>
      <Layout>
        {/* SEO Content */}
        <Seo {...seo} />
        {/* Template Content */}
        <h1 key={id}>
          {emoji}
          {` `}
          {title}
        </h1>
        {!!slug && <small>{` /${routeType}/${slug}`}</small>}
        {!!relativeUrl && <small>{` /${relativeUrl}`}</small>}
        {!!published && <small>Published: {datePublished.start}</small>}
        {!!coverImage && (
          <Image alt="Cover" src={coverImage} height="500" width="500" />
        )}

        {!!tags && (
          <ul className={cx('mb-5 flex flex-row flex-wrap gap-2.5')}>{tags}</ul>
        )}
        {/* Dynamic Content */}
        {_map(content.results, (contentItem: NotionBlock) =>
          getContentType(contentItem)
        )}
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  console.dir(props)
  const homepageSlug = 'homepage-2021'
  const catchAll = [homepageSlug]
  console.dir(catchAll)
  const pathVariables = getPathVariables(catchAll)
  const isHomepage = pathVariables.slug === homepageSlug
  let info = await getSearch(pathVariables, preview)
  const pageId =
    pathVariables.isIndex && !isHomepage ? undefined : info.results[0].id
  let content = await getPage(pathVariables, pageId)
  let items = null

  /**
   * @isIndex override (homepage|blog|events)
   */
  if (pathVariables.isIndex && !isHomepage) {
    const _info = info
    info = content
    content = await getPage(pathVariables, info?.id)
    items = _info
  }
  const data = { info, content, items }
  return { props: { preview, ...data, ...pathVariables, ...props } }
}

export default CatchAll
