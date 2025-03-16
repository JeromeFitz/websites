import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  getDatabaseQuery,
  getDataFromCache,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import { getPropertyTypeData } from 'next-notion/utils/index'
import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

// import { CONFIG, getPageData, getPodcastData } from '@/app/(notion)/_config/index'
import { CONFIG, getPodcastData } from '@/app/(notion)/_config/index'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
// import { Notion as Blocks } from '@/components/Notion/index'
// import type { PageObjectResponsePodcast } from '@/app/(notion)/_config/index'
import { LI, UL } from '@/components/List/index'

const { DATABASE_ID } = CONFIG.PODCASTS

// @todo(complexity) 11
// eslint-disable-next-line complexity
async function Listing({ revalidate, segmentInfo }) {
  const { isEnabled } = await draftMode()
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
      <ContainerWithSidebar>
        <HeaderSidebar hasBorder={false} title={title} />
        <ArticleMain>
          {/* <Blocks data={data?.blocks} /> */}
          {/* <Text size="4">{seoDescription}</Text> */}
          <Callout size="1" variant="outline" />
          {hasContent && <ListingTemp data={podcastData} />}
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}

async function ListingTemp({ data }) {
  const { isEnabled } = await draftMode()
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
    <UL>
      {podcasts.map((podcast) => {
        if (!podcast?.isPublished) return null
        return (
          <LI key={`podcasts-podcast-${podcast?.id}`}>
            <Anchor
              className="flex list-none items-center justify-start gap-2"
              href={podcast?.href}
            >
              {' '}
              {podcast?.title}
            </Anchor>
          </LI>
        )
      })}
    </UL>
  )
}

export { Listing }
