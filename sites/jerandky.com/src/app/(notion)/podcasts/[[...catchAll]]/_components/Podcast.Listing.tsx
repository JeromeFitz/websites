import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'
import { getDatabaseQuery, getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import { getPropertyTypeData } from 'next-notion/utils'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { CONFIG, getPageData, getPodcastData } from '../../../_config'
// import type { PageObjectResponsePodcast } from '../../../_config'

const { DATABASE_ID } = CONFIG.PODCASTS

// @todo(complexity) 12
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
  const { seoDescription } = getPageData(data?.page?.properties) || ''

  // console.dir(podcastData)

  return (
    <>
      {/* Hero */}
      {/* <SectionHero title={title} /> */}
      {/* Content */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent className="invisible hidden md:visible md:inline">
            {seoDescription}
          </SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          {/* <Blocks data={data?.blocks} /> */}
          {hasContent && <ListingTemp data={podcastData} />}
        </SectionContent>
      </SectionWrapper>
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
    <ul>
      {podcasts.map((podcast) => {
        if (!podcast?.isPublished) return null
        return (
          <li className="my-1 py-1" key={`podcasts-podcast-${podcast?.id}`}>
            <Anchor className="text-base md:text-xl" href={podcast?.href}>
              {podcast?.title}
            </Anchor>
          </li>
        )
      })}
    </ul>
  )

  // return (
  //   <ul>
  //     {shows.map((show: PageObjectResponsePodcast) => {
  //       const { properties } = show
  //       const { isPublished } = getPodcastData(properties)
  //       if (!isPublished) return null
  //       // const propertyTypeData: any = getPropertyTypeData(
  //       //   properties,
  //       //   'Slug.Preview'
  //       // )
  //       // const href = propertyTypeData?.string
  //       // if (!href) return null
  //       const href = getPropertyTypeData(properties, 'Slug.Preview')
  //       return (
  //         <li key={`shows-show-${show.id}`}>
  //           <NextLink href={href}>{href}</NextLink>
  //         </li>
  //       )
  //     })}
  //   </ul>
  // )
}

export { Listing }
