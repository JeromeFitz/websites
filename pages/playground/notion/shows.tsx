import { Client } from '@notionhq/client'
import cx from 'clsx'
import Image from 'next/image'
import _map from 'lodash/map'
import _slice from 'lodash/slice'
import useSWR from 'swr'

import Layout from '~components/Layout'
import Seo from '~components/Seo'

import fetcher from '~lib/fetcher'

import { getPathVariables } from '~utils/notion/prepareNotionData'
import { DATABASES, TYPES, pageId } from '~pages/api/notion-new/[...catchAll]'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

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
    returnElement = <a href={href}>{returnElement}</a>
  }
  return returnElement
}

const getContentTypeDetail = (content) =>
  _map(content.text, (text: Text) => {
    return getTextAnnotations(text)
  })

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
    case 'title':
    case 'rich_text':
      // @todo(notion)
      return content[0].plain_text
    case 'files':
      // @todo(notion)
      return content[0].external.url
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

const CatchAll = (props) => {
  // const { relativeUrl, routeType, slug, url } = props
  const { relativeUrl, routeType } = props
  const { data, error } = useSWR(`/api/notion-new/${props.url}`, fetcher, {
    fallbackData: { info: props.info, content: props.content },
    revalidateOnFocus: false,
  })

  /**
   * @error or @loading
   */
  if (error || !data)
    return (
      <>
        <Layout>
          <h1>{error ? <>Error</> : <>Loading...</>}</h1>
        </Layout>
      </>
    )

  const { results } = data?.content
  const { results: info } = data?.info

  const items = _slice(results, 2)

  console.dir(`props`)
  console.dir(props)

  console.dir(`items`)
  console.dir(items)

  console.dir(`info`)
  console.dir(info)

  const { cover, icon, id, properties } = info[0]

  const coverImage = cover.external.url
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
        {!!routeType && <small>{` /${relativeUrl}`}</small>}
        {!!coverImage && (
          <Image alt="Cover" src={coverImage} height="500" width="500" />
        )}
        {!!published && <p>{datePublished.start}</p>}
        {!!tags && (
          <ul className={cx('mb-5 flex flex-row flex-wrap gap-2.5')}>{tags}</ul>
        )}
        {/* Dynamic Content */}
        {_map(items, (item: NotionBlock) => getContentType(item))}
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  // console.dir(`getStaticProps`)
  // console.dir(props)
  // const { catchAll } = props.params
  const catchAll = ['shows', 'alex-o-jerome']
  // const catchAll = ['events', '2021']
  // const catchAll = ['events', '2021', '09', '18', 'jerome-and']
  const pathVariables = getPathVariables(catchAll)
  const data = {
    info: await notion.databases.query({
      database_id: DATABASES[TYPES.shows],
      filter: {
        and: [
          {
            property: 'Slug',
            text: {
              equals: pathVariables.slug,
            },
          },
          // Remove Filter if preview is True
          !preview && {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    }),
    content: await notion.blocks.children.list({
      block_id: pageId,
    }),
  }
  return { props: { preview, ...data, ...pathVariables, ...props } }
}

export default CatchAll
