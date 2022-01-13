import { notionPleaseDeprecate as notion } from '@jeromefitz/temp/package/helper'

import avoidRateLimit from '~utils/avoidRateLimit'

const getBlocks = async ({ blockId }) => {
  await avoidRateLimit()
  return await notion.blocks.retrieve({
    block_id: blockId,
  })
}

export default getBlocks
