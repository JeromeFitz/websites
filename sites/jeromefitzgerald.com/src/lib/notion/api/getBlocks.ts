import { avoidRateLimit } from '@jeromefitz/utils'

import { notion } from '~lib/notion/helper'

const getBlocks = async ({ blockId }) => {
  if (!blockId) return []
  await avoidRateLimit()
  return await notion.blocks.retrieve({
    block_id: blockId,
  })
}

export default getBlocks
