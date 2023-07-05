import 'server-only'
import { notion } from '../helper'

/**
 * @todo(error-handling)
 */
async function getBlockChildrenData(block_id) {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 100, // max
  })
  return response
}

export { getBlockChildrenData }
