import type {
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js'
import { forwardRef } from 'react'

import { NotionBlocks as Blocks } from '../Notion.Blocks'
import { getBlockKey } from '../Notion.utils'

const ListBulleted = forwardRef(function ListBulleted(props: any, ref: any) {
  const {
    block,
    order,
  }: {
    block: BulletedListItemBlockObjectResponse | NumberedListItemBlockObjectResponse
    order: number
  } = props
  const key = getBlockKey(block.id, block.type, order)
  const items = block[block.type][block.type]

  const Component = props?.element ?? 'ul'
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

export { ListBulleted }
export default ListBulleted
