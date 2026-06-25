import { get as _get } from "lodash-es";

// import {
//   imageGallery,
//   // imageGallery2,
//   // imageHeadline,
// } from '@/app/(segments)/shows/_content/_images'
import { ArticleMain } from "@/components/article/article.main";
import { ArticleMainCTA } from "@/components/article/article.main.cta";
import { ContainerWithSidebar } from "@/components/container/container.main";
import { Credits } from "@/components/credits/credits";
import { HeaderFull } from "@/components/header/header.full";
import { HeaderSidebar } from "@/components/header/header.sidebar";
import { ModuleCredits } from "@/components/v16/module";
import { GridWrapper } from "@/components/v16/wrapper";
import { segment } from "@/lib/drizzle/schemas/cache-shows/queries";
import type { Show as ShowType } from "@/lib/drizzle/schemas/cache-shows/types";
import { Notion } from "@/lib/notion/notion.component";
import { getTitleData } from "@/utils/get-title-data";
import { isEmpty } from "@/utils/is-empty";

import {
  ContentComponents,
  ContentSection,
  ContentTitle,
  DataComponents,
} from "../../_content/_components";
import { ShowSlugHeaderData } from "./show.slug.header.data";

const ROLLUPS: string[] = [
  "rollupPeopleCastTitle",
  "rollupPeopleCrewTitle",
  "rollupPeopleDirectorTitle",
  "rollupPeopleDirectorMusicalTitle",
  "rollupPeopleDirectorTechnicalTitle",
  "rollupPeopleMusicTitle",
  "rollupPeopleProducerTitle",
  "rollupPeopleWriterTitle",
  "rollupPeopleThanksTitle",
  "rollupPeopleCastPastTitle",
];

export async function Show({ blocks, item }: { blocks: any; item: ShowType }) {
  const itemBlocks = blocks[0];

  const itemRecord = item as Record<string, any>;
  const R: any = {};
  ROLLUPS.map((ROLLUP: any) => {
    R[ROLLUP] = [];

    const items = itemRecord[ROLLUP];
    items.map((i: any) => {
      R[ROLLUP].push(getTitleData({ data: i, type: i.type }));
    });
  });

  const customKey = _get(ContentComponents, item.slug);
  const hasCustom = !!customKey;
  const customContent =
    hasCustom &&
    (await (DataComponents as Record<string, (args: { slug: string }) => Promise<any>>)[item.slug]({
      slug: item.slug,
    }));

  // const foo = [imageGallery[2]]

  return (
    <>
      <HeaderFull count={0} subline={customContent.seoDescription} title={item.title} />
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
                <Credits id={item.id} key={`relations--${item.id}--wrapper`} relations={R} />
              </>
            )
          )}

          <ArticleMainCTA href={`/${segment}`} type={segment} />
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  );
}
