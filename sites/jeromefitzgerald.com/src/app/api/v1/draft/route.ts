import { getDataFromCache, getSegmentInfo } from '@jeromefitz/shared/notion/utils'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { draftMode } from 'next/headers'
// @todo(next) esm
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { redirect } from 'next/navigation'

/**
 * @todo(notion) this is a proof of concept right now
 */
function getSegmentFromSlug(slug) {
  const split = slug.split('/')
  if (
    split[1] === 'blog' ||
    split[1] === 'books' ||
    // split[1] === 'episodes' ||
    split[1] === 'events' ||
    split[1] === 'people' ||
    split[1] === 'podcasts' ||
    split[1] === 'shows' ||
    split[1] === 'venues'
  ) {
    return split[1]
  }
  return 'pages'
}

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') ?? ''

  if (secret !== process.env.DRAFT_TOKEN || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  if (slug[0] !== '/') {
    return new Response('Bad request', { status: 400 })
  }

  const SEGMENT = getSegmentFromSlug(slug)
  const segmentInfo = getSegmentInfo({
    SEGMENT,
    params: { catchAll: [slug.split('/')[2]] },
  })
  // console.dir(`(draft) segmentInfo:`)
  // console.dir(segmentInfo)

  // @todo(notion) homepage of `/`
  // console.dir(slug.split('/'))
  const slugTemp = SEGMENT === 'pages' ? `/${slug.split('/')[2]}` : slug
  // console.dir(`(draft) slugTemp: ${slugTemp}`)

  const data = await getDataFromCache({
    database_id: '',
    draft: true,
    filterType: 'equals',
    revalidate: false,
    segmentInfo: segmentInfo.isIndex
      ? {
          ...segmentInfo,
          slug: slugTemp,
        }
      : { ...segmentInfo },
  })

  if (!data) {
    return new Response('Invalid slug', { status: 401 })
  }

  draftMode().enable()

  redirect(slug)
}
