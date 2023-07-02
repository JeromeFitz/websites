import { Callout } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'

function CalloutImpl({ block }: { block: BlockObjectResponse }) {
  return (
    <Callout>
      <TextAnnotations block={block} />
    </Callout>
  )
}

export { CalloutImpl as Callout }
export default CalloutImpl
