import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Separator } from '@radix-ui/themes/dist/esm/components/separator.js'
import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

import type { PropertiesPodcast } from '@/app/(notion)/_config/index'

import {
  CONFIG,
  getPodcastData,
  getPropertyTypeDataPodcast,
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

import { PodcastEpisodes } from './Podcast.Episodes'

const { DATABASE_ID } = CONFIG.PODCASTS

type RELATIONS_TYPE = keyof PropertiesPodcast
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.People.Host',
  'Relation.People.Producer',
  'Relation.People.Thanks',
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

  const { properties }: { properties: PropertiesPodcast } = data?.page
  const { id, isPublished, tags, title } = getPodcastData(properties)

  if (!isPublished) return notFound()

  const R: any = {}
  RELATIONS.map((relation: RELATIONS_TYPE) => {
    R[relation] = []
    const items = getPropertyTypeDataPodcast(properties, relation)
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
              <Badge className="lowercase" color={color} key={id} size="2">
                <Code variant="ghost">{name}</Code>
              </Badge>
            ))}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <Callout size="1" variant="outline" />
          <Blocks data={data?.blocks} />
        </HeadlineContent>
      </Grid>
      <Grid>
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h2">
            <>Episodes</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Separator size="4" />
          <PodcastEpisodes properties={properties} />
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
