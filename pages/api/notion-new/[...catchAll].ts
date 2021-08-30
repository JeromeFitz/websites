import { Client } from '@notionhq/client'
import { NextApiRequest, NextApiResponse } from 'next'

import { getPathVariables } from '~utils/notion/prepareNotionData'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const TYPES = {
  blog: 'blog',
  episodes: 'episodes',
  events: 'events',
  pages: 'pages',
  people: 'people',
  podcasts: 'podcasts',
  seo: 'seo',
  shows: 'shows',
  users: 'users',
  venues: 'venues',
}

const DATABASES = {
  blog: 'baee64b0-8851-4522-8afb-e15a9ea5a910',
  episodes: 'd67380f6-8492-4fb5-9b1d-b4ed8880155b',
  events: '781c7375-e20e-487f-a5d9-6e565f7a2d07',
  pages: '3e9add0f-399c-4ae5-a48f-fb13f23e6992',
  people: '13540a89-ef44-4aec-85ba-1bc05e9a7123',
  podcasts: '22e65a94-72eb-4fc0-abe2-b1f9da3e3433',
  seo: '810db8a2-71b6-4087-b61c-212bc81dbabe',
  shows: '2a8cf797-1eae-4dc4-991f-b6b5ac981f51',
  users: 'ddfc7897-eb59-442e-a64e-578d8ae8bee9',
  venues: '8b3f4ae6-ecf7-48ad-8ae9-8b69528e2110',
}

const pageId = 'e850b6ac-947a-4f2d-82cc-ad899ae2adb1'

const notionApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const preview = req.query?.preview || false
    // const clear = req.query?.clear || false
    const catchAll = req.query.catchAll

    console.dir(catchAll)
    // http://localhost:3000/api/notion/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = getPathVariables(catchAll)

    // const data = pathVariables

    let pageResponse, searchResponse
    switch (pathVariables.routeType) {
      case TYPES.shows:
        /**
         * @search
         */
        // searchResponse = await notion.search({
        //   query: 'shows',
        //   sort: {
        //     direction: 'ascending',
        //     timestamp: 'last_edited_time',
        //   },
        //   filter: {
        //     value: 'database',
        //     property: 'object',
        //   },
        // })
        /**
         * @query
         */
        searchResponse = await notion.databases.query({
          database_id: DATABASES[TYPES.shows],
          filter: {
            and: [
              {
                property: 'Slug',
                text: {
                  equals: pathVariables.slug,
                },
              },
              // Remove Filter if preview is True
              !preview && {
                property: 'Published',
                checkbox: {
                  equals: true,
                },
              },
            ],
          },
        })
        pageResponse = await notion.pages.retrieve({
          page_id: pageId,
        })
        pageResponse = await notion.blocks.children.list({
          block_id: pageId,
        })
        // searchResponse = await notion.users.list()
        // searchResponse = await notion.databases.retrieve({
        //   database_id: databaseId,
        // })
        break
      default:
        break
    }

    res.status(200).json({
      info: searchResponse,
      content: pageResponse,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    })
  }
}

export default notionApi
