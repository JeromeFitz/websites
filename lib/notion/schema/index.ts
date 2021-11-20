import _filter from 'lodash/filter'

import type { Property } from './types'

const getLookup = ({ key, notion, type }) => ({
  key,
  notion,
  type,
})

/**
 * @note
 * Valid Notion Property Types mapped to Normalizer w/ init info
 */
const PROPERTIES: Record<string, Property> = {
  addressCity: {
    init: true,
    key: 'addressCity',
    notion: 'Address.City',
    type: 'rich_text',
  },
  addressLatitude: {
    init: true,
    key: 'addressLatitude',
    notion: 'Address.Latitude',
    type: 'number',
    format: 'number',
  },
  addressLongitude: {
    init: true,
    key: 'addressLongitude',
    notion: 'Address.Longitude',
    type: 'number',
    format: 'number',
  },
  addressNeighborhood: {
    init: true,
    key: 'addressNeighborhood',
    notion: 'Address.Neighborhood',
    type: 'rich_text',
  },
  addressState: {
    init: true,
    key: 'addressState',
    notion: 'Address.State',
    type: 'select',
  },
  addressStreet: {
    init: true,
    key: 'addressStreet',
    notion: 'Address.Street',
    type: 'rich_text',
  },
  addressZipCode: {
    init: true,
    key: 'addressZipCode',
    notion: 'Address.ZipCode',
    type: 'number',
    format: 'number',
  },
  authors: {
    init: true,
    key: 'authors',
    notion: 'Authors',
    type: 'people',
  },
  categories: {
    init: true,
    key: 'categories',
    notion: 'Categories',
    type: 'multi_select',
  },
  dateCreated: {
    init: false,
    key: 'dateCreated',
    notion: 'Date.Created',
    type: 'created_time',
  },
  dateEdited: {
    init: false,
    key: 'dateEdited',
    notion: 'Date.Edited',
    type: 'last_edited_time',
  },
  dateEvent: {
    init: true,
    key: 'dateEvent',
    notion: 'Date.Event',
    type: 'date',
  },
  datePublished: {
    init: true,
    key: 'datePublished',
    notion: 'Date.Published',
    type: 'date',
  },
  dateRecorded: {
    init: true,
    key: 'dateRecorded',
    notion: 'Date.Recorded',
    type: 'date',
  },
  duration: {
    init: true,
    key: 'duration',
    notion: 'Duration',
    type: 'number',
    format: 'number',
  },
  email: {
    init: true,
    key: 'email',
    notion: 'Email',
    type: 'rich_text',
  },
  episode: {
    init: true,
    key: 'episode',
    notion: 'Episode',
    type: 'number',
    format: 'number',
  },
  explicit: {
    init: true,
    key: 'explicit',
    notion: 'Explicit',
    type: 'checkbox',
  },
  festivals: {
    init: true,
    key: 'festivals',
    notion: 'Festival',
    type: 'multi_select',
  },
  food: {
    init: true,
    key: 'food',
    notion: 'Food',
    type: 'rich_text',
  },
  isIndexed: {
    init: true,
    key: 'isIndexed',
    notion: 'Is.Indexed',
    type: 'checkbox',
  },
  isPublished: {
    init: true,
    key: 'isPublished',
    notion: 'Is.Published',
    type: 'checkbox',
  },
  mp3: {
    init: true,
    key: 'mp3',
    notion: 'MP3',
    type: 'files',
  },
  name: {
    init: true,
    key: 'name',
    notion: 'Name',
    type: 'rich_text',
  },
  nameFirst: {
    init: true,
    key: 'nameFirst',
    notion: 'Name.First',
    type: 'rich_text',
  },
  nameLast: {
    init: true,
    key: 'nameLast',
    notion: 'Name.Last',
    type: 'rich_text',
  },
  namePreferred: {
    init: true,
    key: 'namePreferred',
    notion: 'Name.Preferred',
    type: 'rich_text',
  },
  phoneNumber: {
    init: true,
    key: 'phoneNumber',
    notion: 'Phone',
    type: 'rich_text',
  },
  podcastAuthor: {
    init: true,
    key: 'podcastAuthor',
    notion: 'Author',
    type: 'rich_text',
  },
  podcastAuthorEmail: {
    init: true,
    key: 'podcastAuthorEmail',
    notion: 'Author.Email',
    type: 'rich_text',
  },
  /**
   * @relation
   */
  relationEpisodes__Podcast: {
    init: true,
    key: 'relationEpisodes__Podcast',
    notion: 'Podcasts',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'Episodes',
    },
  },
  relationPodcasts__Episodes: {
    init: false,
    key: 'relationPodcasts__Episodes',
    notion: 'Episodes',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Podcasts',
    },
  },
  relationEpisodes__People_Guest: {
    init: true,
    key: 'relationEpisodes__People_Guest',
    notion: 'People.Guest',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Episodes.Guest',
    },
  },
  relationPeople__Episodes_Guest: {
    init: false,
    key: 'relationPeople__Episodes_Guest',
    notion: 'Episodes.Guest',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'People.Guest',
    },
  },
  relationEpisodes__People_Sound_Engineer: {
    init: true,
    key: 'relationEpisodes__People_Sound_Engineer',
    notion: 'People.Sound.Engineer',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Episodes.Sound.Engineer',
    },
  },
  relationPeople__Episodes_Sound_Engineer: {
    init: false,
    key: 'relationPeople__Episodes_Sound_Engineer',
    notion: 'Episodes.Sound.Engineer',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'People.Sound.Engineer',
    },
  },
  relationEpisodes__People_Thanks: {
    init: true,
    key: 'relationEpisodes__People_Thanks',
    notion: 'People.Thanks',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Episodes.Thanks',
    },
  },
  relationPeople__Episodes_Thanks: {
    init: false,
    key: 'relationPeople__Episodes_Thanks',
    notion: 'Episodes.Thanks',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'People.Thanks',
    },
  },
  relationEpisodes__Venues: {
    init: true,
    key: 'relationEpisodes__Venues',
    notion: 'Venues',
    type: 'relation',
    relation: {
      database_id: 'Venues',
      synced_property_name: 'Episodes',
    },
  },
  relationVenues__Episodes: {
    init: false,
    key: 'relationVenues__Episodes',
    notion: 'Episodes',
    type: 'relation',
    relation: {
      database_id: 'Episodes',
      synced_property_name: 'Venues',
    },
  },
  relationEvents__Venues: {
    init: true,
    key: 'relationEvents__Venues',
    notion: 'Venues',
    type: 'relation',
    relation: {
      database_id: 'Venues',
      synced_property_name: 'Events',
    },
  },
  relationVenues__Events: {
    init: false,
    key: 'relationVenues__Events',
    notion: 'Events',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Venues',
    },
  },
  relationEvents__Shows: {
    init: true,
    key: 'relationEvents__Shows',
    notion: 'Shows',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Events',
    },
  },
  relationShows__Events: {
    init: false,
    key: 'relationShows__Events',
    notion: 'Events',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Shows',
    },
  },
  relationEvents__Shows_Lineup: {
    init: true,
    key: 'relationEvents__Shows_Lineup',
    notion: 'Shows.Lineup',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Events.Lineup',
    },
  },
  relationShows__Events_Lineup: {
    init: false,
    key: 'relationShows__Events_Lineup',
    notion: 'Events.Lineup',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'Shows.Lineup',
    },
  },
  relationShows__People_Cast: {
    init: true,
    key: 'relationShows__People_Cast',
    notion: 'People.Cast',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Cast',
    },
  },
  relationPeople__Shows_Cast: {
    init: false,
    key: 'relationPeople__Shows_Cast',
    notion: 'Shows.Cast',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Cast',
    },
  },
  relationShows__People_Cast_Past: {
    init: true,
    key: 'relationShows__People_Cast_Past',
    notion: 'People.Cast.Past',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Cast.Past',
    },
  },
  relationPeople__Shows_Cast_Past: {
    init: false,
    key: 'relationPeople__Shows_Cast_Past',
    notion: 'Shows.Cast.Past',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Cast.Past',
    },
  },
  relationShows_People_Crew: {
    init: true,
    key: 'relationShows_People_Crew',
    notion: 'People.Crew',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Crew',
    },
  },
  relationPeople__Shows_Crew: {
    init: true,
    key: 'relationPeople__Shows_Crew',
    notion: 'Shows.Crew',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Crew',
    },
  },
  relationShows__People_Director: {
    init: true,
    key: 'relationShows__People_Director',
    notion: 'People.Director',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Director',
    },
  },
  relationPeople__Shows_Director: {
    init: false,
    key: 'relationPeople__Shows_Director',
    notion: 'Shows.Director',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Director',
    },
  },
  relationShows__People_Director_Musical: {
    init: true,
    key: 'relationShows__People_Director_Musical',
    notion: 'People.Director.Musical',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Director.Musical',
    },
  },
  relationPeople__Shows_Director_Musical: {
    init: false,
    key: 'relationPeople__Shows_Director_Musical',
    notion: 'Shows.Director.Musical',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Director.Musical',
    },
  },
  relationShows__People_Director_Technical: {
    init: true,
    key: 'relationShows__People_Director_Technical',
    notion: 'People.Director.Technical',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Director.Technical',
    },
  },
  relationPeople__Shows_Director_Technical: {
    init: false,
    key: 'relationPeople__Shows_Director_Technical',
    notion: 'Shows.Director.Technical',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Director.Technical',
    },
  },
  relationEvents__People_Guest: {
    init: true,
    key: 'relationEvents__People_Guest',
    notion: 'People.Guest',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Events.Guest',
    },
  },
  relationPeople__Events_Guest: {
    init: false,
    key: 'relationEvents__People_Guest',
    notion: 'Events.Guest',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'People.Guest',
    },
  },
  relationPodcasts__People_Host: {
    init: true,
    key: 'relationPodcasts__People_Host',
    notion: 'People.Host',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Podcasts.Host',
    },
  },
  relationPeople__Podcasts_Host: {
    init: false,
    key: 'relationPeople__Podcasts_Host',
    notion: 'Podcasts.Host',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'People.Host',
    },
  },
  relationEvents__People_Host: {
    init: true,
    key: 'relationEvents__People_Host',
    notion: 'People.Host',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Events.Host',
    },
  },
  relationPeople__Events_Host: {
    init: false,
    key: 'relationPeople__Events_Host',
    notion: 'Events.Host',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'People.Host',
    },
  },
  relationShows__People_Producer: {
    init: true,
    key: 'relationShows__People_Producer',
    notion: 'People.Producer',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Producer',
    },
  },
  relationPeople__Shows_Producer: {
    init: false,
    key: 'relationPeople__Shows_Producer',
    notion: 'Shows.Producer',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Producer',
    },
  },
  relationEvents__People_Guest_Music: {
    init: true,
    key: 'relationEvents__People_Guest_Music',
    notion: 'People.Guest.Music',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Events.Guest.Music',
    },
  },
  relationPeople__Events_Guest_Music: {
    init: false,
    key: 'relationPeople__Events_Guest_Music',
    notion: 'Events.Guest.Music',
    type: 'relation',
    relation: {
      database_id: 'Events',
      synced_property_name: 'People.Guest.Music',
    },
  },
  relationPodcasts__People_Sound_Engineer: {
    init: true,
    key: 'relationPodcasts__People_Sound_Engineer',
    notion: 'People.Sound.Engineer',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'Podcasts.Sound.Engineer',
    },
  },
  relationPeople__Podcasts_Sound_Engineer: {
    init: false,
    key: 'relationPeople__Podcasts_Sound_Engineer',
    notion: 'Podcasts.Sound.Engineer',
    type: 'relation',
    relation: {
      database_id: 'Podcasts',
      synced_property_name: 'People.Sound.Engineer',
    },
  },
  relationShows__People_Thanks: {
    init: true,
    key: 'relationShows__People_Thanks',
    notion: 'People.Thanks',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Thanks',
    },
  },
  relationPeople__Shows_Thanks: {
    init: false,
    key: 'relationPeople__Shows_Thanks',
    notion: 'Shows.Thanks',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Thanks',
    },
  },
  relationShows__People_Writer: {
    init: true,
    key: 'relationShows__People_Writer',
    notion: 'People.Writer',
    type: 'relation',
    relation: {
      database_id: 'People',
      synced_property_name: 'Shows.Writer',
    },
  },
  relationPeople__Shows_Writer: {
    init: false,
    key: 'relationPeople__Shows_Writer',
    notion: 'Shows.Writer',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'People.Writer',
    },
  },
  relationShows__Tags: {
    init: true,
    key: 'relationShows__Tags',
    notion: 'Tags',
    type: 'relation',
    relation: {
      database_id: 'Tags',
      synced_property_name: 'Shows',
    },
  },
  relationTags__Shows: {
    init: true,
    key: 'relationTags__Shows',
    notion: 'Shows',
    type: 'relation',
    relation: {
      database_id: 'Shows',
      synced_property_name: 'Tags',
    },
  },
  /**
   * @rollup
   */
  rollupShows__People_Cast: {
    init: true,
    key: 'rollupShows__People_Cast',
    notion: 'People.Cast.Rollup',
    type: 'rollup',
    rollup: {
      relation_property_name: 'People.Cast',
      rollup_property_id: 'Title',
      function: 'show_original',
    },
  },
  rollupShows__People_Cast_Slug: {
    init: true,
    key: 'rollupShows__People_Cast_Slug',
    notion: 'People.Cast.Rollup.Slug',
    type: 'rollup',
    rollup: {
      relation_property_name: 'People.Cast',
      rollup_property_name: 'Slug',
      function: 'show_original',
    },
  },
  // rollupCastGuest: {
  //   key: 'rollupCastGuest',
  //   notion: 'Rollup.CastGuest',
  //   type: 'rollup',
  // },
  // rollupCast.Past: {
  //   key: 'rollupCast.Past',
  //   notion: 'Rollup.Cast.Past',
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
  // rollupDirector.Musical: {
  //   key: 'rollupDirector.Musical',
  //   notion: 'Rollup.Director.Musical',
  //   type: 'rollup',
  // },
  // rollupDirector.Technical: {
  //   key: 'rollupDirector.Technical',
  //   notion: 'Rollup.Director.Technical',
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
  // rollupSound.Engineer: {
  //   key: 'rollupSound.Engineer',
  //   notion: 'Rollup.Sound.Engineer',
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
    init: true,
    key: 'season',
    notion: 'Season',
    type: 'number',
    format: 'number',
  },
  seoDescription: {
    init: true,
    key: 'seoDescription',
    notion: 'SEO.Description',
    type: 'rich_text',
  },
  seoImage: {
    init: true,
    key: 'seoImage',
    notion: 'SEO.Image',
    type: 'files',
  },
  seoImageDescription: {
    init: true,
    key: 'seoImageDescription',
    notion: 'SEO.Image.Description',
    type: 'rich_text',
  },
  slug: {
    init: true,
    key: 'slug',
    notion: 'Slug',
    type: 'rich_text',
  },
  socialFacebook: {
    init: true,
    key: 'socialFacebook',
    notion: 'Social.Facebook',
    type: 'url',
  },
  socialInstagram: {
    init: true,
    key: 'socialInstagram',
    notion: 'Social.Instagram',
    type: 'url',
  },
  socialTwitter: {
    init: true,
    key: 'socialTwitter',
    notion: 'Social.Twitter',
    type: 'url',
  },
  socialWebsite: {
    init: true,
    key: 'socialWebsite',
    notion: 'Social.Website',
    type: 'url',
  },
  socialSpotify: {
    init: true,
    key: 'socialSpotify',
    notion: 'Social.Spotify',
    type: 'url',
  },
  socialApple: {
    init: true,
    key: 'socialApple',
    notion: 'Social.Apple',
    type: 'url',
  },
  subtitle: {
    init: true,
    key: 'subtitle',
    notion: 'Subitle',
    type: 'rich_text',
  },
  ticketUrl: {
    init: true,
    key: 'ticketUrl',
    notion: 'TicketUrl',
    type: 'url',
  },
  title: {
    init: true,
    key: 'title',
    notion: 'Title',
    type: 'title',
  },
  type: {
    init: true,
    key: 'type',
    notion: 'Type',
    type: 'select',
  },
}

