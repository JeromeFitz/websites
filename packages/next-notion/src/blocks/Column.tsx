import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { forwardRef } from 'react'

import { NotionBlocks as Blocks } from '../Notion.Blocks'
// import { Notion as Blocks } from '../../../../sites/jeromefitzgerald.com/src/components/Notion/index'
import { getBlockKey } from '../Notion.utils'

const Column = forwardRef(function Column(props: any, ref: any) {
  const {
    block,
    order,
  }: {
    block: BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse
    order: number
  } = props
  const key = getBlockKey(block.id, block.type, order)
  // const items = block[block.type][block.type]
  const items = block[block.type]?.results

  const Component = props?.element ?? 'div'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  return (
    <Component ref={ref} key={key} {...componentProps}>
      {items.map((item, order) => {
        const blocksKey = `${key}--${order}`
        return <Blocks key={blocksKey} blocks={props?.blocks} data={item} />
      })}
    </Component>
  )
})

export { Column }
export default Column
