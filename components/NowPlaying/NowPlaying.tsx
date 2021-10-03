/* eslint-disable @typescript-eslint/no-unused-vars */
import cx from 'clsx'
import { motion } from 'framer-motion'
// import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _slice from 'lodash/slice'
// import NextImage from 'next/image'
import NextLink from 'next/link'
// import { useEffect } from 'react'
// import { useInView } from 'react-intersection-observer'
// import useSWR, { useSWRConfig } from 'swr'
import useSWR from 'swr'
import _title from 'title'

import { CardWithGlow, CardWithGlowProps } from '~components/Card'
import Icon from '~components/Icon'
import { WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import fetcher from '~lib/fetcher'
import { spotifyFavoriteTracks } from '~lib/spotify/favorites'
// const HOUR = 3600000
const MINUTE = 60000
// const SECOND = 1000

const initialData = spotifyFavoriteTracks[0]

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
  const { album, artist, artists, genres, isPlaying, meta, track } =
    data.isPlaying || !!data.artist ? data : initialData
  // const { album, artist, genres, isPlaying, meta, track } = initialData
  const genresData = _slice(genres, 0, 3)
  /**
   * @images
   */
  // const { mutate } = useSWRConfig()
  // const { data: images } = useSWR('images')
  // useEffect(() => {
  //   const newImage = !!meta && {
  //     [meta.slug]: {
  //       base64: meta.base64,
  //       id: meta.slug,
  //       img: meta.img,
  //       url: meta.url,
  //     },
  //   }
  //   !!newImage && void mutate('images', { ...images, ...newImage })
  // }, [images, meta, mutate])

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
  // console.dir(`artists`)
  // console.dir(artists)
  // console.dir(`artist`)
  // console.dir(artist)
  // console.dir(`track`)
  // console.dir(track)
  // console.dir(`meta`)
  // console.dir(meta)

  // const slugger = new Slugger()
  // // const imageSlug = slugger.slug(album?.imageUrl)
  // // const imageData = !!imageSlug && !!images && images[imageSlug]
  // const imageSlug = album?.meta?.slug
  // const imageData = album?.meta

  return (
    <section
      className={cx(
        `min-h-full py-12`,
        'border-t border-black dark:border-white',
        `bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`,
        ''
      )}
    >
      <div className={cx(`flex flex-col w-full max-w-4xl`, `px-2 mx-auto md:px-8`)}>
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
          I listen to a lot of music. I do not think that makes me unique, however, I
          enjoy it all the same. If you’d like to see more of my listening habits
          please check out the{' '}
          <NextLink href="/music">
            <a className="font-black _text-black underline-style-solid underline-offset-md underline-thickness-md">
              music
            </a>
          </NextLink>{' '}
          section.
        </p>
        <div className="flex align-center my-6 w-full">
          <CardWithGlow blurDataURL={album.meta.base64}>
            <CardWithGlowProps
              reverse={false}
              headline={artist.name}
              subline={`“${track.name}”`}
              tags={genresData}
              description={
                <>
                  Off of “<span className={cx('font-bold')}>{album.name}</span>”
                  released in <span className={cx('font-bold')}>{album.year}</span>.
                  .
                </>
              }
              share={
                <>
                  <a
                    aria-label={`Link to ${track.name}`}
                    className={cx(
                      'underline-style-solid underline-offset-md underline-thickness-md',
                      '_text-black'
                    )}
                    href={track.uri}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={`Link to ${track.name}`}
                  >
                    Join along here.
                    <Icon
                      className="h-4 w-4 ml-2 mb-1 inline-flex _text-black"
                      icon={'ExternalLinkIcon'}
                    />
                  </a>
                </>
              }
              slug={album?.meta?.slug}
              meta={album}
            />
          </CardWithGlow>
        </div>
      </div>
    </section>
  )
}

export default NowPlaying
