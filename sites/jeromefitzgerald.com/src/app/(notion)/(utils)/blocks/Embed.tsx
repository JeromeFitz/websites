// import { Embed } from '@jeromefitz/ds/ui/blocks/index'
// import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
// import { Fragment, Suspense } from 'react'

import { EmbedTwitter } from './Embed.Twitter'

// import { TextAnnotations } from './TextAnnotations'

// @todo(types)
// function EmbedImpl({ block }: { block: BlockObjectResponse }) {
function EmbedImpl({ block }: { block: any }) {
  // console.dir(`EmbedImpl`)
  // console.dir(block)

  const isTwitter = block.embed.url.includes('twitter')
  if (isTwitter) {
    return <EmbedTwitter block={block} />
  }
  return null
}

export { EmbedImpl as Embed }
export default EmbedImpl
