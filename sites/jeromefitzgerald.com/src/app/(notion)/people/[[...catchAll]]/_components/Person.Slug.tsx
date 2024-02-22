import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesPerson } from '~app/(notion)/_config'

import { CONFIG, getPersonData } from '~app/(notion)/_config'
import { Grid } from '~app/playground/2024/_components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
} from '~app/playground/2024/_components/Headline'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations/index'

// import { UpcomingShows } from './Show.UpcomingShows'

type RELATIONS_TYPE = keyof PropertiesPerson
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.Shows.Cast',
  'Relation.Shows.Producer',
]

const { DATABASE_ID } = CONFIG.PEOPLE

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })
  const is404 = isObjectEmpty(data?.blocks || {})
  if (is404) return notFound()

  const { properties }: { properties: PropertiesPerson } = data?.page
  const { isPublished, title } = getPersonData(properties)

  if (!isPublished) return notFound()

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
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={[]}
          />
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={`Info`} as="p">
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
