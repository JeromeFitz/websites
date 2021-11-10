import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const PROPERTIES = {
  addressCity: 'Address.City',
  addressLatitude: 'Address.GeoLat',
  addressLongitude: 'Address.GeoLng',
  addressNeighborhood: 'Address.Neighborhood',
  addressState: 'Address.State',
  addressStreet: 'Address.Street',
  addressZipCode: 'Address.PostalCode',
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
  eventsLineupShowIds: 'Lineup.ShowIDs',
  explicit: 'Explicit',
  festivals: 'Festival',
  food: 'Food',
  mp3: 'MP3',
  name: 'Name',
  nameFirst: 'Name.First',
  nameLast: 'Name.Last',
  namePreferred: 'Name.Preferred',
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
  // rollupLineupTitle: 'Rollup.Lineup.Titles',
  rollupCast: 'Rollup.Cast',
  rollupCastPast: 'Rollup.CastPast',
  rollupCrew: 'Rollup.Crew',
  rollupDirector: 'Rollup.Director',
  rollupDirectorMusical: 'Rollup.DirectorMusical',
  rollupDirectorTechnical: 'Rollup.DirectorTechnical',
  rollupGuest: 'Rollup.Guest',
  rollupHost: 'Rollup.Host',
  rollupLineup: 'Rollup.Lineup',
  rollupMusic: 'Rollup.Music',
  rollupProducer: 'Rollup.Producer',
  rollupShow: 'Rollup.Show',
  rollupSoundEngineer: 'Rollup.SoundEngineer',
  rollupTags: 'Rollup.Tags',
  rollupTagsSecondary: 'Rollup.Tags.Secondary',
  rollupThanks: 'Rollup.Thanks',
  rollupVenue: 'Rollup.Venue',
  rollupWriter: 'Rollup.Writer',
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
  showsPeopleMusic: 'Shows.People.Music',
  showsPeopleProducer: 'Shows.People.Producer',
  showsPeopleThanks: 'Shows.People.Thanks',
  showsPeopleWriter: 'Shows.People.Writer',
  showsTags: 'Rollup.Shows.Tags',
  slug: 'Slug',
  socialFacebook: 'Social.Facebook',
  socialInstagram: 'Social.Instagram',
  socialTwitter: 'Social.Twitter',
  spotifyShow: 'Spotify.Show',
  tags: 'Tags',
  tailwindColorBackground: 'Tailwind.Color.Background',
  ticketUrl: 'TicketUrl',
  title: 'Title',
  type: 'Type',
  venues: 'VenueIDs',
  venuesSlugs: 'Rollup.Venues.Slug',
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

const ROUTE_TYPES = {
  blog: 'blog',
  episodes: 'episodes',
  events: 'events',
  pages: 'pages',
  people: 'people',
  podcasts: 'podcasts',
  seo: 'seo',
  shows: 'shows',
  tags: 'tags',
  users: 'users',
  venues: 'venues',
}

const SLUG__HOMEPAGE = 'homepage'

// @todo(notion) uh, make this dynamic please haha
const TAGS = {
  '60dd326d-687e-4e64-a49b-46bfba218ffb': {
    id: '60dd326d-687e-4e64-a49b-46bfba218ffb',
    icon: {
      emoji: '🎭️',
    },
    slug: 'improv',
    title: 'Improv',
  },
  '9ae68a2d-44d0-44c2-8e73-81c3018bbc71': {
    id: '9ae68a2d-44d0-44c2-8e73-81c3018bbc71',
    icon: {
      emoji: '🎼️',
    },
    slug: 'music',
    title: 'Music',
  },
  'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8': {
    id: 'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8',
    icon: {
      emoji: '🧑‍🎤️',
    },
    slug: 'musical',
    title: 'Musical',
  },
  '7093497b-4869-4d2f-8803-a26f4fc871d6': {
    id: '7093497b-4869-4d2f-8803-a26f4fc871d6',
    icon: {
      emoji: '🖊️',
    },
    slug: 'sketch',
    title: 'Sketch',
  },
  '4bf09af2-078e-4101-8519-3500c2d68244': {
    id: '4bf09af2-078e-4101-8519-3500c2d68244',
    icon: {
      emoji: '🎤️',
    },
    slug: 'stand-up',
    title: 'Stand-Up',
  },
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
  tags: 'c5fc362f-b8cc-4593-a220-89c8974e9750',
  // tag:   '60dd326d-687e-4e64-a49b-46bfba218ffb'
  users: 'ddfc7897-eb59-442e-a64e-578d8ae8bee9',
  venues: '8b3f4ae6-ecf7-48ad-8ae9-8b69528e2110',
}

const SEO = {
  blog: 'd9a4d872-1274-4657-a5b0-ca3a085e4b9e',
  episodes: 'b3c98bd5-b168-46d9-b4b6-bdf01612890d',
  events: '7bc401a6-5f36-409a-8e33-dcd05653d73c',
  pages: '',
  people: 'a94187ce-498c-4beb-88b2-78d56097d9f6',
  podcasts: '535c2582-ac66-4a6f-8216-6df092d4fbc2',
  seo: '',
  shows: '9e13be55-72c0-4964-b32e-f0ada3c9a082',
  tags: '',
  users: '41500e18-d97d-406d-8ca5-42cece7dafb5',
  venues: 'd79444f6-8158-4bae-9b75-285e0b5f85b2',
}

export {
  notion,
  DATABASES,
  PROPERTIES,
  QUERIES,
  SEO,
  SLUG__HOMEPAGE,
  ROUTE_TYPES,
  TAGS,
}
