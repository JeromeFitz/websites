interface Relation {
  database_id: string
  synced_property_name: string
  synced_property_id?: string
}

interface Rollup {
  relation_property_id?: string
  relation_property_name?: string
  rollup_property_id?: string
  rollup_property_name?: string
  function:
    | 'average'
    | 'count_all'
    | 'count_empty'
    | 'count_not_empty'
    | 'count_unique_values'
    | 'count_values'
    | 'max'
    | 'median'
    | 'min'
    | 'percent_empty'
    | 'percent_not_empty'
    | 'range'
    | 'show_original'
    | 'sum'
}

interface Property {
  key: string
  notion: string
  format?:
    | 'baht'
    | 'canadian_dollar'
    | 'chilean_peso'
    | 'colombian_peso'
    | 'danish_krone'
    | 'dirham'
    | 'dollar'
    | 'euro'
    | 'forint'
    | 'franc'
    | 'hong_kong_dollar'
    | 'koruna'
    | 'krona'
    | 'leu'
    | 'lira'
    | 'mexican_peso'
    | 'new_taiwan_dollar'
    | 'new_zealand_dollar'
    | 'norwegian_krone'
    | 'number_with_commas'
    | 'number'
    | 'percent'
    | 'philippine_peso'
    | 'pound'
    | 'rand'
    | 'real'
    | 'ringgit'
    | 'riyal'
    | 'ruble'
    | 'rupee'
    | 'rupiah'
    | 'shekel'
    | 'won'
    | 'yen'
    | 'yuan'
    | 'zloty'
  relation?: Relation
  rollup?: Rollup
  type:
    | 'checkbox'
    | 'created_by'
    | 'created_time'
    | 'date'
    | 'email'
    | 'files'
    | 'formula'
    | 'last_edited_by'
    | 'last_edited_time'
    | 'multi_select'
    | 'number'
    | 'people'
    | 'phone_number'
    | 'relation'
    | 'rich_text'
    | 'rollup'
    | 'select'
    | 'title'
    | 'url'
}

