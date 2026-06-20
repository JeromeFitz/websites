import { Client } from '@notionhq/client'
import { envServer as env } from 'next-config/env.server'

const notion = new Client({
  auth: env.NOTION_API_KEY,
})

export { notion }
