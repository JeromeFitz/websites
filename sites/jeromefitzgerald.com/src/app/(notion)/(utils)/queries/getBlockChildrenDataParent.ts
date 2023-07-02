import 'server-only'
import { asyncForEach } from '@jeromefitz/utils'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import _noop from 'lodash/noop'

import { getBlockChildrenData } from './getBlockChildrenData'
import { getColumnData } from './getColumnData'

async function getBlockChildrenDataParent(block_id) {
  const response = await getBlockChildrenData(block_id)

  let isListItemStart = false,
    isListItemType = '',
    isListItemId = ''
  const blocks: any = []

  // response.results.map(async (block: BlockObjectResponse, i) => {
  // @todo(complexity) 12
  // eslint-disable-next-line complexity
  await asyncForEach(response.results, async (block: BlockObjectResponse) => {
    // console.dir(`asyncForEach: ${block.type}`)
    /**
     * LIST ITEMS
     */
    if (
      !isListItemStart &&
      (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item')
    ) {
      isListItemStart = true
      isListItemType = block.type
      isListItemId = block.id

      const listItemType =
        block.type === 'bulleted_list_item' ? 'bulleted_list' : 'numbered_list'
      blocks.push({
        object: 'block',
        id: isListItemId,
        parent: block.parent,
        created_time: block.created_time,
        last_edited_time: block.last_edited_time,
        created_by: block.created_by,
        last_edited_by: block.last_edited_time,
        has_children: true,
        archived: false,
        type: listItemType,
        [listItemType]: { [listItemType]: [] },
      })
    }
    if (isListItemStart && block.type === isListItemType) {
      const listItemType =
        block.type === 'bulleted_list_item' ? 'bulleted_list' : 'numbered_list'
      const temp = blocks.pop()
      temp[listItemType][listItemType].push(block)
      blocks.push(temp)
    }
    if (isListItemStart && block.type !== isListItemType) {
      isListItemStart = false
      isListItemType = ''
      isListItemId = ''
    }

    /**
     * COLUMNS
     */
    // @todo(notion) or `has_children===true` ??
    if (block.type === 'column_list') {
      const columnListChildrenData: any = await getBlockChildrenData(block.id)
      const columnListData = await getColumnData(columnListChildrenData)
      const columnList = {
        ...block,
        column_list: { ...columnListData },
      }
      await blocks.push(columnList)
    }

    /**
     * EVERYTHING ELSE
     */
    if (!isListItemStart) {
      await blocks.push(block)
    }
  }).catch(_noop)

  return {
    ...response,
    results: blocks,
  }
}

export { getBlockChildrenDataParent }