const properties: Record<string, Property> = {
  addressCity: {
    key: 'addressCity',
    notion: 'Address.City',
    type: 'rich_text',
  },
  addressLatitude: {
    key: 'addressLatitude',
    notion: 'Address.Latitude',
    type: 'number',
    format: 'number',
  },
  addressLongitude: {
    key: 'addressLongitude',
    notion: 'Address.Longitude',
    type: 'number',
    format: 'number',
  },
  addressNeighborhood: {
    key: 'addressNeighborhood',
    notion: 'Address.Neighborhood',
    type: 'rich_text',
  },
  addressState: {
    key: 'addressState',
    notion: 'Address.State',
    type: 'select',
  },
  addressStreet: {
    key: 'addressStreet',
    notion: 'Address.Street',
    type: 'rich_text',
  },
  addressZipCode: {
    key: 'addressZipCode',
    notion: 'Address.ZipCode',
    type: 'number',
    format: 'number',
  },
  authors: {
    key: 'authors',
    notion: 'Authors',
    type: 'people',
  },
  categories: {
    key: 'categories',
    notion: 'Categories',
    type: 'multi_select',
  },
  date: {
    key: 'date',
    notion: 'Date',
    type: 'date',
  },
  datePublished: {
    key: 'datePublished',
    notion: 'Date.Published',
    type: 'date',
  },
  dateRecorded: {
    key: 'dateRecorded',
    notion: 'Date.Recorded',
    type: 'date',
  },
  dateStart: {
    key: 'dateStart',
    notion: 'Date.Start',
    type: 'date',
  },
  dateEnd: {
    key: 'dateEnd',
    notion: 'Date.End',
    type: 'date',
  },
  duration: {
    key: 'duration',
    notion: 'Duration',
    type: 'number',
    format: 'number',
  },
  email: {
    key: 'email',
    notion: 'Email',
    type: 'rich_text',
  },
  episode: {
    key: 'episode',
    notion: 'Episode',
    type: 'number',
    format: 'number',
  },
  explicit: {
    key: 'explicit',
    notion: 'Explicit',
    type: 'checkbox',
  },
  festivals: {
    key: 'festivals',
    notion: 'Festival',
    type: 'multi_select',
  },
  food: {
    key: 'food',
    notion: 'Food',
    type: 'rich_text',
  },
  mp3: {
    key: 'mp3',
    notion: 'MP3',
    type: 'files',
  },
  name: {
    key: 'name',
    notion: 'Name',
    type: 'rich_text',
  },
  nameFirst: {
    key: 'nameFirst',
    notion: 'Name.First',
    type: 'rich_text',
  },
  nameLast: {
    key: 'nameLast',
    notion: 'Name.Last',
    type: 'rich_text',
  },
  namePreferred: {
    key: 'namePreferred',
    notion: 'Name.Preferred',
    type: 'rich_text',
  },
  noSeo: {
    key: 'noSeo',
    notion: 'NoSEO',
    type: 'checkbox',
  },
  phoneNumber: {
    key: 'phoneNumber',
    notion: 'Phone',
    type: 'rich_text',
  },
  podcastAuthor: {
    key: 'podcastAuthor',
    notion: 'Author',
    type: 'rich_text',
  },
  podcastAuthorEmail: {
    key: 'podcastAuthorEmail',
    notion: 'Author.Email',
    type: 'rich_text',
  },
  published: {
    key: 'published',
    notion: 'Published',
    type: 'checkbox',
  },
  relationEpisodes__Podcast: {
    key: 'relationEpisodes__Podcast',
    notion: 'Relation.Podcasts',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'Relation.Episodes',
    },
  },
  relationPodcasts__Episodes: {
    key: 'relationPodcasts__Episodes',
    notion: 'Relation.Episodes',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Relation.Podcasts',
    },
  },
  relationEpisodes__People_Guest: {
    key: 'relationEpisodes__People_Guest',
    notion: 'Relation.People.Guest',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Episodes.Guest',
    },
  },
  relationPeople__Episodes_Guest: {
    key: 'relationPeople__Episodes_Guest',
    notion: 'Relation.Episodes.Guest',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Relation.People.Guest',
    },
  },
  relationEpisodes__People_SoundEngineer: {
    key: 'relationEpisodes__People_SoundEngineer',
    notion: 'Relation.People.SoundEngineer',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Episodes.SoundEngineer',
    },
  },
  relationPeople__Episodes_SoundEngineer: {
    key: 'relationPeople__Episodes_SoundEngineer',
    notion: 'Relation.Episodes.SoundEngineer',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Relation.People.SoundEngineer',
    },
  },
  relationEpisodes__People_Thanks: {
    key: 'relationEpisodes__People_Thanks',
    notion: 'Relation.People.Thanks',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Episodes.Thanks',
    },
  },
  relationPeople__Episodes_Thanks: {
    key: 'relationPeople__Episodes_Thanks',
    notion: 'Relation.Episodes.Thanks',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Relation.People.Thanks',
    },
  },
  relationEpisodes__Venues: {
    key: 'relationEpisodes__Venues',
    notion: 'Relation.Venues',
    type: 'relation',
    relation: {
      database_id: 'Venues',
      synced_property_name: 'Relation.Episodes',
    },
  },
  relationVenues__Episodes: {
    key: 'relationVenues__Episodes',
    notion: 'Relation.Episodes',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Relation.Venues',
    },
  },
  relationEvents__Venues: {
    key: 'relationEvents__Venues',
    notion: 'Relation.Venues',
    type: 'relation',
    relation: {
      database_id: 'Venues',
      synced_property_name: 'Relation.Events',
    },
  },
  relationVenues__Events: {
    key: 'relationVenues__Events',
    notion: 'Relation.Events',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Relation.Venues',
    },
  },
  relationEvents__Shows: {
    key: 'relationEvents__Shows',
    notion: 'Relation.Shows',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.Events',
    },
  },
  relationShows__Events: {
    key: 'relationShows__Events',
    notion: 'Relation.Events',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Relation.Shows',
    },
  },
  relationEvents__Shows_Lineup: {
    key: 'relationEvents__Shows_Lineup',
    notion: 'Relation.Shows.Lineup',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.Events.Lineup',
    },
  },
  relationShows__Events_Lineup: {
    key: 'relationShows__Events_Lineup',
    notion: 'Relation.Events.Lineup',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Relation.Shows.Lineup',
    },
  },
  relationShows__People_Cast: {
    key: 'relationShows__People_Cast',
    notion: 'Relation.People.Cast',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.Cast',
    },
  },
  relationPeople__Shows_Cast: {
    key: 'relationPeople__Shows_Cast',
    notion: 'Relation.Shows.Cast',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.Cast',
    },
  },
  relationShows__People_CastPast: {
    key: 'relationShows__People_CastPast',
    notion: 'Relation.People.CastPast',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.CastPast',
    },
  },
  relationPeople__Shows_CastPast: {
    key: 'relationPeople__Shows_CastPast',
    notion: 'Relation.Shows.CastPast',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.CastPast',
    },
  },
  relationShows_People_Crew: {
    key: 'relationShows_People_Crew',
    notion: 'Relation.People.Crew',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.Crew',
    },
  },
  relationPeople__Shows_Crew: {
    key: 'relationPeople__Shows_Crew',
    notion: 'Relation.Shows.Crew',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.Crew',
    },
  },
  relationShows__People_Director: {
    key: 'relationShows__People_Director',
    notion: 'Relation.People.Director',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.Director',
    },
  },
  relationPeople__Shows_Director: {
    key: 'relationPeople__Shows_Director',
    notion: 'Relation.Shows.Director',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.Director',
    },
  },
  relationShows__People_DirectorMusical: {
    key: 'relationShows__People_DirectorMusical',
    notion: 'Relation.People.DirectorMusical',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.DirectorMusical',
    },
  },
  relationPeople__Shows_DirectorMusical: {
    key: 'relationPeople__Shows_DirectorMusical',
    notion: 'Relation.Shows.DirectorMusical',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.DirectorMusical',
    },
  },
  relationShows__People_DirectorTechnical: {
    key: 'relationShows__People_DirectorTechnical',
    notion: 'Relation.People.DirectorTechnical',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.DirectorTechnical',
    },
  },
  relationPeople__Shows_DirectorTechnical: {
    key: 'relationPeople__Shows_DirectorTechnical',
    notion: 'Relation.Shows.DirectorTechnical',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.DirectorTechnical',
    },
  },
  relationEvents__People_Guest: {
    key: 'relationEvents__People_Guest',
    notion: 'Relation.People.Guest',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Events.Guest',
    },
  },
  relationPeople__Events_Guest: {
    key: 'relationEvents__People_Guest',
    notion: 'Relation.Events.Guest',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Relation.People.Guest',
    },
  },
  relationPodcasts__People_Host: {
    key: 'relationPodcasts__People_Host',
    notion: 'Relation.People.Host',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Podcasts.Host',
    },
  },
  relationPeople__Podcasts_Host: {
    key: 'relationPeople__Podcasts_Host',
    notion: 'Relation.Podcasts.Host',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'Relation.People.Host',
    },
  },
  relationEvents__People_Host: {
    key: 'relationEvents__People_Host',
    notion: 'Relation.People.Host',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Events.Host',
    },
  },
  relationPeople__Events_Host: {
    key: 'relationPeople__Events_Host',
    notion: 'Relation.Events.Host',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Relation.People.Host',
    },
  },
  relationShows__People_Producer: {
    key: 'relationShows__People_Producer',
    notion: 'Relation.People.Producer',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.Producer',
    },
  },
  relationPeople__Shows_Producer: {
    key: 'relationPeople__Shows_Producer',
    notion: 'Relation.Shows.Producer',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.Producer',
    },
  },
  relationEvents__People_GuestMusic: {
    key: 'relationEvents__People_GuestMusic',
    notion: 'Relation.People.GuestMusic',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Events.GuestMusic',
    },
  },
  relationPeople__Events_GuestMusic: {
    key: 'relationPeople__Events_GuestMusic',
    notion: 'Relation.Events.GuestMusic',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Relation.People.GuestMusic',
    },
  },
  relationPodcasts__People_SoundEngineer: {
    key: 'relationPodcasts__People_SoundEngineer',
    notion: 'Relation.People.SoundEngineer',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'Relation.Podcasts.SoundEngineer',
    },
  },
  relationPeople__Podcasts_SoundEngineer: {
    key: 'relationPeople__Podcasts_SoundEngineer',
    notion: 'Relation.Podcasts.SoundEngineer',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'Relation.People.SoundEngineer',
    },
  },
  relationShows__People_Thanks: {
    key: 'relationShows__People_Thanks',
    notion: 'Relation.People.Thanks',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.Thanks',
    },
  },
  relationPeople__Shows_Thanks: {
    key: 'relationPeople__Shows_Thanks',
    notion: 'Relation.Shows.Thanks',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.Thanks',
    },
  },
  relationShows__People_Writer: {
    key: 'relationShows__People_Writer',
    notion: 'Relation.People.Writer',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Relation.Shows.Writer',
    },
  },
  relationPeople__Shows_Writer: {
    key: 'relationPeople__Shows_Writer',
    notion: 'Relation.Shows.Writer',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.People.Writer',
    },
  },
  relationShows__Tags: {
    key: 'relationShows__Tags',
    notion: 'Relation.Tags',
    type: 'relation',
    relation: {
      database_id: 'Tags',
      synced_property_name: 'Relation.Shows',
    },
  },
  relationTags__Shows: {
    key: 'relationTags__Shows',
    notion: 'Relation.Shows',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Relation.Tags',
    },
  },
  // rollupPeopleCastTitle: {
  //   key: 'rollupPeopleCastTitle',
  //   notion: 'Rollup.People.Cast.Title',
  //   type: 'rollup',
  // },
  // rollupCastGuest: {
  //   key: 'rollupCastGuest',
  //   notion: 'Rollup.CastGuest',
  //   type: 'rollup',
  // },
  // rollupCastPast: {
  //   key: 'rollupCastPast',
  //   notion: 'Rollup.CastPast',
  //   type: 'rollup',
  // },
  // rollupCrew: {
  //   key: 'rollupCrew',
  //   notion: 'Rollup.Crew',
  //   type: 'rollup',
  // },
  // rollupDirector: {
  //   key: 'rollupDirector',
  //   notion: 'Rollup.Director',
  //   type: 'rollup',
  // },
  // rollupDirectorMusical: {
  //   key: 'rollupDirectorMusical',
  //   notion: 'Rollup.DirectorMusical',
  //   type: 'rollup',
  // },
  // rollupDirectorTechnical: {
  //   key: 'rollupDirectorTechnical',
  //   notion: 'Rollup.DirectorTechnical',
  //   type: 'rollup',
  // },
  // rollupGuest: {
  //   key: 'rollupGuest',
  //   notion: 'Rollup.Guest',
  //   type: 'rollup',
  // },
  // rollupHost: {
  //   key: 'rollupHost',
  //   notion: 'Rollup.Host',
  //   type: 'rollup',
  // },
  // rollupLineup: {
  //   key: 'rollupLineup',
  //   notion: 'Rollup.Lineup',
  //   type: 'rollup',
  // },
  // rollupMusic: {
  //   key: 'rollupMusic',
  //   notion: 'Rollup.Music',
  //   type: 'rollup',
  // },
  // rollupMusicGuest: {
  //   key: 'rollupMusicGuest',
  //   notion: 'Rollup.MusicGuest',
  //   type: 'rollup',
  // },
  // rollupProducer: {
  //   key: 'rollupProducer',
  //   notion: 'Rollup.Producer',
  //   type: 'rollup',
  // },
  // rollupShow: {
  //   key: 'rollupShow',
  //   notion: 'Rollup.Show',
  //   type: 'rollup',
  // },
  // rollupSoundEngineer: {
  //   key: 'rollupSoundEngineer',
  //   notion: 'Rollup.SoundEngineer',
  //   type: 'rollup',
  // },
  // rollupTags: {
  //   key: 'rollupTags',
  //   notion: 'Rollup.Tags',
  //   type: 'rollup',
  // },
  // rollupTagsSecondary: {
  //   key: 'rollupTagsSecondary',
  //   notion: 'Rollup.Tags.Secondary',
  //   type: 'rollup',
  // },
  // rollupThanks: {
  //   key: 'rollupThanks',
  //   notion: 'Rollup.Thanks',
  //   type: 'rollup',
  // },
  // rollupVenue: {
  //   key: 'rollupVenue',
  //   notion: 'Rollup.Venue',
  //   type: 'rollup',
  // },
  // rollupWriter: {
  //   key: 'rollupWriter',
  //   notion: 'Rollup.Writer',
  //   type: 'rollup',
  // },
  season: {
    key: 'season',
    notion: 'Season',
    type: 'number',
    format: 'number',
  },
  seoDescription: {
    key: 'seoDescription',
    notion: 'SEO.Description',
    type: 'rich_text',
  },
  seoImage: {
    key: 'seoImage',
    notion: 'SEO.Image',
    type: 'files',
  },
  seoImageDescription: {
    key: 'seoImageDescription',
    notion: 'SEO.Image.Description',
    type: 'rich_text',
  },
  slug: {
    key: 'slug',
    notion: 'Slug',
    type: 'rich_text',
  },
  socialFacebook: {
    key: 'socialFacebook',
    notion: 'Social.Facebook',
    type: 'url',
  },
  socialInstagram: {
    key: 'socialInstagram',
    notion: 'Social.Instagram',
    type: 'url',
  },
  socialTwitter: {
    key: 'socialTwitter',
    notion: 'Social.Twitter',
    type: 'url',
  },
  socialWebsite: {
    key: 'socialWebsite',
    notion: 'Social.Website',
    type: 'url',
  },
  socialSpotify: {
    key: 'socialSpotify',
    notion: 'Social.Spotify',
    type: 'url',
  },
  socialApple: {
    key: 'socialApple',
    notion: 'Social.Apple',
    type: 'url',
  },
  subtitle: {
    key: 'subtitle',
    notion: 'Subitle',
    type: 'rich_text',
  },
  ticketUrl: {
    key: 'ticketUrl',
    notion: 'TicketUrl',
    type: 'url',
  },
  title: {
    key: 'title',
    notion: 'Title',
    type: 'title',
  },
  type: {
    key: 'type',
    notion: 'Type',
    type: 'select',
  },
}

