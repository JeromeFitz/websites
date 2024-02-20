/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useOnScreen, useSWRInfinitePages } from '@jeromefitz/design-system'
import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { ArrowTopRightIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
import { fetcher } from '@jeromefitz/shared/lib'

import { useWindowScroll } from '@mantine/hooks'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex, Select } from '@radix-ui/themes'
import Image from 'next/image'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'
import _title from 'title'

import { bandcamps } from '~data/bandcamps'
import { useStore as _useStore } from '~store/index'

import { Grid } from './Grid'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from './Headline'

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
      <li
        className={cx(
          'flex w-full flex-col-reverse items-start justify-between justify-items-start md:flex-row-reverse',
          'text-left',
          'hover:bg-[#fff] dark:hover:bg-[var(--gray-2)]',
          'border-t-1 border-[var(--gray-6)]',
          'mb-3 p-1 md:mb-0 md:gap-6 md:p-8',
        )}
      >
        <div className={cx('flex h-full flex-col justify-center gap-2 ')}>
          <p className={cx('text-xs tracking-tighter')}>
            <span className="font-bold uppercase tracking-wide text-[var(--gray-11)]">
              Status
            </span>
            <br />
            <span className="line-clamp-3 text-3xl font-medium">
              {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                ? info.loading.text
                : !!error
                  ? info.error.text
                  : info.success.text}
            </span>
          </p>

          <p className={cx('text-xs tracking-tighter')}>
            <span className="line-clamp-3 text-2xl text-[var(--gray-12)]">
              {isLoadingMore // ? 'loading' : isReachingEnd ? 'no more' :''
                ? info.loading.cta
                : !!error
                  ? info.error.cta
                  : info.success.cta}
            </span>
          </p>
          <Button
            className="my-4 w-fit hover:cursor-pointer"
            color="pink"
            highContrast={false}
            onClick={handleScroll}
            radius="full"
            size="2"
            variant="outline"
          >
            <>
              Go to top
              {` `}
              <ArrowUpIcon className={cx('text-[var(--accent-11)] !opacity-100')} />
            </>
          </Button>
        </div>
        <div className={cx('h-fit min-h-96')}>
          <Image
            {...image}
            alt={``}
            className={cx(
              'flex h-[inherit] w-full justify-center overflow-y-hidden rounded-md md:max-w-96',
              // !isLoadingMore && !error && 'grayscale',
              '',
            )}
            placeholder="blur"
            role="img"
            tabIndex={-1}
          />
        </div>
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
    <li
      className={cx(
        'flex w-full flex-col-reverse items-start justify-between justify-items-start md:flex-row',
        'text-left',
        'hover:bg-[#fff] dark:hover:bg-[var(--gray-2)]',
        'border-t-1 border-[var(--gray-6)]',
        'mb-3 p-1 md:mb-0 md:gap-6 md:p-8',
      )}
    >
      <div className={cx('flex h-full  flex-col justify-center gap-3 md:gap-2')}>
        <p className={cx('text-xs tracking-tighter')}>
          <span className="font-bold uppercase tracking-wide text-[var(--gray-11)]">
            Artist
          </span>
          <br />
          <span className="line-clamp-3  text-3xl font-medium">{_title1}</span>
        </p>
        {type === 'top-tracks' && (
          <>
            <p className={cx('text-xs tracking-tighter')}>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--gray-11)]">
                Song
              </span>
              <br />
              <span className="line-clamp-3 text-2xl text-[var(--gray-12)]">
                {_title2}
              </span>
            </p>
            <p className={cx('text-xs tracking-tighter')}>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--gray-11)]">
                Album
              </span>
              <br />
              <span className="line-clamp-3 text-xl text-[var(--gray-12)]">
                {_title3}
              </span>
            </p>
            <p className={cx('text-xs tracking-tighter')}>
              <span className="text-xs font-bold uppercase tracking-wide text-[var(--gray-11)]">
                Year
              </span>
              <br />
              <span className="font-mono text-base text-[var(--gray-12)]">
                {item.album.release_date.slice(0, 4)}
              </span>
            </p>
          </>
        )}

        <p className={cx('gap-2 text-xs tracking-tighter')}>
          <span className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--gray-11)]">
            Genre{genres.length > 1 && 's'}
          </span>
          <br />
          <br />
          <span className="mb-1 flex flex-row flex-wrap gap-2 pb-1 font-mono text-xs">
            {genres.map((genre) => {
              if (!genre) return null
              return (
                <Badge key={`g--${genre}`} radius="full" size="2">
                  {genre}
                </Badge>
              )
            })}
            {!!genresExtra && (
              <Badge color="gray" radius="full" size="2">
                {genresExtra}
              </Badge>
            )}
            {genres.length === 0 && (
              <Badge color="gray" radius="full" size="2">
                N/A
              </Badge>
            )}
          </span>
        </p>
        <Button
          asChild
          className="w-fit"
          color="jade"
          highContrast={false}
          radius="full"
          size="2"
          variant="outline"
        >
          <NextLink href={_href}>
            Open Spotify
            {` `}
            <ArrowTopRightIcon
              className={cx('text-[var(--accent-11)] !opacity-100')}
            />
          </NextLink>
        </Button>
      </div>
      <div className={cx('h-fit min-h-96 w-full md:w-1/2 md:max-w-sm')}>
        <Image
          {...image}
          alt={_alt}
          className="flex h-[inherit] w-full justify-center overflow-y-hidden rounded-md md:max-w-96"
          placeholder="blur"
          role="img"
          tabIndex={-1}
        />
      </div>
    </li>
  )
}
function Top({}) {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const refElementToScrollToAfter = useRef<any | null>()
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const refSWRInfinitePages = useRef<any | null>(null)

  const { spotifyTimeRange, spotifyTimeRangeSet, spotifyType, spotifyTypeSet } =
    useStore()

  const [limit] = useState(10)
  const [url] = useState(INIT.url)
  const isVisible = useOnScreen(refSWRInfinitePages)

  /**
   * @hack(mantine) this is ... well ... not dynamic really
   */
  const [, scrollTo] = useWindowScroll()
  const handleScrollTo = () => {
    const { clientHeight } = refElementToScrollToAfter.current
    // console.dir(`clientHeight: ${clientHeight}`)
    scrollTo({ y: clientHeight + 100 })
  }

  const handleValueChangeTimeRange = (value) => {
    spotifyTimeRangeSet(value)
    handleScrollTo()
  }
  const handleValueChangeType = (value) => {
    spotifyTypeSet(value)
    handleScrollTo()
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
      <Grid ref={refElementToScrollToAfter}>
        <HeadlineColumnA separateTitle={true}>
          <HeadlineTitle as="h1">Now Playing</HeadlineTitle>
          <HeadlineTitleSub>
            <Badge
              aria-label="data from Spotify"
              className={cx('!bg-[var(--gray-a3)] !text-black  dark:!text-white')}
              size="2"
            >
              <span aria-hidden className="inline md:hidden">
                via{` `}
              </span>
              <span aria-hidden className="hidden md:inline">
                data from{` `}
              </span>
              <span
                aria-hidden
                className=" !text-spotify-dark dark:!text-spotify font-black uppercase  tracking-wide"
              >
                Spotify
              </span>
            </Badge>
            {/* <span className="font-mono text-base font-light tracking-normal">
              via
              <span className="text-spotify-dark dark:text-spotify font-sans text-2xl font-bold">
                {' '}
                Spotify
              </span>
            </span> */}
          </HeadlineTitleSub>
        </HeadlineColumnA>
        <HeadlineContent>
          <>
            <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
              My “Music” library is at over 50 days, and am continuing an ever
              growing vinyl collection. (I have not yet made the leap to first
              editions, which is probably for the best currently. Especially when
              looking to backstock really old records.)
            </p>
            <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
              Separately, I have been teaching myself piano and fooling around with a
              sampler/drum machine.
            </p>
            <p
              className={cx(
                'text-2xl font-semibold tracking-wide',
                'flex flex-col gap-0',
                // 'text-[var(--accent-11)]',
                '',
              )}
            >
              Please support artists by going to shows and purchasing music,
              especially local and indie.
            </p>
            <p
              className={cx(
                'mb-2 mt-4 items-center text-lg tracking-wide md:text-xl',
              )}
            >
              Like some of <Anchor href="/shows/jerome-and">Jerome &</Anchor>’s
              musical guests on Bandcamp:
            </p>
            <ul className="list-inside pb-4 text-base tracking-wide md:list-disc md:text-lg">
              {bandcamps.map(({ album, artist: _artist, href }, id) => {
                const artist = addS(_artist)
                return (
                  <li className="my-2 md:my-1" key={`bandcamp-link-${id}`}>
                    <Anchor
                      className={cx(
                        'inline-flex flex-row items-center gap-1',
                        'underline-offset-4',
                        'underline',
                        'decoration-[var(--accent-a4)] hover:decoration-[var(--accent-a5)]',
                        'text-[var(--accent-11)] hover:text-[var(--accent-12)]',
                        'transition-all duration-200 ease-in',
                        '',
                      )}
                      href={href}
                      // target="_blank"
                    >
                      {artist}, “{album}”
                    </Anchor>
                  </li>
                )
              })}
            </ul>
          </>
        </HeadlineContent>
      </Grid>
      <Grid as="section">
        <div
          className={cx(
            'col-span-4 h-fit  md:col-span-1',
            'sticky top-[calc(var(--header-height)_+_0px)] md:top-28',
            'bg-white dark:bg-black',
            'border-b-1 border-[var(--gray-a3)]',
            'drop-shadow-sm dark:shadow-white/5  dark:drop-shadow-lg',
            'md:border-none md:drop-shadow-none',
          )}
        >
          <div
            className={cx(
              // 'mt-6 md:mt-8',
              'flex flex-row justify-between gap-4 pb-4  md:flex-col md:justify-start md:pb-0',
            )}
          >
            <Flex gap="3">
              <Select.Root
                defaultValue={spotifyTimeRange ?? INIT.time_range}
                onValueChange={(value) => handleValueChangeTimeRange(value)}
                size="3"
              >
                <Select.Trigger
                  // @todo(radix) asChild this?
                  // @ts-ignore
                  className="w-full md:w-11/12"
                  placeholder="Time Range:"
                  radius="full"
                />
                {/* @ts-ignore */}
                <Select.Content className="w-full">
                  {/* @ts-ignore */}
                  <Select.Item className="w-full" value="short_term">
                    Past Month
                  </Select.Item>
                  {/* @ts-ignore */}
                  <Select.Item value="medium_term">Past Six Months</Select.Item>
                  {/* @ts-ignore */}
                  <Select.Item value="long_term">All Time</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
            <Flex gap="3">
              <Select.Root
                defaultValue={spotifyType ?? INIT.type}
                onValueChange={(value) => handleValueChangeType(value)}
                size="3"
              >
                <Select.Trigger
                  // @todo(radix) asChild this?
                  // @ts-ignore
                  className="w-full md:w-11/12"
                  placeholder="Type:"
                  radius="full"
                />
                {/* @ts-ignore */}
                <Select.Content>
                  {/* @ts-ignore */}
                  <Select.Item value="top-artists">Top Artists</Select.Item>
                  {/* @ts-ignore */}
                  <Select.Item value="top-tracks">Top Tracks</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>
          </div>
        </div>
        <ul
          className={cx(
            'm-0 list-none p-0',
            'col-span-4 md:col-span-3',
            'justify-items-start',
          )}
        >
          {data?.map((item: any, i: number) => {
            if (removeItems.includes(item.id)) return null
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
          <div ref={refSWRInfinitePages} />
          <DataItemLoader
            error={error}
            // handleScroll={() => handleScroll('#now-playing')}
            handleScroll={() => handleScrollTo()}
            isLoadingMore={isLoadingMore}
            key="np-l-2"
          />
        </ul>

        <div className={cx()}></div>
      </Grid>
    </>
  )
}

export { Top }
