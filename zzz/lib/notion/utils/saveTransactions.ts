import _getUnixTime from 'date-fns/getUnixTime'

// import { v4 as uuidv4 } from 'uuid'
import rpc from '~lib/notion/rpc'

/**
 * @note https://localhost:3000/api/nst
 * @note https://www.notion.so/ngop/2ce29a5bb2024093ab6cac4b3fc82fa5
 * @todo Get this value prior?
 */
// const pageId = '2ce29a5b-b202-4093-ab6c-ac4b3fc82fa5'

// const operationsArray = [
//   {
//     id: pageId,
//     table: 'block',
//     path: ['properties', 'jOhI'],
//     command: 'set',
//     args: [['Testing 1234']],
//   },
// ]

// export const customData: any = {
//   requestId: uuidv4(),
//   transactions: [
//     {
//       id: uuidv4(),
//       shardId: parseInt(process.env.NOTION_SHARD),
//       spaceId: process.env.NOTION_SPACE_ID,
//       operations: operationsArray,
//     },
//   ],
// }

/**
 * @note Notion Uses Unix Timestamps
 */
export const timestamp = _getUnixTime(new Date())
// console.dir(`> saveTransactions`)
// console.dir(timestamp)

// @note custom
// const saveTransactions = () => {
//   return rpc('saveTransactions', customData)
// }

const saveTransactions = (data = null) => {
  // console.dir(`__ saveTransactions`)
  // console.dir(data.transactions[0].operations)
  return !!data && rpc('saveTransactions', data)
}

export default saveTransactions
