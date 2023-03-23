// import type { NotionBlock } from '@jeromefitz/notion/schema'

import { CONTENT_NODE_TYPES } from '../constants'
import { getContentNode } from '../index'

// const getContentType = (item: NotionBlock, images?: any[]) => {
const getContentType = (item: any, images?: any[]) => {
  const { has_children, id, type } = item
  const content = item[type]

  // console.dir(`getContentType: ${type}`)
  // console.dir(type || CONTENT_NODE_TYPES.UNSUPPORTED)

  const ContentNode =
    getContentNode[type] || getContentNode[CONTENT_NODE_TYPES.UNSUPPORTED]

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
