'use client'
import { useOnScreen, useSWRInfinitePages } from '@jeromefitz/design-system'
import { Anchor } from '@jeromefitz/ds/components/Anchor'
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ArrowRightIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'
import { fetcher } from '@jeromefitz/shared/lib'

import { useViewportSize } from '@mantine/hooks'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Badge, Button, Flex, Select } from '@radix-ui/themes'
import Image from 'next/image'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'
import _title from 'title'

import { useStore as _useStore } from '~store/index'

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

const bandcamps = [
  {
    album: 'The Control Center',
    artist: 'Buscrates',
    href: 'https://torysilvermusic.bandcamp.com/album/slowly',
  },
  {
    album: 'Check Please',
    artist: 'Cam Chambers and Nice Rec',
    href: 'https://camchambers.bandcamp.com/album/check-please',
  },
  {
    album: 'Shifty',
    artist: 'Else Collective',
    href: 'https://pjroduta.bandcamp.com/album/shifty',
  },
  {
    album: 'Heat',
    artist: 'Flower Crown',
    href: 'https://flowercrownmusic.bandcamp.com/album/heat',
  },
  {
    album: 'Made For The Soul',
    artist: 'FRH Golden x pvkvsv',
    href: 'https://frhgolden.bandcamp.com/album/made-for-the-soul',
  },
  {
    album: 'Yinztroducing...',
    artist: 'Moemaw Naedon & C.Scott',
    href: 'https://soulslimerecords.bandcamp.com/album/yinztroducing',
  },
  {
    album: 'Drink The Blue Sky',
    artist: 'Nice Rec',
    href: 'https://nicerec.bandcamp.com/album/drink-the-blue-sky',
  },
  {
    album: 'Slowly',
    artist: 'Tory Silver',
    href: 'https://torysilvermusic.bandcamp.com/album/slowly',
  },
]

/**
 * @note fuck ariel pink, fuck kanye
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
          'hover:bg-[#fff] dark:hover:bg-[#000]',
          'border-t-1 border-black/70',
          'mb-3 p-1 md:mb-0 md:gap-6 md:p-8',
        )}
      >
        <div className={cx('flex h-full max-w-80  flex-col justify-center gap-2 ')}>
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
            className="my-4 w-fit cursor-pointer"
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
              <ArrowUpIcon className={cx('text-[var(--accent-11)] opacity-100')} />
            </>
          </Button>
        </div>
        <div className={cx('h-fit min-h-96')}>
          <Image
            {...image}
            alt={``}
            className={cx(
              'flex h-[inherit] w-full justify-center overflow-y-hidden rounded-md md:max-w-96',
              !isLoadingMore && !error && 'grayscale',
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
      <div
        className={cx('flex h-full max-w-80 flex-col justify-center gap-3 md:gap-2')}
      >
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
                <Badge key={`g--${genre}`} radius="full" size="1">
                  {genre}
                </Badge>
              )
            })}
            {!!genresExtra && (
              <Badge color="gray" radius="full" size="1">
                {genresExtra}
              </Badge>
            )}
            {genres.length === 0 && (
              <Badge color="gray" radius="full" size="1">
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
            <ArrowRightIcon className={cx('text-[var(--accent-11)] opacity-100')} />
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
  const ref = useRef<any | null>(null)
  const { width } = useViewportSize()
  // const {
  //   data: { time_range },
  // } = useSpotify()

  const { spotifyTimeRange, spotifyTimeRangeSet, spotifyType, spotifyTypeSet } =
    useStore()

  const [limit] = useState(10)
  const [url] = useState(INIT.url)
  const isVisible = useOnScreen(ref)

  const handleScroll = (href) => {
    const targetId = href.replace(/.*\#/, '')
    const elem = document.getElementById(targetId)
    // @note(scroll) do not scroll on mobile for now
    if (width > 699) {
      window.scrollTo({
        behavior: 'smooth',
        top: elem?.getBoundingClientRect().top,
      })
    }
  }

  const handleValueChangeTimeRange = (value) => {
    spotifyTimeRangeSet(value)
    handleScroll('#now-playing')
  }
  const handleValueChangeType = (value) => {
    spotifyTypeSet(value)
    handleScroll('#now-playing')
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
    <section
      className={cx('grid grid-cols-4 gap-4', 'mb-1 mr-1 p-4 md:p-12', 'max-w-7xl')}
    >
      <div className={cx('hidden', 'col-span-4 md:col-span-1')}>
        <p
          className={cx(
            'text-4xl font-black tracking-tighter',
            'flex flex-col gap-0',
            '',
          )}
        >
          <strong>Now Playing</strong>
          <span className="font-mono text-base font-light tracking-normal">
            via
            <span className="text-spotify-dark dark:text-spotify font-sans text-2xl font-bold">
              {' '}
              Spotify
            </span>
          </span>
        </p>
      </div>
      <div
        className={cx(
          'hidden',
          // 'flex flex-col gap-4',
          'col-span-4 md:col-span-3',
        )}
      >
        <p className={cx('text-lg tracking-wide', 'flex flex-col gap-0', '')}>
          My “Music” library is at over 50 days, and am continuing an ever growing
          vinyl collection. (I have not yet made the leap to first editions, which is
          probably for the best currently. Especially when looking to backstock
          really old records
        </p>
        <p
          className={cx(
            'text-2xl font-semibold tracking-wide',
            'flex flex-col gap-0',
            // 'text-[var(--accent-11)]',
            '',
          )}
        >
          Please support artists by going to shows and purchasing music, especially
          local and indie.
        </p>
        <p className={cx('mb-2 mt-4 items-center text-lg tracking-wide md:text-xl')}>
          Like some of <Anchor href="/shows/jerome-and">Jerome &</Anchor>’s musical
          guests on Bandcamp:
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
      </div>
      <div
        className={cx(
          'col-span-4 h-fit  md:col-span-1',
          'sticky -top-4 md:top-28',
          'bg-white dark:bg-black',
        )}
        id="now-playing"
      >
        <div className={cx()}>
          <p
            className={cx(
              'text-4xl font-black tracking-tighter',
              'flex flex-col gap-0',
              '',
            )}
          >
            <strong>Now Playing</strong>
            <span className="font-mono text-base font-light tracking-normal">
              via
              <span className="text-spotify-dark dark:text-spotify font-sans text-2xl font-bold">
                {' '}
                Spotify
              </span>
            </span>
          </p>
        </div>
        <div
          className={cx(
            'mt-6 md:mt-8',
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
                className="w-full"
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
              {/* @todo(radix) asChild this? */}
              {/* @ts-ignore */}
              <Select.Trigger className="w-full" placeholder="Type:" radius="full" />
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
          // return null
          return (
            <DataItem
              item={item}
              key={`np--${spotifyType}}--${spotifyTimeRange}--${i}`}
              type={spotifyType}
            />
          )
        })}
        <div ref={ref} />
        <DataItemLoader
          error={error}
          handleScroll={() => handleScroll('#now-playing')}
          isLoadingMore={isLoadingMore}
          key="np-l-2"
        />
      </ul>

      <div className={cx()}></div>
    </section>
  )
}

export { Top }
