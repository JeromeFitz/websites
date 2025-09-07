import type { Show as ShowType } from '@/lib/drizzle/schemas/cache-shows/types'

import { ArticleMain } from '@/components/Article/Article.Main'
import { ArticleMainCTA } from '@/components/Article/Article.Main.CTA'
import { ContainerWithSidebar } from '@/components/Container/Container.Main'
import { Credits } from '@/components/Credits/Credits'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { segment } from '@/lib/drizzle/schemas/cache-shows/queries'
import { Notion } from '@/lib/notion/Notion.Component'
import { getTitleData } from '@/utils/getTitleData'
import { isEmpty } from '@/utils/isEmpty'

import { ShowSlugHeaderData } from './Show.Slug.Header.Data'

const ROLLUPS: string[] = [
  'rollupPeopleCastTitle',
  'rollupPeopleCrewTitle',
  'rollupPeopleDirectorTitle',
  'rollupPeopleDirectorMusicalTitle',
  'rollupPeopleDirectorTechnicalTitle',
  'rollupPeopleMusicTitle',
  'rollupPeopleProducerTitle',
  'rollupPeopleWriterTitle',
  'rollupPeopleThanksTitle',
  'rollupPeopleCastPastTitle',
]

export function Show({ blocks, item }: { blocks: any; item: ShowType }) {
  const itemBlocks = blocks[0]

  const R: any = {}
  ROLLUPS.map((ROLLUP: any) => {
    R[ROLLUP] = []

    // @ts-ignore
    const items = item[ROLLUP]
    items.map((i: any) => {
      R[ROLLUP].push(getTitleData({ data: i, type: i.type }))
    })
  })

  return (
    <ContainerWithSidebar>
      <HeaderSidebar title={item.title}>
        <ShowSlugHeaderData item={item} />
      </HeaderSidebar>
      <ArticleMain>
        {!isEmpty(blocks) && <Notion data={itemBlocks} />}
        <Credits id={item.id} key={`relations--${item.id}--wrapper`} relations={R} />
        <ArticleMainCTA href={`/${segment}`} type={segment} />
      </ArticleMain>
    </ContainerWithSidebar>
  )
}
