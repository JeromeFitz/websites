import Slugger from 'github-slugger'
import _map from 'lodash/map'
import { getPlaiceholder } from 'plaiceholder'

import { getGenres, getNowPlaying, getTopArtists, getTopTracks } from '~lib/spotify'

// @todo(routes) Lock this down a bit beter with Typescript
// const allowedRoutes = ['now-playing', 'top-artists', 'top-tracks']

const spotifyApi = async ({ query: { limit, slug, time_range } }, res) => {
  switch (slug) {
    case 'now-playing':
      const response = await getNowPlaying()

      if (response.status === 204 || response.status > 400) {
        return res.status(200).json({ isPlaying: false })
      }

      const track = await response.json()

      const { album, artists } = track.item

      // console.dir(`track`)
      // console.dir(track)
      // console.dir(`album`)
      // console.dir(album)
      // console.dir(`artists`)
      // console.dir(artists)

      const isPlaying = track.is_playing

      const trackId = track.item.id
      const trackName = track.item.name
      const trackUri = track.item.uri
      const trackUrl = track.item.external_urls.spotify

      const artistIds = _map(artists, (artist) => artist.id)
      // const artistIds = ['7izarc0fRIPbdZ8cVyChRf']
      const dataGenres = await getGenres({ ids: artistIds.join('%2C') })
      const dataGenresJson = await dataGenres.json()
      const genres = []
      _map(
        dataGenresJson.artists,
        (artist) => !!artist && genres.push(...artist?.genres)
      )

      const slugger = new Slugger()
      const slug = slugger.slug(album.images[0].url)
      const { base64, img } = await getPlaiceholder(album.images[0].url)

      return res.status(200).json({
        album: {
          id: album.id,
          imageUrl: album.images[0].url,
          meta: {
            base64,
            img,
            slug,
            url: album.images[0].url,
          },
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
        genres,
        isPlaying,
        track: {
          id: trackId,
          name: trackName,
          uri: trackUri,
          url: trackUrl,
        },
      })
    case 'top-artists':
      const responseTopArtists = await getTopArtists({ limit, time_range })
      const { items } = await responseTopArtists.json()

      // @refactor(spotify) prefer spotify schema or normalize consistently
      const artistsTopArtists = items.slice(0, 10).map(async (artist) => {
        // console.dir(`artist`)
        // console.dir(artist)
        const slugger = new Slugger()
        const slug = slugger.slug(artist.images[0].url)
        const { base64, img } = await getPlaiceholder(artist.images[0].url)

        return {
          id: artist.id,
          image: artist.images[0].url,
          images: artist.images,
          genres: artist.genres,
          meta: {
            base64,
            img,
            slug,
            url: album.images[0].url,
          },
          name: artist.name,
          uri: artist.uri,
          url: artist.external_urls.spotify,
        }
      })

      return res.status(200).json({ artists: artistsTopArtists })
    case 'top-tracks':
      const responseTopTracks = await getTopTracks({ limit, time_range })
      const { items: itemsTopTracks } = await responseTopTracks.json()

      const tracks = itemsTopTracks.slice(0, 10).map((track) => {
        const { album, artists } = track
        const trackId = track.id
        const trackName = track.name
        const trackUri = track.uri
        const trackUrl = track.external_urls.spotify

        // console.dir(`album`)
        // console.dir(album)
        // console.dir(`artists`)
        // console.dir(artists)

        return {
          album: {
            id: album.id,
            imageUrl: album.images[0].url,
            images: album.images,
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
    default:
      res.status(404).json({
        status: 404,
      })
      break
  }
}

export default spotifyApi
