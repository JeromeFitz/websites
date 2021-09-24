/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExternalLinkIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import { motion } from 'framer-motion'
import Slugger from 'github-slugger'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useEffect } from 'react'
// import { useInView } from 'react-intersection-observer'
import useSWR, { useSWRConfig } from 'swr'

import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import fetcher from '~lib/fetcher'
import { spotifyFavoriteTracks } from '~lib/spotify/favorites'
// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = spotifyFavoriteTracks[0]

const CardWithGlow = ({ children }) => {
  const cardVariants = {
    // hover: {
    //   scale: 1.05,
    // },
    // initial: {
    //   scale: 1,
    // },
  }

  const glowVariants = {
    // hover: {
    //   opacity: 0.8,
    // },
    // initial: {
    //   scale: 1.05,
    //   opacity: 0,
    // },
  }

  return (
    <motion.div
      className={cx(
        'relative'
        // 'overflow-hidden relative',
        // 'w-2/4 h-3/4'
      )}
      // initial="initial"
      // whileHover="hover"
      initial="hover"
      whileHover="initial"
    >
      <motion.div
        className={cx(
          'absolute top-0 left-0 w-full h-full blur-lg rounded-xl',
          // 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'
          'bg-gradient-to-r from-gray-700 via-gray-900 to-black'
        )}
        variants={glowVariants}
        transition={{
          ease: 'easeOut',
          delay: 0.15,
        }}
      />
      <motion.div
        className={cx(
          ' relative',
          'h-full',
          // 'mb-0 px-10 py-10',
          'rounded-xl',
          'bg-white'
          // 'backdrop-opacity-75',
          // 'hover:opacity-95'
        )}
        variants={cardVariants}
        transition={{
          ease: 'easeOut',
          delay: 0.15,
          duration: 0.5,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

const NowPlaying = () => {
  // const [ref, refInView] = useInView()
  const { data } = useSWR('/api/spotify/now-playing', fetcher, {
    fallbackData: initialData,
    refreshInterval: MINUTE,
    revalidateOnFocus: true,
  })
  // @refactor(swr) This a little convulated
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { album, artist, isPlaying, meta, track } =
    data.isPlaying || !!data.artist ? data : initialData

  /**
   * @images
   */
  const { mutate } = useSWRConfig()
  const { data: images } = useSWR('images')
  useEffect(() => {
    const newImage = !!meta && {
      [meta.slug]: {
        base64: meta.base64,
        id: meta.slug,
        img: meta.img,
        url: meta.url,
      },
    }
    !!newImage && void mutate('images', { ...images, ...newImage })
  }, [images, meta, mutate])

  const title = isPlaying ? 'Listening To' : 'Listening To'

  // const queryParams = !!album
  //   ? `url=${album?.imageUrl}`
  //   : `url=${`https://i.scdn.co/image/ab67616d0000b27377b08ffd1ea32abba3672bb6`}`

  // const { data: spotifyImage } = useSWR(
  //   [`/api/images`, queryParams],
  //   (url) => fetcher(`${url}?${queryParams}`),
  //   { revalidateOnFocus: false }
  // )
  // console.dir(`album`)
  // console.dir(album)
  // console.dir(`artist`)
  // console.dir(artist)
  // console.dir(`track`)
  // console.dir(track)
  // console.dir(`meta`)
  // console.dir(meta)

  const slugger = new Slugger()
  const imageSlug = slugger.slug(album?.imageUrl)
  const imageData = !!imageSlug && !!images && images[imageSlug]
  // const imageSlug = meta?.slug
  // const imageData = meta

  return (
    <>
      <div
        className={cx(
          `min-h-full py-12`,
          'border-t border-black dark:border-white',
          `bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`
        )}
      >
        <div
          className={cx(`flex flex-col w-full max-w-4xl`, `px-2 mx-auto md:px-8`)}
        >
          <motion.h3
            className={cx(
              'flex flex-row items-center',
              'gradient text-2xl md:text-4xl',
              'leading-tight md:leading-tight',
              'mt-0 mb-3',
              '_text-black'
            )}
            style={WEBKIT_BACKGROUND__BREAK}
            layout
            animate={{}}
            transition={{}}
          >
            {title}
          </motion.h3>
          <div className={cx('spacer ')} />
          <div className={cx('spacer _bg-black')} />
          <p className={cx('_text-black')}>
            I listen to a lot of music. I do not think that makes me unique, however,
            I enjoy it all the same. If you’d like to see more of my listening habits
            please check out the{' '}
            <NextLink href="/music">
              <a className="font-black _text-black underline-style-solid underline-offset-md underline-thickness-md">
                music
              </a>
            </NextLink>{' '}
            section.
          </p>
          <div className="flex align-center my-6 w-full">
            <CardWithGlow>
              <div
                className={cx(
                  'flex flex-col md:flex-row w-full'
                  //'mb-0'
                )}
              >
                <div
                  className={cx(
                    'flex flex-col md:w-2/5',
                    'px-5 py-5',
                    'md:px-10 md:py-10'
                  )}
                >
                  <p className="font-black text-xl md:text-2xl _text-black">
                    {artist.name}
                  </p>
                  <div className={cx('spacer bg-gray-600 dark:bg-gray-300')} />
                  <p className="font-medium text-lg md:text-xl pb-2 md:pb-4 _text-black">
                    “{track.name}”
                  </p>
                  <p className="font-normal text-base md:text-lg pb-2 md:pb-4 _text-black">
                    Off of “<span className={cx(' font-bold')}>{album.name}</span>”
                    released in{' '}
                    <span className={cx(' font-bold')}>{album.year}</span>.
                  </p>
                  <p className="text-sm md:text-base _text-black">
                    Join along{' '}
                    <a
                      aria-label={track.name}
                      className={cx(
                        'underline-style-solid underline-offset-md underline-thickness-md',
                        '_text-black'
                      )}
                      href={track.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      here
                      <ExternalLinkIcon className="h-4 w-4 ml-2 mb-1 inline-flex _text-black" />
                    </a>
                    .
                  </p>
                </div>
                <div
                  className={cx(
                    'flex flex-col md:w-3/5'
                    // 'md:drop-shadow-xl md:scale-105'
                  )}
                >
                  {!!imageData ? (
                    <NextImage
                      alt={`Album Cover for ${album.name}`}
                      blurDataURL={imageData.base64}
                      className={cx('rounded')}
                      key={imageSlug}
                      layout="intrinsic"
                      placeholder="blur"
                      title={`Album Cover for ${album.name}`}
                      {...imageData.img}
                    />
                  ) : null}
                  {/* <ImageCaption caption={seoImageDescription} /> */}
                </div>
              </div>
            </CardWithGlow>
          </div>
        </div>
      </div>
    </>
  )
}

export default NowPlaying
