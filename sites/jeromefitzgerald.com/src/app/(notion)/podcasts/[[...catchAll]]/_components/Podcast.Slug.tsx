import { Separator } from '@jeromefitz/ds/components/Separator'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesPodcast } from '~app/(notion)/_config'

import { CONFIG, getPodcastData } from '~app/(notion)/_config'
import { ModuleRow } from '~app/_temp/modules/ModuleRow'
import { TopBar } from '~app/_temp/modules/TopBar'
import { LayoutClient } from '~app/layout.client'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations/index'
import { WIP } from '~components/WIP/index'

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
  const { isPublished, seoDescription, tags, title } = getPodcastData(properties)

  if (!isPublished) return notFound()

  return (
    <>
      <LayoutClient>
        <div className="w-full min-w-full">
          <TopBar
            className=""
            description={seoDescription}
            isHidden={false}
            isHiddenTags={false}
            isHiddenTitle={false}
            label={title}
            tags={tags}
            title={title}
          />
          <ModuleRow>
            <WIP />
            <Blocks data={data?.blocks} />
            <Separator className="my-6" />
            <PodcastEpisodes properties={properties} />
            <Separator className="my-6" />
            <h3 className="text-3xl font-black uppercase tracking-tighter">Info</h3>
            <Separator className="my-4 opacity-50" />
            <Relations
              properties={properties}
              relations={RELATIONS}
              relationsSecondary={[]}
            />
          </ModuleRow>
        </div>
      </LayoutClient>
    </>
  )
}

export { Slug }
