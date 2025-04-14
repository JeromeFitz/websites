import type { ColumnListBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { forwardRef } from 'react'

import { NotionBlocks as Blocks } from '../Notion.Blocks'
import { getBlockKey } from '../Notion.utils'

const ListColumn = forwardRef(function ListColumn(props: any, ref: any) {
  const {
    block,
    order,
  }: {
    block: ColumnListBlockObjectResponse
    order: number
  } = props
  const key = getBlockKey(block.id, block.type, order)
  const items: any = block[block.type][block.type]

  const Component = props?.as ?? 'div'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  // console.dir(block)
  if (!items) return null

  return (
    <Component ref={ref} {...componentProps}>
      {items.results.map((item: any) => {
        const blockProps = props?.blocks['column']

        const ComponentColumn: any = blockProps?.element ?? 'div'
        const componentColumnProps = {
          className: blockProps?.className ?? undefined,
        }

        const block = {
          /**
           * @note(notion) if this ever needs to be directly from db
           * - import { getBlockChildrenDataParent } from '../queries/index'
           * - await getBlockChildrenDataParent(item.id)
           */
          column: item.columnDataColumn,
          object: 'block',
          type: 'column',
        }
        return (
          <ComponentColumn
            key={`${key}-column-${item.id}`}
            {...componentColumnProps}
          >
            <>
              {block.column.results.map((item: any, _order: number) => {
                const blocksKey = `${key}--${order}--${item.id}--${_order}`
                return <Blocks blocks={props?.blocks} data={item} key={blocksKey} />
              })}
            </>
          </ComponentColumn>
        )
      })}
    </Component>
  )
})

export { ListColumn }
export default ListColumn
