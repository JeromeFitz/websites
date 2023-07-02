import { ListNumbered } from '@jeromefitz/ds/ui/blocks/index'

import type { BlockObjectResponseCustom } from '../Notion.types'

import { ListItem } from './ListItem'

function ListNumberedImpl({ block }: { block: BlockObjectResponseCustom }) {
  return (
    <ListNumbered>
      {block[block.type][block.type].map((item) => {
        return <ListItem key={item.id} block={item} />
      })}
    </ListNumbered>
  )
}

export { ListNumberedImpl as ListNumbered }
export default ListNumberedImpl
