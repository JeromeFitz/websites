import { Separator } from '@jeromefitz/ds/components/Separator'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { Badge } from '@radix-ui/themes'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesPodcast } from '@/app/(notion)/_config'

import { CONFIG, getPodcastData } from '@/app/(notion)/_config'
import { Grid } from '@/components/Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline'
import { Notion as Blocks } from '@/components/Notion'
import { Relations } from '@/components/Relations'
import { WIP } from '@/components/WIP'

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
  const { isPublished, tags, title } = getPodcastData(properties)

  if (!isPublished) return notFound()

  return (
    <>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="h1">
            <>{title}</>
          </HeadlineTitle>
          <HeadlineTitleSub>
            {tags.map(({ color, id, name }) => (
              <Badge color={color} key={id} size="2">
                {name}
              </Badge>
            ))}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <WIP />
          <Blocks data={data?.blocks} />
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="p">
            <>Episodes</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Separator className="mb-4 opacity-50" />
          <PodcastEpisodes properties={properties} />
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <HeadlineColumnA>
          <HeadlineTitle aria-label={title} as="p">
            <>Info</>
          </HeadlineTitle>
        </HeadlineColumnA>
        <HeadlineContent className="">
          <Separator className="mb-4 opacity-50" />
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={[]}
          />
        </HeadlineContent>
      </Grid>
    </>
  )
}

export { Slug }
