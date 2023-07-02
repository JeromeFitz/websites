import { Paragraph } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'

function ParagraphImpl({ block }: { block: BlockObjectResponse }) {
  return (
    <Paragraph>
      <TextAnnotations block={block} />
    </Paragraph>
  )
}

export { ParagraphImpl as Paragraph }
export default ParagraphImpl
