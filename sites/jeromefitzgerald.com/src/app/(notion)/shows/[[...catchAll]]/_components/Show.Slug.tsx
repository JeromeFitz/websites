import { Separator } from '@jeromefitz/ds/components/Separator'
import { getDataFromCache } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { PropertiesShow } from '~app/(notion)/_config'

import { CONFIG, getShowData } from '~app/(notion)/_config'
import { ModuleRow } from '~app/_temp/modules/ModuleRow'
import { TopBar } from '~app/_temp/modules/TopBar'
import { LayoutClient } from '~app/layout.client'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations/index'

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
  const { isPublished, seoDescription, tags, title } = getShowData(properties)

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
            <Blocks data={data?.blocks} />
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
