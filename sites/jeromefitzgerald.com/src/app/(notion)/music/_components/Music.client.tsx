/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useSWRInfinitePages } from '@jeromefitz/design-system'
import { AnchorUnstyled as Anchor } from '@jeromefitz/ds/components/Anchor/index'
import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'
import { fetcher } from '@jeromefitz/shared/lib'

import { useIntersection, useScrollIntoView } from '@mantine/hooks'
import { ArrowUpIcon } from '@radix-ui/react-icons'
/**
 * @todo(radix-ui) issue w/ flex.props.js init order
 *
 * ref: https://github.com/JeromeFitz/websites/pull/2341
 */
import { Flex } from '@radix-ui/themes'
import { Badge } from '@radix-ui/themes/dist/esm/components/badge.js'
import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Button } from '@radix-ui/themes/dist/esm/components/button.js'
import { Card } from '@radix-ui/themes/dist/esm/components/card.js'
import { Code } from '@radix-ui/themes/dist/esm/components/code.js'
// import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Inset } from '@radix-ui/themes/dist/esm/components/inset.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { ScrollArea } from '@radix-ui/themes/dist/esm/components/scroll-area.js'
import {
  Content as SelectContent,
  Item as SelectItem,
  Root as SelectRoot,
  Trigger as SelectTrigger,
} from '@radix-ui/themes/dist/esm/components/select.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'
import Image from 'next/image'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'
import _title from 'title'
import { Virtualizer } from 'virtua'

import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'
import { bandcamps } from '@/data/bandcamps'
import { useStore as _useStore } from '@/store/index'

const useStore = () => {
  return _useStore((store) => ({
    spotifyTimeRange: store.spotifyTimeRange,
    spotifyTimeRangeSet: store.spotifyTimeRangeSet,
    spotifyType: store.spotifyType,
    spotifyTypeSet: store.spotifyTypeSet,
  }))
}

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000
const SCROLL_DURATION = 1250

function addS(str) {
  const poss = str.charAt(str.length - 1) === 's' ? '' : 's'
  return `${str}’${poss}`
}

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

const INIT = {
  limit: 10,
  offset: 0,
  time_range: 'short_term',
  type: 'top-artists',
  url: '/api/v1/music',
}

const getKey = (pageIndex, { limit, time_range, type, url }) => {
  const offset = pageIndex === 0 ? 0 : 10 * pageIndex
  const key = [
    `${url}/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`,
  ]
  return key
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
function getArrayCountOfOverage(arr: string[], max = 4) {
  return arr.length > max && arr.length - (max + 1) > 0
    ? `+ ${arr.length - (max + 1)} more`
    : ``
}

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
      <li>
        <Card className="h-fit w-full" size="1" variant="surface">
          <Flex
            direction={{ initial: 'column', md: 'row-reverse' }}
            gap={{ initial: '2', lg: '6' }}
          >
            <Inset clip="padding-box" side={{ initial: 'top', md: 'all' }}>
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
            <Box px="2" width="25rem">
              <Text
                as="span"
                className="uppercase"
                color="gray"
                size="1"
                weight="bold"
              >
                Status
              </Text>
              <Text
                as="p"
                className="line-clamp-3"
                size={{ initial: '3', lg: '5' }}
                weight="medium"
              >
                {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                  ? info.loading.text
                  : !!error
                    ? info.error.text
                    : info.success.text}
              </Text>
              <Text
                as="p"
                className="line-clamp-3"
                mt="2"
                size={{ initial: '3', lg: '5' }}
                weight="regular"
              >
                {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                  ? info.loading.cta
                  : !!error
                    ? info.error.cta
                    : info.success.cta}
              </Text>
              <Text
                as="p"
                className="uppercase"
                color="gray"
                mt="4"
                size="1"
                weight="bold"
              >
                Link
              </Text>
              <Button
                className="w-fit hover:cursor-pointer"
                highContrast={false}
                mt="2"
                onClick={handleScroll}
                radius="full"
                size="2"
                variant="outline"
              >
                <>
                  Go to Beginning
                  {` `}
                  <ArrowUpIcon
                    className={cx('text-accent-11 -rotate-90 !opacity-100')}
                  />
                </>
              </Button>
            </Box>
          </Flex>
        </Card>
      </li>
    </>
  )
}

