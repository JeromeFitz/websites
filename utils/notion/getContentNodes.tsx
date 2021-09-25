import _map from 'lodash/map'
import { v4 as uuid } from 'uuid'

import { NotionBlock } from '~utils/notion'
import getContentType from '~utils/notion/getContentType'

/**
 * @hack
 * (notion) this gets the job done for `ul=>li`
 * @todo
 * (notion) other elements that rely on parent element
 * (notion) can we lift the images out of this earlier for cache state?
 *
 */
const getContentNodes = ({ content, images }) => {
  let listCurrentId = ''
  let listCurrentState = false
  const nodes = {}
  _map(content.results, (contentItem: NotionBlock) => {
    if (contentItem.type === 'bulleted_list_item') {
      if (!listCurrentState) {
        listCurrentId = uuid()
        nodes[listCurrentId] = {
          id: listCurrentId,
          type: 'ul',
          node: [],
        }
      }
      listCurrentState = true
      nodes[listCurrentId].node.push(getContentType(contentItem, images))
      return
    } else {
      listCurrentState = false
    }
    nodes[contentItem.id] = {
      id: contentItem.id,
      type: contentItem.type,
      node: getContentType(contentItem, images),
    }
  })

  // console.dir(`nodes`)
  // console.dir(nodes)

  return nodes
}
export default getContentNodes