/**
 * @note
 * Limit Each Database (Route Type) to _only_
 *  have valid data for its schema
 */

const PROPERTIES_DEFAULT = [
  PROPERTIES.authors,
  // PROPERTIES.dateCreated,
  PROPERTIES.datePublished,
  PROPERTIES.isIndexed,
  PROPERTIES.isPublished,
  PROPERTIES.slug,
  PROPERTIES.seoDescription,
  PROPERTIES.seoImage,
  PROPERTIES.seoImageDescription,
  PROPERTIES.title,
]

const BLOG = [...PROPERTIES_DEFAULT]

const EPISODES = [
  ...PROPERTIES_DEFAULT,
  PROPERTIES.dateRecorded,
  PROPERTIES.episode,
  PROPERTIES.mp3,
  PROPERTIES.season,
  PROPERTIES.relationEpisodes__People_Guest,
  PROPERTIES.relationEpisodes__People_Sound_Engineer,
  PROPERTIES.relationEpisodes__People_Thanks,
  PROPERTIES.relationEpisodes__Podcast,
  PROPERTIES.relationEpisodes__Venues,
  PROPERTIES.socialApple,
  PROPERTIES.socialSpotify,
  PROPERTIES.type,
]

const EVENTS = [
  ...PROPERTIES_DEFAULT,
  PROPERTIES.dateEvent,
  PROPERTIES.relationEvents__People_Guest,
  PROPERTIES.relationEvents__People_Guest_Music,
  PROPERTIES.relationEvents__People_Host,
  PROPERTIES.relationEvents__Shows_Lineup,
  PROPERTIES.relationEvents__Shows,
  PROPERTIES.relationEvents__Venues,
  PROPERTIES.socialFacebook,
  PROPERTIES.socialWebsite,
  PROPERTIES.ticketUrl,
]