// interface PROPERTIES_DEFAULT {
//   authors: string
//   date: string
//   datePublished: string
//   noSeo: string
//   published: string
//   slug: string
//   seoDescription: string
//   seoImage: string
//   seoImageDescription: string
// }
// const propertiesDefaultKeys = {
//   authors: properties.authors,
//   date: properties.date,
//   datePublished: properties.datePublished,
//   noSeo: properties.noSeo,
//   published: properties.published,
//   slug: properties.slug,
//   seoDescription: properties.seoDescription,
//   seoImage: properties.seoImage,
//   seoImageDescription: properties.seoImageDescription,
// }
// const propertiesDefault2 = Object.keys(propertiesDefaultKeys)

const propertiesDefault = [
  properties.authors,
  properties.date,
  properties.datePublished,
  properties.noSeo,
  properties.published,
  properties.slug,
  properties.seoDescription,
  properties.seoImage,
  properties.seoImageDescription,
  properties.title,
]

const BLOG = [...propertiesDefault]

const EPISODES = [
  ...propertiesDefault,
  properties.dateRecorded,
  properties.episode,
  properties.mp3,
  properties.season,
  properties.relationEpisodes__People_Guest,
  properties.relationEpisodes__People_SoundEngineer,
  properties.relationEpisodes__People_Thanks,
  properties.relationEpisodes__Podcast,
  properties.relationEpisodes__Venues,
  properties.socialApple,
  properties.socialSpotify,
  properties.type,
]

