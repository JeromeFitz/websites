import { Heading2 } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'
/**
 * @note(notion) PageHeader, previous to Notion Content is H1
 * => All Headings from Notion are bumped up by 1 as a result.
 */
function Heading2Impl({ block }: { block: BlockObjectResponse }) {
  return (
    <Heading2>
      <TextAnnotations block={block} />
    </Heading2>
  )
}

export { Heading2Impl as Heading2 }
export default Heading2Impl
