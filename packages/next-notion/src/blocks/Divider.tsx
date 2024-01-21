import type { DividerBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'
import { forwardRef } from 'react'

import { getBlockKey } from '../Notion.utils.js'

const Divider = forwardRef(function Divider(props: any, ref: any) {
  const { block, order }: { block: DividerBlockObjectResponse; order: number } =
    props
  const key = getBlockKey(block.id, block.type, order)

  const Component = props?.element ?? 'p'
  const componentProps = {
    className: props?.className ?? undefined,
  }

  return <Component ref={ref} key={key} {...componentProps} />
})

export { Divider }
export default Divider
