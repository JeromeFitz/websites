import Client from '@jeromefitz/spotify'
import type { CredentialProps, ClientProps } from '@jeromefitz/spotify'

const {
  SPOTIFY_CLIENT_ID: clientId,
  SPOTIFY_CLIENT_SECRET: clientSecret,
  SPOTIFY_REFRESH_TOKEN: refreshToken,
} = process.env

const credentials: CredentialProps = {
  clientId,
  clientSecret,
  refreshToken,
}

const spotify: ClientProps = new Client({ accessToken: '', ...credentials })

const spotifyApi = async (
  { query: { limit = 10, offset = 0, slug, time_range = 'medium_term' } }: any,
  res: any
) => {
  /**
   * @vars
   */

  let data: any
  switch (slug) {
    case 'now-playing':
      data = await spotify.get.nowPlaying({ withImages: true })
      break
    case 'top-artists':
      data = await spotify.get.topArtists({
        limit,
        offset,
        time_range,
        withImages: true,
      })
      break
    case 'top-tracks':
      data = await spotify.get.topTracks({
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

  // @hack(spotify) lol, error handling, wut
  if (data?.status === 204 || data?.status > 400) {
    return res?.status(200).json({ is_playing: false })
  }

  return res.status(200).json({ ...data })
}

export default spotifyApi
