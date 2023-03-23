import type { NotionBlock } from '@jeromefitz/notion/schema'
import _map from 'lodash/map'
import { v4 as uuid } from 'uuid'

import { CONTENT_NODE_TYPES } from '../constants'

import getContentType from './getContentType'

const { BULLETED_LIST_ITEM, NUMBERED_LIST_ITEM, OL, UL } = CONTENT_NODE_TYPES

/**
 * @hack
 * (notion) this gets the job done for `ul=>li`
 * @todo
 * (notion) other elements that rely on parent element
 * (notion) can we lift the images out of this earlier for cache state?
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
        contentItem?.type === BULLETED_LIST_ITEM ||
        contentItem?.type === NUMBERED_LIST_ITEM
      ) {
        if (!listCurrentState) {
          listCurrentId = uuid()
          nodes[listCurrentId] = {
            id: listCurrentId,
            type: contentItem?.type === NUMBERED_LIST_ITEM ? OL : UL,
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
      return
    }
  )

  return nodes
}
export default getContentNodes
