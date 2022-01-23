const artist = {
  items: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/5LhTec3c7dcqBvpLRWbMcf',
      },
      followers: { href: null, total: 510090 },
      genres: [
        'alternative hip hop',
        // 'escape room',
        'funk',
        'hip hop',
        // 'psychedelic hip hop',
      ],
      href: 'https://api.spotify.com/v1/artists/5LhTec3c7dcqBvpLRWbMcf',
      id: '5LhTec3c7dcqBvpLRWbMcf',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab6761610000e5ebc68a069a1c70eca57b2828d2',
          width: 640,
        },
        {
          height: 320,
          url: 'https://i.scdn.co/image/ab67616100005174c68a069a1c70eca57b2828d2',
          width: 320,
        },
        {
          height: 160,
          url: 'https://i.scdn.co/image/ab6761610000f178c68a069a1c70eca57b2828d2',
          width: 160,
        },
      ],
      name: 'Madlib',
      popularity: 61,
      type: 'artist',
      uri: 'spotify:artist:5LhTec3c7dcqBvpLRWbMcf',
      image: {
        base64:
          'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAMDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAdEAABBAMBAQAAAAAAAAAAAAACAAEEBgMFEhEx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAaEQACAgMAAAAAAAAAAAAAAAAAAgERAyEx/9oADAMBAAIRAxEAPwCVG32Pe1+Ls5m6ljIkueQxxMAiz9l8bl/GRESUW+EXI1Rs/9k=',
        img: {
          src: 'https://i.scdn.co/image/4dd30d4be1752b29e1ad6ad61f3bf5ba4a8edcdd',
          width: 560,
          height: 700,
          type: 'jpg',
        },
        slug: 'httpsiscdncoimage4dd30d4be1752b29e1ad6ad61f3bf5ba4a8edcdd',
        url: 'https://i.scdn.co/image/4dd30d4be1752b29e1ad6ad61f3bf5ba4a8edcdd',
      },
    },
  ],
  total: 50,
  limit: 1,
  offset: 0,
  previous: null,
  href: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term',
  next: 'https://api.spotify.com/v1/me/top/artists?limit=20&offset=20&time_range=short_term',
}
const track = {
  timestamp: 1639954978415,
  context: null,
  progress_ms: 4886,
  item: {
    disc_number: 1,
    duration_ms: 183826,
    explicit: true,
    external_ids: { isrc: 'QMRSZ2000720' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/5taqLrLouA4vCjM7ZQpEtW',
    },
    href: 'https://api.spotify.com/v1/tracks/5taqLrLouA4vCjM7ZQpEtW',
    id: '5taqLrLouA4vCjM7ZQpEtW',
    is_local: false,
    name: 'ooh la la (feat. Greg Nice & DJ Premier)',
    popularity: 61,
    preview_url:
      'https://p.scdn.co/mp3-preview/36bac1451c5cd0eabb8981b8bd9337cc43335efc?cid=75960520d55a48618ff076a11d8d9d10',
    track_number: 2,
    type: 'track',
    uri: 'spotify:track:5taqLrLouA4vCjM7ZQpEtW',
    album: {
      album_type: 'album',
      external_urls: {
        spotify: 'https://open.spotify.com/album/6cx4GVNs03Pu4ZczRnWiLd',
      },
      href: 'https://api.spotify.com/v1/albums/6cx4GVNs03Pu4ZczRnWiLd',
      id: '6cx4GVNs03Pu4ZczRnWiLd',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273bed9d43f754cc05ae29c2c85',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02bed9d43f754cc05ae29c2c85',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851bed9d43f754cc05ae29c2c85',
          width: 64,
        },
      ],
      name: 'RTJ4',
      release_date: '2020-06-03',
      release_date_precision: 'day',
      total_tracks: 11,
      type: 'album',
      uri: 'spotify:album:6cx4GVNs03Pu4ZczRnWiLd',
      image: {
        base64:
          'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAcEAEAAgIDAQAAAAAAAAAAAAABAAIGEgMFEXH/xAAVAQEBAAAAAAAAAAAAAAAAAAAFBv/EABcRAQEBAQAAAAAAAAAAAAAAAAEAEjH/2gAMAwEAAhEDEQA/ALC+AGvEOVZW60D17AV+rWIiILXGk43/2Q==',
        img: {
          src: 'https://i.scdn.co/image/ab67616d0000b273bed9d43f754cc05ae29c2c85',
          width: 640,
          height: 640,
          type: 'jpg',
        },
        slug: 'httpsiscdncoimageab67616d0000b273bed9d43f754cc05ae29c2c85',
        url: 'https://i.scdn.co/image/ab67616d0000b273bed9d43f754cc05ae29c2c85',
      },
    },
    artist: 'Run The Jewels, Greg Nice, DJ Premier',
    genres: [
      // 'escape room',
      'hip hop',
      'political hip hop',
      // 'alternative hip hop',
      'east coast hip hop',
      // 'hardcore hip hop',
      // 'hip hop',
      // 'jazz boom bap',
      // 'turntablism',
    ],
  },
  currently_playing_type: 'track',
  actions: { disallows: { resuming: true, skipping_prev: true } },
  is_playing: true,
}

const wrapped2020 = {
  artist,
  track,
}

export default wrapped2020
