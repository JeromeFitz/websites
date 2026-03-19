import type { DividerBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { getBlockKey } from '../Notion.utils'

const Divider = ({ ref, ...props }: any) => {
  const { block, order }: { block: DividerBlockObjectResponse; order: number } =
    props
  const key = getBlockKey(block.id, block.type, order)

  const Component = props?.as ?? 'p'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  return <Component key={key} ref={ref} {...componentProps} />
}

export { Divider }
export default Divider
