/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { Callout } from '@jeromefitz/ds/components/Callout/index'
import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { useSWRInfinitePages } from '@jeromefitz/shared/hooks/useSWRInfinitePages'
// import { ImageClient as NextImage } from '@jeromefitz/shared/components/Notion/Blocks/Image.client'
import { fetcher } from '@jeromefitz/shared/lib'

import { useIntersection } from '@mantine/hooks'
// import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
import * as DataList from '@radix-ui/themes/dist/esm/components/data-list.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Inset } from '@radix-ui/themes/dist/esm/components/inset.js'
import {
  Content as SelectContent,
  Item as SelectItem,
  Root as SelectRoot,
  Trigger as SelectTrigger,
} from '@radix-ui/themes/dist/esm/components/select.js'
import { Strong } from '@radix-ui/themes/dist/esm/components/strong.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import Image from 'next/image'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import _title from 'title'
import { Virtualizer } from 'virtua'

import { ArticleMain } from '@/app/playground/2024/_components/Article.Main'
// import { ArticleMainCTA } from '@/app/playground/2024/_components/Article.Main.CTA'
import { ContainerWithSidebar } from '@/app/playground/2024/_components/Container.Main'
import { HeaderFull } from '@/app/playground/2024/_components/Header.Full'
import { HeaderSidebar } from '@/app/playground/2024/_components/Header.Sidebar'
// import { Grid } from '@/components/Grid/index'
import { LI, UL } from '@/components/List/index'
import { bandcamps } from '@/data/bandcamps'
import { useStore as _useStore, useShallow } from '@/store/index'
import { getKey, INIT } from '@/utils/getKey'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      spotifyTimeRange: store.spotifyTimeRange,
      spotifyTimeRangeSet: store.spotifyTimeRangeSet,
      spotifyType: store.spotifyType,
      spotifyTypeSet: store.spotifyTypeSet,
    })),
  )
}

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000
// const SCROLL_DURATION = 1250
const SCROLL_DURATION = 250

function addS(str) {
  const poss = str.charAt(str.length - 1) === 's' ? '' : 's'
  return `${str}’${poss}`
}

/**
 * @todo(spotify) uh... what is going on with short_term ?
 */
const ranges = [
  { active: false, slug: 'short_term', title: 'Past Month' },
  {
    active: true,
    slug: 'medium_term',
    // title: 'Past Six Months',
    title: 'Recent',
  },
  { active: true, slug: 'long_term', title: 'All Time' },
]

/**
 * @note fuck ariel pink
 */
const removeItems = ['5H0YoDsPDi9fObFmJtTjfN']
const info = {
  error: {
    cta: 'Please check back later',
    text: 'Hrm, API is down.',
  },
  loading: {
    cta: '– Cam’ron',
    text: `“Computers ‘puting”`,
  },
  success: {
    cta: '– Cam’ron',
    text: `“Computers ‘put(ed).”`,
  },
}

