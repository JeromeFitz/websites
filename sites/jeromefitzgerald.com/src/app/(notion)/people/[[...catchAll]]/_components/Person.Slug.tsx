import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

import type { PropertiesPerson } from '@/app/(notion)/_config/index'

import {
  CONFIG,
  getPersonData,
  getPropertyTypeDataPerson,
} from '@/app/(notion)/_config/index'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '@/components/Headline/index'
import { Notion as Blocks } from '@/components/Notion/index'
import { Relations } from '@/components/Relations/index'

// import { UpcomingShows } from './Show.UpcomingShows'

type RELATIONS_TYPE = keyof PropertiesPerson
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.Shows.Cast',
  'Relation.Shows.Producer',
]

const { DATABASE_ID } = CONFIG.PEOPLE

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = await draftMode()
  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })
  const is404 = isObjectEmpty(data?.blocks || {})
  if (is404) return notFound()

  // eslint-disable-next-line no-unsafe-optional-chaining
  const { properties }: { properties: PropertiesPerson } = data?.page
  const { id, isPublished, title } = getPersonData(properties)

  if (!isPublished) return notFound()

  const R: any = {}
  RELATIONS.map((relation: RELATIONS_TYPE) => {
    R[relation] = []
    const items = getPropertyTypeDataPerson(properties, relation)
    items.map((item) => {
      R[relation].push(item.id)
    })
  })

  return (
    <>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent>
          <Blocks data={data?.blocks} />
        </HeadlineContent>
      </Grid>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={`Info`} as="h2">
            <>Info</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Relations id={id} relations={R} />
        </HeadlineContent>
      </Grid>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={`Info`} as="h2">
            <>Upcoming Shows</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <>{/* <UpcomingShows properties={properties} /> */}</>
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { Slug }
