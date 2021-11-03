import cx from 'clsx'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'
import NextImage from 'next/image'
import React from 'react'

import ImageCaption from '~components/Notion/ImageCaption'
// import Toggle from '~components/Notion/Toggle'
// import Quote from '~components/Notion/Quote'
import { IMAGE__PLACEHOLDER, WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import { NotionBlock } from '~utils/notion'
import getContentTypeDetail from '~utils/notion/getContentTypeDetail'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {})
const Toggle = dynamic(() => import('~components/Notion/Toggle'), {})

class ContentTypes {
  constructor(private contentType: string) {}

  getContentType(): string {
    return this.contentType
  }

  callout({ content, id }) {
    if (_size(content) > 0) {
      const {
        icon: { emoji },
      } = content
      return (
        <div
          key={id}
          className={cx(
            'rounded-xl bg-secondary text-primary m-8 p-8 flex',
            'align-middle justify-start items-start',
            'text-2xl leading-normal'
          )}
        >
          <span className={cx('mb-0 pb-0')}>
            {emoji && <Emoji character={emoji} />}
          </span>
          <h6 className={cx('ml-4')}>{getContentTypeDetail({ content, id })}</h6>
        </div>
      )
    }
    return null
  }

  column({ content, has_children, id }) {
    if (!has_children) return null
    const nodeContent = _map(content.column.children, (content) =>
      getContentType(content)
    )
    console.dir(`> nodeContent`)
    console.dir(nodeContent)
    // return <React.Fragment key={id}>{nodeContent}</React.Fragment>
    return (
      <div key={id} className={cx('column flex flex-col my-8 md:my-0')}>
        {nodeContent}
      </div>
    )
  }

