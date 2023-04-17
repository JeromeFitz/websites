import { Client } from '@jeromefitz/notion'
import type { CredentialProps } from '@jeromefitz/notion'

/**
 * @todo(shared) this needs to be passed to `getStaticPathsCatchAll`
 */
// import { notionConfig as config } from '~config/index'

const auth: string = process.env.NOTION_API_KEY || ''

const credentials: CredentialProps = {
  auth,
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
