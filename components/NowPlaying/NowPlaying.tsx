/* eslint-disable @typescript-eslint/no-unused-vars */
import cx from 'clsx'
import { motion } from 'framer-motion'
// import NextImage from 'next/image'
import NextLink from 'next/link'
import useSWR from 'swr'

import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import fetcher from '~lib/fetcher'
import { spotifyFavoriteTracks } from '~lib/spotify/favorites'
// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = spotifyFavoriteTracks[0]

const NowPlaying = () => {
  const { data } = useSWR('/api/spotify/now-playing', fetcher, {
    fallbackData: initialData,
    refreshInterval: MINUTE,
    revalidateOnFocus: true,
  })

  // @refactor(swr) This a little convulated
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { album, artist, isPlaying, track } =
    data.isPlaying || !!data.artist ? data : initialData

  const title = isPlaying ? 'Listening To' : 'Listening To'

  return (
    <>
      <motion.div
        className={cx(
          `min-h-full py-12`,
          'border-t border-black dark:border-white',
          `bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`
        )}
        animate={{
          rotate: 0,
        }}
      >
        <div
          className={cx(`flex flex-col w-full max-w-4xl`, `px-2 mx-auto md:px-8`)}
        >
          <motion.h3
            className={cx(
              'flex flex-row items-center',
              'gradient text-2xl md:text-4xl',
              'leading-tight md:leading-tight',
              'mt-0 mb-3'
            )}
            style={WEBKIT_BACKGROUND__BREAK}
            layout
            animate={{
              rotate: 0,
            }}
            transition={{ duration: 0.125 }}
          >
            {title}
          </motion.h3>
          <div className={cx('spacer bg-gray-600 dark:bg-gray-300')} />
          <div className={cx('spacer bg-gray-600 dark:bg-gray-300')} />
          <p>
            I listen to a lot of music. I do not think that makes me unique, however,
            I enjoy it all the same. If you’d like to see more of my listening habits
            please check out the{' '}
            <NextLink href="/music">
              <a className="font-black">music</a>
            </NextLink>{' '}
            section.
          </p>
        </div>
      </motion.div>
    </>
  )
}

export default NowPlaying
