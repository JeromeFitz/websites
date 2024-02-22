import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { getDataFromCache, getDatabaseQuery } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints.js'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPropertyTypeData } from 'next-notion/utils'

import type { PageObjectResponsePerson } from '@/app/(notion)/_config'

import { CONFIG } from '@/app/(notion)/_config'
import { Grid } from '@/components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '@/components/Headline'
import { Notion as Blocks } from '@/components/Notion'
// import { Relations } from '@/components/Relations'

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
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent>
          <Blocks data={data?.blocks} />
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={`Info`} as="p">
            <>Info</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          {/* @todo(notion) Show */}
          {hasData && <ListingTemp data={personData} />}
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { Listing }
