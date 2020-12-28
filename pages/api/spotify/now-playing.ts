import { getNowPlaying } from '~lib/spotify'

export default async (_, res) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song = await response.json()
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists
    .map((_artist) => _artist.name)
    .join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify
  const year = song.item.album.release_date.substring(0, 4)

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
    year,
  })
}

/*

{
  timestamp: 1609097728088,
  context: null,
  progress_ms: 93794,
  item: {
    album: {
      album_type: 'album',
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/6X8WdFjrNhXATMDSs26aCc'
          },
          href: 'https://api.spotify.com/v1/artists/6X8WdFjrNhXATMDSs26aCc',
          id: '6X8WdFjrNhXATMDSs26aCc',
          name: 'Curren$y',
          type: 'artist',
          uri: 'spotify:artist:6X8WdFjrNhXATMDSs26aCc'
        },
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/0Y4inQK6OespitzD6ijMwb'
          },
          href: 'https://api.spotify.com/v1/artists/0Y4inQK6OespitzD6ijMwb',
          id: '0Y4inQK6OespitzD6ijMwb',
          name: 'Freddie Gibbs',
          type: 'artist',
          uri: 'spotify:artist:0Y4inQK6OespitzD6ijMwb'
        },
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/0eVyjRhzZKke2KFYTcDkeu'
          },
          href: 'https://api.spotify.com/v1/artists/0eVyjRhzZKke2KFYTcDkeu',
          id: '0eVyjRhzZKke2KFYTcDkeu',
          name: 'The Alchemist',
          type: 'artist',
          uri: 'spotify:artist:0eVyjRhzZKke2KFYTcDkeu'
        }
      ],
      available_markets: [Array],
      external_urls: { spotify: 'https://open.spotify.com/album/3JgtFZroTUGoklTtb2xOne' },
      href: 'https://api.spotify.com/v1/albums/3JgtFZroTUGoklTtb2xOne',
      id: '3JgtFZroTUGoklTtb2xOne',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b2738deb51a13ccc6991ea4710c9',
          width: 640
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e028deb51a13ccc6991ea4710c9',
          width: 300
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d000048518deb51a13ccc6991ea4710c9',
          width: 64
        }
      ],
      name: 'Fetti',
      release_date: '2018-10-31',
      release_date_precision: 'day',
      total_tracks: 9,
      type: 'album',
      uri: 'spotify:album:3JgtFZroTUGoklTtb2xOne'
    },
    artists: [
      {
        external_urls: { spotify: 'https://open.spotify.com/artist/6X8WdFjrNhXATMDSs26aCc' },
        href: 'https://api.spotify.com/v1/artists/6X8WdFjrNhXATMDSs26aCc',
        id: '6X8WdFjrNhXATMDSs26aCc',
        name: 'Curren$y',
        type: 'artist',
        uri: 'spotify:artist:6X8WdFjrNhXATMDSs26aCc'
      },
      {
        external_urls: { spotify: 'https://open.spotify.com/artist/0Y4inQK6OespitzD6ijMwb' },
        href: 'https://api.spotify.com/v1/artists/0Y4inQK6OespitzD6ijMwb',
        id: '0Y4inQK6OespitzD6ijMwb',
        name: 'Freddie Gibbs',
        type: 'artist',
        uri: 'spotify:artist:0Y4inQK6OespitzD6ijMwb'
      },
      {
        external_urls: { spotify: 'https://open.spotify.com/artist/0eVyjRhzZKke2KFYTcDkeu' },
        href: 'https://api.spotify.com/v1/artists/0eVyjRhzZKke2KFYTcDkeu',
        id: '0eVyjRhzZKke2KFYTcDkeu',
        name: 'The Alchemist',
        type: 'artist',
        uri: 'spotify:artist:0eVyjRhzZKke2KFYTcDkeu'
      }
    ],
    available_markets: [
      'AD', 'AE', 'AL', 'AR', 'AT', 'AU', 'BA', 'BE', 'BG',
      'BH', 'BO', 'BR', 'BY', 'CA', 'CH', 'CL', 'CO', 'CR',
      'CY', 'CZ', 'DE', 'DK', 'DO', 'DZ', 'EC', 'EE', 'EG',
      'ES', 'FI', 'FR', 'GB', 'GR', 'GT', 'HK', 'HN', 'HR',
      'HU', 'ID', 'IE', 'IL', 'IN', 'IS', 'IT', 'JO', 'JP',
      'KW', 'KZ', 'LB', 'LI', 'LT', 'LU', 'LV', 'MA', 'MC',
      'MD', 'ME', 'MK', 'MT', 'MX', 'MY', 'NI', 'NL', 'NO',
      'NZ', 'OM', 'PA', 'PE', 'PH', 'PL', 'PS', 'PT', 'PY',
      'QA', 'RO', 'RS', 'RU', 'SA', 'SE', 'SG', 'SI', 'SK',
      'SV', 'TH', 'TN', 'TR', 'TW', 'UA', 'US', 'UY', 'VN',
      'XK', 'ZA'
    ],
    disc_number: 1,
    duration_ms: 208466,
    explicit: true,
    external_ids: { isrc: 'USUYG1224363' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/4zjeLlSpk9lAdXRfcYPDaz'
    },
    href: 'https://api.spotify.com/v1/tracks/4zjeLlSpk9lAdXRfcYPDaz',
    id: '4zjeLlSpk9lAdXRfcYPDaz',
    is_local: false,
    name: 'Saturday Night Special',
    popularity: 44,
    preview_url: 'https://p.scdn.co/mp3-preview/04906fbbbb91688ce85fa8cb64d4ca0866790a3b?cid=75960520d55a48618ff076a11d8d9d10',
    track_number: 4,
    type: 'track',
    uri: 'spotify:track:4zjeLlSpk9lAdXRfcYPDaz'
  },
  currently_playing_type: 'track',
  actions: {
    disallows: {
      resuming: true,
      toggling_repeat_context: true,
      toggling_repeat_track: true,
      toggling_shuffle: true
    }
  },
  is_playing: true
}

*/
