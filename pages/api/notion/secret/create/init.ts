import _find from 'lodash/find'
import _map from 'lodash/map'
import _noop from 'lodash/noop'
import _startsWith from 'lodash/startsWith'
import { NextApiRequest, NextApiResponse } from 'next'
import _title from 'title'

import asyncForEach from '~lib/asyncForEach'
import createDatabase from '~lib/notion/api/createDatabase'
import getDatabasesById from '~lib/notion/api/getDatabasesById'
import updateDatabase from '~lib/notion/api/updateDatabase'
import { INIT } from '~lib/notion/schema'

const DATA_GROUPING = {
  global: '8bc8a899-e57b-4fa9-b2de-8b08aec95608',
  website: 'd5a81133-b481-4efd-9b96-ea7d11ccc5ae',
}

const DATABASES__INIT = {
  BLOG: { id: '', emoji: '🤢', emojiNew: '📝️', name: 'BLOG' },
  EPISODES: { id: '', emoji: '🤢', emojiNew: '📇️', name: 'EPISODES' },
  EVENTS: { id: '', emoji: '🤢', emojiNew: '🗓️', name: 'EVENTS' },
  PAGES: { id: '', emoji: '🤢', emojiNew: '📜️', name: 'PAGES' },
  PEOPLE: { id: '', emoji: '🤢', emojiNew: '🧑‍🤝‍🧑️', name: 'PEOPLE' },
  PODCASTS: { id: '', emoji: '🤢', emojiNew: '🎙️', name: 'PODCASTS' },
  SEO: { id: '', emoji: '🤢', emojiNew: '🌐️', name: 'SEO' },
  SHOWS: { id: '', emoji: '🤢', emojiNew: '🎭️', name: 'SHOWS' },
  VENUES: { id: '', emoji: '🤢', emojiNew: '🏛️', name: 'VENUES' },
}

// @todo(types)
const getPropertiesInitial = (items: string | any[]) => {
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

// @todo(types)
const getPropertiesRelations = (items: string | any[]) => {
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

// @todo(types)
const getPropertiesRollups = (items: string | any[]) => {
  const properties = {}

  for (let i = 0; i < items.length; i++) {
    const key = items[i].notion
    const type = items[i].type

    if (['rollup'].includes(type)) {
      properties[key] = {
        name: key,
        type: type,
        [type]: items[i].rollup,
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

  // !!! CREATE ALL DATABASE w/o RELATIONS or ROLLUPS
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

    const dbData = await createDatabase({ ...data })

    // console.dir(`---`)
    // console.dir(`${DATABASE} (${dbData.id})`)

    DATABASES__INIT[DATABASE].id = dbData.id
  }).catch(_noop)

  // !!! CYCLE BACK AND THEN UPDATE EACH w/ RELATIONS
  await asyncForEach(loopItems, async (DATABASE) => {
    const { id } = DATABASES__INIT[DATABASE]

    // console.dir(`>>>`)
    // console.dir(`${DATABASE} (${id})`)

    const data = {
      database_id: id,
      properties: getPropertiesRelations(INIT[DATABASE]),
    }

    await updateDatabase(data)
  }).catch(_noop)

  // !!! CYCLE BACK AND FIX THE NAMES FOR RELATIONS
  await asyncForEach(loopItems, async (DATABASE) => {
    const { id, name } = DATABASES__INIT[DATABASE]

    // console.dir(`___`)
    // console.dir(`${DATABASE} (${id})`)

    // todo(any)
    const _dataTemp: any = await getDatabasesById({ databaseId: id })
    const loopProperties = []
    _map(_dataTemp.properties, (property) => loopProperties.push(property))

    await asyncForEach(loopProperties, async (property) => {
      if (_startsWith(property.name, 'Related to')) {
        const relation_id = property.id
        const relation_databaseId = property.relation.database_id
        const relation_syncedPropertyName = property.relation.synced_property_name
        const found = _find(DATABASES__INIT, { id: relation_databaseId })

        const swap = _title(
          relation_syncedPropertyName.toUpperCase().replace(name, found.name)
        )

        // console.dir(`***`)
        // console.dir(`FROM: ${property.name} (${property.id})`)
        // console.dir(`TO: ${swap}`)

        const properties = {
          [relation_id]: {
            name: swap,
          },
        }

        const data = {
          database_id: id,
          properties,
        }
        // console.dir(data)
        await updateDatabase(data)
      }
    }).catch(_noop)
  }).catch(_noop)

  // !!! CYCLE BACK AND THEN UPDATE EACH w/ ROLLUPS since RELATIONS are updated
  await asyncForEach(loopItems, async (DATABASE) => {
    const { id } = DATABASES__INIT[DATABASE]

    // console.dir(`>>>`)
    // console.dir(`${DATABASE} (${id})`)

    const data = {
      database_id: id,
      properties: getPropertiesRollups(INIT[DATABASE]),
    }

    await updateDatabase(data)
  }).catch(_noop)

  const output = DATABASES__INIT

  /**
   * @step 03. Database Content
   */

  res.status(200).json(output)
}

export default Create
