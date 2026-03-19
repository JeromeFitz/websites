import type { Show as ShowType } from '@/lib/drizzle/schemas/cache-shows/types'

import { get as _get } from 'lodash-es'

import { ModuleCredits } from '@/app/_v16/Module'
import { GridWrapper } from '@/app/_v16/Wrapper'
import {
  imageGallery,
  // imageGallery2,
  // imageHeadline,
} from '@/app/(segments)/shows/_content/_images'
import { ArticleMain } from '@/components/Article/Article.Main'
import { ArticleMainCTA } from '@/components/Article/Article.Main.CTA'
import { ContainerWithSidebar } from '@/components/Container/Container.Main'
import { Credits } from '@/components/Credits/Credits'
import { HeaderFull } from '@/components/Header/Header.Full'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { segment } from '@/lib/drizzle/schemas/cache-shows/queries'
import { Notion } from '@/lib/notion/Notion.Component'
import { getTitleData } from '@/utils/getTitleData'
import { isEmpty } from '@/utils/isEmpty'

import {
  ContentComponents,
  ContentSection,
  ContentTitle,
  DataComponents,
} from '../../_content/_components'
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

export async function Show({ blocks, item }: { blocks: any; item: ShowType }) {
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

  const customKey = _get(ContentComponents, item.slug)
  const hasCustom = !!customKey
  const customContent =
    // @ts-ignore
    hasCustom && (await DataComponents[item.slug]({ slug: item.slug }))

  const foo = [imageGallery[2]]

  return (
    <>
      <HeaderFull
        count={0}
        subline={customContent.seoDescription}
        title={item.title}
      />
      <ContainerWithSidebar>
        <HeaderSidebar title={item.title}>
          <ShowSlugHeaderData item={item} />
        </HeaderSidebar>
        <ArticleMain>
          {hasCustom ? (
            <>
              <customContent.content />
              <GridWrapper>
                <ContentTitle title="Credits" />
                <ContentSection>
                  <ModuleCredits data={customContent} />
                </ContentSection>
              </GridWrapper>
            </>
          ) : (
            !isEmpty(blocks) && (
              <>
                <Notion data={itemBlocks} />
                <Credits
                  id={item.id}
                  key={`relations--${item.id}--wrapper`}
                  relations={R}
                />
              </>
            )
          )}

          <ArticleMainCTA href={`/${segment}`} type={segment} />
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}
