'use client'
// import Slugger from 'github-slugger'
import {
  ExternalLinkIcon as ExternalLink,
  MusicalNoteIcon as MusicalNote,
  TagIcon as Tag,
} from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/shared/src/utils'
import _map from 'lodash/map'
// import _slice from 'lodash/slice'
import Image from 'next/image'
import { fetcher } from 'next-notion/src/lib/fetcher'
import useSWR from 'swr'
import _title from 'title'

import { Anchor } from '~components/Anchor'
import { nowPlaying } from '~data/mock/music'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '@jeromefitz/ds/components/Icon'
// import { log } from '~utils/log'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = nowPlaying

function NowPlaying() {
  // const slugger = new Slugger()
  // @todo(swr) SWRHook
  const { data } = useSWR<any>(
    // 'http://localhost:3001/v/1/music/now-playing',
    '/api/v1/music/now-playing',
    fetcher,
    {
      fallbackData: initialData,
      refreshInterval: MINUTE,
      revalidateOnFocus: false,
    }
  )

  const { is_playing: isPlaying, item } =
    data?.is_playing || !!data?.item?.artist ? data : initialData

  const track = item

  const { album, artist, genres: _genres } = track

  const albumYear = album.release_date.slice(0, 4)
  const base64 = album?.image?.base64
  // const imageSlug = album?.image?.slug
  const imageData = album?.image
  const imageLabel = `Apologies, this image is dynamically generated from another source. Cannot yet provide vivid details. This is an image of ${artist}’s album cover for “${track.name}.”`

  // const genresData = _slice(genres, 0, 3)

  const title = isPlaying ? 'Listening To' : 'Listening To'

  // log(`NowPlaying >> track`, track)

  const image = {
    blurDataURL: base64,
    ...imageData?.img,
  }

  const genres = _map(_genres.slice(0, 5), (genre) => _title(genre)).join(', ')

  const genresExtra =
    _genres.length > 4 && _genres.length - 5 > 0 && `, + ${_genres.length - 5} more`

  const _href = item.external_urls.spotify

  return (
    <div id="music--now-playing" className={cx('my-8 w-full py-8')}>
      <h1
        className={cx(
          'text-3xl font-black',
          'flex flex-row items-center',
          'mb-2 pb-2'
        )}
      >
        <span className="mr-2">
          <MusicalNote className="h-6 w-6" />
        </span>
        <span>
          {` `}
          {title}
        </span>
      </h1>
      <p className="mx-0 mb-7 mt-5 text-lg">
        I listen to a lot of music. I do not think that makes me unique, however, I
        enjoy it all the same. If you’d like to see more of my listening habits
        please check out the{' '}
        <Anchor
          href="/music"
          className={cx(
            'font-black underline underline-offset-4',
            'text-radix-mauve11 hover:text-radix-mauve12',
            'decoration-solid decoration-4',
            'decoration-radix-orange10 hover:decoration-radix-orange11',
            'transition-all duration-200 ease-in'
          )}
        >
          music
        </Anchor>{' '}
        section. (Though full disclosure, I also like to{' '}
        <Anchor
          href="/books"
          className={cx(
            'font-black underline underline-offset-4',
            'text-radix-mauve11 hover:text-radix-mauve12',
            'decoration-solid decoration-4',
            'decoration-radix-orange10 hover:decoration-radix-orange11',
            'transition-all duration-200 ease-in'
          )}
        >
          read
        </Anchor>
        .)
      </p>
      <div
        className={cx(
          'mx-auto items-center justify-center rounded font-sans ',
          'max-w-full md:max-w-4xl',
          'flex flex-col md:flex-row',
          'shadow-2xl',
          'pink-bg text-radix-slate12'
        )}
      >
        <div
          className={cx(
            'relative flex-none',
            'h-72 w-full md:h-72 md:w-72 lg:h-96 lg:w-96',
            'shadow-lg'
          )}
        >
          <Image
            {...image}
            alt={imageLabel}
            // className="absolute inset-0 w-full h-full object-cover"
            className={cx(
              'flex h-[inherit] w-full justify-center overflow-y-hidden',
              'rounded-t md:rounded-l'
              // '-left-1'
            )}
            placeholder="blur"
            role="img"
          />
        </div>
        <div className="mx-2 flex-auto p-4 md:mx-4 md:p-6">
          <div className="flex flex-wrap">
            <h1
              className={cx(
                'flex-auto',
                'text-2xl font-bold',
                'md:text-4xl md:font-semibold',
                'mr-2',
                'before:-ml-3 before:content-[open-quote] md:before:-ml-4',
                'after:content-[close-quote]',
                ''
              )}
            >
              {/* {`“${track.name}”`} */}
              {track.name}
            </h1>
            {/* <div className="text-lg font-semibold text-radix-slate11">Genre?</div> */}
            <div
              className={cx(
                'mt-2 w-full flex-none',
                'text-xl font-semibold',
                'md:text-2xl md:font-medium'
              )}
            >
              {artist}
            </div>
            <div
              className={cx(
                'mt-2 w-full flex-none',
                'text-base font-normal',
                'md:text-lg md:font-medium'
              )}
            >
              from “{album.name}” released in {albumYear}
            </div>
          </div>
          <p className="mt-5 text-xs"></p>
          {genres && (
            <div
              className={cx(
                'my-2 flex flex-row content-center items-start justify-start gap-[0.5rem]'
              )}
            >
              <p className={cx('items-center text-sm')} role="list">
                <Tag className={cx('mt-1')} role="listitem" />
              </p>
              <p className={cx('items-center text-sm')}>
                {genres}
                {genresExtra}
              </p>
            </div>
          )}
          {_href && (
            <a
              className={cx(
                'flex flex-row content-center items-start justify-start gap-[0.5rem]',
                'text-sm',
                'hover:text-spotify-dark dark:hover:text-spotify',
                'transition-all duration-200',
                'mt-3 md:mt-7'
              )}
              href={_href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="items-center">
                <ExternalLink className={cx('mt-1')} />
              </span>
              <span className="">Spotify</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export { NowPlaying }
