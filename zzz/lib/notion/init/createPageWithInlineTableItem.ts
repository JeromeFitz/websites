/**
 * @todo Naming Convetions on all of these.
 * Right now this falls under `Sites`, but ... need to be more flexible.
 *
 * 1. Check if Top Level `Sites` exists.
 * Y: Check if `Website` exists.
 *  Y: Skip
 *  N: Create
 * N: Create `Sites` => `Website`
 *
 */
// import { getSchemaKey } from '~config/notion/schema/getSchema'
import getTransactionId from '~lib/notion/utils/getTransactionId'
import notionTimestamp from '~lib/notion/utils/notionTimestamp'
import saveTransactions from '~lib/notion/utils/saveTransactions'
/**
 * Static Variables
 */
const shardId = parseInt(process.env.NOTION_SHARD)
const spaceId = process.env.NOTION_SPACE_ID
const dataUserId = process.env.NOTION_USER_ID
/**
 * Temp Variables
 */
/**
 * This should be a function that takes seed data and maps through
 */
const NOTION__PAGE__ID = 'f09fac69-3045-46cc-9209-44b13665bada'
const NOTION__PAGE__COLLECTION__ID = 'cd6f2e2f-3e1d-482b-9891-530501f1c797'
const NOTION__PAGE__COLLECTION_VIEW_ID__SLUG = '29b6acc9-24e4-46f1-996f-94c0a38fac13'

const NOTION__PAGE__TABLE_ITEM__ID = 'f9292c4d-5a95-4ca1-a9d2-55aebb4793b4'

/**
 * @todo DRY this elsewhere
 */
const setTransaction = async (data) => {
  await saveTransactions(data)
}

const data__tableItem = {
  requestId: getTransactionId(),
  transactions: [
    {
      id: getTransactionId(),
      shardId,
      spaceId,
      operations: [
        {
          id: NOTION__PAGE__TABLE_ITEM__ID,
          table: 'block',
          path: [],
          command: 'set',
          args: {
            type: 'page',
            id: NOTION__PAGE__TABLE_ITEM__ID,
            version: 1,
          },
        },
        {
          table: 'collection_view',
          id: NOTION__PAGE__COLLECTION_VIEW_ID__SLUG,
          path: ['page_sort'],
          command: 'listAfter',
          args: { id: NOTION__PAGE__TABLE_ITEM__ID },
        },
        /**
         * This is it right here. Find out how to import with HUman Readable.
         */
        {
          id: NOTION__PAGE__TABLE_ITEM__ID,
          table: 'block',
          path: ['properties'],
          command: 'update',
          args: {
            // [getSchemaKey('Slug')]: [['s01e01--slug']],
            s2s0: [['s01e01--slug']],
          },
        },
        /**
         * ABOVE
         */
        {
          id: NOTION__PAGE__TABLE_ITEM__ID,
          table: 'block',
          path: [],
          command: 'update',
          args: {
            parent_id: NOTION__PAGE__COLLECTION__ID,
            parent_table: 'collection',
            alive: true,
          },
        },
        {
          table: 'block',
          id: NOTION__PAGE__TABLE_ITEM__ID,
          path: ['created_by_id'],
          command: 'set',
          args: dataUserId,
        },
        {
          table: 'block',
          id: NOTION__PAGE__TABLE_ITEM__ID,
          path: ['created_by_table'],
          command: 'set',
          args: 'notion_user',
        },
        {
          table: 'block',
          id: NOTION__PAGE__TABLE_ITEM__ID,
          path: ['created_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          table: 'block',
          id: NOTION__PAGE__TABLE_ITEM__ID,
          path: ['last_edited_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          table: 'block',
          id: NOTION__PAGE__TABLE_ITEM__ID,
          path: ['last_edited_by_id'],
          command: 'set',
          args: dataUserId,
        },
        {
          table: 'block',
          id: NOTION__PAGE__TABLE_ITEM__ID,
          path: ['last_edited_by_table'],
          command: 'set',
          args: 'notion_user',
        },
        {
          table: 'block',
          id: NOTION__PAGE__ID,
          path: ['last_edited_time'],
          command: 'set',
          args: notionTimestamp(),
        },
      ],
    },
  ],
}

const createTableItem = async () => {
  await setTransaction(data__tableItem)
}

export default createTableItem
