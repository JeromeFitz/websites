import { getNowPlaying } from '~lib/spotify'

export default async (_, res) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const track = await response.json()

  const { album, artists } = track.item

  const isPlaying = track.is_playing

  const trackId = track.item.id
  const trackName = track.item.name
  const trackUri = track.item.uri
  const trackUrl = track.item.external_urls.spotify

  return res.status(200).json({
    album: {
      id: album.id,
      imageUrl: album.images[0].url,
      name: album.name,
      uri: album.uri,
      url: album.external_urls.spotify,
      year: album.release_date.substring(0, 4),
    },
    artist: {
      name: artists.map((_artist) => _artist.name).join(', '),
    },
    // @refactor(spotify) prefer spotify schema or normalize consistently
    artists,
    isPlaying,
    track: {
      id: trackId,
      name: trackName,
      uri: trackUri,
      url: trackUrl,
    },
  })
}
