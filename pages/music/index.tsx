import cx from 'clsx'
import _title from 'title'
import _map from 'lodash/map'

// import { useToast } from '~context/Toast'
import useSpotify, { setSpotifyTimeRange } from '~hooks/useSpotify'

import Seo from '~components/Seo'
import ExternalLink from '~components/Dynamic/ext-link'
import Layout from '~components/Layout'
import Header from '~components/Header'
import { TopArtists, TopTracks } from '~components/Music'
import SplitText from '~components/SplitText'

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
  const { data } = useSpotify()

  const url = 'https://jeromefitzgerald.com/music'
  const title = 'Music'
  const description =
    'Jerome loves music. Here are his current top artists and tracks.'
  const header = {
    description,
    title,
  }

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
    await setSpotifyTimeRange(data, value)
  }

  return (
    <Layout>
      <Seo {...seo} />
      <Header {...header} />
      <div id="content">
        <div className="mb-4">
          <p className="my-4">
            <span className="italic font-bold block">Note:</span>
            <span className="block md:inline">Links will open in, and all </span>data
            comes from,{' '}
            <span className="text-green-800 dark:text-green-400 font-medium">
              Spotify
            </span>
            . (Please support artists by purchasing music, especially local and
            indie. Go to shows [when we can again].)
          </p>
        </div>
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
                <legend className="text-base font-medium text-primary">
                  Change the Timing Frequency
                </legend>
                <p className="text-sm text-primary">
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
                          onChange={() => handleSpotifyTimeRange(timeRange.value)}
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
          <h2 aria-label="Top Artists">
            <SplitText splitBy="letter" text="Top Artists" />
          </h2>
          <div className="flex flex-col md:flex-row w-full items-start justify-between">
            <p className="mb-6 md:mb-8">
              For 2020 my number one artist was{' '}
              <span className="block md:inline">
                <ExternalLink
                  className="text-2xl"
                  href="spotify:artist:5LhTec3c7dcqBvpLRWbMcf"
                >
                  Madlib.
                </ExternalLink>
              </span>
            </p>
          </div>
          <TopArtists />
        </div>
        <div className="my-8">
          <h2 aria-label="Top Tracks">
            <SplitText splitBy="letter" text="Top Tracks" />
          </h2>
          <p className="mb-6 md:mb-8 leading-relaxed">
            <span className="inline md:block">For 2020 my number one song was </span>
            <ExternalLink
              className="text-xl"
              href="spotify:track:5taqLrLouA4vCjM7ZQpEtW"
            >
              “ooh la la (feat. Greg Nice &amp; DJ Premier)”
            </ExternalLink>{' '}
            by <span className="text-lg font-bold">Run The Jewels</span>.
          </p>
          <TopTracks />
        </div>
      </div>
    </Layout>
  )
}

export default Music
