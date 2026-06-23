import { Flex } from "@radix-ui/themes/dist/esm/components/flex.js";

import { ShowSlugHeaderData } from "@/app/(segments)/shows/[key]/_components/show.slug.header.data";
import { ArticleMain } from "@/components/article/article.main";
import { ArticleMainCTA } from "@/components/article/article.main.cta";
import { Callout } from "@/components/callout/callout";
import { ContainerWithSidebar } from "@/components/container/container.main";
// import { Credits } from '@/components/credits/credits'
import { HeaderSidebar } from "@/components/header/header.sidebar";
import { ImageNotion } from "@/components/image/image.notion";
import { segment } from "@/lib/drizzle/schemas/cache-episodes/queries";
import type { Episode } from "@/lib/drizzle/schemas/cache-episodes/types";
import { Notion } from "@/lib/notion/notion.component";
import { isEmpty } from "@/utils/is-empty";

export function EpisodeComponent({ blocks, item }: { blocks: any; item: Episode }) {
  const itemBlocks = blocks[0];
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
  );
}
