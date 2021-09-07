import { notion } from '~utils/notion/helper'

const getBlocks = async ({ blockId }) => {
  return await notion.blocks.retrieve({
    block_id: blockId,
  })
}

export default getBlocks
