import { Client } from '@jeromefitz/notion'
import type { CredentialProps } from '@jeromefitz/notion'

import { notionConfig as config } from '~config/websites'

const credentials: CredentialProps = {
  auth: process.env.NOTION_API_KEY,
  config,
}

const notion = new Client({ ...credentials })

export { notion }
