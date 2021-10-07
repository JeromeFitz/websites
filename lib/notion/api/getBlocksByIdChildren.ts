import avoidRateLimit from '~utils/avoidRateLimit'
import isUndefined from '~utils/isUndefined'
import { notion } from '~utils/notion/helper'

const getBlocksByIdChildren = async ({ blockId }) => {
  if (isUndefined(blockId)) return []
  await avoidRateLimit()
  return await notion.blocks.children.list({
    block_id: blockId,
  })
}

export default getBlocksByIdChildren
