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
import { notion } from '~config/notion/website'
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
 * @todo DRY this elsewhere
 */
const setTransaction = async (data) => {
  await saveTransactions(data)
}

const data__topLevel = {
  requestId: getTransactionId(),
  transactions: [
    {
      id: getTransactionId(),
      shardId,
      spaceId,
      operations: [
        {
          id: notion.topLevel.id,
          table: 'block',
          path: [],
          command: 'set',
          args: {
            type: 'page',
            id: notion.topLevel.id,
            version: 1,
          },
        },
        {
          id: notion.topLevel.id,
          table: 'block',
          path: [],
          command: 'update',
          args: {
            permissions: [
              {
                type: 'user_permission',
                role: 'editor',
                user_id: dataUserId,
              },
            ],
          },
        },
        {
          id: notion.topLevel.id,
          table: 'block',
          path: [],
          command: 'update',
          args: {
            parent_id: spaceId,
            parent_table: 'space',
            alive: true,
          },
        },
        {
          table: 'space',
          id: spaceId,
          path: ['pages'],
          command: 'listBefore',
          args: { id: notion.topLevel.id },
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['created_by_id'],
          command: 'set',
          args: dataUserId,
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['created_by_table'],
          command: 'set',
          args: 'notion_user',
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['created_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['format'],
          command: 'set',
          args: {
            page_font: 'mono',
          },
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['last_edited_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['last_edited_by_id'],
          command: 'set',
          args: dataUserId,
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['last_edited_by_table'],
          command: 'set',
          args: 'notion_user',
        },
        {
          table: 'space',
          id: spaceId,
          path: ['last_edited_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          id: notion.topLevel.id,
          table: 'block',
          path: ['properties', 'title'],
          command: 'set',
          args: [[notion.topLevel.title]],
        },
        {
          id: notion.topLevel.id,
          table: 'block',
          path: ['properties', 'title'],
          command: 'set',
          args: [[notion.topLevel.title]],
        },
        {
          id: notion.topLevel.id,
          table: 'block',
          path: ['format', 'page_icon'],
          command: 'set',
          args: notion.topLevel.icon,
        },
      ],
    },
  ],
}

const createTopLevel = async () => {
  await setTransaction(data__topLevel)
}

export default createTopLevel
