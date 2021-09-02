import cx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import _size from 'lodash/size'
import _map from 'lodash/map'
import useSWR from 'swr'

import Layout from '~components/Layout'
import Seo from '~components/Seo'

import fetcher from '~lib/fetcher'

import {
  getPathVariables,
  getStaticPathsCatchAll,
} from '~utils/notion/prepareNotionData'
import getPage from '~utils/notion/getPage'
import getSearch from '~utils/notion/getSearch'

interface Annotations {
  bold: boolean
  code: boolean
  color: string
  italic: boolean
  strikethrough: boolean
  underline: boolean
}

interface TextContent {
  content: string
  link: string | null
}

interface Text {
  annotations: Annotations
  href: string | null
  plain_text: string
  text: TextContent
  type: string
}

interface Url {
  url: string
}

interface Image {
  caption: Text
  external: Url
  type: string
}

interface NotionBlock {
  created_time: string
  has_children: string
  id: string
  last_edited_time: string
  object: string
  type: string
  //
  heading_1?: Text[]
  heading_2?: Text[]
  heading_3?: Text[]
  heading_4?: Text[]
  heading_5?: Text[]
  heading_6?: Text[]
  image?: Image
  paragraph?: Text[]
}

const getTextAnnotations = ({ href, plain_text, annotations }) => {
  let returnElement = <>{plain_text}</>
  if (annotations.bold) {
    returnElement = <strong>{returnElement}</strong>
  }
  if (annotations.code) {
    returnElement = <code>{returnElement}</code>
  }
  if (annotations.italic) {
    returnElement = <em>{returnElement}</em>
  }
  if (annotations.strikethrough) {
    returnElement = <s>{returnElement}</s>
  }
  if (annotations.underline) {
    returnElement = <u>{returnElement}</u>
  }
  if (href) {
    const link = getNextLink(href)
    // returnElement = <a href={href}>{returnElement}</a>
    returnElement = (
      <Link as={link.as} href={link.href}>
        <a
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200'
          )}
        >
          {returnElement}
        </a>
      </Link>
    )
  }
  return returnElement
}

const getContentTypeDetail = (content) =>
  _map(content.text, (text: Text) => {
    return getTextAnnotations(text)
  })

const getNextLink = (url: string) => {
  const urlTemp = url
    .replace('https://jeromefitzgerald.com', '')
    .replace('/playground/notion', '')
    .replace('//', '/')
  const [, routeType] = urlTemp.split('/')
  let link: any = {}

  switch (routeType) {
    case 'blog':
    case 'events':
    case 'people':
    case 'podcasts':
    case 'shows':
    case 'users':
    case 'venues':
      link = {
        as: `/playground/notion/${urlTemp}`,
        // href: !slug ? `/${routeType}` : `/${routeType}/[slug]`,
        href: `/playground/notion/[...catchAll]`,
      }
      break
    default:
      /* @note Must be a page. */
      link = {
        // as: url,
        // href: url === '/' ? '/' : `/playground/notion/[...catchAll]`,
        as: urlTemp,
        href:
          urlTemp === '/playground/notion'
            ? '/playground/notion'
            : `/playground/notion/[...catchAll]`,
      }
      break
  }
  return link
}

const getContentType = (item: NotionBlock) => {
  const { id, type } = item
  const content = item[type]

  switch (type) {
    /**
     * @note h1 = Title (Static Content) Type, increase Notion Headings
     */
    case 'heading_1':
      return <h2 key={id}>{getContentTypeDetail(content)}</h2>
    case 'heading_2':
      return <h3 key={id}>{getContentTypeDetail(content)}</h3>
    case 'heading_3':
      return <h4 key={id}>{getContentTypeDetail(content)}</h4>
    case 'paragraph':
      return <p key={id}>{getContentTypeDetail(content)}</p>
    case 'bulleted_list_item':
      return <li key={id}>{getContentTypeDetail(content)}</li>
    case 'numbered_list_item':
      return <li key={id}>{getContentTypeDetail(content)}</li>
    case 'image':
      return (
        <Image
          alt={`test`}
          key={id}
          src={content.external.url}
          width={250}
          height={750}
        />
      )
    case 'text':
    case 'title':
    case 'rich_text':
      // @todo(notion)
      return _size(content) > 0 ? content[0].plain_text : ''
    case 'files':
      // @todo(notion)
      return _size(content) > 0 ? content[0].external.url : ''
    case 'url':
      // @todo(notion)
      return content
    case 'date':
      // @todo(notion)
      return content
    case 'checkbox':
      // @todo(notion)
      return content
    case 'multi_select':
      // @todo(notion)
      return _map(content, (tag) => (
        <li key={tag.id} style={{ color: tag.color }}>
          {tag.name}
        </li>
      ))
    default:
      console.dir(`not supported yet: ${type}`)
      break
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getInfoType = (item: any) => {
  // console.dir(item)
  const date = item.properties['Date'].date.start.slice(0, 10)
  const slug = item.properties['Slug'].rich_text[0].plain_text
  const [year, month, day] = date.split('-')
  return (
    <>
      {/* {item.id}: {item.properties['Slug'].rich_text[0].plain_text} */}
      <Link
        as={`/playground/notion/events/${year}/${month}/${day}/${slug}`}
        href={`/playground/notion/[...catchAll]`}
        key={`link-${slug}`}
      >
        <a
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200'
          )}
        >
          {date}: {slug}
        </a>
      </Link>
    </>
  )
}

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

  // console.dir(`props`)
  // console.dir(props)

  /**
   * @info Odd behavior, but if listing page we need data swapped
   */

  const { data, error } = useSWR(() => `/api/notion-new/${url}`, fetcher, {
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

  const { info = null, content = null, items = null } = data

  // const { results: info } = data?.info
  // const { results: content } = data?.content
  // const { results: content } = data?.content

  console.dir(`info`)
  console.dir(info)

  console.dir(`content`)
  console.dir(content)

  console.dir(`items`)
  console.dir(items)

  const isInfoObjectPage = !!info && info?.object === 'page'
  console.dir(info?.object)

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
        {/* {isIndex && _map(items.results, (item) => getInfoType(item))} */}
        {/*  */}
        {/* {!isIndex && _map(content, (contentItem: NotionBlock) => getContentType(contentItem))} */}
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
  // // console.dir(`pathVariables`)
  // // console.dir(pathVariables)
  // const info = await getSearch(pathVariables, preview)
  // // console.dir(`info..`)
  // // console.dir(info)
  // const pageId = pathVariables.isIndex ? '' : info.results[0].id
  // const data = {
  //   info,
  //   content: pathVariables.isIndex ? [] : await getPage(pathVariables, pageId),
  // }
  let info = await getSearch(pathVariables, preview)
  const pageId = pathVariables.isIndex ? '' : info.results[0].id
  let content = await getPage(pathVariables, pageId)
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
  const data = { info, content, items }
  return { props: { preview, ...data, ...pathVariables, ...props } }
}

export const getStaticPaths = () => {
  return getStaticPathsCatchAll()
}

export default CatchAll
