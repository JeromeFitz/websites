import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { Artist } from '~components/Music'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const DEFAULT_URL = '/api/spotify/top-artists'

const TopArtists = () => {
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
  // const loading = true

  return (
    <ul>
      {loading
        ? [...Array(10).keys()].map((index: number) => (
            <Artist
              key={`artist-temp-${index}`}
              loading={true}
              ranking={index + 1}
            />
          ))
        : data?.artists.map((artist, index: number) => (
            <Artist
              key={artist.url}
              loading={loading}
              ranking={index + 1}
              {...artist}
            />
          ))}
    </ul>
  )
}

export default TopArtists
