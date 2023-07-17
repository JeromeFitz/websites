import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '@jeromefitz/ds/components/Section'
import {
  getDataFromCache,
  getDatabaseQuery,
} from '@jeromefitz/shared/src/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPropertyTypeData } from 'next-notion/src/utils'

import type { PageObjectResponsePerson } from '~app/(notion)/_config'
import { CONFIG } from '~app/(notion)/_config'
import { Notion as Blocks } from '~components/Notion'
// import { Relations } from '~components/Relations'

// import type { PropertiesPerson } from './Person.types'
// // import { UpcomingShows } from './Show.UpcomingShows'

// type RELATIONS_TYPE = keyof PropertiesPerson
// const RELATIONS: RELATIONS_TYPE[] = [
//   'Relation.Shows.Cast',
//   'Relation.Shows.Producer',
// ]

const { DATABASE_ID } = CONFIG.PEOPLE

function ListingTemp({ data }) {
  return (
    <ul>
      {data.results.map((person: PageObjectResponsePerson) => {
        const { properties } = person
        // const propertyTypeData: any = getPropertyTypeData(
        //   properties,
        //   'Slug.Preview'
        // )
        // const href = propertyTypeData?.string
        const href = getPropertyTypeData(properties, 'Slug.Preview')
        return (
          <li key={`people-person-${person.id}`}>
            <Anchor href={href}>{href}</Anchor>
          </li>
        )
      })}
    </ul>
  )
}

// @todo(complexity) 11
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

  // console.dir(`isDynamicListing: ${isDynamicListing ? 'y' : 'n'}`)
  // console.dir(`noData:           ${noData ? 'y' : 'n'}`)

  const is404 = !isDynamicListing && noData
  // console.dir(`is404:            ${is404 ? 'y' : 'n'}`)

  if (is404) notFound()

  const isPublished = is404
    ? false
    : isDynamicListing ||
      getPropertyTypeData(data?.page?.properties, 'Is.Published') ||
      false

  // console.dir(`isPublished:      ${isPublished ? 'y' : 'n'}`)

  if (!isPublished) notFound()

  /**
   * @note(notion) GET ITEMS / TODO CACHE + SUSPENSE
   */
  const personData: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'starts_with',
    revalidate,
    segmentInfo,
  })
  const hasData = personData?.results?.length > 0
  const title = 'People'
  return (
    <>
      {/* Hero */}
      {/* <SectionHero title={title} /> */}
      {/* Content */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
      {/* Info */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          {/* @todo(notion) Show */}
          {hasData && <ListingTemp data={personData} />}
        </SectionContent>
      </SectionWrapper>
    </>
  )
}

export { Listing }
