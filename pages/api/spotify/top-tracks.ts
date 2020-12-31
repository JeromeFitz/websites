import { getTopTracks } from '~lib/spotify'

export default async (_, res) => {
  const response = await getTopTracks()
  const { items } = await response.json()

  const tracks = items.slice(0, 10).map((track) => {
    const { album, artists } = track
    const trackId = track.id
    const trackName = track.name
    const trackUri = track.uri
    const trackUrl = track.external_urls.spotify

    return {
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
      isPlaying: false,
      track: {
        id: trackId,
        name: trackName,
        uri: trackUri,
        url: trackUrl,
      },
    }
  })

  return res.status(200).json({ tracks })
}
