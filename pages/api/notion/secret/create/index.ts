// import _map from 'lodash/map'
import _noop from 'lodash/noop'
import { NextApiRequest, NextApiResponse } from 'next'
// import { v4 as uuid } from 'uuid'

import asyncForEach from '~lib/asyncForEach'
import createDatabase from '~lib/notion/api/createDatabase'
// import createPage from '~lib/notion/api/createPage'
import getDatabasesById from '~lib/notion/api/getDatabasesById'
import updateDatabase from '~lib/notion/api/updateDatabase'
import { INIT } from '~lib/notion/schema'

// // https://developers.notion.com/reference/page#page-parent
// const WORKSPACE = {
//   object: 'string',
//   id: 'c65675aae0474f05bcd8c93a122128fc',
//   icon: {
//     type: 'emoji',
//     emoji: '⚗️',
//   },
//   properties: {
//     title: 'test.com',
//   },
// }

const DATA_GROUPING = {
  global: '8bc8a899-e57b-4fa9-b2de-8b08aec95608',
  website: 'd5a81133-b481-4efd-9b96-ea7d11ccc5ae',
}

const DATABASES__INIT = {
  BLOG: { emoji: '🤢', emojiNew: '📝️' },
  EPISODES: { emoji: '🤢', emojiNew: '📇️' },
  EVENTS: { emoji: '🤢', emojiNew: '🗓️' },
  PAGES: { emoji: '🤢', emojiNew: '📜️' },
  PEOPLE: { emoji: '🤢', emojiNew: '🧑‍🤝‍🧑️' },
  PODCASTS: { emoji: '🤢', emojiNew: '🎙️' },
  SEO: { emoji: '🤢', emojiNew: '🌐️' },
  SHOWS: { emoji: '🤢', emojiNew: '🎭️' },
  VENUES: { emoji: '🤢', emojiNew: '🏛️' },
}

// const created = {
//   BLOG: { emoji: '😀', id: '6e6f90ff-a889-42a3-b6cc-58ecdf39b6bb' },
//   EPISODES: { emoji: '😀', id: 'e9e9de47-f797-456c-b943-fdddbc3ba836' },
//   EVENTS: { emoji: '😀', id: '477f7390-07ba-476c-8286-8f4734a99629' },
//   PAGES: { emoji: '😀', id: '36dc57b9-dc66-48f0-871e-dc21131a7ba6' },
//   PEOPLE: { emoji: '😀', id: 'ba284beb-1eed-4eca-9acc-5c59eac9804f' },
//   PODCASTS: { emoji: '😀', id: '5e152168-561f-432d-85af-6a5bbf4873df' },
//   SEO: { emoji: '😀', id: '5a4ed54e-eae8-4817-8095-e3a583cf4bf1' },
//   SHOWS: { emoji: '😀', id: '40486ad0-1ae3-45df-b45a-e77565575b05' },
//   VENUES: { emoji: '😀', id: '9dad85b3-6cf7-4f30-9397-8b889aceedc6' },
// }

const getPropertiesInitial = (items) => {
  const properties = {}
  for (let i = 0; i < items.length; i++) {
    const key = items[i].notion
    const type = items[i].type

    if (['formula', 'multi_select', 'relation', 'rollup', 'select'].includes(type))
      continue

    properties[key] = {
      name: key,
      type: type,
      [type]: type === 'number' ? { format: items[i].format } : {},
    }
  }

  return properties
}

const getPropertiesRelations = (items) => {
  const properties = {}
  for (let i = 0; i < items.length; i++) {
    const key = items[i].notion
    const type = items[i].type

    if (['relation'].includes(type)) {
      const database_id =
        DATABASES__INIT[items[i].relation.database_id.toUpperCase()].id
      const synced_property_name = items[i].relation.synced_property_name

      properties[key] = {
        name: key,
        type: type,
        [type]: {
          database_id,
          synced_property_name,
        },
      }
    }
    continue
  }

  return properties
}

const Create = async (req: NextApiRequest, res: NextApiResponse) => {
  /**
   * @step 00. WORKSPACE
   *
   * ex) jeromefitzgerald.com
   *
   * @note This must be created manually
   * ref: https://developers.notion.com/docs#getting-started
   */

  /**
   * @step 01. Data Grouping
   *
   * ex) Global, Website
   *
   * @note This must be created manually
   * ref: https://developers.notion.com/docs#getting-started
   */

  /**
   * @step 02. Databases
   *
   * ex) Global => Images, Tags
   * ex) Website => Blog, Episodes, Events, Pages, People, Podcasts, Shows, ...
   */

  // console.dir(INIT.BLOG)
  // console.dir(getProperties(INIT.BLOG))

  // !!! CREATE ALL DATABASE w/o RELATIONS or ROLLUPS
  // _map(INIT, (item) => {
  //   console.dir
  //   console.dir(getPropertiesInitial(item))
  // })
  const loopItems = []
  Object.keys(INIT).map((db) => loopItems.push(db))

  // CREATE
  await asyncForEach(loopItems, async (DATABASE) => {
    const { emoji } = DATABASES__INIT[DATABASE.toUpperCase()]

    const data = {
      parent: {
        type: 'page_id',
        page_id: DATA_GROUPING.website,
      },
      icon: {
        type: 'emoji',
        emoji,
      },
      title: [
        {
          type: 'text',
          text: {
            content: DATABASE,
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
          plain_text: DATABASE,
          href: null,
        },
      ],
      properties: getPropertiesInitial(INIT[DATABASE]),
    }

    // console.dir(getPropertiesInitial(INIT[DATABASE]))
    // console.dir(data)
    const dbData = await createDatabase({ ...data })
    console.dir(`---`)
    console.dir(`${DATABASE} (${dbData.id})`)
    DATABASES__INIT[DATABASE].id = dbData.id
  }).catch(_noop)

  // !!! CYCLE BACK AND THEN UPDATE EACH w/ RELATIONS & ROLLUPS
  await asyncForEach(loopItems, async (DATABASE) => {
    console.dir(`>>>`)
    const { id } = DATABASES__INIT[DATABASE]
    console.dir(`${DATABASE} (${id})`)
    const data = {
      database_id: id,
      properties: getPropertiesRelations(INIT[DATABASE]),
    }
    await updateDatabase(data)

    // console.dir(getPropertiesRelations(INIT[DATABASE]))
  }).catch(_noop)

  // !!! ONE MORE TIME TO FIX SYNC NAMES JFC
  await asyncForEach(loopItems, async (DATABASE) => {
    console.dir(`___`)
    const { id } = DATABASES__INIT[DATABASE]
    console.dir(`${DATABASE} (${id})`)
    const test = await getDatabasesById({ databaseId: id })
    console.dir(test)
  }).catch(_noop)

  console.dir(DATABASES__INIT)

  /**
   * @step 03. Database Content
   */

  res.status(200).json({})
}

export default Create
