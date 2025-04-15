import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import NextLink from 'next/link'

import type { Episode } from '@/lib/drizzle/schemas/cache-episodes/types'
import type { Podcast } from '@/lib/drizzle/schemas/cache-podcasts/types'

import { ShowSlugHeaderData } from '@/app/(segments)/shows/[key]/_components/Show.Slug.Header.Data'
import { ArticleMain } from '@/components/Article/Article.Main'
import { ArticleMainCTA } from '@/components/Article/Article.Main.CTA'
import { Callout } from '@/components/Callout/Callout'
import { ContainerWithSidebar } from '@/components/Container/Container.Main'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { ImageNotion } from '@/components/Image/Image.Notion'
import { getEpisodesByPodcast } from '@/lib/drizzle/schemas/cache-episodes/queries'
import { segment } from '@/lib/drizzle/schemas/cache-podcasts/queries'
import { Notion } from '@/lib/notion/Notion.Component'
import { getKey } from '@/utils/getKey'
import { isEmpty } from '@/utils/isEmpty'

export async function PodcastComponent({
  blocks,
  item,
}: {
  blocks: any
  item: Podcast
}) {
  const itemBlocks = blocks[0]
  // @todo(performance) if this was actually large, load dynamically
  const episodes: Episode[] = await getEpisodesByPodcast({
    key: getKey('podcasts', item.key.replace('/podcasts/', '')),
  })
  return (
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
          <section>
            <hr className="my-2 w-full" />
            <Flex
              align="start"
              asChild
              direction="column"
              gap="1"
              justify="between"
              my="4"
              py="2"
              width="100%"
            >
              <ul>
                {episodes.map((episode) => {
                  return (
                    <Text asChild key={episode.id}>
                      <Link asChild highContrast>
                        <NextLink href={episode.slugPreview}>
                          {episode.slugPreview}
                        </NextLink>
                      </Link>
                    </Text>
                  )
                })}
              </ul>
            </Flex>
          </section>
        </Flex>
        <ArticleMainCTA href={`/${segment}`} type={segment} />
      </ArticleMain>
    </ContainerWithSidebar>
  )
}
