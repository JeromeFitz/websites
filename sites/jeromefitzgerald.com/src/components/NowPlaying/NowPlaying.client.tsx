'use client'
import { ButtonLink } from '@jeromefitz/ds/components/Button'
import { ExternalLinkIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/shared/src/utils'
// import * as AspectRatio from '@radix-ui/react-aspect-ratio'
import { slug as _slug } from 'github-slugger'
import _map from 'lodash/map'
import _size from 'lodash/size'
import ms from 'ms'
import Image from 'next/image'
import { fetcher } from 'next-notion/src/lib/fetcher'
import useSWR from 'swr'
import _title from 'title'

import { Tags } from '~components/Section'
// import { Testing } from '~components/Testing'
import nowPlaying from '~data/mock/music/now-playing'

const refreshInterval = ms('1m')

const initialData = nowPlaying

/**
 * @note there is no need for these to be random and confuse SSR
 *       just go in order down the array (non-alpha)
 *       notionColors[Math.floor(Math.random() * notionColors.length)]
 */
const notionColors = [
  // 'blue',
  // 'brown',
  // 'gray',
  // 'green',
  'orange',
  'pink',
  'purple',
  // 'red',
  'yellow',
]

function NowPlayingClient() {
  const { data } = useSWR<any>('/api/v1/music/now-playing', fetcher, {
    fallbackData: initialData,
    refreshInterval,
    revalidateOnFocus: false,
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { is_playing: isPlaying, item } =
    data?.is_playing || !!data?.item?.artist ? data : initialData

  const track = item

  const { album, artist, genres: _genres } = track

  const albumYear = album.release_date.slice(0, 4)
  const base64 = album?.image?.base64
  // const imageSlug = album?.image?.slug
  const imageData = album?.image
  const imageLabel = `Apologies, this image is dynamically generated from another source. Cannot yet provide vivid details. This is an image of ${artist}’s album cover for “${track.name}.”`

  // console.log(`NowPlaying >> track`, track)

  const image = {
    blurDataURL: base64,
    ...imageData?.img,
  }

  const genresExtra =
    _genres.length > 1 && _genres.length - 2 > 0 && `+ ${_genres.length - 2} more`

  const _href = item.external_urls.spotify

  const tags =
    _size(_genres) === 0
      ? [{ color: 'gray', id: 'none', name: 'No Genre Provided' }]
      : _map(_genres.slice(0, 5), (genre, i) => {
          return {
            color: notionColors[i],
            id: _slug(genre),
            name: _title(genre),
          }
        })

  !!genresExtra && tags.push({ color: 'gray', id: 'none', name: genresExtra })

  return (
    <div className={cx('flex flex-col gap-5')}>
      <div className="shadow-radix-blackA7 w-full overflow-hidden rounded-md shadow-[0_2px_10px]">
        {/* <AspectRatio.Root ratio={16 / 9} asChild> */}
        <Image
          {...image}
          alt={imageLabel}
          className={cx('h-full w-full object-cover')}
          placeholder="blur"
          role="img"
        />
        {/* </AspectRatio.Root> */}
      </div>
      <div
        className={cx('my-3 flex w-full flex-col justify-center', 'pl-2 md:pl-4')}
      >
        <span
          className={cx(
            'mb-2 md:mb-4 md:text-6xl',
            'text-3xl font-black tracking-tighter',
            // '-ml-8',
            // 'before:-left-8',
            'before:relative before:-ml-3 before:content-[open-quote] before:md:-ml-6',
            'after:content-[close-quote]',
            // '[hanging-punctuation:first]',
            ''
          )}
        >
          {/* “{track?.name}” */}
          {track?.name}
        </span>
        <div className={cx('')}>
          <div className={cx('mb-2 md:mb-4')}>
            <span
              className={cx('text-2xl font-extrabold tracking-tight md:text-5xl')}
            >
              {artist}
            </span>
          </div>
          <div className={cx('mb-2 md:mb-4')}>
            <p className={cx('mr-4 text-xl font-light tracking-tight md:text-3xl')}>
              <span className={cx('')}>from{` `}</span>
              <span className={cx('font-bold')}>“{album?.name}”</span>
              <span className={cx('')}>
                {` `}released in{` `}
              </span>
              <span className={cx('font-bold')}>{albumYear}</span>
            </p>
          </div>
          <div
            className={cx(
              'mb-2 md:mb-4',
              'md:-mt-4',
              'flex flex-row content-center items-center justify-items-start gap-[0.5rem]'
            )}
          >
            <Tags tags={tags} classNameTag="px-3 py-2 mb-4 mr-4" />
          </div>
          <ButtonLink
            href={_href}
            className={cx(
              'green-button-outline',
              'flex-row items-center justify-center gap-1 align-middle',
              'w-1/3'
            )}
          >
            <>Spotify</>
            <span className="h-4 w-4">
              <ExternalLinkIcon className="icon-custom" />
            </span>
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export { NowPlayingClient }
