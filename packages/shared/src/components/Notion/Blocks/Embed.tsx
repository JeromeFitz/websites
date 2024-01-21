import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { EmbedTwitter } from './Embed.Twitter'

// @todo(types)
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
function EmbedImpl({ block }: { block: BlockObjectResponse | any }) {
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
