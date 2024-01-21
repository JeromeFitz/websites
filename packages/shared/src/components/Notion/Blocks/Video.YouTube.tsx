/**
 * @todo(next-notion) until we can SWR the comment fetch
 *  this needs to be server-only
 */
import 'server-only'

import { Client } from '@notionhq/client'

import { getImageAlt } from './Image.utils.js'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function VideoYouTube({ block, url }) {
  const embedId = url.split('/').slice(-1)[0]
  if (!embedId) return null

  /**
   * @note(notion) Get Image Comments
   * @todo(notion) Suspense or SWR; Not needed for SSR
   */
  const commentBlock = await notion?.comments?.list({
    block_id: block.id,
  })
  const alt = (!!commentBlock && getImageAlt(commentBlock?.results)) || ''

  return (
    <div className="relative h-full max-h-[480] w-full overflow-hidden [&>*:iframe]:absolute [&>*:iframe]:left-0 [&>*:iframe]:top-0 [&>*:iframe]:h-full [&>*:iframe]:max-h-[600] [&>*:iframe]:w-full">
      <iframe
        // width="720"
        height="576"
        // height="100%"
        width="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-presentation allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
        loading="lazy"
        title={alt}
      />
    </div>
  )
}

export { VideoYouTube }

/*
<iframe src="https://www.youtube.com/embed/-Q58Tknh5bU" frameborder="0" sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin allow-storage-access-by-user-activation" allowfullscreen="" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; border-radius: 1px; pointer-events: auto; background-color: white;"></iframe>

*/
