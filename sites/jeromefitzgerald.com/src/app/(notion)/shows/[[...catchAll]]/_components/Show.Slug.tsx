import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

import type { PropertiesShow } from '@/app/(notion)/_config/index'

import {
  CONFIG,
  getPropertyTypeDataShow,
  getShowData,
} from '@/app/(notion)/_config/index'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'
import { Notion as Blocks } from '@/components/Notion/index'
import { Relations } from '@/components/Relations/index'

// import { UpcomingShows } from './Show.UpcomingShows'

const { DATABASE_ID } = CONFIG.SHOWS

type RELATIONS_TYPE = keyof PropertiesShow
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.People.Cast',
  'Relation.People.Crew',
  'Relation.People.Director',
  'Relation.People.Director.Musical',
  'Relation.People.Director.Technical',
  'Relation.People.Music',
  'Relation.People.Producer',
  'Relation.People.Writer',
  'Relation.People.Thanks',
  'Relation.People.Cast.Past',

  // 'Relation.Events.Primary',
]

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()
  // console.dir(`Slug: segmentInfo => draft: ${isEnabled ? 'y' : 'n'}`)
  // console.dir(segmentInfo)
  const data = await getDataFromCache({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo,
  })
  const is404 = isObjectEmpty(data?.blocks || {})
  if (is404) return notFound()

  const { properties }: { properties: PropertiesShow } = data?.page
  const { id, isPublished, tags, title } = getShowData(properties)

  if (!isPublished) return notFound()

  // console.dir(`seoDescription: ${seoDescription}`)
  // console.dir(tags)

  const R: any = {}
  RELATIONS.map((relation: RELATIONS_TYPE) => {
    R[relation] = []
    const items = getPropertyTypeDataShow(properties, relation)
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
          <HeadlineTitleSub>
            {tags.map(({ color, id, name }) => (
              <Badge color={color} key={id} size="2">
                <Code variant="ghost">{name}</Code>
              </Badge>
            ))}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <Blocks data={data?.blocks} />
        </HeadlineContent>
      </Grid>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h2">
            <>Info</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Separator size="4" />
          <Relations id={id} relations={R} />
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { Slug }
