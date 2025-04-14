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
    block:
      | any
      | BulletedListItemBlockObjectResponse
      | NumberedListItemBlockObjectResponse
    order: number
  } = props
  const key = getBlockKey(block.id, block.type, order)
  const items = block[block.type][block.type]

  const Component = props?.as ?? 'ul'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  return (
    <Component key={key} ref={ref} {...componentProps}>
      {items.map((item: any, order: number) => {
        const blocksKey = `${key}--${order}`
        return <Blocks blocks={props?.blocks} data={item} key={blocksKey} />
      })}
    </Component>
  )
})

export { ListBulleted }
export default ListBulleted
