import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import {
  getDatabaseQuery,
  getDataFromCache,
} from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'
import { getPropertyTypeData } from 'next-notion/utils/index'

import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
// import { HeaderFull } from '@/app/playground/2024/_components/Header.Full'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
import { LI, UL } from '@/components/List/index'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CONFIG, getPageData, getShowData } from '@/app/(notion)/_config/index'
// import { Notion as Blocks } from '@/components/Notion/index'
// import type { PageObjectResponseShow } from '@/app/(notion)/_config/index'

const { DATABASE_ID } = CONFIG.SHOWS

async function ListingTemp({ data }) {
  const { isEnabled } = await draftMode()
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
    <UL>
      {shows.map((show) => {
        if (!show?.isPublished) return null
        return (
          <LI key={`shows-show-${show?.id}`}>
            <Anchor
              className="flex list-none items-center justify-start gap-2"
              href={show?.href}
            >
              <Text size="4"> {show?.title}</Text>
            </Anchor>
          </LI>
        )
      })}
    </UL>
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
  // const { seoDescription } = getPageData(data?.page?.properties) || ''
  const seoDescription =
    'Shows that comedian Jerome Fitzgerald is in. Maybe these should be Acts? Online content, when it is his, eludes him. (He is glad you found this page in spite of this.)'

  return (
    <>
      {/* <HeaderFull overline={seoDescription} title={title} /> */}
      <ContainerWithSidebar>
        <HeaderSidebar hasBorder={false} title={title} />
        <ArticleMain>
          <Callout size="1" variant="outline" />
          {/* <Blocks data={data?.blocks} /> */}
          <Text size="4">{seoDescription}</Text>
          {hasContent && <ListingTemp data={showData} />}
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}

export { Listing }
