// @note Order matters for base view
const baseSchema = [
  'Slug',
  'Title',
  'NoIndex',
  'Published',
  'Date',
  'Date.Published',
  'SEO.Description',
  'SEO.Image.Description',
  'SEO.Image',
  'Authors',
]

const routeTypes = {
  blog: {
    id: 'blog',
    // @note UUID
    indexId: 'baee64b0-8851-4522-8afb-e15a9ea5a910',
    // @note UUID
    collectionId: '4c56ab0f-b5e9-47c7-ab8c-cf62ab2781e5',
    // @note UUID
    collectionViewId: 'fc3ed911-0cd6-4a6a-9816-3b88098267d2',
    // @note UUID
    collectionViewId__published: 'a4254b95-1d2d-43da-9deb-44d9aa94ffa2',
    // @note UUID
    collectionViewId__slug: 'bbafc311-a22a-4e59-a7e4-58d0a29e8571',
    // @note UUID
    collectionViewId__dateExactMonth: '78818f5b-a649-41dd-972b-fea347a25863',
    // @note UUID
    collectionViewId__dateExactDate: '7028166a-39fd-4bb6-a978-33e2ca94af5a',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Headline',
      'Overline',
      'Subline',
      'Tags',
    ],
    cache: '.nt__jeromefitzgerald__blog',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
      'collectionViewId__dateExactMonth',
      'collectionViewId__dateExactDate',
    ],
  },
  episodes: {
    id: 'episodes',
    // @note UUID
    indexId: 'd67380f6-8492-4fb5-9b1d-b4ed8880155b',
    // @note UUID
    collectionId: 'b623c83e-7663-43a5-a330-4683d2a64c54',
    // @note UUID
    collectionViewId: 'a081fabd-d29d-4931-b031-33baedbcd097',
    // @note UUID
    collectionViewId__published: '58dbe242-7443-4577-8bc2-33b4546696a2',
    // @note UUID
    collectionViewId__slug: '0e2a1efd-a228-4f3d-8799-41f66182ac25',
    // @note UUID
    collectionViewId__podcast: '76905204-c009-49bd-b870-0fc30fc81528',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Date.Recorded',
      'Duration',
      'Episode',
      'Explicit',
      'Headline',
      'MP3',
      'Overline',
      'People.Guest',
      'People.SoundEngineer',
      'People.Thanks',
      'PodcastIDs',
      'Season',
      'Subline',
      'Tags',
      'Type',
      'Venues.RecordedAt',
    ],
    cache: '.nt__jeromefitzgerald__episodes',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
      'collectionViewId__podcast',
    ],
  },
  events: {
    id: 'events',
    // @note UUID
    indexId: '781c7375-e20e-487f-a5d9-6e565f7a2d07',
    // @note UUID
    collectionId: '77b2f1db-6f12-4b69-b950-1de238f21fe1',
    // @note UUID
    collectionViewId: 'd571880e-035b-4155-ba7c-42eaaad94885',
    // @note UUID
    collectionViewId__published: '6cb05be0-9a3d-4608-9e79-127566d16516',
    // @note UUID
    collectionViewId__upcomingEvents: '5353d4b7-9b39-44ed-bd97-eac3064f177a',
    // @note UUID
    collectionViewId__dateExactMonth: '8b654975-03b7-4411-a3b1-227e17494d76',
    // @note UUID
    collectionViewId__dateExactDate: '15649a8b-1dd5-4a70-b9b6-3f954c5ff5e1',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Headline',
      'Overline',
      'ShowIDs',
      'Social.Facebook',
      'Subline',
      'Tags',
      'TicketUrl',
      'VenueIDs',
    ],
    cache: '.nt__jeromefitzgerald__events',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__dateExactMonth',
      'collectionViewId__dateExactDate',
    ],
  },
  pages: {
    id: 'pages',
    // @note UUID
    indexId: '3e9add0f-399c-4ae5-a48f-fb13f23e6992',
    // @note UUID
    collectionId: '452fc905-23a9-4b8f-b435-668e157dcf5c',
    // @note UUID
    collectionViewId: '49e95628-a338-4f12-bb5c-90ed7a7123f1',
    // @note UUID
    collectionViewId__published: '104e6f1e-fe2f-4a6f-aa9a-f73de2fcd188',
    // @note UUID
    collectionViewId__slug: '854f6e66-7398-434d-8046-a9e43d5a2c5f',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Tags',
    ],
    cache: '.nt__jeromefitzgerald__pages',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  people: {
    id: 'people',
    // @note UUID
    indexId: '13540a89-ef44-4aec-85ba-1bc05e9a7123',
    // @note UUID
    collectionId: '88e780a4-10ea-4aba-8534-0ed47651f654',
    // @note UUID
    collectionViewId: '176b9048-eeb6-48b5-b4ee-83ca883f00f8',
    // @note UUID
    collectionViewId__published: 'ec61d234-ddec-4370-bb44-00d9ddcac445',
    // @note UUID
    collectionViewId__slug: 'fbd7df6c-8185-4c90-b730-2176402acf71',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Headline',
      'Overline',
      'Episodes.People.Guest',
      'Episodes.People.SoundEngineer',
      'Episodes.People.Thanks',
      'Podcasts.People.Host',
      'Shows.People.Cast',
      'Shows.People.CastPast',
      'Shows.People.Crew',
      'Shows.People.Director',
      'Shows.People.DirectorMusical',
      'Shows.People.DirectorTechnical',
      'Shows.People.Producer',
      'Shows.People.Writer',
      'Subline',
      'Tags',
    ],
    cache: '.nt__jeromefitzgerald__people',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  podcasts: {
    id: 'podcasts',
    // @note UUID
    indexId: '22e65a94-72eb-4fc0-abe2-b1f9da3e3433',
    // @note UUID
    collectionId: '13abc318-feac-421a-a70b-476b7f69d75a',
    // @note UUID
    collectionViewId: '8b6fbfae-e639-447e-b787-148565e8f605',
    // @note UUID
    collectionViewId__published: '23518337-ed41-4153-b0a5-449e88262455',
    // @note UUID
    collectionViewId__slug: '53c0b60b-6ac6-4a7d-88d4-5a3764db01ba',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Author.Email',
      'Author',
      'Category',
      'EpisodeIDs',
      'Explicit',
      'Headline',
      'Overline',
      'People.Host',
      'Subline',
      'Subtitle',
      'Tags',
      'Type',
    ],
    cache: '.nt__jeromefitzgerald__podcasts',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  seo: {
    id: 'seo',
    // @note UUID
    indexId: '810db8a2-71b6-4087-b61c-212bc81dbabe',
    // @note UUID
    collectionId: '0591a137-f18b-4b18-92d0-6a97a5bde87d',
    // @note UUID
    collectionViewId: '30ddea77-19dc-46aa-b717-091ce7710ac9',
    // @note UUID
    collectionViewId__published: 'bac6dbff-5d62-4598-a2a2-2b03ac0b0ee4',
    // @note UUID
    collectionViewId__slug: '95af9077-d26c-4639-82d3-fe21ee3fa16c',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Headline',
      'NoIndex',
      'Overline',
      // 'PageIDs',
      'Subline',
      'Tags',
    ],
    cache: '.nt__jeromefitzgerald__routetypes',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  shows: {
    id: 'shows',
    // @note UUID
    indexId: '2a8cf797-1eae-4dc4-991f-b6b5ac981f51',
    // @note UUID
    collectionId: 'ece62f5c-a24f-460e-849f-49584f6e6bed',
    // @note UUID
    collectionViewId: '2d64ba6f-a3b0-4308-a9cf-20ae304a3cfc',
    // @note UUID
    collectionViewId__published: '198a11ed-e87f-4712-bfda-bc50f685f23d',
    // @note UUID
    collectionViewId__slug: 'e310f190-7c0c-44f4-bc4c-9822e20c5253',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'EventIDs',
      'Festival',
      'Headline',
      'Overline',
      'People.Cast',
      'People.CastPast',
      'People.Crew',
      'People.Director',
      'People.DirectorMusical',
      'People.DirectorTechnical',
      'People.Producer',
      'People.Thanks',
      'People.Writer',
      'Social.Facebook',
      'Social.Instagram',
      'Social.Twitter',
      'Subline',
      'Tags',
    ],
    cache: '.nt__jeromefitzgerald__shows',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  users: {
    id: 'users',
    // @note UUID
    indexId: 'ddfc7897-eb59-442e-a64e-578d8ae8bee9',
    // @note UUID
    collectionId: '37f2072e-1120-4be7-905c-25c587c0b797',
    // @note UUID
    collectionViewId: 'd456113a-7a13-461e-b5f6-40fdada47c4e',
    // @note UUID
    collectionViewId__published: '10704d99-d3a0-42a9-8ca0-b0e2abb4650c',
    // @note UUID
    collectionViewId__slug: 'b263d4c5-c897-46dd-b042-dcfe1cf9d641',
    seoId: null,
    schema: [
      // @todo This is an outlier in regard to baseSchema :X
      ...baseSchema,
      // @note Customizations Below
      'Email',
      'Food',
      'Name.First',
      'Name.Last',
      'Name.Preferred',
    ],
    cache: '.nt__jeromefitzgerald__users',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  venues: {
    id: 'venues',
    // @note UUID
    indexId: '8b3f4ae6-ecf7-48ad-8ae9-8b69528e2110',
    // @note UUID
    collectionId: '14d06967-0774-415a-9429-e7284b3badff',
    // @note UUID
    collectionViewId: 'af142cac-5b5e-4dfe-a1cd-41f0d3db445c',
    // @note UUID
    collectionViewId__published: '9f1bd4da-fb3e-460d-864a-8fad3af21fbc',
    // @note UUID
    collectionViewId__slug: 'ed87e1b6-4450-4150-a7f0-c6568a30ef92',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Address.City',
      'Address.GeoLat',
      'Address.GeoLng',
      'Address.Neighborhood',
      'Address.PostalCode',
      'Address.State',
      'Address.Street',
      'Episodes.Venues.RecordAt',
      'EventIDs',
      'Headline',
      'Overline',
      'Phone',
      'Slug',
      'Social.Facebook',
      'Social.Instagram',
      'Social.Twitter',
      'Subline',
      'Tags',
      'Website',
    ],
    cache: '.nt__jeromefitzgerald__venues',
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
}

// console.dir(`---`)
// console.dir(routeTypes)
// console.dir(`---`)

export default routeTypes