const EVENTS = [
  ...propertiesDefault,
  properties.dateStart,
  properties.dateEnd,
  properties.relationEvents__People_Guest,
  properties.relationEvents__People_GuestMusic,
  properties.relationEvents__People_Host,
  properties.relationEvents__Shows_Lineup,
  properties.relationEvents__Shows,
  properties.relationEvents__Venues,
  properties.socialFacebook,
  properties.socialWebsite,
  properties.ticketUrl,
]

const PAGES = [...propertiesDefault]

const PEOPLE = [
  ...propertiesDefault,
  properties.email,
  properties.nameFirst,
  properties.nameLast,
  properties.namePreferred,
  // properties.relationPeople__Episodes_Guest,
  // properties.relationPeople__Episodes_SoundEngineer,
  // properties.relationPeople__Episodes_Thanks,
  // properties.relationPeople__Events_Guest,
  // properties.relationPeople__Events_GuestMusic,
  // properties.relationPeople__Events_Host,
  // properties.relationPeople__Podcasts_Host,
  // properties.relationPeople__Podcasts_SoundEngineer,
  // properties.relationPeople__Shows_Cast,
  // properties.relationPeople__Shows_CastPast,
  // properties.relationPeople__Shows_Director,
  // properties.relationPeople__Shows_DirectorMusical,
  // properties.relationPeople__Shows_DirectorTechnical,
  // properties.relationPeople__Shows_Producer,
  // properties.relationPeople__Shows_Thanks,
  // properties.relationPeople__Shows_Writer,
]

