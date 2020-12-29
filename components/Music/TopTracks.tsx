import useSWR from 'swr'

import fetcher from '~lib/fetcher'
import { Track } from '~components/Music'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const TopTracks = () => {
  const { data, error } = useSWR('/api/spotify/top-tracks', fetcher, {
    refreshInterval: HOUR,
    revalidateOnFocus: false,
  })

  const loading = !data && !error

  return (
    <ul>
      {loading
        ? [...Array(10).keys()].map((index: number) => {
            ;<Track key={`track-temp-${index}`} loading={true} ranking={index + 1} />
          })
        : data.tracks.map((track, index: number) => (
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
