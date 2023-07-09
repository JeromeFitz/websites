import 'server-only'

import { Caption } from '@jeromefitz/ds/components/Caption'
// import { NotionEmoji as EmojiWrapper } from 'next-notion/src/blocks/Emoji'
import { Tweet } from 'react-tweet'

function EmbedTweet({ id }) {
  return (
    <div className="mx-auto my-2 flex w-full justify-center py-2">
      <Tweet id={id} />
    </div>
  )
}

function EmbedTwitter({ block }) {
  const id = block.embed.url.split('/').slice(-1)[0]

  /**
   * @todo(notion) TextAnnotations
   */
  const caption = !!block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  return (
    <>
      <EmbedTweet id={id} />
      {!!caption && (
        <Caption>
          {/* <EmojiWrapper id={block.id} text={`${caption}`} /> */}
          {caption}
        </Caption>
      )}
    </>
  )
}

export { EmbedTweet, EmbedTwitter }
