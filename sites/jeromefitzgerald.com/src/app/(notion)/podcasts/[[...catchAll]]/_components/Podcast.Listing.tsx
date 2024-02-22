import { Anchor } from '@jeromefitz/ds/components/Anchor'
// import { cx } from '@jeromefitz/ds/utils/cx'
import { getDataFromCache, getDatabaseQuery } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPropertyTypeData } from 'next-notion/utils'

// import { CONFIG, getPageData, getPodcastData } from '~app/(notion)/_config'
import { CONFIG, getPodcastData } from '~app/(notion)/_config'
import { Grid } from '~app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '~app/playground/2024/_components/Headline'
// import { Notion as Blocks } from '~components/Notion'
// import type { PageObjectResponsePodcast } from '~app/(notion)/_config'
import { WIP } from '~components/WIP/index'

const { DATABASE_ID } = CONFIG.PODCASTS

function ListingTemp({ data }) {
  const { isEnabled } = draftMode()
  const draft = isEnabled
  const items = data.results.map((item) => {
    const { properties } = item
    // console.dir(`item`)
    // console.dir(properties)
    const itemData = getPodcastData(properties)
    if (!itemData?.id) return null
    if (!itemData?.isPublished) return null
    return itemData
  })

  const podcasts = _orderBy(_filter(items, draft ? {} : { isPublished: true }), [
    'title',
  ])

  // console.dir(podcasts)

  return (
    <ul>
      {podcasts.map((podcast) => {
        if (!podcast?.isPublished) return null
        return (
          <li className="my-1 py-1" key={`podcasts-podcast-${podcast?.id}`}>
            <Anchor className="text-base lg:text-xl" href={podcast?.href}>
              {podcast?.title}
            </Anchor>
          </li>
        )
      })}
    </ul>
  )
}

// @todo(complexity) 12
// eslint-disable-next-line complexity
async function Listing({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  // const { slug } = segmentInfo
  // @note(notion) Listing do not pass Database ID
  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })

  const isDynamicListing =
    (segmentInfo.segment === 'blog' || segmentInfo.segment === 'events') &&
    segmentInfo.isIndex
  const noData = isObjectEmpty(data?.blocks || {})

  const is404 = !isDynamicListing && noData
  if (is404) notFound()

  const isPublished = is404
    ? false
    : isDynamicListing ||
      getPropertyTypeData(data?.page?.properties, 'Is.Published') ||
      false

  if (!isPublished) notFound()

  /**
   * @note(notion) GET ITEMS / TODO CACHE + SUSPENSE
   */
  const podcastData: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'starts_with',
    revalidate,
    segmentInfo,
  })
  const hasContent = podcastData?.results?.length > 0
  const title = 'Podcasts'

  // const seoDescription = getPropertyTypeData(data?.page?.properties, 'SEO.Description')
  // const { seoDescription } = getPageData(data?.page?.properties) || ''

  // console.dir(podcastData)

  return (
    <>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent>
          {/* <Blocks data={data?.blocks} /> */}
          {/* <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
            {seoDescription}
          </p> */}
          <WIP />
          {hasContent && <ListingTemp data={podcastData} />}
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { Listing }
