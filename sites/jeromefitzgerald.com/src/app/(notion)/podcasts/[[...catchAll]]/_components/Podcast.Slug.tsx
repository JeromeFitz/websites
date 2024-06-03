import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

import type { PropertiesPodcast } from '@/app/(notion)/_config/index'

import {
  CONFIG,
  getPodcastData,
  getPropertyTypeDataPodcast,
} from '@/app/(notion)/_config/index'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
import { Notion as Blocks } from '@/components/Notion/index'
import { Relations } from '@/components/Relations/index'

import { PodcastEpisodes } from './Podcast.Episodes'
import { PodcastSlugHeaderData } from './Podcast.Slug.Header.Data'

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
  const { id, isPublished, title } = getPodcastData(properties)

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
      <ContainerWithSidebar>
        <HeaderSidebar title={title}>
          <PodcastSlugHeaderData properties={properties} />
        </HeaderSidebar>
        <ArticleMain>
          <Callout size="1" variant="outline" />
          <Blocks data={data?.blocks} />
        </ArticleMain>
      </ContainerWithSidebar>
      <ContainerWithSidebar>
        <HeaderSidebar title={'Episodes'} />
        <ArticleMain>
          <PodcastEpisodes properties={properties} />
        </ArticleMain>
      </ContainerWithSidebar>
      <ContainerWithSidebar>
        <HeaderSidebar title={'Info'} />
        <ArticleMain>
          <Relations id={id} relations={R} />
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}

export { Slug }
