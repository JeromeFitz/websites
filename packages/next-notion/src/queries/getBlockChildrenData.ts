import 'server-only'

import { notion } from '../helper'

/**
 * @todo(error-handling)
 */
async function getBlockChildrenData(block_id) {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 50,
  })
  return response
}

export { getBlockChildrenData }
