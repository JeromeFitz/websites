import { getTopArtists } from '~lib/spotify'

export default async (_, res) => {
  const response = await getTopArtists()
  const { items } = await response.json()

  // @refactor(spotify) prefer spotify schema or normalize consistently
  const artists = items.slice(0, 10).map((artist) => ({
    id: artist.id,
    image: artist.images[0].url,
    name: artist.name,
    url: artist.external_urls.spotify,
  }))

  return res.status(200).json({ artists })
}