function DataItem({ item, type }) {
  // @hack
  let _alt: string,
    _genres: string[],
    _href: string,
    _meta: any,
    _title1: string,
    _title2: string,
    _title3: string,
    GENRE_MAX = 4

  if (type === 'top-artists') {
    GENRE_MAX = 9
    _href = item.external_urls.spotify
    _title1 = item.name
    _title2 = ''
    _title3 = ''
    _meta = item.image
    _genres = item.genres
    _alt = `Apologies, this image is dynamically generated from another source. Cannot yet provide vivid details. This is a photo of ${item.name}.`
  } else {
    _href = item.external_urls.spotify
    _title1 = item.artist
    _title2 = `“${item.name}”`
    _title3 = `“${item.album.name}”`
    _meta = item.album.image
    _genres = item.genres
    _alt = `Apologies, this image is dynamically generated from another source. Cannot yet provide vivid details. This is an image of ${item.artist}’s album cover for “${item.album.name}.”`
  }

  const image = {
    blurDataURL: _meta?.base64,
    ..._meta?.img,
  }
  const genres = getArrayFirstX(_genres, GENRE_MAX)
  const genresExtra = getArrayCountOfOverage(_genres, GENRE_MAX)

  return (
    <>
      <Box
        className={cx(
          'rounded-3 border-1 border-gray-7 mb-2 mr-4 flex w-full flex-row items-start gap-0 md:mb-5 md:min-h-min md:flex-row-reverse md:items-start',
          'flex-auto',
        )}
      >
        <DataList.Root className="w-full gap-1 p-2 md:gap-3 md:p-4">
          <DataList.Item align="start" className="flex flex-col gap-0">
            <DataList.Label>
              <Text size="1">
                <Code variant="ghost">Artist</Code>
              </Text>
            </DataList.Label>
            <DataList.Value>
              <Text size={{ initial: '1', md: '2' }} weight="medium">
                {_title1}
              </Text>
            </DataList.Value>
          </DataList.Item>
          {type === 'top-tracks' ||
            (type === 'recently-played' && (
              <>
                <DataList.Item align="start" className="flex flex-col gap-0">
                  <DataList.Label>
                    <Text size="1">
                      <Code variant="ghost">Song</Code>
                    </Text>
                  </DataList.Label>
                  <DataList.Value>
                    <Text size={{ initial: '1', md: '2' }} weight="medium">
                      {_title2}
                    </Text>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="start" className="flex flex-col gap-0">
                  <DataList.Label>
                    <Text size="1">
                      <Code variant="ghost">Album</Code>
                    </Text>
                  </DataList.Label>
                  <DataList.Value>
                    <Text size={{ initial: '1', md: '2' }} weight="medium">
                      {_title3}
                    </Text>
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item align="start" className="flex flex-col gap-0">
                  <DataList.Label>
                    <Text size="1">
                      <Code variant="ghost">Year</Code>
                    </Text>
                  </DataList.Label>
                  <DataList.Value>
                    <Text size={{ initial: '1', md: '2' }}>
                      <Code variant="ghost">
                        {item.album.release_date.slice(0, 4)}
                      </Code>
                    </Text>
                  </DataList.Value>
                </DataList.Item>
              </>
            ))}
          <DataList.Item
            align="start"
            className={cx(
              'flex-col gap-0 md:gap-1',
              type === 'top-tracks' ? 'hidden' : 'flex',
            )}
          >
            <DataList.Label>
              <Text size="1">
                <Code variant="ghost">Genre{genres.length > 1 && 's'}</Code>
              </Text>
            </DataList.Label>
            <DataList.Value>
              <Text size={{ initial: '2', md: '2' }}>
                <span className="mb-3 mt-2 flex flex-row flex-wrap gap-2 pb-1 font-mono md:mt-1">
                  {genres.map((genre) => {
                    if (!genre) return null
                    return (
                      <Badge
                        key={`g--${genre}`}
                        radius="full"
                        size={{ initial: '1', md: '1' }}
                      >
                        {genre}
                      </Badge>
                    )
                  })}
                  {!!genresExtra && (
                    <Badge
                      color="gray"
                      radius="full"
                      size={{ initial: '1', md: '1' }}
                    >
                      {genresExtra}
                    </Badge>
                  )}
                  {genres.length === 0 && (
                    <Badge
                      color="gray"
                      radius="full"
                      size={{ initial: '1', md: '1' }}
                    >
                      N/A
                    </Badge>
                  )}
                </span>
              </Text>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="start" className="flex flex-col gap-0 md:gap-1">
            <DataList.Label>
              <Text size="1">
                <Code variant="ghost">Link</Code>
              </Text>
            </DataList.Label>
            <DataList.Value>
              <Flex
                align="start"
                direction="column"
                flexGrow="1"
                gap="2"
                justify="end"
                mb="2"
              >
                <Button
                  asChild
                  className="w-fit"
                  color="jade"
                  highContrast={false}
                  mt="0"
                  radius="full"
                  size={{ initial: '1', md: '1' }}
                  variant="outline"
                >
                  <NextLink href={_href} target="_blank">
                    Open Spotify
                    {` `}
                    <ArrowTopRightIcon
                      className={cx('text-accent-11 !opacity-100')}
                    />
                  </NextLink>
                </Button>
              </Flex>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <Inset
          className={cx(
            'rounded-3 relative h-full',
            'h-[275px] w-[164px] min-w-[164px] max-w-[164px]',
            'md:size-full md:max-w-[308px]',
            // 'md:h-[450px] md:w-[500px]',
            // 'md:border-1 md:border-gray-7 ',
            '',
          )}
          clip="border-box"
          side={{ initial: 'all', md: 'all' }}
        >
          {/* <NextImage
            className={cx(
              'rounded-3',
              // 'max-h-[275px] min-w-[150px]',
              // 'size-full ',
              // 'md:max-h-full md:min-w-[275px] md:max-w-[575px]',
              '',
            )}
            role="img"
            tabIndex={-1}
            {...image}
          /> */}
          <Image
            {...image}
            alt={_alt}
            className="mx-auto h-auto w-full max-w-64 md:h-full md:max-w-[575px]"
            placeholder="blur"
            role="img"
            tabIndex={-1}
          />
        </Inset>
      </Box>
    </>
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DataItemLoader({ error, handleScroll, isLoadingMore }) {
  const image = {
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQUlEQVR4nAE2Acn+APzz8fzz8f/29fns6vvt6v+7xfV9lf+Ko/5/l/S2uwD/29r/3d3/3t//4972ur9tIi1HGRpgKy+vSV/uo6oA//Hx//bz/+fm//f1r214KwAApXBWbkIxGQAAuV5oAP/y8f/AyvyOn/+GnOFke2wvLHJIO1kmI40kOM9JXwD/0db+f5X/hZv8fZL/h53Tb3R3OjqEKDfjZHzeXnAA/6Ox/4WY+oSV/omb/5Wm+4GS6GZ153KB1nx7xIFpAP+fr/uKmfuKmP+drv+WpfaIlPyPm9eGgq1+YryIbQD/pa/5kpv7lZz3k5r6lZz7nKX8m6PajY2+iHeUXlIA/6y2+Z+k7JSU/Kes/7K7/Kev+6Or+aKqq3hxm2VhAPK8vM6im/++xP+9wv+0u/++xfSqrdOPjNe2sNirpkiyyKcq+CIbAAAAAElFTkSuQmCC',
    height: 640,
    src: 'https://i.scdn.co/image/ab6761610000e5eb7455f2c344f66269f98948a4',
    width: 640,
  }
  return (
    <>
      <Box
        className={cx(
          'rounded-3 border-1 border-gray-7 mb-2 mr-4 flex w-full flex-row items-start gap-0 md:mb-5 md:min-h-[400px] md:flex-row-reverse md:items-start',
          'flex-auto',
        )}
      >
        <DataList.Root className="w-full p-2 md:px-4 md:py-5">
          <DataList.Item align="start" className="flex flex-col gap-0">
            <DataList.Label>
              <Text size="1">
                <Code variant="ghost">Status</Code>
              </Text>
            </DataList.Label>
            <DataList.Value>
              <Text size={{ initial: '1', md: '7' }} weight="medium">
                {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                  ? info.loading.text
                  : error
                    ? info.error.text
                    : info.success.text}
              </Text>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item align="start" className="flex flex-col gap-0">
            <DataList.Label>
              <Text size="1">
                <Code variant="ghost">&nbsp;</Code>
              </Text>
            </DataList.Label>
            <DataList.Value>
              <Text
                as="p"
                className="line-clamp-3"
                mt="2"
                size={{ initial: '3', md: '5' }}
                weight="regular"
              >
                {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                  ? info.loading.cta
                  : error
                    ? info.error.cta
                    : info.success.cta}
              </Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <Inset
          className={cx(
            'rounded-3 relative h-full',
            'h-[275px] w-[164px] min-w-[164px] max-w-[164px]',
            'md:size-full md:max-w-[308px]',
            // 'md:h-[450px] md:w-[500px]',
            // 'md:border-1 md:border-gray-7 ',
            '',
          )}
          clip="border-box"
          side={{ initial: 'all', md: 'all' }}
        >
          <Image
            {...image}
            alt={``}
            className={cx(
              'md:max-w-96',
              !isLoadingMore && !error && 'grayscale',
              '',
            )}
            placeholder="blur"
            role="img"
            tabIndex={-1}
          />
        </Inset>
      </Box>
    </>
  )
}

function DataItems() {
  const refContainer = useRef<HTMLDivElement>(null)
  const { entry, ref: refSWRInfinitePages } = useIntersection({
    root: refContainer.current,
    threshold: 1,
  })

  const isVisible = entry?.isIntersecting

  const { spotifyTimeRange, spotifyType } = useStore()

  const [limit] = useState(10)
  const [url] = useState(INIT.url)

  const {
    canFetchMore,
    data,
    error,
    fetchMore,
    // isEmpty,
    isFetchingMore,
    // isLoadingInitialData,
    isLoadingMore,
  } = useSWRInfinitePages(
    (pageIndex) =>
      getKey(pageIndex, {
        limit,
        time_range: spotifyTimeRange ?? INIT.time_range,
        type: spotifyType ?? INIT.type,
        url,
      }),
    fetcher,
    {
      // @ts-ignore
      dataPath: 'items',
      limit: 10,
      //
      refreshInterval: HOUR,
      revalidateAll: false,
      revalidateFirstPage: false,
      /**
       * @note(swr) turning off for now until we finalize redis settings
       */
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (
      canFetchMore &&
      !isFetchingMore &&
      !isLoadingMore &&
      isVisible &&
      spotifyType !== 'recently-played'
    ) {
      void fetchMore()
    }
  }, [canFetchMore, fetchMore, isFetchingMore, isLoadingMore, isVisible])

  return (
    <Virtualizer horizontal={false}>
      {data?.map((item: any, i: number) => {
        if (removeItems.includes(item.id)) return null
        // if (i > 5) return null
        /**
         * @todo(radix) when data changes drastically
         *  can this not be so jarring? Possible to have
         *  a pseudo-loader to "hide" the first element for
         *  a period of time?
         *
         * Or have opacity start at 0 then come to 100?
         */
        return (
          <DataItem
            item={item}
            key={`np--${spotifyType}}--${spotifyTimeRange}--${i}`}
            type={spotifyType}
          />
        )
      })}
      <div className="" ref={refSWRInfinitePages} />
      <DataItemLoader
        error={error}
        // handleScroll={() => scrollIntoViewHandle()}
        handleScroll={() => {}}
        isLoadingMore={isLoadingMore}
        key="np-l-2"
      />
    </Virtualizer>
  )
}

function getArrayCountOfOverage(arr: string[], max = 4) {
  return arr.length > max && arr.length - (max + 1) > 0
    ? `+ ${arr.length - (max + 1)} more`
    : ``
}

/**
 * @todo(js) well this could be better, lol
 */
function getArrayFirstX(arr: string[], max = 4) {
  if (arr.length === 0 || !arr) return []
  return arr.map((genre, i) => {
    if (i > max) return
    return _title(genre)
  })
}

function MusicClient() {
  const { spotifyTimeRange, spotifyTimeRangeSet, spotifyType, spotifyTypeSet } =
    useStore()

  const handleValueChangeTimeRange = (value) => {
    // @todo(a11y) prefers reduced motion
    // scrollIntoViewHandle()
    // @hack(mantine) eh... sure.
    setTimeout(() => {
      spotifyTimeRangeSet(value)
    }, SCROLL_DURATION)
  }
  const handleValueChangeType = (value) => {
    // @todo(a11y) prefers reduced motion
    // scrollIntoViewHandle()
    // @hack(mantine) eh... sure.
    setTimeout(() => {
      spotifyTypeSet(value)
    }, SCROLL_DURATION)
  }

  return (
    <>
      <HeaderFull overline="Currently…" title="Listening To" />
      <Flex className="flex flex-col gap-20">
        <Flex className="flex flex-col gap-6">
          <Text size="4">
            My “<Em>Music</Em>” library is at over{' '}
            <span className="font-mono">50</span> days, and am continuing an ever
            growing vinyl collection. (I have not yet made the leap to first
            editions, which is probably for the best currently. Especially when
            looking to backstock really old records.)
          </Text>
          <Text size="4">
            Please support artists by going to shows and purchasing music, especially
            local and indie.
          </Text>
          <Text size="4">
            Like, oh I don’t know, some of{' '}
            <Anchor href="/shows/jerome-and">Jerome &</Anchor>
            ’s musical guests on Bandcamp:
          </Text>
          <Box asChild mb="4" pb="2" width="100%">
            <UL>
              {bandcamps.map(({ album, artist: _artist, href }, id) => {
                const artist = addS(_artist)
                return (
                  <LI key={`bandcamp-link-${id}`}>
                    <Anchor
                      className="flex list-none items-center justify-start gap-2"
                      href={href}
                    >
                      <span>
                        {artist}, “{album}”
                      </span>
                    </Anchor>
                  </LI>
                )
              })}
            </UL>
          </Box>
          <Text size="4">
            Separately, I have been teaching myself piano and fooling around with a
            sampler/drum machine. The results are <Em>mixed</Em>. (Ah thank you!)
          </Text>
        </Flex>
      </Flex>
      <Callout size="1" variant="outline" />

      <ContainerWithSidebar>
        <HeaderSidebar className="!size-full" hasBorder={false} title="">
          <div className="sticky top-[calc(var(--header-height)_-_6px)] flex size-full flex-col justify-between md:top-28">
            <div
              className={cx(
                'col-span-full h-fit md:col-span-3',
                '',
                // 'bg-white md:bg-transparent dark:bg-black',
                'bg-whiteA-12 dark:bg-blackA-12 md:bg-transparent',
                'backdrop-blur-sm',
                // 'border-b-1 border-grayA-3',
                // 'drop-shadow-sm dark:shadow-white/5  dark:drop-shadow-lg',
                // 'md:border-none md:drop-shadow-none',
                'z-40 md:z-0',
              )}
            >
              <div
                className={cx(
                  // 'mt-6 md:mt-8',
                  'flex flex-row justify-between gap-4 pb-4 md:flex-col md:justify-start md:pb-0',
                )}
              >
                <Flex gap="3">
                  <SelectRoot
                    defaultValue={spotifyTimeRange ?? INIT.time_range}
                    disabled={spotifyType === 'recently-played'}
                    onValueChange={(value) => handleValueChangeTimeRange(value)}
                    size={{ initial: '3', md: '3' }}
                  >
                    <SelectTrigger
                      // @todo(radix) asChild this?
                      // @ts-ignore
                      className="w-full md:w-full"
                      placeholder="Time Range:"
                      // radius="full"
                    />
                    {/* @todo(radix) className */}
                    {/* @ts-ignore */}
                    <SelectContent className="z-50 w-full" position="popper">
                      {ranges.map((range) => {
                        if (!range.active) return null
                        return (
                          <Fragment key={range.slug}>
                            {/* @todo(radix) children */}
                            {/* @ts-ignore */}
                            <SelectItem className="w-full" value={range.slug}>
                              {range.title}
                            </SelectItem>
                          </Fragment>
                        )
                      })}
                    </SelectContent>
                  </SelectRoot>
                </Flex>
                <Flex gap="3">
                  <SelectRoot
                    defaultValue={spotifyType ?? INIT.type}
                    onValueChange={(value) => handleValueChangeType(value)}
                    size="3"
                  >
                    <SelectTrigger
                      // @todo(radix) asChild this?
                      // @ts-ignore
                      className="z-50 w-full md:w-full"
                      placeholder="Type:"
                      // radius="full"
                    />
                    {/* @todo(radix) children */}
                    {/* @ts-ignore */}
                    <SelectContent className="z-50 w-full" position="popper">
                      {/* @todo(radix) children */}
                      {/* @ts-ignore */}
                      <SelectItem value="top-artists">Top Artists</SelectItem>
                      {/* @todo(radix) children */}
                      {/* @ts-ignore */}
                      <SelectItem value="top-tracks">Top Tracks</SelectItem>
                      {/* @todo(radix) children */}
                      {/* @ts-ignore */}
                      <SelectItem value="recently-played">
                        Recently Played
                      </SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </Flex>
              </div>
            </div>
            <Callout className="relative bottom-0 right-0" color="mint" size="1">
              <Strong className="font-mono uppercase">Spotify</Strong> does not earn
              a commission. But all data is currently from them.
            </Callout>
          </div>
        </HeaderSidebar>
        <ArticleMain>
          <DataItems />
          <div className={cx()}></div>
        </ArticleMain>
      </ContainerWithSidebar>
    </>
  )
}

export { MusicClient }
