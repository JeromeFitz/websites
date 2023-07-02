const artist = {
  items: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/0IVcLMMbm05VIjnzPkGCyp',
      },
      followers: {
        href: null,
        total: 514870,
      },
      genres: ['alternative hip hop', 'detroit hip hop', 'hip hop'],
      href: 'https://api.spotify.com/v1/artists/0IVcLMMbm05VIjnzPkGCyp',
      id: '0IVcLMMbm05VIjnzPkGCyp',
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
      name: 'J Dilla',
      popularity: 62,
      type: 'artist',
      uri: 'spotify:artist:0IVcLMMbm05VIjnzPkGCyp',
      image: {
        base64:
          'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAeEAABAwUBAQAAAAAAAAAAAAABAAIDBAUGBxIhEf/EABUBAQEAAAAAAAAAAAAAAAAAAAID/8QAGBEBAQADAAAAAAAAAAAAAAAAAQACETH/2gAMAwEAAhEDEQA/AIbZmy8hs2bXKjgkp5omObyZ4y5wHIAH0EeeIiIva+JsL//Z',
        img: {
          src: 'https://i.scdn.co/image/ab6761610000e5ebc68a069a1c70eca57b2828d2',
          width: 630,
          height: 640,
          type: 'jpg',
        },
        slug: 'httpsiscdncoimageab6761610000e5ebc68a069a1c70eca57b2828d2',
        url: 'https://i.scdn.co/image/ab6761610000e5ebc68a069a1c70eca57b2828d2',
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
  timestamp: 1641787358494,
  context: null,
  progress_ms: 18778,
  item: {
    disc_number: 1,
    duration_ms: 218466,
    explicit: false,
    external_ids: { isrc: 'USA2P2038330' },
    external_urls: {
      spotify: 'https://open.spotify.com/track/026pfPaB52WIGawu0PzN5j',
    },
    href: 'https://api.spotify.com/v1/tracks/026pfPaB52WIGawu0PzN5j',
    id: '026pfPaB52WIGawu0PzN5j',
    is_local: false,
    name: 'Road Of The Lonely Ones',
    popularity: 59,
    preview_url:
      'https://p.scdn.co/mp3-preview/7ffccb4702c94aa568257f0a2ed03909cf4fcbfe?cid=75960520d55a48618ff076a11d8d9d10',
    track_number: 4,
    type: 'track',
    uri: 'spotify:track:026pfPaB52WIGawu0PzN5j',
    album: {
      album_type: 'album',
      external_urls: {
        spotify: 'https://open.spotify.com/album/5ftKZ7X2vjjJ1HFQYQn1UF',
      },
      href: 'https://api.spotify.com/v1/albums/5ftKZ7X2vjjJ1HFQYQn1UF',
      id: '5ftKZ7X2vjjJ1HFQYQn1UF',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab67616d0000b273e29fab5766887dfc51422d34',
          width: 640,
        },
        {
          height: 300,
          url: 'https://i.scdn.co/image/ab67616d00001e02e29fab5766887dfc51422d34',
          width: 300,
        },
        {
          height: 64,
          url: 'https://i.scdn.co/image/ab67616d00004851e29fab5766887dfc51422d34',
          width: 64,
        },
      ],
      name: 'Sound Ancestors',
      release_date: '2021-01-29',
      release_date_precision: 'day',
      total_tracks: 16,
      type: 'album',
      uri: 'spotify:album:5ftKZ7X2vjjJ1HFQYQn1UF',
      image: {
        base64:
          'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAEAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAgEAABAwMFAQAAAAAAAAAAAAACAAMEAQURBhITISIx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AIpru/3By6xYxPnwQYbMSOG4sNtCPkad/KZqiIg//9k=',
        img: {
          src: 'https://i.scdn.co/image/ab67616d0000b273e29fab5766887dfc51422d34',
          width: 640,
          height: 640,
          type: 'jpg',
        },
        slug: 'httpsiscdncoimageab67616d0000b273e29fab5766887dfc51422d34',
        url: 'https://i.scdn.co/image/ab67616d0000b273e29fab5766887dfc51422d34',
      },
    },
    artist: 'Madlib',
    genres: ['alternative hip hop', 'hip hop', 'psychedelic hip hop'],
  },
  currently_playing_type: 'track',
  actions: { disallows: { resuming: true } },
  is_playing: true,
}

const wrapped2021 = {
  artist,
  track,
}

export default wrapped2021
