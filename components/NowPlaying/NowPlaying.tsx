import cx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { MdOpenInNew } from 'react-icons/md'

import fetcher from '~lib/fetcher'
import { spotifyFavoriteTracks } from '~lib/spotify/favorites'

import SplitText from '~components/SplitText'

// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = spotifyFavoriteTracks[0]

const NowPlaying = () => {
  const { data } = useSWR('/api/spotify/now-playing', fetcher, {
    initialData,
    refreshInterval: MINUTE,
    revalidateOnFocus: false,
  })

  // @refactor(swr) This a little convulated
  const { album, artist, isPlaying, track } =
    data.isPlaying || !!data.artist ? data : initialData

  const title = isPlaying ? 'Listening To' : 'Listening To'

  return (
    <>
      <div
        id="now-playing"
        className={cx(
          'flex flex-col justify-center px-8 border border-gray-900',
          'bg-green-300'
        )}
      >
        <div className="flex flex-col w-full px-2 py-8 md:px-8 my-0 md:my-8 mx-auto max-w-4xl">
          <h1 className="text-black">{title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 md:px-2 py-12 md:gap-x-4 md:py-16">
            <div className="relative col-start-1 row-start-1 px-4 pt-44 md:pt-24 pb-3 bg-gradient-to-t from-black md:bg-none md:leading-normal z-10">
              <p
                className={cx(
                  'font-extrabold',
                  'text-white dark:text-white',
                  'md:text-gray-900 md:dark:text-gray-900',
                  'mb-2 md:mb-4',
                  'text-sm md:text-3xl',
                  'leading-normal md:leading-tight',
                  'tracking-normal md:tracking-tight'
                )}
              >
                {artist.name}
              </p>
              <h2
                className={cx(
                  'font-semibold',
                  'text-white dark:text-white',
                  'md:text-black md:dark:text-black',
                  'mb-2 md:mb-6',
                  'text-xl md:text-4xl',
                  'leading-normal md:leading-normal',
                  'tracking-normal md:tracking-tight',
                  ''
                )}
              >
                <a
                  aria-label={track.name}
                  className={cx(
                    'underline underline-offset-md',
                    'underline-thickness-sm md:underline-thickness-md',
                    'md:hover:text-yellow-900 md:dark:hover:text-yellow-900',
                    'flex flex-wrap'
                  )}
                  href={track.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SplitText text={track.name} />{' '}
                  <span className="ml-2 mt-1 text-base inline-flex">
                    <MdOpenInNew />
                  </span>
                </a>
              </h2>
              <h3
                className={cx(
                  'italic text-sm md:text-3xl md:leading-snug',
                  'mb-1 md:mb-2',
                  'text-white dark:text-white',
                  'md:text-black md:dark:text-black'
                )}
              >
                {album.name}
              </h3>
              <h4
                className={cx(
                  'italic text-xs md:leading-normal md:text-lg',
                  'text-white dark:text-white',
                  'md:text-black md:dark:text-black'
                )}
              >
                {album.year}
              </h4>
            </div>
            <div className="col-start-1 row-start-1 flex md:col-start-2 md:row-span-3 z-0">
              <div className="w-full grid grid-cols-3 grid-rows-2 gap-2">
                <div className="relative col-span-3 row-span-2 md:col-span-3">
                  <Image
                    alt={`Album cover for “${album.name}” by ${artist.name} (${album.year})`}
                    height={450}
                    src={album.imageUrl ?? '/static/images/placeholder.jpg'}
                    title={`“${album.name}” by ${artist.name} (${album.year})`}
                    width={450}
                  />
                </div>
              </div>
            </div>
          </div>
          <p
            className={cx(
              'text-center font-medium mt-4',
              'text-black dark:text-black',
              'text-xl'
            )}
          >
            I listen to a lot of{' '}
            <Link href="/music">
              <a
                aria-label="music"
                className="underline underline-offset-md hover:text-yellow-900"
              >
                <SplitText text={'music'} />
              </a>
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}

export default NowPlaying
