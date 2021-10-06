import Slugger from 'github-slugger'

const slugger = new Slugger()

const title = 'Foo Bar Baz'

const authorsPeople = [
  {
    object: 'user',
    id: 'd8d106ae-2f52-4317-96c9-8b0609bf5336',
    name: 'Jerome Fitzgerald',
    avatar_url:
      'https://s3-us-west-2.amazonaws.com/public.notion-static.com/fcc19491-1e4a-4fd7-9e0b-b1934bdd7e2d/jerome-mask--big-heads-2.png',
    type: 'person',
    person: {
      email: 'jeromes@gmail.com',
    },
  },
]
const date = '2020-01-06T08:00:00.000-05:00'
const datePublished = '2020-01-06T08:00:00.000-05:00'
const dateRecorded = '2019-12-14T14:00:00.000-05:00'
const duration = '4:00.550'
const episode = 3
const explicit = true
const peopleGuest = [
  {
    id: 'c9104d53-6039-4b87-8771-df75b93d3c2c',
  },
]
const peopleSoundEngineer = [
  {
    id: 'e1472584-5481-4bc8-a7ea-c245fff1d993',
  },
]
const peopleThanks = []
const venuesRecordedAt = [
  {
    id: '355ee4fe-b3d9-4a5f-9b6c-816e72515e48',
  },
]
const mp3 =
  'https://cdn.jerandky.com/jerandky.com/podcasts/jer-and-ky-and-guest/season-01/s01e01--aid--01--greg-gillotti.mp3'
const noIndex = false
const published = true
const podcastIds = [
  {
    id: '71e19359-d082-4507-bf6c-f51e8bd853d0',
  },
]
const season = 1
const seoDescription =
  'The inaugural episode of Jer & Ky & Guest which also happens to be the inaugural mini-episode of Am I Dracula. Featuring Greg Gillotti (The Death Show).'
const seoImage =
  'https://cdn.jerandky.com/jerandky.com/podcasts/jer-and-ky-and-guest/season-01/_original/s01e01--aid--01--greg-gillotti.jpg'
const seoImageDescription = 'Ky, Greg, Jer (📸️ Jesse LE)'
const slug = slugger.slug(title)
const tags = []
const type = {
  name: 'full',
}

const properties = {
  Authors: {
    people: authorsPeople,
  },
  Date: {
    date: {
      start: date,
      end: null,
    },
  },
  'Date.Published': {
    date: {
      start: datePublished,
      end: null,
    },
  },
  'Date.Recorded': {
    date: {
      start: dateRecorded,
      end: null,
    },
  },
  Duration: {
    // text: duration,
    rich_text: [
      {
        type: 'text',
        text: {
          content: duration,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        plain_text: duration,
        href: null,
      },
    ],
  },
  Episode: {
    number: episode,
  },
  Explicit: {
    checkbox: explicit,
  },
  'People.Guest': {
    relation: peopleGuest,
  },
  'People.SoundEngineer': {
    relation: peopleSoundEngineer,
  },
  'People.Thanks': {
    relation: peopleThanks,
  },
  'Venues.RecordedAt': {
    relation: venuesRecordedAt,
  },
  MP3: {
    files: [
      {
        name: mp3,
        type: 'external',
        external: {
          url: mp3,
        },
      },
    ],
  },
  NoIndex: {
    checkbox: noIndex,
  },
  Published: {
    checkbox: published,
  },
  PodcastIDs: {
    relation: podcastIds,
  },
  Season: {
    number: season,
  },
  'SEO.Description': {
    // text: seoDescription,
    rich_text: [
      {
        type: 'text',
        text: {
          content: seoDescription,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        plain_text: seoDescription,
        href: null,
      },
    ],
  },
  'SEO.Image': {
    files: [
      {
        name: seoImage,
        type: 'external',
        external: {
          url: seoImage,
        },
      },
    ],
  },
  'SEO.Image.Description': {
    // text: seoImageDescription,
    rich_text: [
      {
        type: 'text',
        text: {
          content: seoImageDescription,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        plain_text: seoImageDescription,
        href: null,
      },
    ],
  },
  Slug: {
    // text: slug,
    rich_text: [
      {
        type: 'text',
        text: {
          content: slug,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        plain_text: slug,
        href: null,
      },
    ],
  },
  Type: {
    select: type,
  },
  Tags: {
    relation: tags,
  },
  Title: {
    // text: title,
    title: [
      {
        type: 'text',
        text: {
          content: title,
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: 'default',
        },
        plain_text: title,
        href: null,
      },
    ],
  },
}

export { slug }
export default properties
