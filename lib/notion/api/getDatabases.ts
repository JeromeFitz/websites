import { notion } from '~utils/notion/helper'

const getDatabases = async () => {
  return await notion.databases.list()
}

export default getDatabases
