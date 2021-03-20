const website = 'jerandky'
const nt_website = `.nt__${website}__`
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
    indexId: '27789ca1-49e8-4490-bb29-5a3fdec0ec77',
    // @note UUID
    collectionId: 'b3a25942-2cb0-4b5b-8880-ecaa4c2cf06d',
    // @note UUID
    collectionViewId: 'a8cbcf35-8978-4f45-9a5c-8d315927edfd',
    // @note UUID
    collectionViewId__published: '8d65d6be-24d1-49e5-9edf-c8b65e742dbc',
    // @note UUID
    collectionViewId__slug: '7bd7657e-f7a0-4685-a576-4472f87b9004',
    // @note UUID
    collectionViewId__dateExactMonth: '838b84c1-a319-4d2e-a4f0-ebf0f6ef73b7',
    // @note UUID
    collectionViewId__dateExactDate: '7271247e-02bf-409d-82f6-653b87c1f28d',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Headline',
      'Overline',
      'Subline',
      'Tags',
    ],
    cache: `${nt_website}blog`,
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
    indexId: 'f09fac69-3045-46cc-9209-44b13665bada',
    // @note UUID
    collectionId: 'cd6f2e2f-3e1d-482b-9891-530501f1c797',
    // @note UUID
    collectionViewId: 'c71ef2fa-02ce-4dfe-8442-4d66b6439e1a',
    // @note UUID
    collectionViewId__published: '8e3ee1e1-bb50-489b-9b2f-24b5493080ad',
    // @note UUID
    collectionViewId__slug: '29b6acc9-24e4-46f1-996f-94c0a38fac13',
    // @note UUID
    collectionViewId__podcast: 'c97aac1e-166e-4657-8cf2-8712f280505d',
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
    cache: `${nt_website}episodes`,
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
    indexId: '23e3954d-c714-4279-9f81-a8a51c9087ba',
    // @note UUID
    collectionId: '389b9609-716c-4b20-a9fd-0b254b2c93be',
    // @note UUID
    collectionViewId: '705f9e36-09de-4a26-b87f-b2ccb7a4b93a',
    // @note UUID
    collectionViewId__published: 'b3aa844a-7391-4f9b-8918-087c694c3958',
    // @note UUID
    collectionViewId__upcomingEvents: '2b71c9b9-28d4-4fef-a3c6-49d37b4828ae',
    // @note UUID
    collectionViewId__dateExactMonth: 'ee19f1d1-89d0-4275-93e3-cbdde1d57add',
    // @note UUID
    collectionViewId__dateExactDate: '7f20315e-a623-4077-9ed7-4a5521eac3da',
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
    cache: `${nt_website}events`,
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
    indexId: '96432799-6f4c-46e2-a618-d0d0eb2a79f2',
    // @note UUID
    collectionId: '55070552-3c47-490f-80c5-06b954f618aa',
    // @note UUID
    collectionViewId: 'f684c626-7d46-4174-8365-69d7b4bf9fa7',
    // @note UUID
    collectionViewId__published: '2f1e4f10-2308-4c4c-ad41-f2699c4f6e28',
    // @note UUID
    collectionViewId__slug: 'd04dbafb-e388-44cd-b850-8b9e46df41ca',
    seoId: null,
    schema: [
      ...baseSchema,
      // @note Customizations Below
      'Tags',
    ],
    cache: `${nt_website}pages`,
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  people: {
    id: 'people',
    // @note UUID
    indexId: '6cedcf32-de09-4e81-a658-1aea384821e5',
    // @note UUID
    collectionId: '027db15c-52da-457e-a5c5-21c3a38c1154',
    // @note UUID
    collectionViewId: '37c89c97-28d2-4f8e-9225-4a1fad9c0d4a',
    // @note UUID
    collectionViewId__published: '2f9d4cf7-6ad5-4e16-b162-a29f611fcb2b',
    // @note UUID
    collectionViewId__slug: 'f5e1ba7b-d7c3-49ff-b8e6-1bba73b89318',
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
    cache: `${nt_website}people`,
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  podcasts: {
    id: 'podcasts',
    // @note UUID
    indexId: 'daed70c1-43b2-4177-986b-fe874d346b4e',
    // @note UUID
    collectionId: '56803e86-dc05-40f1-b610-dfdd6d8f74b2',
    // @note UUID
    collectionViewId: 'a3628c46-4e76-4bd0-aa9b-b98cb6edd872',
    // @note UUID
    collectionViewId__published: '705b0c25-880a-4bae-8368-1f17ea8b2ed0',
    // @note UUID
    collectionViewId__slug: 'd74fee35-0e29-48eb-a707-f1c5edddfaf4',
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
    cache: `${nt_website}podcasts`,
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  seo: {
    id: 'seo',
    // @note UUID
    indexId: '07dd136e-92cd-49a3-a99d-f409ac3ca87b',
    // @note UUID
    collectionId: 'd6f24c5e-94a3-48af-9dc9-72b3165748a3',
    // @note UUID
    collectionViewId: '1ec81875-5fa8-4204-8973-8da98c2e9656',
    // @note UUID
    collectionViewId__published: '91230f8f-fc20-4e7a-8d7c-fefa25594da9',
    // @note UUID
    collectionViewId__slug: 'af3db7ce-8236-43c2-b331-75d97364a1cf',
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
    cache: `${nt_website}routetypes`,
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  shows: {
    id: 'shows',
    // @note UUID
    indexId: '552ca1a6-4729-4950-9cd4-cebbec996b91',
    // @note UUID
    collectionId: '6eab1927-66b6-471b-9228-5a652c02d798',
    // @note UUID
    collectionViewId: '78906856-1a5d-4744-94f6-06139c5e34c6',
    // @note UUID
    collectionViewId__published: '678afbe3-9016-43f6-98aa-a2bbdf65296f',
    // @note UUID
    collectionViewId__slug: 'bd22431b-7049-4b87-a0c7-71882b27fddc',
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
    cache: `${nt_website}shows`,
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  users: {
    id: 'users',
    // @note UUID
    indexId: '4579aa0d-1ce2-4175-93d7-5e513f60e82c',
    // @note UUID
    collectionId: 'e9346340-ce60-42df-b3e9-730f163628b5',
    // @note UUID
    collectionViewId: '607fa2a0-0157-41d4-beb4-7c616e8e4d35',
    // @note UUID
    collectionViewId__published: '8c83f3c9-1d53-47de-ae28-abf80a8b6a0c',
    // @note UUID
    collectionViewId__slug: 'ef1234f5-7c6e-49ed-b13c-95bdc551530a',
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
    cache: `${nt_website}users`,
    collectionViews: [
      'collectionViewId',
      'collectionViewId__published',
      'collectionViewId__slug',
    ],
  },
  venues: {
    id: 'venues',
    // @note UUID
    indexId: 'e7bac7a0-e489-4e97-a242-c9934f645621',
    // @note UUID
    collectionId: '9f94283b-95be-41a8-a05d-f435f5150a11',
    // @note UUID
    collectionViewId: 'bf08db17-a3e7-4f6c-afbd-b36a9e0c3a86',
    // @note UUID
    collectionViewId__published: 'd16b315b-0258-42e2-9284-9408151d5154',
    // @note UUID
    collectionViewId__slug: '84ce45cf-5ffa-465d-aa21-a8639d363062',
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
    cache: `${nt_website}venues`,
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
