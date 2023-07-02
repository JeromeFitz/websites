import { ListBulleted } from '@jeromefitz/ds/ui/blocks/index'

import type { BlockObjectResponseCustom } from '../Notion.types'

import { ListItem } from './ListItem'

function ListBulletedImpl({ block }: { block: BlockObjectResponseCustom }) {
  return (
    <ListBulleted>
      {block[block.type][block.type].map((item) => {
        return <ListItem key={item.id} block={item} />
      })}
    </ListBulleted>
  )
}

export { ListBulletedImpl as ListBulleted }
export default ListBulletedImpl
