import type { NotionBlock } from '@jeromefitz/notion/schema'

import { getContentNode } from '~lib/notion/app'

const getContentType = (item: NotionBlock, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]

  const ContentNode = getContentNode[type] || getContentNode['_unsupported']

  return (
    <ContentNode
      content={content}
      has_children={has_children}
      id={id}
      images={images}
      item={item}
      key={id}
      type={type}
    />
  )
}

export default getContentType