const PAGES = [...PROPERTIES_DEFAULT]

const PEOPLE = [
  ...PROPERTIES_DEFAULT,
  PROPERTIES.email,
  PROPERTIES.nameFirst,
  PROPERTIES.nameLast,
  PROPERTIES.namePreferred,
  /**
   * @note(notion)
   * do not init/seed these values, they are updated _after_ init
   */
  PROPERTIES.relationPeople__Episodes_Guest,
  PROPERTIES.relationPeople__Episodes_Sound_Engineer,
  PROPERTIES.relationPeople__Episodes_Thanks,
  PROPERTIES.relationPeople__Events_Guest,
  PROPERTIES.relationPeople__Events_Guest_Music,
  PROPERTIES.relationPeople__Events_Host,
  PROPERTIES.relationPeople__Podcasts_Host,
  PROPERTIES.relationPeople__Podcasts_Sound_Engineer,
  PROPERTIES.relationPeople__Shows_Cast,
  PROPERTIES.relationPeople__Shows_Cast_Past,
  PROPERTIES.relationPeople__Shows_Director,
  PROPERTIES.relationPeople__Shows_Director_Musical,
  PROPERTIES.relationPeople__Shows_Director_Technical,
  PROPERTIES.relationPeople__Shows_Producer,
  PROPERTIES.relationPeople__Shows_Thanks,
  PROPERTIES.relationPeople__Shows_Writer,
  /**
   * -------------------------------------
   */
]

