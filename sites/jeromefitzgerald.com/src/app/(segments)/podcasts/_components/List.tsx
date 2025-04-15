import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Grid } from '@radix-ui/themes/dist/esm/components/grid.js'
import { Heading } from '@radix-ui/themes/dist/esm/components/heading.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import NextLink from 'next/link'

import type { Podcast } from '@/lib/drizzle/schemas/cache-podcasts/types'

import { HeaderFull } from '@/components/Header/Header.Full'
import { getImageKeyValue } from '@/lib/drizzle/schemas/cache-images/queries'
import { getImageKeySlug } from '@/lib/drizzle/utils/getImageKeySlug'
import { cx } from '@/utils/cx'

function ListWrapper({ podcasts }: { podcasts: Podcast[] }) {
  return (
    <Box>
      <Grid
        columns={{ initial: '1', md: '2' }}
        gapX={{ initial: '1', md: '3' }}
        gapY={{ initial: '6', md: '6' }}
        role="list"
        width="100%"
      >
        {podcasts.map(async (podcast) => {
          if (!podcast.isPublished) return null
          const seoImage: any = podcast.seoImage
          const imageUrl = seoImage[seoImage?.type]?.url
          const { key } = getImageKeySlug(imageUrl)
          const imageKeyValue = await getImageKeyValue({ key })
          const image: any = imageKeyValue[0].value[0]

          return (
            <Box
              className="group rounded-sm bg-scroll"
              key={podcast.id}
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
                <NextLink href={podcast.slugPreview}>
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
                        {podcast.title}
                      </Heading>
                      <Text
                        className="md:line-clamp-3 md:min-h-[75px]"
                        mr={{ initial: '1', md: '3' }}
                      >
                        {podcast.seoDescription}
                      </Text>
                      {/* <Flex
                        align="end"
                        className="bg-transparent"
                        direction="row"
                        gap={{ initial: '2', md: '3' }}
                        height="100%"
                        width="100%"
                        wrap="nowrap"
                      >
                        <>
                          {podcast.tags.length === 0 && (
                            <Badge className="lowercase" color="amber" size="2">
                              <Code variant="ghost">comedy</Code>
                            </Badge>
                          )}
                          {podcast.tags.map(({ color, id, name }: NotionTag) => (
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
                      </Flex> */}
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

function List({ items }: { items: Podcast[] }) {
  const podcasts = _orderBy(_filter(items, { isPublished: true }), ['title'])
  return (
    <Flex direction="column">
      <HeaderFull count={items.length} overline="" title="Podcasts" />
      <Flex
        direction="column"
        gap="9"
        mb={{ initial: '4', md: '6' }}
        pb={{ initial: '4', md: '6' }}
      >
        <Flex direction="column" gap="3">
          <Text size={{ initial: '3', md: '5' }}>
            This features Podcasts that Jerome has either guested on,{' '}
            <Em>
              or against his better judgment spent time on creating and maintaining
            </Em>
            . <Strong>Major shout-out to the original J. Pitts Show.</Strong>
          </Text>
        </Flex>
      </Flex>
      <ListWrapper podcasts={podcasts} />
    </Flex>
  )
}

export { List }
