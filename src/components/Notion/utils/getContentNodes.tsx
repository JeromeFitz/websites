import type { NotionBlock } from '@jeromefitz/notion/schema'
import _map from 'lodash/map'
import { v4 as uuid } from 'uuid'

import getContentType from './getContentType'

/**
 * @hack
 * (notion) this gets the job done for `ul=>li`
 * @todo
 * (notion) other elements that rely on parent element
 * (notion) can we lift the images out of this earlier for cache state?
 * @question
 * can this somehow be SSR'd?
 *
 */
function getContentNodes({ content, images }) {
  let listCurrentId = ''
  let listCurrentState = false
  const nodes = {}
  _map(
    content.hasOwnProperty('results') ? content.results : content,
    (contentItem: NotionBlock) => {
      if (contentItem === undefined || contentItem === null) return null
      if (
        contentItem?.type === 'bulleted_list_item' ||
        contentItem?.type === 'numbered_list_item'
      ) {
        if (!listCurrentState) {
          listCurrentId = uuid()
          nodes[listCurrentId] = {
            id: listCurrentId,
            type: contentItem?.type === 'numbered_list_item' ? 'ol' : 'ul',
            node: [],
          }
        }
        listCurrentState = true
        nodes[listCurrentId].node.push(getContentType(contentItem, images))
        return
      } else {
        listCurrentState = false
      }
      nodes[contentItem?.id] = {
        id: contentItem?.id,
        type: contentItem?.type,
        node: getContentType(contentItem, images),
      }
    }
  )

  return nodes
}
export default getContentNodes
