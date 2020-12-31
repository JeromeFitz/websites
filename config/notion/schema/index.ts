/**
 * @note This is a temp file until this can be figured out
 */
import { getSchemaCollectionId } from '~config/notion/schema/getSchema'

const WIDTH_XS = 100
const WIDTH_SM = 150
const WIDTH_MD = 200
const WIDTH_LG = 250
const WIDTH_XL = 300

const schema = {
  /**
   * @note Self-Contained Schema Types
   */
  a0c0: {
    name: 'Address.City',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  a0g0: {
    name: 'Address.GeoLat',
    type: 'number',
    visible: false,
    width: WIDTH_XS,
  },
  a0g1: {
    name: 'Address.GeoLng',
    type: 'number',
    visible: false,
    width: WIDTH_XS,
  },
  a0n1: {
    name: 'Address.Neighborhood',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  a0p0: {
    name: 'Address.PostalCode',
    type: 'number',
    visible: false,
    width: WIDTH_XS,
  },
  a0s0: {
    name: 'Address.Street',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  a1a0: {
    name: 'Author',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  a1a1: {
    name: 'Author.Email',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  a2a0: {
    name: 'Authors',
    type: 'person',
    visible: false,
    width: WIDTH_LG,
  },
  d0d0: {
    name: 'Date',
    type: 'date',
    visible: false,
    width: WIDTH_MD,
  },
  d0p0: {
    name: 'Date.Published',
    type: 'date',
    visible: true,
    width: WIDTH_MD,
  },
  d0r0: {
    name: 'Date.Recorded',
    type: 'date',
    visible: false,
    width: WIDTH_MD,
  },
  d1d0: {
    name: 'Duration',
    type: 'text',
    visible: true,
    width: WIDTH_SM,
  },
  e0e0: {
    name: 'Email',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  e1e1: {
    name: 'Episode',
    type: 'number',
    visible: true,
    width: WIDTH_XS,
  },
  e2e2: {
    name: 'Explicit',
    type: 'checkbox',
    visible: false,
    width: WIDTH_XS,
  },
  f0f0: {
    name: 'Food',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  h0h0: {
    name: 'Headline',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  m0m0: {
    name: 'MP3',
    type: 'file',
    visible: true,
    width: WIDTH_XS,
  },
  n0n0: {
    name: 'Name.First',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  n0n1: {
    name: 'Name.Last',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  n0n2: {
    name: 'Name.Preferred',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  n1n0: {
    name: 'NoIndex',
    type: 'checkbox',
    visible: true,
    width: WIDTH_XS,
  },
  o0o0: {
    name: 'Overline',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  p0p0: {
    name: 'Phone',
    type: 'phone_number',
    visible: false,
    width: WIDTH_XS,
  },
  p1p0: {
    name: 'Published',
    type: 'checkbox',
    visible: true,
    width: WIDTH_XS,
  },
  s0s0: {
    name: 'Season',
    type: 'number',
    visible: true,
    width: WIDTH_XS,
  },
  s1s0: {
    name: 'SEO.Description',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  s1s1: {
    name: 'SEO.Image',
    type: 'file',
    visible: false,
    width: WIDTH_XS,
  },
  s1s2: {
    name: 'SEO.Image.Description',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  s2s0: {
    name: 'Slug',
    type: 'text',
    visible: true,
    width: WIDTH_XL,
  },
  s3s0: {
    name: 'Social.Facebook',
    type: 'url',
    visible: false,
    width: WIDTH_XS,
  },
  s3s1: {
    name: 'Social.Instagram',
    type: 'url',
    visible: false,
    width: WIDTH_XS,
  },
  s3s2: {
    name: 'Social.Twitter',
    type: 'url',
    visible: false,
    width: WIDTH_XS,
  },
  s4s0: {
    name: 'Subline',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  s5s0: {
    name: 'Subtitle',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  t0t0: {
    name: 'TicketUrl',
    type: 'url',
    visible: false,
    width: WIDTH_XS,
  },
  title: {
    name: 'Title',
    type: 'title',
    visible: true,
    width: WIDTH_XL,
  },
  t2t0: {
    name: 'Type',
    type: 'text',
    visible: false,
    width: WIDTH_XS,
  },
  w0w0: {
    name: 'Website',
    type: 'url',
    visible: false,
    width: WIDTH_XS,
  },
  // // // // // // // // Sort Manually
  /**
   * @note Multi-Select Schema Types
   */
  a0s1: {
    name: 'Address.State',
    type: 'select',
    // options: [
    //   {
    //     id: '19383fa1-3ab6-4597-8b63-18275d96264c',
    //     color: 'yellow',
    //     value: 'PA',
    //   },
    //   {
    //     id: '54aa48dd-a7fa-4c80-833a-89ecb167f7b3',
    //     color: 'orange',
    //     value: 'CA',
    //   },
    // ],
    visible: false,
    width: WIDTH_XS,
  },
  c0c0: {
    name: 'Category',
    type: 'multi_select',
    // options: [
    //   {
    //     id: 'd6ee0e05-c977-4d10-992c-e47777cba60c',
    //     color: 'orange',
    //     value: 'Comedy',
    //   },
    // ],
    visible: false,
    width: WIDTH_XS,
  },
  p0f0: {
    name: 'Festival',
    type: 'multi_select',
    // options: [
    //   {
    //     id: '591dabd9-7aeb-48e9-adc8-341058e1e258',
    //     color: 'red',
    //     value: 'Detroit Improv Festival',
    //   },
    //   {
    //     id: 'd113fc40-b47d-456e-9b8c-c857d8f9961c',
    //     color: 'purple',
    //     value: 'San Diego Improv Festival',
    //   },
    //   {
    //     id: 'a5816b9f-3994-4aff-926a-c21f821e2594',
    //     color: 'pink',
    //     value: 'SF Sketchfest',
    //   },
    // ],
    visible: false,
    width: WIDTH_MD,
  },
  // p0t0: {
  //   name: 'People.Thank',
  //   type: 'multi_select',
  //   visible: false,
  // },
  t0g0: {
    name: 'Tags',
    type: 'multi_select',
    // options: [
    //   {
    //     id: '1d9bcba5-87ef-444b-9781-35dc775d6ce9',
    //     color: 'red',
    //     value: 'Am I Dracula',
    //   },
    //   {
    //     id: '4428f998-6f7a-4b28-88f2-de5effc2ea92',
    //     color: 'blue',
    //     value: 'They A Bitch',
    //   },
    //   {
    //     id: '2021e085-2827-4e21-a0bd-9765668e7cd0',
    //     color: 'green',
    //     value: 'Danks For The Memories',
    //   },
    //   {
    //     id: '395b69f1-b21c-49d0-8efc-5d92a550b228',
    //     color: 'yellow',
    //     value: 'My Favorite Murder She Wrote',
    //   },
    // ],
    visible: true,
    width: WIDTH_MD,
  },
  t0y0: {
    name: 'Type',
    type: 'multi_select',
    // options: [
    //   {
    //     id: 'dd612bb2-ee63-47ec-b7b5-8f680ac0d61c',
    //     color: 'pink',
    //     value: 'full',
    //   },
    //   {
    //     id: '5f4bfe31-9235-45a2-9aa6-399f25a310b4',
    //     color: 'purple',
    //     value: 'trailer',
    //   },
    //   {
    //     id: 'afff5f91-7999-4d18-a4fc-f0bfb2781834',
    //     color: 'green',
    //     value: 'bonus',
    //   },
    // ],
    visible: true,
    width: WIDTH_SM,
  },
  /**
   * @note Relation Schema Types, heavily defined by Collection View IDs
   */
  pe00: {
    name: 'PodcastIDs',
    type: 'relation',
    property: 'pe01',
    collection_id: getSchemaCollectionId('podcasts'),
    visible: true,
    width: WIDTH_XL,
  },
  pe01: {
    name: 'EpisodeIDs',
    type: 'relation',
    property: 'pe00',
    collection_id: getSchemaCollectionId('episodes'),
    visible: false,
    width: WIDTH_XL,
  },

  epg0: {
    name: 'People.Guest',
    type: 'relation',
    property: 'epg1',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },
  epg1: {
    name: 'Episodes.People.Guest',
    type: 'relation',
    property: 'epg0',
    collection_id: getSchemaCollectionId('episodes'),
    visible: false,
    width: WIDTH_XL,
  },

  eps0: {
    name: 'People.SoundEngineer',
    type: 'relation',
    property: 'eps1',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },
  eps1: {
    name: 'Episodes.People.SoundEngineer',
    type: 'relation',
    property: 'eps0',
    collection_id: getSchemaCollectionId('episodes'),
    visible: false,
    width: WIDTH_XL,
  },

  ept0: {
    name: 'People.Thanks',
    type: 'relation',
    property: 'ept1',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },
  ept1: {
    name: 'Episodes.People.Thanks',
    type: 'relation',
    property: 'ept0',
    collection_id: getSchemaCollectionId('episodes'),
    visible: false,
    width: WIDTH_XL,
  },

  evr0: {
    name: 'Venues.RecordedAt',
    type: 'relation',
    property: 'evr1',
    collection_id: getSchemaCollectionId('venues'),
    visible: false,
    width: WIDTH_XL,
  },
  evr1: {
    name: 'Episodes.Venues.RecordAt',
    type: 'relation',
    property: 'evr0',
    collection_id: getSchemaCollectionId('episodes'),
    visible: false,
    width: WIDTH_XL,
  },

  /**
   * Podcasts
   */
  pph0: {
    name: 'Podcasts.People.Host',
    type: 'relation',
    property: 'pph1',
    collection_id: getSchemaCollectionId('podcasts'),
    visible: false,
    width: WIDTH_XL,
  },
  pph1: {
    name: 'People.Host',
    type: 'relation',
    property: 'pph0',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  /**
   * Events
   */
  ve00: {
    name: 'VenueIDs',
    type: 'relation',
    property: 've01',
    collection_id: getSchemaCollectionId('venues'),
    visible: false,
    width: WIDTH_XL,
  },
  ve01: {
    name: 'EventIDs',
    type: 'relation',
    property: 've00',
    collection_id: getSchemaCollectionId('events'),
    visible: false,
    width: WIDTH_XL,
  },

  se00: {
    name: 'ShowIDs',
    type: 'relation',
    property: 'se01',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  se01: {
    name: 'EventIDs',
    type: 'relation',
    property: 'se00',
    collection_id: getSchemaCollectionId('events'),
    visible: false,
    width: WIDTH_XL,
  },

  /**
   * People
   */
  spc4: {
    name: 'Shows.People.Cast',
    type: 'relation',
    property: 'spc5',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spc5: {
    name: 'People.Cast',
    type: 'relation',
    property: 'spc4',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  spc0: {
    name: 'Shows.People.CastPast',
    type: 'relation',
    property: 'spc1',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spc1: {
    name: 'People.CastPast',
    type: 'relation',
    property: 'spc0',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  spc2: {
    name: 'Shows.People.Crew',
    type: 'relation',
    property: 'spc3',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spc3: {
    name: 'People.Crew',
    type: 'relation',
    property: 'spc2',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },
  spd4: {
    name: 'Shows.People.Director',
    type: 'relation',
    property: 'spd5',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spd5: {
    name: 'People.Director',
    type: 'relation',
    property: 'spd4',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },
  spd0: {
    name: 'Shows.People.DirectorMusical',
    type: 'relation',
    property: 'spd1',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spd1: {
    name: 'People.DirectorMusical',
    type: 'relation',
    property: 'spd0',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  spd2: {
    name: 'Shows.People.DirectorTechnical',
    type: 'relation',
    property: 'spd3',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spd3: {
    name: 'People.DirectorTechnical',
    type: 'relation',
    property: 'spd2',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  spp0: {
    name: 'Shows.People.Producer',
    type: 'relation',
    property: 'spp1',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spp1: {
    name: 'People.Producer',
    type: 'relation',
    property: 'spp0',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  spw0: {
    name: 'Shows.People.Writer',
    type: 'relation',
    property: 'spw1',
    collection_id: getSchemaCollectionId('shows'),
    visible: false,
    width: WIDTH_XL,
  },
  spw1: {
    name: 'People.Writer',
    type: 'relation',
    property: 'spw0',
    collection_id: getSchemaCollectionId('people'),
    visible: false,
    width: WIDTH_XL,
  },

  /**
   * Pages
   * SEO
   */
  // ps00: {
  //   name: 'PageIDs',
  //   type: 'relation',
  //   property: 'ps01',
  //   collection_id: getSchemaCollectionId('pages'),
  //   visible: false,
  // },
  // ps01: {
  //   name: 'SEO',
  //   type: 'relation',
  //   property: 'ps00',
  //   collection_id: getSchemaCollectionId('seo'),
  //   visible: false,
  // },
}

export default schema
