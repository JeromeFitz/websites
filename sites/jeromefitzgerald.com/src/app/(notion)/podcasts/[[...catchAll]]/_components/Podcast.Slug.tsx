import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  // SectionHero,
  SectionWrapper,
  Tags,
} from '@jeromefitz/ds/components/Section'
import { getDataFromCache } from '@jeromefitz/shared/src/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesPodcast } from '~app/(notion)/_config'
import { CONFIG, getPodcastData } from '~app/(notion)/_config'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations'

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
      {/* Hero */}
      {/* <SectionHero title={title} /> */}
      {/* Content */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent>
            <Tags tags={tags} />
          </SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          <Blocks data={data?.blocks} />
          <PodcastEpisodes properties={properties} />
        </SectionContent>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={[]}
          />
        </SectionContent>
      </SectionWrapper>
      {/* <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Upcoming Podcasts</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <UpcomingPodcasts properties={properties} />
        </SectionContent>
      </SectionWrapper> */}
    </>
  )
}

export { Slug }