function DataItem({ item, type }) {
  // @hack
  let GENRE_MAX = 4,
    _href: string,
    _title1: string,
    _title2: string,
    _title3: string,
    _meta: any,
    _genres: string[],
    _alt: string

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
      <li className="mr-4">
        <Card className="h-fit w-full" size="1" variant="surface">
          <Flex
            direction={{ initial: 'column', md: 'row-reverse' }}
            gap={{ initial: '2', lg: '6' }}
            height="100%"
            maxWidth={{ initial: '320px', lg: '725px' }}
          >
            <Inset clip="padding-box" side={{ initial: 'top', md: 'all' }}>
              <Image
                {...image}
                alt={_alt}
                className="mx-auto h-auto w-full max-w-64 lg:h-full lg:max-w-[575px]"
                placeholder="blur"
                role="img"
                tabIndex={-1}
              />
            </Inset>
            <Flex direction="column" px="2" width="25rem">
              <Text
                as="span"
                className="uppercase"
                color="gray"
                size="1"
                weight="bold"
              >
                Artist
              </Text>
              <Text
                as="p"
                className="line-clamp-3 pb-2"
                size={{ initial: '2', lg: '5' }}
                weight="medium"
              >
                {_title1}
              </Text>
              {type === 'top-tracks' && (
                <>
                  <Text
                    as="span"
                    className="uppercase"
                    color="gray"
                    size="1"
                    weight="bold"
                  >
                    Song
                  </Text>
                  <Text
                    as="p"
                    className="line-clamp-3 pb-2"
                    size={{ initial: '2', lg: '5' }}
                    weight="medium"
                  >
                    {_title2}
                  </Text>

                  <Text
                    as="span"
                    className="uppercase"
                    color="gray"
                    size="1"
                    weight="bold"
                  >
                    Album
                  </Text>
                  <Text
                    as="p"
                    className="line-clamp-3 pb-2"
                    size={{ initial: '2', lg: '5' }}
                    weight="medium"
                  >
                    {_title3}
                  </Text>

                  <Text
                    as="span"
                    className="uppercase"
                    color="gray"
                    size="1"
                    weight="bold"
                  >
                    Year
                  </Text>
                  <Text
                    as="p"
                    className="line-clamp-3 pb-2 font-mono"
                    size={{ initial: '1', lg: '2' }}
                    weight="medium"
                  >
                    {item.album.release_date.slice(0, 4)}
                  </Text>
                </>
              )}
              <Text
                as="span"
                className="uppercase"
                color="gray"
                size="1"
                weight="bold"
              >
                Genre{genres.length > 1 && 's'}
              </Text>
              <span className="mb-3 mt-2 flex flex-row flex-wrap gap-2 pb-1 font-mono lg:mt-1">
                {genres.map((genre) => {
                  if (!genre) return null
                  return (
                    <Badge
                      key={`g--${genre}`}
                      radius="full"
                      size={{ initial: '1', lg: '1' }}
                    >
                      {genre}
                    </Badge>
                  )
                })}
                {!!genresExtra && (
                  <Badge color="gray" radius="full" size={{ initial: '1', lg: '1' }}>
                    {genresExtra}
                  </Badge>
                )}
                {genres.length === 0 && (
                  <Badge color="gray" radius="full" size={{ initial: '1', lg: '1' }}>
                    N/A
                  </Badge>
                )}
              </span>
              <Flex
                align="start"
                direction="column"
                flexGrow="1"
                gap="2"
                justify="end"
                mb="2"
              >
                <Text
                  as="p"
                  className="uppercase"
                  color="gray"
                  size="1"
                  weight="bold"
                >
                  Link
                </Text>
                <Button
                  asChild
                  className="w-fit"
                  color="jade"
                  highContrast={false}
                  mt="1"
                  radius="full"
                  size={{ initial: '1', lg: '2' }}
                  variant="outline"
                >
                  <NextLink href={_href}>
                    Open Spotify
                    {` `}
                    <ArrowTopRightIcon
                      className={cx('text-accent-11 !opacity-100')}
                    />
                  </NextLink>
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </li>
    </>
  )
}

function DataItems() {
  const { scrollIntoView, scrollableRef, targetRef } = useScrollIntoView<
    HTMLDivElement,
    HTMLDivElement
  >({ axis: 'x', duration: SCROLL_DURATION - 250, isList: true })
  const refContainer = useRef<HTMLDivElement>(null)
  const { entry, ref: refSWRInfinitePages } = useIntersection({
    root: refContainer.current,
    threshold: 1,
  })

  const isVisible = entry?.isIntersecting

  const { spotifyTimeRange, spotifyType } = useStore()

  const [limit] = useState(10)
  const [url] = useState(INIT.url)

  const scrollIntoViewHandle = () => {
    scrollIntoView({ alignment: 'start' })
  }

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
    if (canFetchMore && !isFetchingMore && !isLoadingMore && isVisible) {
      void fetchMore()
    }
  }, [canFetchMore, fetchMore, isFetchingMore, isLoadingMore, isVisible])

  return (
    <>
      {/* @ts-ignore */}
      <ScrollArea
        asChild
        className="h-[72vh] md:h-[48vh]"
        radius="full"
        ref={scrollableRef}
        scrollbars="horizontal"
        size="2"
        type="always"
      >
        <div
          className={cx(
            'col-span-full md:col-span-9',
            'justify-items-start',
            'flex flex-row flex-nowrap',

            'z-0',
          )}
          ref={refContainer}
        >
          <ul>
            <div className="-mx-2 w-0 lg:-mx-8" ref={targetRef} />
            <Box
              asChild
              className={cx(
                'm-0 list-none p-0',
                'col-span-full md:col-span-9',
                'justify-items-start',
                'flex flex-row flex-nowrap',
                'overflow-x-auto',
                'gap-4 lg:gap-16',
                'z-0',
                'first:gap-0',
              )}
            >
              <Virtualizer horizontal>
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
                  handleScroll={() => scrollIntoViewHandle()}
                  isLoadingMore={isLoadingMore}
                  key="np-l-2"
                />
              </Virtualizer>
            </Box>
          </ul>
        </div>
      </ScrollArea>
    </>
  )
}

