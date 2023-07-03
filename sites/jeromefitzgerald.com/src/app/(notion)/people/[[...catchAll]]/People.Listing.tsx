import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { isObjectEmpty } from '@jeromefitz/utils'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import { notFound } from 'next/navigation'

import { getCustom } from '~app/(cache)/getCustom'
// import { FourOhFour } from '~app/(errors)/404'
import { NotionBlocks } from '~app/(notion)/(utils)/NotionBlocks'
import { getDatabaseQuery } from '~app/(notion)/(utils)/queries/index'
import { getPropertyTypeData } from '~app/(notion)/(utils)/utils'
// import { Relations } from '~components/Relations'
import {
  SectionContent,
  SectionHeader,
  // SectionHeaderContent,
  // SectionHero,
  SectionHeaderTitle,
  SectionWrapper,
  // Tags,
} from '~components/Section'
import { Testing } from '~components/Testing'

import { DATABASE_ID } from './Person.constants'
// import type { PropertiesPerson } from './Person.types'
import type { PageObjectResponsePerson } from './Person.types'
// // import { UpcomingShows } from './Show.UpcomingShows'

// type RELATIONS_TYPE = keyof PropertiesPerson
// const RELATIONS: RELATIONS_TYPE[] = [
//   'Relation.Shows.Cast',
//   'Relation.Shows.Producer',
// ]

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
async function Listing({ preview, revalidate, segmentInfo }) {
  // const { slug } = segmentInfo
  // @note(notion) Listing do not pass Database ID
  const data = await getCustom({
    database_id: '',
    filterType: 'equals',
    preview,
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

  // if (is404) return <FourOhFour isNotPublished={false} segmentInfo={segmentInfo} />
  if (is404) notFound()

  const isPublished = is404
    ? false
    : isDynamicListing ||
      getPropertyTypeData(data?.page?.properties, 'Is.Published') ||
      false

  // console.dir(`isPublished:      ${isPublished ? 'y' : 'n'}`)

  // if (!isPublished)
  //   return <FourOhFour isNotPublished={true} segmentInfo={segmentInfo} />
  if (!isPublished) notFound()

  /**
   * @note(notion) GET ITEMS / TODO CACHE + SUSPENSE
   */
  const personData: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    filterType: 'starts_with',
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
          <NotionBlocks data={data?.blocks} />
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
      <Testing />
    </>
  )
}

export { Listing }