const PODCASTS = [
  ...propertiesDefault,
  properties.categories,
  properties.explicit,
  properties.podcastAuthor,
  properties.podcastAuthorEmail,
  // properties.relationPodcasts__Episodes,
  properties.relationPodcasts__People_Host,
  properties.relationPodcasts__People_SoundEngineer,
  properties.socialApple,
  properties.socialSpotify,
  properties.type,
]

const SEO = [...propertiesDefault]

const SHOWS = [
  ...propertiesDefault,
  // properties.relationShows__Events,
  // properties.relationShows__Events_Lineup,
  properties.relationShows__People_Cast,
  properties.relationShows__People_CastPast,
  properties.relationShows__People_Director,
  properties.relationShows__People_DirectorMusical,
  properties.relationShows__People_DirectorTechnical,
  properties.relationShows__People_Producer,
  properties.relationShows__People_Thanks,
  properties.relationShows__People_Writer,
  properties.socialFacebook,
  properties.socialInstagram,
  properties.socialTwitter,
  properties.socialWebsite,
]

const VENUES = [
  ...propertiesDefault,
  properties.addressCity,
  properties.addressLatitude,
  properties.addressLongitude,
  properties.addressNeighborhood,
  properties.addressState,
  properties.addressStreet,
  properties.addressZipCode,
  properties.phoneNumber,
  // properties.relationVenues__Episodes,
  // properties.relationVenues__Events,
  properties.socialFacebook,
  properties.socialInstagram,
  properties.socialTwitter,
  properties.socialWebsite,
]

const INIT = {
  BLOG,
  EPISODES,
  EVENTS,
  PAGES,
  PEOPLE,
  PODCASTS,
  SEO,
  SHOWS,
  VENUES,
}

export { INIT }
