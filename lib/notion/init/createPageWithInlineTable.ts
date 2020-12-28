/**
 * @todo
 * 1. Check before creating
 * Y) EXISTS: Throw Error / Warning
 * N) DOES NOT EXIST: Create
 */
import _map from 'lodash/map'
import _merge from 'lodash/merge'
import fetch from 'node-fetch'

import { notion, routeTypesArray } from '~config/notion/website'
import schema__routeTypes from '~config/notion/schema/routeTypes'

import getTransactionId from '~lib/notion/utils/getTransactionId'
import saveTransactions from '~lib/notion/utils/saveTransactions'
import notionTimestamp from '~lib/notion/utils/notionTimestamp'

// const isDebug = false
const dataParentId = notion.website.id
const shardId = parseInt(process.env.NOTION_SHARD)
const spaceId = process.env.NOTION_SPACE_ID

/**
 * @note This is very manual right now and needs to change esch time you run it.
 */
// const routeTypeData = routeTypes['blog']
// const routeTypeData = routeTypes['episodes']
// const routeTypeData = routeTypes['events']
// const routeTypeData = routeTypes['pages']
// const routeTypeData = routeTypes['people']
// const routeTypeData = routeTypes['podcasts']
// const routeTypeData = routeTypes['seo']
// const routeTypeData = routeTypes['shows']
// const routeTypeData = routeTypes['users']
// const routeTypeData = routeTypes['venues']

