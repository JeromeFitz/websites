import { getDataFromCache } from '@jeromefitz/shared/notion/utils/index'
import { isObjectEmpty } from '@jeromefitz/utils'

import { draftMode } from 'next/headers.js'
import { notFound } from 'next/navigation.js'

import type { PropertiesShow } from '@/app/(notion)/_config/index'
// import type { SectionType } from '@/app/(notion)/about/_components/Section'

import {
  CONFIG,
  getPropertyTypeDataShow,
  getShowData,
} from '@/app/(notion)/_config/index'
// import { Section } from '@/app/(notion)/about/_components/Section'
import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { Credits } from '@/app/playground/2024/_components/Credits'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
import { Notion as Blocks } from '@/components/Notion/index'

import { ShowSlugHeaderData } from './Show.Slug.Header.Data'
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
  const { isEnabled } = await draftMode()
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

  // eslint-disable-next-line no-unsafe-optional-chaining
  const { properties }: { properties: PropertiesShow } = data?.page
  const { id, isPublished, title } = getShowData(properties)

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

  // const sections: SectionType[] = [
  //   {
  //     content: null,
  //     icon: null,
  //     id: 'test',
  //     title: 'Lore',
  //   },
  //   {
  //     content: <Credits id={id} key={`relations--${id}--wrapper`} relations={R} />,
  //     icon: null,
  //     id: 'credits',
  //     title: 'Credits',
  //   },
  // ]

  return (
    <>
      <ContainerWithSidebar>
        <HeaderSidebar title={title}>
          <ShowSlugHeaderData properties={properties} />
        </HeaderSidebar>
        <ArticleMain>
          <Blocks data={data?.blocks} />
          <Credits id={id} key={`relations--${id}--wrapper`} relations={R} />
          <ArticleMainCTA href="/shows" type="shows" />
        </ArticleMain>
      </ContainerWithSidebar>
      {/* <Section sections={sections} /> */}
    </>
  )
}

export { Slug }
