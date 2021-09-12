import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const PROPERTIES = {
  address: {
    city: 'Address.City',
    lat: 'Address.GeoLat',
    lng: 'Address.GeoLng',
    neighborhood: 'Address.Neighborhood',
    state: 'Address.State',
    street: 'Address.Street',
    zipCode: 'Address.PostalCode',
  },
  categories: 'Category',
  date: 'Date',
  datePublished: 'Date.Published',
  dateRecorded: 'Date.Recorded',
  duration: 'Duration',
  email: 'Email',
  episode: 'Episode',
  episodes: 'EpisodeIDs',
  episodesPeopleGuest: 'Episodes.People.Guest',
  episodesPeopleSoundEngineer: 'Episodes.People.SoundEngineer',
  episodesPeopleThanks: 'Episodes.People.Thanks',
  episodesVenues: 'Episodes.Venues.RecordAt',
  events: 'EventIDs',
  explicit: 'Explicit',
  festivals: 'Festival',
  food: 'Food',
  mp3: 'MP3',
  name: {
    first: 'Name.First',
    last: 'Name.Last',
    preferred: 'Name.Preferred',
  },
  noIndex: 'NoIndex',
  peopleCast: 'People.Cast',
  peopleCastPast: 'People.CastPast',
  peopleCrew: 'People.Crew',
  peopleCrewPast: 'People.CrewPast',
  peopleDirector: 'People.Director',
  peopleDirectorMusical: 'People.DirectorMusical',
  peopleDirectorTechnical: 'People.DirectorTechnical',
  peopleGuest: 'People.Guest',
  peopleHost: 'People.Host',
  peopleProducer: 'People.Producer',
  peopleMusic: 'People.Music',
  peopleSoundEngineer: 'People.SoundEngineer',
  peopleThanks: 'People.Thanks',
  peopleWriter: 'People.Writer',
  phoneNumber: 'Phone',
  podcastAuthor: 'Author',
  podcastAuthorEmail: 'Author.Email',
  podcasts: 'PodcastIDs',
  podcastsPeopleHost: 'Podcasts.People.Host',
  published: 'Published',
  season: 'Season',
  seoDescription: 'SEO.Description',
  seoImage: 'SEO.Image',
  seoImageDescription: 'SEO.Image.Description',
  shows: 'ShowIDs',
  showsPeopleCast: 'Shows.People.Cast',
  showsPeopleCastPast: 'Shows.People.CastPast',
  showsPeopleCrew: 'Shows.People.Crew',
  showsPeopleDirector: 'Shows.People.Director',
  showsPeopleDirectorMusical: 'Shows.People.DirectorMusical',
  showsPeopleDirectorTechnical: 'Shows.People.DirectorTechnical',
  // showsPeopleMusic: 'Shows.People.Music',
  showsPeopleProducer: 'Shows.People.Producer',
  showsPeopleThanks: 'Shows.People.Thanks',
  showsPeopleWriter: 'Shows.People.Writer',
  slug: 'Slug',
  social: {
    facebook: 'Social.Facebook',
    instagram: 'Social.Instagram',
    twitter: 'Social.Twitter',
  },
  tags: 'Tags',
  ticketUrl: 'TicketUrl',
  title: 'Title',
  type: 'Type',
  venues: 'VenueIDs',
  venuesRecordedAt: 'Venues.RecordedAt',
}

const dateTimestamp = new Date().toISOString()
// const dateTimestampBlog = new Date('2020-01-01').toISOString()

const QUERIES = {
  dateBefore: {
    property: PROPERTIES.date,
    date: {
      before: dateTimestamp,
    },
  },
  dateOnOrAfter: {
    property: PROPERTIES.date,
    date: {
      on_or_after: dateTimestamp,
    },
  },
  published: {
    property: PROPERTIES.published,
    checkbox: {
      equals: false,
    },
  },
  slug: {
    property: PROPERTIES.slug,
    text: {
      equals: '',
    },
  },
}

const TYPES = {
  blog: 'blog',
  episodes: 'episodes',
  events: 'events',
  pages: 'pages',
  people: 'people',
  podcasts: 'podcasts',
  seo: 'seo',
  shows: 'shows',
  users: 'users',
  venues: 'venues',
}

const DATABASES = {
  blog: 'baee64b0-8851-4522-8afb-e15a9ea5a910',
  episodes: 'd67380f6-8492-4fb5-9b1d-b4ed8880155b',
  events: '781c7375-e20e-487f-a5d9-6e565f7a2d07',
  pages: '3e9add0f-399c-4ae5-a48f-fb13f23e6992',
  people: '13540a89-ef44-4aec-85ba-1bc05e9a7123',
  podcasts: '22e65a94-72eb-4fc0-abe2-b1f9da3e3433',
  seo: '810db8a2-71b6-4087-b61c-212bc81dbabe',
  shows: '2a8cf797-1eae-4dc4-991f-b6b5ac981f51',
  users: 'ddfc7897-eb59-442e-a64e-578d8ae8bee9',
  venues: '8b3f4ae6-ecf7-48ad-8ae9-8b69528e2110',
}

const SEO = {
  blog: 'd9a4d872-1274-4657-a5b0-ca3a085e4b9e',
  episodes: '',
  events: '7bc401a6-5f36-409a-8e33-dcd05653d73c',
  pages: '',
  people: 'a94187ce-498c-4beb-88b2-78d56097d9f6',
  podcasts: '535c2582-ac66-4a6f-8216-6df092d4fbc2',
  seo: '',
  shows: '9e13be55-72c0-4964-b32e-f0ada3c9a082',
  users: '41500e18-d97d-406d-8ca5-42cece7dafb5',
  venues: 'd79444f6-8158-4bae-9b75-285e0b5f85b2',
}

export { notion, DATABASES, PROPERTIES, QUERIES, SEO, TYPES }
