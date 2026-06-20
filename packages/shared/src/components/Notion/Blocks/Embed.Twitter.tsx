'use client'

import { Callout } from '@jeromefitz/ds/components/Callout'

import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import { Tweet } from 'react-tweet'

// @todo(types) any
function EmbedTweet({ id }: { id: any }) {
  return (
    <div className="mx-auto my-2 flex w-full justify-center py-2">
      <Tweet id={id} />
    </div>
  )
}

// @todo(types) any
function EmbedTwitter({ block }: { block: any }) {
  const id = block.embed.url.split('').slice(-1)[0]

  /**
   * @todo(notion) TextAnnotations
   */
  const caption = block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  return (
    <>
      <EmbedTweet id={id} />
      {!!caption && (
        <Callout>
          <EmojiWrapper id={block.id} text={`${caption}`} />
          {/* {caption} */}
        </Callout>
      )}
    </>
  )
}

export { EmbedTweet, EmbedTwitter }
