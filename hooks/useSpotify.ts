import useSWR, { mutate } from 'swr'

const key = 'spotify'
const initialStore = {
  disabled: false,
  limit: 10,
  time_range: 'medium_term',
  short_term: { topArtists: {}, topSongs: {} },
  medium_term: { topArtists: {}, topSongs: {} },
  long_term: { topArtists: {}, topSongs: {} },
  nowPlaying: {},
}

function useSpotify() {
  const { data, error } = useSWR(key, {
    fallbackData: initialStore,
  })

  return {
    data,
    isError: error,
    isLoading: !error && !data,
    key,
  }
}

const setSpotifyLimit = async (data, value) => {
  await mutate(key, { ...data, limit: value }, false)
}

const setSpotifyTimeRange = async (data, value) => {
  await mutate(key, { ...data, time_range: value }, false)
}

export { setSpotifyLimit, setSpotifyTimeRange }
export default useSpotify
