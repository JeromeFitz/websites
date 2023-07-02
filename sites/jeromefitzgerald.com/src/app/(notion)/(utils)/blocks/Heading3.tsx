import { Heading3 } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'

function Heading3Impl({ block }: { block: BlockObjectResponse }) {
  return (
    <Heading3>
      <TextAnnotations block={block} />
    </Heading3>
  )
}

export { Heading3Impl as Heading3 }
export default Heading3Impl
