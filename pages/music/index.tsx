import { ExternalLinkIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import { motion } from 'framer-motion'
// import Slugger from 'github-slugger'
import _map from 'lodash/map'
import _title from 'title'
import { useSound } from 'use-sound'

// import { useNotification } from '~context/Notification'
// import ExternalLink from '~components/Dynamic/ext-link'
import { CardWithGlow, CardWithGlowProps } from '~components/Card'
import Layout, { Breakout } from '~components/Layout'
// import { TopArtists, TopTracks } from '~components/Music'
import Breadcrumb from '~components/Notion/Breadcrumb'
import Emoji from '~components/Notion/Emoji'
// import Title from '~components/Notion/Title'
import Seo from '~components/Seo'
// import SplitText from '~components/SplitText'
import { useUI } from '~context/ManagedUIContext'
import useSpotify from '~hooks/useSpotify'
import { MOTION_PAGE_VARIANTS, WEBKIT_BACKGROUND__BREAK } from '~lib/constants'
import {
  spotifyFavoriteAlbums,
  spotifyFavoriteArtists,
} from '~lib/spotify/favorites'

/**
 * @todo Move this away from here, and lib/spotify (process.env)
 */
export type TIME_RANGE_ITEM_PROPS = {
  description: string
  time_range: string
  title: string
  value: string
}
export type TIME_RANGE_PROPS = {
  [id: string]: TIME_RANGE_ITEM_PROPS
}

export const TIME_RANGE: TIME_RANGE_PROPS = {
  // All-Time
  long: {
    description: 'Since March 2020.',
    time_range: 'long_term',
    title: 'All-Time',
    value: 'long_term',
  },
  // ~6 Months
  medium: {
    description: 'Half a year of music.',
    time_range: 'medium_term',
    title: '~6 Months',
    value: 'medium_term',
  },
  // ~1 Month
  short: {
    description: 'The latest and greatest.',
    time_range: 'short_term',
    title: '~1 Month',
    value: 'short_term',
  },
}

const Music = () => {
  const { data, setSpotifyTimeRange } = useSpotify()
  const { audio } = useUI()
  const [playOn] = useSound('/static/audio/pop-up-on.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  const url = 'https://jeromefitzgerald.com/music'
  const title = 'Music'
  const description =
    'Jerome loves music. Here are his current top artists and tracks.'

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
    await setSpotifyTimeRange(data, value)
  }

  // console.dir(`spotifyFavoriteAlbums`)
  // console.dir(spotifyFavoriteAlbums)
  // console.dir(`spotifyFavoriteArtists`)
  // console.dir(spotifyFavoriteArtists)

  // const slugger = new Slugger()
  // // const imageSlug = slugger.slug(album?.imageUrl)
  // // const imageData = !!imageSlug && !!images && images[imageSlug]
  // const imageSlug = spotifyFavoriteArtists[0]?.artists[0]?.meta?.slug
  // const imageData = spotifyFavoriteArtists[0]?.artists[0]?.meta

  return (
    <Layout>
      <Seo {...seo} />
      {/* <Title emoji={`🎹️`} id="page-music" title={title} /> */}
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
        <h2 style={WEBKIT_BACKGROUND__BREAK}>{description}</h2>
        <motion.div id="content">
          <p className="my-4 text-sm">
            <Emoji character={`📝️`} margin={true} />
            <span className="italic font-bold mr-1">Note:</span>
            Links will open in, and all data comes from,{' '}
            <span className="text-green-800 dark:text-green-400 font-medium ml-1">
              Spotify
            </span>
            .
          </p>
          <p className="my-4 text-sm">
            <Emoji character={`📝️`} margin={true} />
            <span className="italic font-bold mr-1">Note:</span>
            This page is currently being revamped as well.
            <Emoji character={`😇️`} margin={true} />
          </p>
          <p className="prose font-medium">
            Please support artists by purchasing music, especially local and indie.
            <br />
            Go to shows (when we can again).
          </p>

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
            {/* <TopArtists /> */}
          </div>
          <div className="my-8">
            <h2 aria-label="Top Tracks" style={WEBKIT_BACKGROUND__BREAK}>
              Top Tracks
            </h2>
            {/* <TopTracks /> */}
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
              <CardWithGlow>
                <CardWithGlowProps
                  headline={spotifyFavoriteArtists[0].artist.name}
                  subline={`2020 “Favourite Artist”`}
                  tags={spotifyFavoriteArtists[0].genres}
                  description={
                    <>
                      Describing himself as “a DJ first, producer second, and MC
                      last,” <span className={cx('font-bold')}>Madlib</span>is the
                      primary alias of{' '}
                      <span className={cx('font-bold')}>Otis Jackson</span>, Jr., who
                      has become one of the most celebrated, prolific, and eclectic
                      artists in hip-hop since emerging on the scene in the early
                      ‘90s.
                    </>
                  }
                  share={
                    <>
                      Read more and listen{' '}
                      <a
                        aria-label={spotifyFavoriteArtists[0].artist.name}
                        className={cx(
                          'underline-style-solid underline-offset-md underline-thickness-md',
                          '_text-black'
                        )}
                        href={spotifyFavoriteArtists[0].artists[0].uri}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                        <ExternalLinkIcon className="h-4 w-4 ml-2 mb-1 inline-flex _text-black" />
                      </a>
                      .
                    </>
                  }
                  slug={spotifyFavoriteArtists[0]?.artists[0]?.meta?.slug}
                  meta={spotifyFavoriteArtists[0]?.artists[0]?.meta}
                />
              </CardWithGlow>
              <div className={cx('spacer my-6 md:my-8')} />
              <CardWithGlow>
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
                      Join along{' '}
                      <a
                        aria-label={spotifyFavoriteAlbums[0].artist.name}
                        className={cx(
                          'underline-style-solid underline-offset-md underline-thickness-md',
                          '_text-black'
                        )}
                        href={spotifyFavoriteAlbums[0].artists[0].uri}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                        <ExternalLinkIcon className="h-4 w-4 ml-2 mb-1 inline-flex _text-black" />
                      </a>
                      .
                    </>
                  }
                  slug={spotifyFavoriteAlbums[0]?.artists[0]?.meta?.slug}
                  meta={spotifyFavoriteAlbums[0]?.artists[0]?.meta}
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
