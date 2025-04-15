import { envServer as env } from '@jeromefitz/next-config/env.server.mjs'

import { Client } from '@notionhq/client'

const notion = new Client({
  auth: env.NOTION_API_KEY,
})

export { notion }
