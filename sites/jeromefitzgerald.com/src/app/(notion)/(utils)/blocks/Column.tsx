import { Column } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { NotionBlocks } from '../NotionBlocks'
import { getBlockChildrenDataParent } from '../queries/index'

async function ColumnImpl({ block }: { block: BlockObjectResponse }) {
  const data = await getBlockChildrenDataParent(block.id)
  return (
    <Column>
      {!!data?.results && <NotionBlocks key={`${block.id}-column}`} data={data} />}
    </Column>
  )
}

export { ColumnImpl as Column }