const PODCASTS = [
  ...PROPERTIES_DEFAULT,
  PROPERTIES.categories,
  PROPERTIES.explicit,
  PROPERTIES.podcastAuthor,
  PROPERTIES.podcastAuthorEmail,
  /**
   * @note(notion)
   * do not init/seed these values, they are updated _after_ init
   */
  PROPERTIES.relationPodcasts__Episodes,
  /**
   * -------------------------------------
   */
  PROPERTIES.relationPodcasts__People_Host,
  PROPERTIES.relationPodcasts__People_Sound_Engineer,
  PROPERTIES.socialApple,
  PROPERTIES.socialSpotify,
  PROPERTIES.type,
]

const SEO = [...PROPERTIES_DEFAULT]

const SHOWS = [
  ...PROPERTIES_DEFAULT,
  /**
   * @note(notion)
   * do not init/seed these values, they are updated _after_ init
   */
  PROPERTIES.relationShows__Events,
  PROPERTIES.relationShows__Events_Lineup,
  /**
   * -------------------------------------
   */
  PROPERTIES.relationShows__People_Cast,
  PROPERTIES.relationShows__People_Cast_Past,
  PROPERTIES.relationShows__People_Director,
  PROPERTIES.relationShows__People_Director_Musical,
  PROPERTIES.relationShows__People_Director_Technical,
  PROPERTIES.relationShows__People_Producer,
  PROPERTIES.relationShows__People_Thanks,
  PROPERTIES.relationShows__People_Writer,
  PROPERTIES.rollupShows__People_Cast,
  PROPERTIES.rollupShows__People_Cast_Slug,
  PROPERTIES.socialFacebook,
  PROPERTIES.socialInstagram,
  PROPERTIES.socialTwitter,
  PROPERTIES.socialWebsite,
]

