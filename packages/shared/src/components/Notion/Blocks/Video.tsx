import 'server-only'

import { Callout } from '@jeromefitz/ds/components/Callout/index'

import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { NotionEmoji as EmojiWrapper } from 'next-notion/blocks/Emoji'
import { Fragment, Suspense } from 'react'

import { VideoYouTube } from './Video.YouTube'

// @todo(types)
function VideoImpl({ block }: { block: any | VideoBlockObjectResponse }) {
  const url = block.video.external.url

  /**
   * @todo(notion) TextAnnotations
   */
  const caption = block[block.type]?.caption
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
        <Callout>
          <EmojiWrapper id={block.id} text={`${caption}`} />
          {/* {caption} */}
        </Callout>
      )}
    </Suspense>
  )
}

export { VideoImpl as Video }
export default VideoImpl
