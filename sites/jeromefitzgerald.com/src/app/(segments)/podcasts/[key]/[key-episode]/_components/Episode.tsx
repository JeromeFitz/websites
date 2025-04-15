import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'

import type { Episode } from '@/lib/drizzle/schemas/cache-episodes/types'

import { ShowSlugHeaderData } from '@/app/(segments)/shows/[key]/_components/Show.Slug.Header.Data'
import { ArticleMain } from '@/components/Article/Article.Main'
import { ArticleMainCTA } from '@/components/Article/Article.Main.CTA'
import { Callout } from '@/components/Callout/Callout'
import { ContainerWithSidebar } from '@/components/Container/Container.Main'
// import { Credits } from '@/components/Credits/Credits'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { ImageNotion } from '@/components/Image/Image.Notion'
import { segment } from '@/lib/drizzle/schemas/cache-episodes/queries'
import { Notion } from '@/lib/notion/Notion.Component'
import { isEmpty } from '@/utils/isEmpty'

export function EpisodeComponent({ blocks, item }: { blocks: any; item: Episode }) {
  const itemBlocks = blocks[0]
  return (
    <>
      <ContainerWithSidebar>
        <HeaderSidebar title={item.title}>
          <ShowSlugHeaderData item={item} />
        </HeaderSidebar>
        <ArticleMain>
          <Callout size="1" variant="outline" />
          <Flex>
            <ImageNotion item={item} segment={segment} />
          </Flex>
          {!isEmpty(blocks) && <Notion data={itemBlocks} />}
          <Flex
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
            <section />
          </Flex>
          <ArticleMainCTA href={`/podcasts`} type={`podcasts`} />
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}
