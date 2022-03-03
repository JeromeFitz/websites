import { Client } from '@jeromefitz/notion'
import type { CredentialProps } from '@jeromefitz/notion'

/**
 * @todo(shared) this needs to be passed to `getStaticPathsCatchAll`
 */
// import { notionConfig as config } from '~config/index'

const credentials: CredentialProps = {
  auth: process.env.NOTION_API_KEY,
  // config,
  config: {},
}

const notion = new Client({ ...credentials })

const getNotion = (c) =>
  new Client({
    auth: process.env.NOTION_API_KEY,
    config: c,
  })

export { getNotion, notion }
