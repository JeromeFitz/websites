import { notion } from '~utils/notion/helper'

const getBlocksByIdChildren = async ({ blockId }) => {
  return await notion.blocks.children.list({
    block_id: blockId,
  })
}

export default getBlocksByIdChildren
