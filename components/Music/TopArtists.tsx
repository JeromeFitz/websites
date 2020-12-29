import useSWR from 'swr'

import fetcher from '~lib/fetcher'
import { Artist } from '~components/Music'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const TopArtists = () => {
  const { data, error } = useSWR('/api/spotify/top-artists', fetcher, {
    refreshInterval: HOUR,
    revalidateOnFocus: false,
  })

  const loading = !data && !error

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
        : data.artists.map((artist, index: number) => (
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
