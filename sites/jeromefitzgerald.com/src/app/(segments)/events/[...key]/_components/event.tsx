import { ArticleMain } from "@/components/article/article.main";
import { ArticleMainCTA } from "@/components/article/article.main.cta";
import { ContainerWithSidebar } from "@/components/container/container.main";
import { Credits } from "@/components/credits/credits";
// import { Credits } from '@/components/credits/credits'
import { HeaderSidebar } from "@/components/header/header.sidebar";
import { ImageNotion } from "@/components/image/image.notion";
import { segment } from "@/lib/drizzle/schemas/cache-events/queries";
import type { Event } from "@/lib/drizzle/schemas/cache-events/types";
import { Notion } from "@/lib/notion/notion.component";
import { getTitleData } from "@/utils/get-title-data";
import { isEmpty } from "@/utils/is-empty";

import { EventSlugHeaderData } from "./event.slug.header.data";

const ROLLUPS: string[] = [
  "rollupShowsPrimaryCastTitle",
  "rollupPeopleGuestTitle",
  "rollupShowsProducerTitle",
  "rollupShowsPrimaryCastTitle",
  "rollupShowsPrimaryTitle",
  "rollupShowsSupportingTitle",
];

export function EventComponent({ blocks, item }: { blocks: any; item: Event }) {
  const itemBlocks = blocks[0];

  const R: any = {};
  ROLLUPS.map((ROLLUP: any) => {
    R[ROLLUP] = [];

    // @ts-ignore
    if (item[ROLLUP] && item[ROLLUP].length > 0) {
      // @ts-ignore
      const items = item[ROLLUP];
      items.map((i: any) => {
        R[ROLLUP].push(getTitleData({ data: i, type: i.type }));
      });
    }
  });

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
  );
}
