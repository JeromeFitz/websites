import cx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

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
          <h1 className="text-black dark:text-black">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-2 sm:py-12 sm:gap-x-4 md:py-16">
            <div className="relative z-10 col-start-1 row-start-1 px-4 pt-44 md:pt-24 pb-3 bg-gradient-to-t from-black sm:bg-none sm:leading-normal">
              <p
                className={cx(
                  'font-extrabold text-white sm:text-gray-900',
                  'mb-2 sm:mb-4',
                  'text-sm md:text-3xl',
                  'leading-normal sm:leading-tight',
                  'tracking-normal sm:tracking-tight'
                )}
              >
                {artist.name}
              </p>
              <h2
                className={cx(
                  'font-semibold text-white sm:text-black',
                  'mb-2 sm:mb-6',
                  'text-xl sm:text-4xl',
                  'leading-normal sm:leading-tight',
                  'tracking-normal sm:tracking-tight'
                )}
              >
                {track.name}
              </h2>
              <h3 className="text-sm text-white mb-1 sm:mb-2 sm:text-2xl sm:leading-snug sm:text-black md:text-3xl italic">
                {album.name}
              </h3>
              <h4
                className={cx(
                  'text-xs text-white sm:text-lg sm:leading-normal sm:text-black md:text-lg italic'
                )}
              >
                {album.year}
              </h4>
            </div>
            <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
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
          <p className="text-center text-black font-medium mt-4">
            I listen to a lot of{' '}
            <Link href="/music">
              <a
                aria-label="music"
                className="text-green-50 underline underline-offset-md hover:text-black"
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
