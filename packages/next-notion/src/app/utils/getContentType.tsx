import type { NotionBlock } from '@jeromefitz/notion/schema'

import { getContentNode } from '../index'

const getContentType = (item: NotionBlock, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]

  const ContentNode = getContentNode[type] || getContentNode['_unsupported']

  const props = {
    content,
    has_children,
    id,
    images,
    item,
    type,
  }

  return <ContentNode key={id} {...props} />
}

export default getContentType
