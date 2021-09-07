import cx from 'clsx'
import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _size from 'lodash/size'
import Image from 'next/image'
import React from 'react'

import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import { NotionBlock } from '~utils/notion'
import getContentTypeDetail from '~utils/notion/getContentTypeDetail'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

const getContentType = (item: NotionBlock, images: any[]) => {
  const { id, type } = item
  const content = item[type]

  switch (type) {
    /**
     * @note h1 = Title (Static Content) Type, increase Notion Headings
     */
    case 'heading_1':
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
      return <li key={id}>{getContentTypeDetail(content)}</li>
    case 'numbered_list_item':
      return <li key={id}>{getContentTypeDetail(content)}</li>
    case 'image':
      const slugger = new Slugger()
      const imageSlug = slugger.slug(content.external.url)
      const imageData = images[imageSlug]
      return !!imageData ? (
        <div className="w-2/3 mx-auto">
          <Image
            alt={`todo:`}
            blurDataURL={imageData.base64}
            key={imageSlug}
            placeholder="blur"
            title={`todo:`}
            {...imageData.img}
          />
          {/* <ImageCaption caption={seoImageDescription} /> */}
        </div>
      ) : null
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
    default:
      // console.dir(`not supported yet: ${type}`)
      break
  }
}

export default getContentType
