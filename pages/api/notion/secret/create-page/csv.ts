import fs from 'fs'
import path from 'path'

import csv from 'csv-parser'
import _map from 'lodash/map'
import _size from 'lodash/size'
import { NextApiRequest, NextApiResponse } from 'next'
import nodeEmoji from 'node-emoji'

import createPage from '~lib/notion/api/createPage'
import getChildren from '~lib/notion/create/children'
import getProperties from '~lib/notion/create/properties'
import getCatchAll from '~lib/notion/getCatchAll'
import { DATABASES } from '~utils/notion/helper'

const dataDirectory = path.join(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  '..',
  '..',
  'data'
)
// const dataFilename = path.resolve(dataDirectory, 'podcasts--knockoffs.csv')
const dataFilename = path.resolve(
  dataDirectory,
  'podcasts--jer-and-ky-and-guest.csv'
)

const isObjectEmptyDeep = (obj) =>
  Object.values(obj).every((x) =>
    Object.values(x).every(
      (x2) => 0 === Object.entries(x2).length && x2.constructor === Object
    )
  )

const results = []
const csvApi = (req: NextApiRequest, res: NextApiResponse) => {
  fs.createReadStream(dataFilename)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      _map(results, async (item) => {
        const properties = getProperties(item)
        // @todo(notion) DRY
        const children = getChildren({
          text: properties['SEO.Description'].rich_text[0].plain_text,
        })
        // const properties = { ...item, slug }
        // console.dir(properties)

        /**
         * @setup
         */
        // @todo(notion) DRY
        const routeType = 'episodes'
        const databaseId = DATABASES[routeType]
        if (!databaseId) res.status(404).json({ _csv: false })

        // @todo(notion) DRY
        const icon = {
          type: 'emoji',
          emoji: nodeEmoji.hasEmoji(item.emoji.trim())
            ? nodeEmoji.find(item.emoji.trim()).emoji
            : '🍤️',
        }

        const page = {
          object: 'page',
          cover: null,
          icon,
          parent: {
            database_id: databaseId,
          },
          properties,
          children,
        }

        // console.dir(page)

        let data = null
        // let _data = null,
        //   _type = 'exists',
        //   _id

        const slug = properties['Slug'].rich_text[0].plain_text
        // @todo(notion) DRY
        const catchAll = ['podcasts', 'knockoffs', slug]
        data = await getCatchAll({
          preview: false,
          cache: false,
          clear: false,
          catchAll,
        })
        if (
          !data ||
          data === undefined ||
          (_size(data.content) === 0 && isObjectEmptyDeep(data.info))
        ) {
          data = await createPage({ ...page })
          // _type = 'create'
          // _data = data
          // _id = _data.id

          // Get Latest Data
          data = await getCatchAll({
            preview: false,
            cache: false,
            clear: false,
            catchAll,
          })
        } else {
          // _id = data.info.id
        }

        // console.dir({ _type, _id, ...data })
      })
    })

  res.status(200).json({ _csv: true })
}

export default csvApi
