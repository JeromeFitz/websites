import useSWR from 'swr'

const key = 'spotify'
const initialStore = {
  disabled: false,
  limit: 10,
  time_range: 'short_term',
  short_term: { topArtists: {}, topSongs: {} },
  medium_term: { topArtists: {}, topSongs: {} },
  long_term: { topArtists: {}, topSongs: {} },
  nowPlaying: {},
}

function useSpotify() {
  const { data, error, mutate } = useSWR(key, {
    fallbackData: initialStore,
  })

  const setSpotifyLimit = async (data, value) => {
    await mutate({ ...data, limit: value })
  }

  const setSpotifyTimeRange = async (data, value) => {
    await mutate({ ...data, time_range: value })
  }

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
    setSpotifyLimit,
    setSpotifyTimeRange,
  }
}

export default useSpotify
