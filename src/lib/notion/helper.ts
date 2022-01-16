import { Client } from '@jeromefitz/notion'

import { notionConfig as config } from '~config/websites'

const notion = new Client({ auth: process.env.NOTION_API_KEY, config })

export { notion }