const VENUES = [
  ...PROPERTIES_DEFAULT,
  PROPERTIES.addressCity,
  PROPERTIES.addressLatitude,
  PROPERTIES.addressLongitude,
  PROPERTIES.addressNeighborhood,
  PROPERTIES.addressState,
  PROPERTIES.addressStreet,
  PROPERTIES.addressZipCode,
  PROPERTIES.phoneNumber,
  /**
   * @note(notion)
   * do not init/seed these values, they are updated _after_ init
   */
  PROPERTIES.relationVenues__Episodes,
  PROPERTIES.relationVenues__Events,
  /**
   * -------------------------------------
   */
  PROPERTIES.socialFacebook,
  PROPERTIES.socialInstagram,
  PROPERTIES.socialTwitter,
  PROPERTIES.socialWebsite,
]

/**
 * @note
 * hyper-specific for the init / see (secret/create/init)
 *
 * 0. Create DB w/o Relations|Rollups
 * 1. Update DB w/ Relations
 * 2. Update DB w/ Relation Naming Preference
 * 3. update DB w/ Rollups
 */
const INIT = {
  BLOG: _filter(BLOG, { init: true }),
  EPISODES: _filter(EPISODES, { init: true }),
  EVENTS: _filter(EVENTS, { init: true }),
  PAGES: _filter(PAGES, { init: true }),
  PEOPLE: _filter(PEOPLE, { init: true }),
  PODCASTS: _filter(PODCASTS, { init: true }),
  SEO: _filter(SEO, { init: true }),
  SHOWS: _filter(SHOWS, { init: true }),
  VENUES: _filter(VENUES, { init: true }),
}

const LOOKUP = {
  BLOG: BLOG.map((item) => getLookup(item)),
  EPISODES: EPISODES.map((item) => getLookup(item)),
  EVENTS: EVENTS.map((item) => getLookup(item)),
  PAGES: PAGES.map((item) => getLookup(item)),
  PEOPLE: PEOPLE.map((item) => getLookup(item)),
  PODCASTS: PODCASTS.map((item) => getLookup(item)),
  SEO: SEO.map((item) => getLookup(item)),
  SHOWS: SHOWS.map((item) => getLookup(item)),
  VENUES: VENUES.map((item) => getLookup(item)),
}

export { INIT, LOOKUP, PROPERTIES }
