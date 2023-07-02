import { Quote } from '@jeromefitz/ds/ui/blocks/index'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { TextAnnotations } from './TextAnnotations'

function QuoteImpl({ block }: { block: BlockObjectResponse }) {
  return (
    <Quote>
      <TextAnnotations block={block} />
    </Quote>
  )
}

export { QuoteImpl as Quote }
export default QuoteImpl
