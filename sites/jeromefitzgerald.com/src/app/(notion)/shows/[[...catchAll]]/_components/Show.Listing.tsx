import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  getDataFromCache,
  getDatabaseQuery,
} from '@jeromefitz/shared/src/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPropertyTypeData } from 'next-notion/src/utils'

import { CONFIG, getPageData, getShowData } from '~app/(notion)/_config'
// import type { PageObjectResponseShow } from '~app/(notion)/_config'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'

const { DATABASE_ID } = CONFIG.SHOWS

function ListingTemp({ data }) {
  const { isEnabled } = draftMode()
  const draft = isEnabled
  const items = data.results.map((item) => {
    const { properties } = item
    const itemData = getShowData(properties)
    if (!itemData?.isPublished) return null
    return itemData
  })

  const shows = _orderBy(_filter(items, draft ? {} : { isPublished: true }), [
    'title',
  ])

  return (
    <ul>
      {shows.map((show) => {
        if (!show?.isPublished) return null
        return (
          <li key={`shows-show-${show?.id}`} className="my-1 py-1">
            <Anchor href={show?.href} className="text-base md:text-xl">
              {show?.title}
            </Anchor>
          </li>
        )
      })}
    </ul>
  )

  // return (
  //   <ul>
  //     {shows.map((show: PageObjectResponseShow) => {
  //       const { properties } = show
  //       const { isPublished } = getShowData(properties)
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
  const showData: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'starts_with',
    revalidate,
    segmentInfo,
  })
  const hasContent = showData?.results?.length > 0
  const title = 'Shows'

  // const seoDescription = getPropertyTypeData(data?.page?.properties, 'SEO.Description')
  const { seoDescription } = getPageData(data?.page?.properties) || ''

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
          {hasContent && <ListingTemp data={showData} />}
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export { Listing }
