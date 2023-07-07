import 'server-only'

import { Caption } from '@jeromefitz/ds/components/Caption'
import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { NotionEmoji as EmojiWrapper } from 'next-notion/src/blocks/Emoji'
import { Fragment, Suspense } from 'react'

import { VideoYouTube } from './Video.YouTube'

// @todo(types)
function VideoImpl({ block }: { block: VideoBlockObjectResponse | any }) {
  const url = block.video.external.url

  /**
   * @todo(notion) TextAnnotations
   */
  const caption = !!block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  return (
    <Suspense fallback={<Fragment />}>
      <></>
      <VideoYouTube block={block} url={url} />
      {!!caption && (
        <Caption>
          <EmojiWrapper id={block.id} text={`${caption}`} />
        </Caption>
      )}
    </Suspense>
  )
}

export { VideoImpl as Video }
export default VideoImpl
