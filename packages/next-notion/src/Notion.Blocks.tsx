import type {
  BlockObjectResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
// import { Suspense } from 'react'

import { blocks as blocksDefault, OBJECTS, TYPES } from './Notion.Config.js'
import { getBlock } from './Notion.utils.js'

function NotionBlocks({
  data,
  blocks = blocksDefault,
}: {
  // @todo(types) ListBlockChildrenResponse | any => children
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  data: ListBlockChildrenResponse | any
  blocks?: any
}) {
  const { object, type, results } = data
  const isListBlock = object === OBJECTS.LIST && type === TYPES.BLOCK
  const isListItem =
    object === OBJECTS.BLOCK &&
    (type === TYPES.BULLETED_LIST_ITEM ||
      type === TYPES.NUMBERED_LIST_ITEM ||
      type === TYPES.COLUMN)
  const isBlockItem = object === OBJECTS.BLOCK

  if (isListItem) {
    // console.dir(`⚠️ isListItem: ${type}`)
    return getBlock({ block: data, blocks })
  }
  if (isBlockItem) {
    // console.dir(`⚠️ isBlockItem: ${type}`)
    return getBlock({ block: data, blocks })
  }
  if (!isListBlock) {
    console.dir(`⚠️ Throw Error: NotionBlocks: ${type}`)
    return null
  }

  return (
    <>
      {!!results &&
        results.map((block: BlockObjectResponse, order) => {
          // if (order > 10) {
          //   return (
          //     // @todo(loading) suspense
          //     <Suspense key={`${block.id}--${order}`} fallback={<p>Loading...</p>}>
          //       {getBlock({ block, blocks, order })}
          //     </Suspense>
          //   )
          // }
          return getBlock({ block, blocks, order })
          // return <></>
        })}
    </>
  )
}

export { NotionBlocks }
