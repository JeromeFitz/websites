import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import { notFound } from 'next/navigation'

import { getCustom } from '~app/(cache)/getCustom'
// import { FourOhFour } from '~app/(errors)/404'
// import { NotionBlocks } from '~app/(notion)/(utils)/NotionBlocks'
import { getDatabaseQuery } from '~app/(notion)/(utils)/queries/index'
import {
  getPropertyTypeData,
  getPageData,
  getShowData,
} from '~app/(notion)/(utils)/utils'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'
import { Testing } from '~components/Testing'

import { DATABASE_ID } from './Show.constants'
// import type { PageObjectResponseShow } from './Show.types'

function ListingTemp({ data }) {
  const items = data.results.map((item) => {
    const { properties } = item
    const itemData = getShowData(properties)
    if (!itemData?.isPublished) return null
    return itemData
  })

  const preview = false
  const shows = _orderBy(_filter(items, preview ? {} : { isPublished: true }), [
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

// @todo(complexity) 11
// eslint-disable-next-line complexity
async function Listing({ segmentInfo }) {
  // const { slug } = segmentInfo
  // @note(notion) Listing do not pass Database ID
  const data = await getCustom({
    database_id: '',
    filterType: 'equals',
    segmentInfo,
  })

  const isDynamicListing =
    (segmentInfo.segment === 'blog' || segmentInfo.segment === 'events') &&
    segmentInfo.isIndex
  const noData = isObjectEmpty(data?.blocks || {})

  const is404 = !isDynamicListing && noData
  // if (is404) return <FourOhFour isNotPublished={false} segmentInfo={segmentInfo} />
  if (is404) notFound()

  const isPublished = is404
    ? false
    : isDynamicListing ||
      getPropertyTypeData(data?.page?.properties, 'Is.Published') ||
      false

  // if (!isPublished)
  //   return <FourOhFour isNotPublished={true} segmentInfo={segmentInfo} />
  if (!isPublished) notFound()

  /**
   * @note(notion) GET ITEMS / TODO CACHE + SUSPENSE
   */
  const showData: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    filterType: 'starts_with',
    segmentInfo,
  })
  const hasContent = showData?.results?.length > 0
  const title = 'Shows'

  // console.dir(`showData`)
  // console.dir(showData)
  // console.dir(`data`)
  // console.dir(data)

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
          {/* <NotionBlocks data={data?.blocks} /> */}
          {hasContent && <ListingTemp data={showData} />}
        </SectionContent>
      </SectionWrapper>
      <Testing />
    </>
  )
}

export { Listing }
