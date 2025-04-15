import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import NextLink from 'next/link'

import type { NotionTag } from '@/lib/drizzle/schemas/_notion/types'
import type { Show } from '@/lib/drizzle/schemas/cache-shows/types'

import { Anchor } from '@/components/Anchor/index'
import { ArticleMain } from '@/components/Article/Article.Main'
import { Callout } from '@/components/Callout/index'
import { ContainerWithSidebar } from '@/components/Container/Container.Main'
import { HeaderFull } from '@/components/Header/Header.Full'
import { HeaderSidebar } from '@/components/Header/Header.Sidebar'
import { LI, UL } from '@/components/List/index'
// import { ImageClient as NextImage } from '@/components/Notion/Blocks/Image.client'
import { getImageKeyValue } from '@/lib/drizzle/schemas/cache-images/queries'
import { getImageKeySlug } from '@/lib/drizzle/utils/getImageKeySlug'
import { cx } from '@/utils/cx'

function ListOld_Items({ items }: { items: Show[] }) {
  const shows = _orderBy(items, ['title'])
  return (
    <UL>
      {shows.map((item) => {
        if (!item.isPublished) return null
        return (
          <LI key={`shows-show-${item?.id}`}>
            <Anchor
              className="flex list-none items-center justify-start gap-2"
              href={item?.slugPreview}
            >
              <Text size="4">{item?.title}</Text>
            </Anchor>
          </LI>
        )
      })}
    </UL>
  )
}
function ListOld_Container({ items }: { items: Show[] }) {
  const title = 'Shows'
  return (
    <ContainerWithSidebar>
      <HeaderSidebar hasBorder={false} title={title} />
      <ArticleMain>
        <Callout size="1" variant="outline" />
        <ListOld_Items items={items} />
      </ArticleMain>
    </ContainerWithSidebar>
  )
}
function ListOld_Wrapper({ items }: { items: Show[] }) {
  return <ListOld_Container items={items} />
}

function ListWrapper({ shows }: { shows: Show[] }) {
  return (
    <Box>
      <Grid
        columns={{ initial: '1', md: '3' }}
        gapX={{ initial: '1', md: '3' }}
        gapY={{ initial: '6', md: '6' }}
        role="list"
        width="100%"
      >
        {shows.map(async (show) => {
          if (!show.isPublished) return null
          const seoImage: any = show.seoImage
          const imageUrl = seoImage[seoImage?.type]?.url
          const { key } = getImageKeySlug(imageUrl)
          const imageKeyValue = await getImageKeyValue({ key })
          const image: any = imageKeyValue[0].value[0]

          return (
            <Box
              className="group rounded-sm bg-scroll"
              key={show.id}
              position="relative"
              role="listitem"
              width="100%"
            >
              <Grid
                align="start"
                asChild
                className={cx(
                  // 'bg-accent-6',
                  'md:border-1 border-gray-7 hover:border-gray-8',
                  'rounded-sm',
                  'transition-all duration-500',
                  'group-hover:transform-[translate(0px,_-1em)]',
                  'shadow-xs group-hover:shadow-lg',
                  'dark:shadow-accent-4',
                )}
                flow="row"
                gap="3"
                height="100%"
                width="100%"
              >
                <NextLink href={show.slugPreview}>
                  <Box height="275px" overflow="hidden" position="relative">
                    {/* {!!imageUrl && <NextImage {...image} />} */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="d"
                      className={cx(
                        'absolute inline-block size-full',
                        'inset-[0%_0%_auto]',
                        // 'inset-2.5',
                        'rounded-t-sm',
                        'max-w-full object-cover align-middle',
                        'transition-all duration-700 group-hover:scale-[1.05]',
                      )}
                      src={image.src}
                    />
                  </Box>
                  <Grid align="start" flow="column" gap="3" height="100%">
                    <Flex
                      align="start"
                      direction="column"
                      gap="3"
                      // height="12rem"
                      height="100%"
                      justify="start"
                      mb="3"
                      p="3"
                    >
                      <Heading as="h2" size="6">
                        {show.title}
                      </Heading>
                      <Text
                        className="md:line-clamp-3 md:min-h-[75px]"
                        mr={{ initial: '1', md: '3' }}
                      >
                        {show.seoDescription}
                      </Text>
                      <Flex
                        align="end"
                        className="bg-transparent"
                        direction="row"
                        gap={{ initial: '2', md: '3' }}
                        height="100%"
                        width="100%"
                        wrap="nowrap"
                      >
                        <>
                          {show.tags.length === 0 && (
                            <Badge className="lowercase" color="amber" size="2">
                              <Code variant="ghost">comedy</Code>
                            </Badge>
                          )}
                          {show.tags.map(({ color, id, name }: NotionTag) => (
                            <Badge
                              className="lowercase"
                              color={color}
                              key={id}
                              size="2"
                            >
                              <Code variant="ghost">{name}</Code>
                            </Badge>
                          ))}
                        </>
                      </Flex>
                    </Flex>
                  </Grid>
                </NextLink>
              </Grid>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

function List({ items }: { items: Show[] }) {
  const shows = _orderBy(_filter(items, { isPublished: true }), ['title'])
  return (
    <Flex direction="column">
      <HeaderFull count={shows.length} overline="" title="Shows" />
      <Flex
        direction="column"
        gap="9"
        mb={{ initial: '4', md: '6' }}
        pb={{ initial: '4', md: '6' }}
      >
        <Flex direction="column" gap="3">
          <Text size={{ initial: '3', md: '5' }}>
            These are shows with considerable runs that I have either been in, or am
            still in.{' '}
            <Em>
              Maybe these should be Acts? Online content, eludes me. (Though I am
              glad you found this page in spite of this.)
            </Em>{' '}
            <Strong>Not feature work is what I am getting at.</Strong>
          </Text>
        </Flex>
      </Flex>
      <ListWrapper shows={shows} />
    </Flex>
  )
}

export { List, ListOld_Wrapper }