/**
 * @note true|false
 * We cannot __cannot__ overrwrite existing data which is what will happen right now.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function checkIfPageExist() {}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getUserId() {
  const res = await fetch(`${process.env.NOTION_API_URL}/loadUserContent`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: `token_v2=${process.env.NOTION_TOKEN}`,
      'x-notion-active-user-header': process.env.NOTION_USER_ID,
    },
    body: '{}',
  })

  if (!res.ok) {
    throw new Error(`failed to get Notion user id, request status: ${res.status}`)
  }
  const data = await res.json()
  return Object.keys(data.recordMap.notion_user)[0]
}

const setTransaction = async (data) => {
  await saveTransactions(data)
}

async function createPageWithInlineTable() {
  await _map(routeTypesArray, (routeType) => {
    const routeTypeSchema = schema__routeTypes[routeType]
    const id = Object.keys(routeTypeSchema)[0]
    const pageId = id
    const dataPageId = pageId
    const routeTypeData = _merge({ dataPageId, id, pageId }, routeTypeSchema[id])
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createRouteType(routeTypeData)
  })

  return true
}

async function createRouteType(routeTypeData) {
  // @note Custom pass-through data
  const { dataPageId, pageId } = routeTypeData
  // @note Original Route Type Data
  const {
    collectionId,
    collectionViewIds,
    description,
    icon,
    name,
    schema,
  } = routeTypeData

  // @note If this is SSR, we can reduce calls
  // const dataUserId = await getUserId()
  const dataUserId = process.env.NOTION_USER_ID

  const data = {
    requestId: getTransactionId(),
    transactions: [
      {
        id: getTransactionId(),
        shardId,
        spaceId,
        operations: [
          {
            id: dataPageId,
            table: 'block',
            path: [],
            command: 'set',
            args: {
              type: 'page',
              id: dataPageId,
              version: 1,
            },
          },
          {
            id: dataPageId,
            table: 'block',
            path: [],
            command: 'update',
            args: {
              parent_id: dataParentId,
              parent_table: 'block',
              alive: true,
            },
          },
          {
            table: 'block',
            id: dataParentId,
            path: ['content'],
            command: 'listAfter',
            args: {
              id: dataPageId,
            },
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['created_by_id'],
            command: 'set',
            args: dataUserId,
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['created_by_table'],
            command: 'set',
            args: 'notion_user',
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['created_time'],
            command: 'set',
            args: notionTimestamp(),
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['last_edited_time'],
            command: 'set',
            args: notionTimestamp(),
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['last_edited_by_id'],
            command: 'set',
            args: dataUserId,
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['last_edited_by_table'],
            command: 'set',
            args: 'notion_user',
          },
        ],
      },
    ],
  }

  const unstable__collectionViewPushes = []
  const unstable__collectionViewIds = []

  const collection_page_properties = []

  // eslint-disable-next-line @typescript-eslint/require-await
  _map(schema, async (s: any, sIndex: any) => {
    collection_page_properties.push({
      property: sIndex,
      visible: !!s.visible ? s.visible : false,
    })
  })

  await _map(collectionViewIds, (collectionView, collectionViewId) => {
    unstable__collectionViewIds.push(collectionViewId)
    unstable__collectionViewPushes.push({
      id: collectionViewId,
      table: 'collection_view',
      path: [],
      command: 'update',
      args: {
        id: collectionViewId,
        version: 1,
        type: 'table',
        name: collectionView.title,
        format: {
          table_properties: collection_page_properties,
          table_wrap: true,
        },
        query2: collectionView.query,
        page_sort: [],
        parent_id: dataPageId,
        parent_table: 'block',
        alive: true,
      },
    })
  })

  const dataTable = {
    requestId: getTransactionId(),
    transactions: [
      {
        id: getTransactionId(),
        shardId,
        spaceId,
        operations: [
          {
            id: dataPageId,
            table: 'block',
            path: [],
            command: 'update',
            args: {
              id: dataPageId,
              type: 'collection_view_page',
              collection_id: collectionId,
              view_ids: [],
              properties: {},
              created_time: notionTimestamp(),
              last_edited_time: notionTimestamp(),
            },
          },
          {
            id: collectionId,
            table: 'collection',
            path: [],
            command: 'update',
            args: {
              id: collectionId,
              schema,
              format: {
                collection_page_properties,
              },
              parent_id: dataPageId,
              parent_table: 'block',
              alive: true,
            },
          },
          {
            id: collectionId,
            table: 'collection',
            path: [],
            command: 'update',
            args: { format: {} },
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['last_edited_time'],
            command: 'set',
            args: notionTimestamp(),
          },
          {
            id: collectionId,
            table: 'collection',
            path: ['name'],
            command: 'set',
            args: [[name]],
          },
          {
            id: collectionId,
            table: 'collection',
            path: ['icon'],
            command: 'set',
            args: icon,
          },
          {
            id: collectionId,
            table: 'collection',
            path: ['description'],
            command: 'set',
            args: description,
          },
        ],
      },
    ],
  }

  const dataViewsDynamic = {
    requestId: getTransactionId(),
    transactions: [
      {
        id: getTransactionId(),
        shardId,
        spaceId,
        operations: [
          {
            id: dataPageId,
            table: 'block',
            path: [],
            command: 'update',
            args: {
              view_ids: [...unstable__collectionViewIds],
            },
          },
          {
            table: 'block',
            id: dataPageId,
            path: ['last_edited_time'],
            command: 'set',
            args: notionTimestamp(),
          },
        ],
      },
    ],
  }

  await _map(unstable__collectionViewPushes, (cvp) =>
    dataViewsDynamic.transactions[0].operations.push(cvp)
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataDelete = {
    requestId: getTransactionId(),
    transactions: [
      {
        id: getTransactionId(),
        shardId,
        spaceId,
        operations: [
          {
            id: pageId,
            table: 'block',
            path: [],
            command: 'update',
            args: { alive: false },
          },
          {
            table: 'block',
            id: notion.website.id,
            path: ['content'],
            command: 'listRemove',
            args: { id: pageId },
          },
        ],
      },
    ],
  }

  // isDebug && console.dir(`$ createPageWithInlineTable`)
  // isDebug && console.dir(`$ > data`)
  // isDebug && console.dir(data)
  // isDebug && console.dir(`$ > dataTable`)
  // isDebug && console.dir(dataTable)
  // isDebug && console.dir(`$ > dataViewsDynamic`)
  // isDebug && console.dir(dataViewsDynamic)

  await setTransaction(data)
  await setTransaction(dataTable)
  await setTransaction(dataViewsDynamic)
  // await setTransaction(dataDelete)
}

export default createPageWithInlineTable
