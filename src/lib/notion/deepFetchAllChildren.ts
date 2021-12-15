import { notion } from '~lib/notion/helper'

const deepFetchAllChildren = async (blocks: any[]): Promise<Array<any[] | any>> => {
  if (blocks === null || blocks === undefined) return blocks
  const fetchChildrenMap = blocks
    .filter((block) => block.has_children)
    .map((block) => {
      return {
        promise: notion.blocks.children.list({
          block_id: block.id,
          page_size: 100,
        }),
        parent_block: block,
      }
    })

  const results = await Promise.all<any>(
    fetchChildrenMap.map((value) => value.promise)
  )

  for (let i = 0; i < results.length; i++) {
    const childBlocks = results[i].results
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    await deepFetchAllChildren(childBlocks)
    if (fetchChildrenMap[i]) {
      const parent: any = fetchChildrenMap[i].parent_block
      parent[parent.type].children = childBlocks
    }
  }
  return blocks
}

export default deepFetchAllChildren
