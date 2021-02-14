import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'
import { Track } from '~components/Music'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const DEFAULT_URL = '/api/spotify/top-tracks'

const TopTracks = () => {
  const [url, urlSet] = useState(DEFAULT_URL + `?limit=20&time_range=medium_term`)
  const {
    data: { time_range },
  } = useSpotify()

  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: HOUR,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    urlSet(DEFAULT_URL + `?limit=20&time_range=${time_range}`)
    return () => {}
  }, [time_range])

  const loading = !data && !error

  return (
    <ul>
      {loading
        ? [...Array(10).keys()].map((index: number) => {
            ;<Track key={`track-temp-${index}`} loading={true} ranking={index + 1} />
          })
        : data?.tracks.map((track, index: number) => (
            <Track
              key={`track-perm-${index}`}
              loading={loading}
              ranking={index + 1}
              {...track}
            />
          ))}
    </ul>
  )
}

export default TopTracks
