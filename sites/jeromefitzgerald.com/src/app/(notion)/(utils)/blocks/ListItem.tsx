import { ListItem } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'

function ListItemImpl({ block }: { block: BlockObjectResponse }) {
  return (
    <ListItem>
      <TextAnnotations block={block} />
    </ListItem>
  )
}

export { ListItemImpl as ListItem }
export default ListItemImpl
