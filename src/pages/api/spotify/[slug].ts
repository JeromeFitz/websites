import SpotifyApi from '@jeromefitz/spotify'
import type { QueryProps as _QueryProps, SpotifyApiProps } from '@jeromefitz/spotify'

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env

const credentials = {
  clientId,
  clientSecret,
  refreshToken,
}

const SPOTIFY: SpotifyApiProps = new SpotifyApi()
SPOTIFY.setCredentials(credentials)

interface QueryProps extends _QueryProps {
  slug: 'now-playing' | 'top-artists' | 'top-tracks'
}
interface ReqProps {
  query: QueryProps
}

const spotifyApi = async (
  { query: { limit = 10, offset = 10, slug, time_range = 'medium_term' } }: ReqProps,
  res
) => {
  /**
   * @vars
   */

  let data: any
  switch (slug) {
    case 'now-playing':
      data = await SPOTIFY.getNowPlaying({ withImages: true })
      break
    case 'top-artists':
      data = await SPOTIFY.getTopArtists({
        limit,
        offset,
        time_range,
        withImages: true,
      })
      break
    case 'top-tracks':
      data = await SPOTIFY.getTopTracks({
        limit,
        offset,
        time_range,
        withImages: true,
      })
      break
    default:
      data = { isPlaying: false }
      break
  }

  // @hack(spotify)
  if (data?.status === 204 || data?.status > 400) {
    return res?.status(200).json({ is_playing: false })
  }

  return res.status(200).json({ ...data })
}

export default spotifyApi
