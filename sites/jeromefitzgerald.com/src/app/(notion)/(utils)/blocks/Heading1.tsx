import { Heading1 } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'

/**
 * @note(notion) PageHeader, previous to Notion Content is H1
 * => All Headings from Notion are bumped up by 1 as a result.
 */
function Heading1Impl({ block }: { block: BlockObjectResponse }) {
  return (
    <Heading1>
      <TextAnnotations block={block} />
    </Heading1>
  )
}

export { Heading1Impl as Heading1 }
export default Heading1Impl
