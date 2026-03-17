/**
 * @hack(database) want to pull data from the CMS, but not the layout...
 *
 * for now, eject the actual data points for mocking
 *
 * basically... need to re-write all the content and no longer feel like using Notion
 */

type Person = {
  nameFirst: string
  nameLast: string
  nameNick: string
}
type People = Person[]

enum ShowType {
  improv,
  'musical-improv',
  sketch,
  'stand-up',
  variety,
}

type Show = {
  title: string
  type: ShowType
  credits: {
    cast: People
    castEmeritus: People
    crew: People
    thanks: People
  }
}

export type { Show }
