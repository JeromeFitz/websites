import 'server-only'

import { Caption } from '@jeromefitz/ds/components/Caption'
import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'
import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import { Fragment, Suspense } from 'react'

import { VideoYouTube } from './Video.YouTube.js'

// @todo(types)
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
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
      {/* Async out of next  */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <VideoYouTube block={block} url={url} />
      {!!caption && (
        <Caption>
          <EmojiWrapper id={block.id} text={`${caption}`} />
          {/* {caption} */}
        </Caption>
      )}
    </Suspense>
  )
}

export { VideoImpl as Video }
export default VideoImpl
