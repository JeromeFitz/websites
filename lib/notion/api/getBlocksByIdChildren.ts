import avoidRateLimit from '~utils/avoidRateLimit'
import { notion } from '~utils/notion/helper'

const getBlocksByIdChildren = async ({ blockId }) => {
  await avoidRateLimit()
  return await notion.blocks.children.list({
    block_id: blockId,
  })
}

export default getBlocksByIdChildren
