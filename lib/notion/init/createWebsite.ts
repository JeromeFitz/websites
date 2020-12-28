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

const data__Website = {
  requestId: getTransactionId(),
  transactions: [
    {
      id: getTransactionId(),
      shardId,
      spaceId,
      operations: [
        {
          id: notion.website.id,
          table: 'block',
          path: [],
          command: 'set',
          args: {
            type: 'page',
            id: notion.website.id,
            version: 1,
          },
        },
        {
          id: notion.website.id,
          table: 'block',
          path: [],
          command: 'update',
          args: {
            parent_id: notion.topLevel.id,
            parent_table: 'block',
            alive: true,
          },
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['content'],
          command: 'listAfter',
          args: { id: notion.website.id },
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['created_by_id'],
          command: 'set',
          args: dataUserId,
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['created_by_table'],
          command: 'set',
          args: 'notion_user',
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['created_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['last_edited_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['last_edited_by_id'],
          command: 'set',
          args: dataUserId,
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['last_edited_by_table'],
          command: 'set',
          args: 'notion_user',
        },
        {
          table: 'block',
          id: notion.topLevel.id,
          path: ['last_edited_time'],
          command: 'set',
          args: notionTimestamp(),
        },
        {
          id: notion.website.id,
          table: 'block',
          path: ['properties', 'title'],
          command: 'set',
          args: [[notion.website.title]],
        },
        {
          table: 'block',
          id: notion.website.id,
          path: ['format'],
          command: 'set',
          args: {
            page_font: 'mono',
          },
        },
        {
          id: notion.website.id,
          table: 'block',
          path: ['format', 'page_icon'],
          command: 'set',
          args: notion.website.icon,
        },
      ],
    },
  ],
}

const createWebsite = async () => {
  await setTransaction(data__Website)
}

export default createWebsite
