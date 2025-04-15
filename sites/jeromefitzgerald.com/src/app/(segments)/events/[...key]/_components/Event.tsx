import type { Event } from '@/lib/drizzle/schemas/cache-events/types'

import { ArticleMain } from '@/components/Article/Article.Main'
import { ArticleMainCTA } from '@/components/Article/Article.Main.CTA'
import { ContainerWithSidebar } from '@/components/Container/Container.Main'
import { Credits } from '@/components/Credits/Credits'
// import { Credits } from '@/components/Credits/Credits'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { ImageNotion } from '@/components/Image/Image.Notion'
import { segment } from '@/lib/drizzle/schemas/cache-events/queries'
import { Notion } from '@/lib/notion/Notion.Component'
import { getTitleData } from '@/utils/getTitleData'
import { isEmpty } from '@/utils/isEmpty'

import { EventSlugHeaderData } from './Event.Slug.Header.Data'

const ROLLUPS: string[] = [
  'rollupShowsPrimaryCastTitle',
  'rollupPeopleGuestTitle',
  'rollupShowsProducerTitle',
  'rollupShowsPrimaryCastTitle',
  'rollupShowsSupportingTitle',
]

export function EventComponent({ blocks, item }: { blocks: any; item: Event }) {
  const itemBlocks = blocks[0]

  const R: any = {}
  ROLLUPS.map((ROLLUP: any) => {
    R[ROLLUP] = []
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (item[ROLLUP] && item[ROLLUP].length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const items = item[ROLLUP]
      items.map((i: any) => {
        R[ROLLUP].push(getTitleData({ data: i, type: i.type }))
      })
    }
  })

  // console.dir(`> R`)
  // console.dir(R)

  return (
    <ContainerWithSidebar>
      <HeaderSidebar title={item.title}>
        <EventSlugHeaderData item={item} />
      </HeaderSidebar>
      <ArticleMain>
        <ImageNotion item={item} segment={segment} />
        {!isEmpty(blocks) && <Notion data={itemBlocks} />}
        {/* <Flex
          align="start"
          asChild
          direction="column"
          gap="1"
          justify="between"
          key={item.id}
          my="4"
          py="2"
          width="100%"
        >
          <ImageNotion item={item} segment={segment} />
        </Flex> */}
        <Credits id={item.id} key={`relations--${item.id}--wrapper`} relations={R} />
        <ArticleMainCTA href={`/${segment}`} type={segment} />
      </ArticleMain>
    </ContainerWithSidebar>
  )
}
