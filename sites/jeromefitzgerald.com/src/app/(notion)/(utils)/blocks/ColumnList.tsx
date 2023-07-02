import { ColumnList } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { Column } from './Column'

function ColumnListImpl({ block }: { block: BlockObjectResponse }) {
  if (!block[block.type][block.type]) return null
  const { results } = block[block.type][block.type]
  return (
    <ColumnList>
      {!!results &&
        results.map((data, i) => {
          return <Column key={`${block.id}-column-list-${i}`} block={data} />
        })}
    </ColumnList>
  )
}

export { ColumnListImpl as ColumnList }
export default ColumnListImpl
