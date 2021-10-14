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

const getContentType = (item: NotionBlock, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]
  const slugger = new Slugger()

  // console.dir(`item`)
  // console.dir(item)
  // // console.dir(`type: ${type}`)

  switch (type) {
    /**
     * @note h1 = Title (Static Content) Type, increase Notion Headings
     */
    case 'heading_1':
      // console.dir(`heading_1`)
      // console.dir(content)
      return (
        <h2 key={id} style={WEBKIT_BACKGROUND__BREAK}>
          {getContentTypeDetail(content)}
        </h2>
      )
    case 'heading_2':
      return (
        <h3 key={id} style={WEBKIT_BACKGROUND__BREAK}>
          {getContentTypeDetail(content)}
        </h3>
      )
    case 'heading_3':
      return (
        <h4 key={id} style={WEBKIT_BACKGROUND__BREAK}>
          {getContentTypeDetail(content)}
        </h4>
      )
    case 'paragraph':
      return <p key={id}>{getContentTypeDetail(content)}</p>
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return <li key={id}>{getContentTypeDetail(content)}</li>
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
        <li
          className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
          key={tag.id}
        >
          {tag.name}
        </li>
      ))
    case 'relation':
      return !!content[0] && content
    case 'quote':
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
                {getContentTypeDetail(content)}
              </blockquote>
            </div>
          </div>
        )
      }
      return null
    case 'callout':
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
            <h6 className={cx('ml-4')}>{getContentTypeDetail(content)}</h6>
          </div>
        )
      }
      return null
    case 'toggle':
      if (!has_children) return null
      const title = getContentTypeDetail(content)
      const nodeContent = _map(content.children, (content) =>
        getContentType(content)
      )
      return (
        <Toggle key={id} title={title}>
          {nodeContent}
        </Toggle>
      )
    case 'embed':
      console.dir(`@todo(notion) embed`)
      // console.dir(content)
      return null
    case 'code':
      console.dir(`@todo(notion) code`)
      // console.dir(content)
      return null
    case 'to_do':
      // console.dir(`@todo(notion) to_do`)
      // console.dir(content)
      return (
        <label className={cx('flex items-center space-x-3')} key={id}>
          <input
            disabled
            type="checkbox"
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
    case 'image':
    default:
      console.dir(`@unsupported(notion): ${type}`)
      console.dir(item)
      if (!!item && item.hasOwnProperty('image')) {
        const contentHack = item.image
        const imageSlug = slugger.slug(contentHack?.external?.url)
        const imageData = !!imageSlug && !!images && images[imageSlug]
        const caption =
          _size(contentHack?.caption) > 0 && contentHack?.caption[0]?.plain_text
        // console.dir(`getContentType`)
        // console.dir(`imageSlug: ${imageSlug}`)
        // console.dir(images)
        // console.dir(`imageData`)
        // console.dir(imageData)

        return !!imageData ? (
          <div className="w-2/3 mx-auto" key={id}>
            <NextImage
              alt={!!caption ? caption : ''}
              blurDataURL={imageData.base64}
              key={imageSlug}
              placeholder="blur"
              title={!!caption ? caption : ''}
              {...imageData.img}
            />
            {!!caption && <ImageCaption caption={caption} />}
          </div>
        ) : (
          <div className="w-2/3 h-full mx-auto overflow-hidden" key={id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={!!caption ? caption : ''}
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

      break
  }
}

export default getContentType
