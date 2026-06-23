import "server-only";
import { Callout } from "@jeromefitz/ds/components/callout";
import type { VideoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionEmoji as EmojiWrapper } from "next-notion/blocks/emoji";
import { Fragment, Suspense } from "react";

import { VideoYouTube } from "./video.youtube";

// @todo(types)
function VideoImpl({ block }: { block: any | VideoBlockObjectResponse }) {
  const url = block.video.external.url;

  /**
   * @todo(notion) TextAnnotations
   */
  const caption = block[block.type]?.caption ? block[block.type]?.caption[0]?.plain_text : null;

  return (
    <Suspense fallback={<Fragment />}>
      <></>
      {/* Async out of next  */}
      {/* @ts-ignore */}
      <VideoYouTube block={block} url={url} />
      {!!caption && (
        <Callout>
          <EmojiWrapper id={block.id} text={`${caption}`} />
          {/* {caption} */}
        </Callout>
      )}
    </Suspense>
  );
}

export { VideoImpl as Video };
export default VideoImpl;