  columnList({ content, id }) {
    console.dir(`> columnList`)
    console.dir(id)
    console.dir(content)
    const nodeContentParent = _map(content.children, (child) =>
      this.column({ content: child, has_children: child.has_children, id: child.id })
    )
    console.dir(`> nodeContentParent`)
    return (
      <div key={id} className={cx('columns flex flex-col md:flex-row my-8')}>
        {nodeContentParent}
      </div>
    )
  }
  ['column_list']({ content, id }) {
    return this.columnList({ content, id })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  content({ content, id }) {
    return content
  }
  ['checkbox']({ content, id }) {
    return this.content({ content, id })
  }
  ['date']({ content, id }) {
    return this.content({ content, id })
  }
  ['url']({ content, id }) {
    return this.content({ content, id })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  divider({ content, id }) {
    return (
      <div className={cx('spacer bg-gray-600 dark:bg-gray-300 my-6')} key={id} />
    )
  }

  files({ content, id }) {
    return _size(content) > 0 ? (
      <React.Fragment key={id}>content[0].external.url</React.Fragment>
    ) : null
  }

  /**
   * @note h1 = Title (Static Content) Type, increase Notion Headings
   */
  heading_1({ content, id }) {
    return (
      <h2 key={id} style={WEBKIT_BACKGROUND__BREAK}>
        {getContentTypeDetail({ content, id })}
      </h2>
    )
  }

  heading_2({ content, id }) {
    return (
      <h3 key={id} style={WEBKIT_BACKGROUND__BREAK}>
        {getContentTypeDetail({ content, id })}
      </h3>
    )
  }

  heading_3({ content, id }) {
    return (
      <h4 key={id} style={WEBKIT_BACKGROUND__BREAK}>
        {getContentTypeDetail({ content, id })}
      </h4>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  image({ content, id, images, item }) {
    const contentHack = item.image
    const imageSrc =
      contentHack?.type === 'external'
        ? contentHack?.external.url
        : contentHack?.file.url
    const slugger = new Slugger()
    const imageSlug = slugger.slug(imageSrc)
    const imageData = !!imageSlug && !!images && images[imageSlug]
    const caption =
      (_size(contentHack?.caption) > 0 && contentHack?.caption[0]?.plain_text) || ''
    // console.dir(`getContentType`)
    // console.dir(`imageSlug: ${imageSlug}`)
    // console.dir(images)
    // console.dir(`imageData`)
    // console.dir(imageData)

    return !!imageData ? (
      <div className="w-2/3 mx-auto" key={id}>
        <NextImage
          alt={caption}
          blurDataURL={imageData.base64}
          key={imageSlug}
          placeholder="blur"
          title={caption}
          {...imageData.img}
        />
        {!!caption && <ImageCaption caption={caption} />}
      </div>
    ) : (
      <div className="w-2/3 h-full mx-auto overflow-hidden" key={id}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={caption}
          className="nonNextNoStaticProps"
          src={contentHack?.external?.url}
          style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100%',
            backgroundImage: `url(${IMAGE__PLACEHOLDER.meta.base64})`,
          }}
        />
        {!!caption && <ImageCaption caption={caption} />}
      </div>
    )
  }

  listItem({ content, id }) {
    return <li key={id}>{getContentTypeDetail({ content, id })}</li>
  }
  ['bulleted_list_item']({ content, id }) {
    return this.listItem({ content, id })
  }
  ['numbered_list_item']({ content, id }) {
    return this.listItem({ content, id })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  multi_select({ content, id }) {
    return _map(content, (tag) => (
      <li
        className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
        key={tag.id}
      >
        {tag.name}
      </li>
    ))
  }

  paragraph({ content, id }) {
    return <p key={id}>{getContentTypeDetail({ content, id })}</p>
  }

  quote({ content, id }) {
    if (_size(content) > 0) {
      return (
        <div key={id} className={cx('py-4')}>
          <div
            className={cx(
              'rounded-xl bg-secondary text-primary m-8 p-8 flex',
              'align-middle justify-start items-start',
              'text-2xl leading-normal'
            )}
          >
            <span className={cx('mb-0 pb-0')}>
              <Emoji character={`📰️`} />
            </span>
            <blockquote className={cx('ml-4')}>
              {getContentTypeDetail({ content, id })}
            </blockquote>
          </div>
        </div>
      )
    }
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  relation({ content, id }) {
    return !!content[0] && content
  }

  text({ content, id }) {
    return _size(content) > 0 ? (
      <React.Fragment key={id}>content[0].plain_text</React.Fragment>
    ) : null
  }
  ['rich_text']({ content, id }) {
    return this.text({ content, id })
  }
  ['title']({ content, id }) {
    return this.text({ content, id })
  }

  to_do({ content, id }) {
    return (
      <label
        className={cx('flex items-center space-x-3')}
        key={`${id}--to_do`}
        htmlFor={id}
      >
        <input
          disabled
          type="checkbox"
          id={id}
          className={cx(
            'h-6 w-6',
            'form-tick appearance-none border border-gray-300 rounded-md  focus:outline-none',
            content.checked && 'checked:bg-blue-600 checked:border-transparent'
          )}
          checked={content.checked}
        />
        <span className={cx('text-gray-900 font-medium')}>
          {content.text[0].plain_text}
        </span>
      </label>
    )
  }

  toggle({ content, has_children, id }) {
    if (!has_children) return null
    const title = getContentTypeDetail({ content, id })
    const nodeContent = _map(content.children, (content) => getContentType(content))
    return (
      <Toggle key={id} title={title}>
        {nodeContent}
      </Toggle>
    )
  }
}

const getContentType = (item: NotionBlock, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]
  // console.dir(`item`)
  // console.dir(item)
  // console.dir(`type: ${type}`)

  // @question(constructor) this needs to be reset each time
  const getContentTypes = new ContentTypes('')

  return getContentTypes[type] ? (
    getContentTypes[type]({ content, has_children, id, images, item })
  ) : (
    // console.dir(`@unsupported(notion): ${type}`)
    <React.Fragment key={id} />
  )
}

export default getContentType
