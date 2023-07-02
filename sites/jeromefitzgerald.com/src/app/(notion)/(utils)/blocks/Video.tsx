// import type { VideoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Caption } from '@jeromefitz/ds/components/Caption'
import { Fragment, Suspense } from 'react'

import { EmojiWrapper } from './Emoji'
// import { TextAnnotations } from './TextAnnotations'
import { VideoYouTube } from './Video.YouTube'

// @todo(types)
// function VideoImpl({ block }: { block: VideoBlockObjectResponse }) {
function VideoImpl({ block }: { block: any }) {
  const url = block.video.external.url

  /**
   * @todo(notion) TextAnnotations
   */
  const caption = !!block[block.type]?.caption
    ? block[block.type]?.caption[0]?.plain_text
    : null

  return (
    <Suspense fallback={<Fragment />}>
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
