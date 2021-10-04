import cx from 'clsx'
import { motion } from 'framer-motion'
import _map from 'lodash/map'
import dynamic from 'next/dynamic'
// import { useState } from 'react'
import _title from 'title'
import { useSound } from 'use-sound'

import { CardWithGlow, CardWithGlowProps } from '~components/Card'
import Icon from '~components/Icon'
import Layout, { Breakout } from '~components/Layout'
import { TopArtists, TopTracks } from '~components/Music'
import Breadcrumb from '~components/Notion/Breadcrumb'
import Seo from '~components/Seo'
import { useUI } from '~context/ManagedUIContext'
import useSpotify from '~hooks/useSpotify'
import {
  MOTION_PAGE_VARIANTS,
  TIME_RANGE,
  TIME_RANGE_ITEM_PROPS,
  WEBKIT_BACKGROUND__BREAK,
} from '~lib/constants'
import {
  spotifyFavoriteAlbums,
  spotifyFavoriteArtists,
} from '~lib/spotify/favorites'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

const Music = () => {
  // const [term, termSet] = useState('medium_term')
  const { data, setSpotifyTimeRange } = useSpotify()
  const { audio } = useUI()
  const [playOn] = useSound('/static/audio/pop-up-on.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  const url = 'https://jeromefitzgerald.com/music'
  const title = 'Music'
  const description =
    'Jerome loves music. Here are his current top artists and tracks (all data from Spotify).'

  const seo = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      url,
      title,
      description,
    },
  }

  const handleSpotifyTimeRange = async (value) => {
    playOn()
    // termSet(value)
    await setSpotifyTimeRange(data, value)
  }
  // console.dir(`data`)
  // console.dir(data)
  return (
    <Layout>
      <Seo {...seo} />
      <Breadcrumb isIndex={true} title={title} />
      <motion.div
        key={`page-music`}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={MOTION_PAGE_VARIANTS}
        transition={{ delay: 0.25, duration: 1, type: 'linear' }}
        className={cx('flex flex-col')}
      >
        <motion.div id="content">
          <p className="my-4 text-sm">
            <Emoji character={`📝️`} margin={true} />
            <span className="italic font-bold mr-1">Note:</span>
            Links will open in, and all data comes from,{' '}
            <span
              className={cx(
                'font-bold text-transparent bg-clip-text bg-gradient-to-t',
                'from-green-500 via-green-500 to-green-500'
              )}
            >
              Spotify
            </span>
            . My “
            <span
              className={cx(
                'font-bold text-transparent bg-clip-text bg-gradient-to-t',
                'from-red-500 via-red-400 to-red-300'
              )}
            >
              Music
            </span>
            ” library is at over 50 days, and am continuing an ever growing vinyl
            collection (have not yet made the leap to first editions, heh).
          </p>
          <p className="prose font-medium">
            Please support artists by going to shows (when we can again), purchasing
            music, especially local and indie. Like...
          </p>
          <p className="prose font-medium">
            <a
              aria-label="Link to Nice Rec’s, “Drink The Blue Sky” on Bandcamp"
              className="font-black text-xl"
              href="https://nicerec.bandcamp.com/album/drink-the-blue-sky"
              rel="noopener noreferrer"
              target="_blank"
              title="Link to Nice Rec’s, “Drink The Blue Sky” on Bandcamp"
            >
              Nice Rec’s, “Drink The Blue Sky”{' '}
              <Icon
                className="h-4 w-4 ml-2 mb-1 inline-flex _text-black dark:_text-white"
                icon={'ExternalLinkIcon'}
              />
            </a>
            {` `}
            on Bandcamp.
          </p>
          {/* <div
            className={cx(
              'rounded-3xl cursor-pointer flex bg-green-500',
              term === 'short_term' && 'bg-red-100 justify-start',
              term === 'medium_term' && 'bg-red-500 justify-center',
              term === 'short_term' && 'bg-red-900 justify-end'
            )}
            style={{ width: '200px', height: '50px' }}
            // onClick={() => termSet((prev) => !prev)}
          >
            <motion.div
              className={cx('bg-yellow-800 rounded-full')}
              style={{ width: '50px', height: '50px' }}
              layout
            ></motion.div>
          </div> */}
          <div
            className={cx(
              'flex flex-col md:flex-row',
              'items-start justify-items-start justify-between',
              'mt-4 mb-6 md:mt-0 md:mb-6 mr-4 md:mr-0'
            )}
          >
            <div className="flex flex-col">
              <fieldset className="flex flex-col mb-4">
                <div>
                  <legend className="font-bold text-secondary">
                    Change the Timing Frequency
                  </legend>
                  <p className="text-sm text-secondary">
                    I’ve had Spotify since March 2020, so you can go back that far or
                    two other options currently.
                  </p>
                </div>
                <div className="mt-4 flex flex-col md:flex-row justify-center items-start">
                  {_map(
                    TIME_RANGE,
                    (timeRange: TIME_RANGE_ITEM_PROPS, timeRangeIndex: number) => {
                      const name = 'timeRange'
                      return (
                        <div
                          className={cx(
                            'mx-4 my-2 first:ml-0 last:mr-0',
                            'flex flex-row align-middle items-center'
                          )}
                          key={`time-range--${timeRangeIndex}`}
                        >
                          <input
                            disabled={data.disabled}
                            checked={data.time_range === timeRange.value}
                            className={cx(
                              'h-4 w-4 md:h-6 md:w-6',
                              'border-gray-700 dark:border-gray-300',
                              'text-primary',
                              'focus:ring-yellow-400'
                            )}
                            id={timeRange.title}
                            name={name}
                            // onChange={preserveHandleChange}
                            onChange={() => {
                              void handleSpotifyTimeRange(timeRange.value)
                            }}
                            type="radio"
                            value={timeRange.value}
                          />
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor={timeRange.title}
                              className="font-medium text-gray-700 dark:text-gray-200"
                            >
                              {_title(timeRange.title)}
                            </label>
                            <p className="text-gray-500 dark:text-gray-300">
                              {_title(timeRange.description)}
                            </p>
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="my-4 md:my-6">
            <h2 aria-label="Top Artists" style={WEBKIT_BACKGROUND__BREAK}>
              Top Artists
            </h2>
            <TopArtists />
          </div>
          <div className="my-8">
            <h2 aria-label="Top Tracks" style={WEBKIT_BACKGROUND__BREAK}>
              Top Tracks
            </h2>
            <TopTracks />
          </div>
        </motion.div>
      </motion.div>
      <Breakout>
        <div
          className={cx(
            `min-h-full py-12`,
            'border-t border-black dark:border-white',
            // `bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400`
            `bg-gradient-to-r from-red-200 via-red-300 to-yellow-200`
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
              2020 Recap
            </motion.h3>
            <div className={cx('spacer ')} />
            <div className={cx('spacer _bg-black')} />
            <p className={cx('_text-black')}>
              I think it is understated how much music got me through the year that
              was.
            </p>
            <div className="flex align-center my-6 w-full"></div>
            <div className={cx('flex flex-col')}>
              <CardWithGlow
                blurDataURL={spotifyFavoriteArtists[0]?.artists[0].meta.base64}
              >
                <CardWithGlowProps
                  headline={spotifyFavoriteArtists[0].artist.name}
                  subline={`2020 “Favourite Artist”`}
                  tags={spotifyFavoriteArtists[0].genres}
                  description={
                    <>
                      Describing himself as “a DJ first, producer second, and MC
                      last,” <span className={cx('font-bold')}>Madlib</span> is the
                      primary alias of{' '}
                      <span className={cx('font-bold')}>Otis Jackson, Jr.</span>, who
                      has become one of the most celebrated, prolific, and eclectic
                      artists in hip-hop since emerging on the scene in the early
                      ‘90s.
                    </>
                  }
                  share={
                    <>
                      <a
                        aria-label={`Link to ${spotifyFavoriteArtists[0].artist.name}`}
                        className={cx(
                          'underline-style-solid underline-offset-md underline-thickness-md',
                          '_text-black'
                        )}
                        href={spotifyFavoriteArtists[0].artists[0].uri}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={`Link to ${spotifyFavoriteArtists[0].artist.name}`}
                      >
                        Full bio and music here.
                        <Icon
                          className="h-4 w-4 ml-2 mb-1 inline-flex _text-black"
                          icon={'ExternalLinkIcon'}
                        />
                      </a>
                    </>
                  }
                  slug={spotifyFavoriteArtists[0]?.artists[0]?.meta?.slug}
                  meta={spotifyFavoriteArtists[0]?.artists[0]}
                />
              </CardWithGlow>
              <div className={cx('spacer my-6 md:my-8')} />
              <CardWithGlow
                blurDataURL={spotifyFavoriteAlbums[0]?.artists[0].meta.base64}
              >
                <CardWithGlowProps
                  reverse={true}
                  headline={`“${spotifyFavoriteAlbums[0].track.name}”`}
                  subline={`2020 “Favourite Track”`}
                  tags={spotifyFavoriteAlbums[0].genres}
                  description={
                    <>
                      Off of “
                      <span className={cx(' font-bold')}>
                        {spotifyFavoriteAlbums[0].album.name}
                      </span>
                      ” released in{' '}
                      <span className={cx(' font-bold')}>
                        {spotifyFavoriteAlbums[0].album.year}
                      </span>{' '}
                      by{' '}
                      <span className={cx(' font-bold')}>
                        {spotifyFavoriteAlbums[0].artists[0].name}
                      </span>
                      .
                    </>
                  }
                  share={
                    <>
                      <a
                        aria-label={`Link to ${spotifyFavoriteAlbums[0].artist.name}`}
                        className={cx(
                          'underline-style-solid underline-offset-md underline-thickness-md',
                          '_text-black'
                        )}
                        href={spotifyFavoriteAlbums[0].artists[0].uri}
                        rel="noopener noreferrer"
                        target="_blank"
                        title={`Link to ${spotifyFavoriteAlbums[0].artist.name}`}
                      >
                        Peep the track here.
                        <Icon
                          className="h-4 w-4 ml-2 mb-1 inline-flex _text-black"
                          icon={'ExternalLinkIcon'}
                        />
                      </a>
                    </>
                  }
                  slug={spotifyFavoriteAlbums[0]?.artists[0]?.meta?.slug}
                  meta={spotifyFavoriteAlbums[0]?.artists[0]}
                />
              </CardWithGlow>
              <div className={cx('spacer my-6 md:my-8')} />
            </div>
          </div>
        </div>
      </Breakout>
    </Layout>
  )
}

export default Music
