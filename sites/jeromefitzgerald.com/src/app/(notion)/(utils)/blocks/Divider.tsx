import { Divider } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DividerImpl({ block }: { block: BlockObjectResponse }) {
  return <Divider />
}

export { DividerImpl as Divider }
export default DividerImpl