function MusicClient({}) {
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
      <Grid>
        <HeadlineColumnA separateTitle={true}>
          <HeadlineTitle as="h1">Music</HeadlineTitle>
          <HeadlineTitleSub>
            <Badge
              aria-label="data from Spotify"
              className={cx('!bg-grayA-3 !text-black  dark:!text-white')}
              size="2"
            >
              <Code variant="ghost">
                <span aria-hidden className="inline md:hidden">
                  via{` `}
                </span>
                <span aria-hidden className="hidden md:inline">
                  data from{` `}
                </span>
                <span
                  aria-hidden
                  className=" !text-spotify-dark dark:!text-spotify uppercase "
                >
                  Spotify
                </span>
              </Code>
            </Badge>
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <>
            <Text size="4">
              My “Music” library is at over <span className="font-mono">50</span>{' '}
              days, and am continuing an ever growing vinyl collection. (I have not
              yet made the leap to first editions, which is probably for the best
              currently. Especially when looking to backstock really old records.)
            </Text>
            <Text size="4">
              Separately, I have been teaching myself piano and fooling around with a
              sampler/drum machine.
            </Text>
            <Text size="4" weight="medium">
              Please support artists by going to shows and purchasing music,
              especially local and indie.
            </Text>
            <Text size="4">
              Like some of{' '}
              <Link asChild>
                <Anchor href="/shows/jerome-and">Jerome &</Anchor>
              </Link>
              ’s musical guests on Bandcamp:
            </Text>
            <Box asChild mb="4" pb="2" width="100%">
              <ul className="list-inside lg:list-disc">
                {bandcamps.map(({ album, artist: _artist, href }, id) => {
                  const artist = addS(_artist)
                  return (
                    <li key={`bandcamp-link-${id}`}>
                      <Flex
                        align="baseline"
                        asChild
                        direction="row"
                        display="inline-flex"
                        gap="2"
                      >
                        <Link asChild mb="2">
                          <Anchor href={href}>
                            {artist}, “{album}”
                          </Anchor>
                        </Link>
                      </Flex>
                    </li>
                  )
                })}
              </ul>
            </Box>
          </>
        </HeadlineContent>
      </Grid>
      <Grid>
        <div
          className={cx(
            'col-span-full h-fit md:col-span-3',
            'sticky top-[calc(var(--header-height)_-_6px)] md:top-28',
            // 'bg-white lg:bg-transparent dark:bg-black',
            'bg-whiteA-12 dark:bg-blackA-12 lg:bg-transparent',
            'backdrop-blur-sm',
            // 'border-b-1 border-grayA-3',
            // 'drop-shadow-sm dark:shadow-white/5  dark:drop-shadow-lg',
            // 'md:border-none md:drop-shadow-none',
            'z-40 lg:z-0',
          )}
        >
          <div
            className={cx(
              // 'mt-6 md:mt-8',
              'flex flex-row justify-between gap-4 pb-4  md:flex-col md:justify-start md:pb-0',
            )}
          >
            <Flex gap="3">
              <SelectRoot
                defaultValue={spotifyTimeRange ?? INIT.time_range}
                onValueChange={(value) => handleValueChangeTimeRange(value)}
                size={{ initial: '3', lg: '3' }}
              >
                <SelectTrigger
                  // @todo(radix) asChild this?
                  // @ts-ignore
                  className="w-full md:w-11/12"
                  placeholder="Time Range:"
                  radius="full"
                />
                {/* @todo(radix) className */}
                {/* @ts-ignore */}
                <SelectContent className="z-50 w-full" position="popper">
                  {/* @todo(radix) children */}
                  {/* @ts-ignore */}
                  <SelectItem className="w-full" value="short_term">
                    Past Month
                  </SelectItem>
                  {/* @todo(radix) children */}
                  {/* @ts-ignore */}
                  <SelectItem value="medium_term">
                    <>Past Six Months</>
                  </SelectItem>
                  {/* @todo(radix) children */}
                  {/* @ts-ignore */}
                  <SelectItem value="long_term">All Time</SelectItem>
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
                  className="z-50 w-full md:w-11/12 "
                  placeholder="Type:"
                  radius="full"
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
                </SelectContent>
              </SelectRoot>
            </Flex>
          </div>
        </div>
        <DataItems />
        <div className={cx()}></div>
      </Grid>
    </>
  )
}

export { MusicClient }
