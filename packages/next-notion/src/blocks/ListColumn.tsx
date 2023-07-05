import type {
  ColumnBlockObjectResponse,
  ColumnListBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { forwardRef } from 'react'

import { NotionBlocks as Blocks } from '../Notion.Blocks'
// import { Notion as Blocks } from '../../../../sites/jeromefitzgerald.com/src/components/Notion/index'
import { getBlockKey } from '../Notion.utils'
import { getBlockChildrenDataParent } from '../queries/index'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ListColumn = forwardRef(async function ListColumn(props: any, ref: any) {
  const {
    block,
    order,
  }: {
    block: ColumnListBlockObjectResponse
    order: number
  } = props
  const key = getBlockKey(block.id, block.type, order)
  const items: any = block[block.type][block.type]

  const Component = props?.element ?? 'div'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  if (!items) return null
  return (
    <Component ref={ref} key={key} {...componentProps}>
      {await items.results.map(async (item: ColumnBlockObjectResponse) => {
        const data = await getBlockChildrenDataParent(item.id)
        // @todo(next-notion) can we avoid async/await with the following?
        // console.dir(item.columnDataColumn.results)

        // @todo(next-notion) how to do this dynamically?
        const blockProps = props?.blocks['column']

        const ComponentColumn: any = blockProps?.element ?? 'div'
        const componentColumnProps = {
          className: blockProps?.className ?? undefined,
        }

        const block = {
          object: 'block',
          type: 'column',
          column: data,
        }

        return (
          <ComponentColumn key={`${key}-column`} {...componentColumnProps}>
            {block.column.results.map((item, order) => {
              const blocksKey = `${key}--${order}`
              return <Blocks key={blocksKey} blocks={props?.blocks} data={item} />
            })}
          </ComponentColumn>
        )
      })}
    </Component>
  )
})

export { ListColumn }
export default ListColumn
