import { notion } from '~utils/notion/helper'

const getDatabasesById = async ({ databaseId }) => {
  return await notion.databases.retrieve({ database_id: databaseId })
}

export default getDatabasesById
