import cx from 'clsx'
import _map from 'lodash/map'
import _size from 'lodash/size'
import Image from 'next/image'
import React from 'react'

import { NotionBlock } from '~utils/notion'
import getContentTypeDetail from '~utils/notion/getContentTypeDetail'
import notionToTailwindColor from '~utils/notion/notionToTailwindColor'

const getContentType = (item: NotionBlock) => {
  const { id, type } = item
  const content = item[type]

  switch (type) {
    /**
     * @note h1 = Title (Static Content) Type, increase Notion Headings
     */
    case 'heading_1':
      return (
        <h2
          key={id}
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {getContentTypeDetail(content)}
        </h2>
      )
    case 'heading_2':
      return (
        <h3
          key={id}
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {getContentTypeDetail(content)}
        </h3>
      )
    case 'heading_3':
      return (
        <h4
          key={id}
          style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
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
        <li
          className={cx(`badge badge-${notionToTailwindColor(tag.color)}`)}
          key={tag.id}
        >
          {tag.name}
        </li>
      ))
    case 'relation':
      return !!content[0] && content[0].id
    default:
      console.dir(`not supported yet: ${type}`)
      break
  }
}

export default getContentType
