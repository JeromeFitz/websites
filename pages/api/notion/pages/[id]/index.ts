// 4fd37202-ec62-4897-a0dd-5ed8ab8b4b53
import _omit from 'lodash/omit'
import { NextApiRequest, NextApiResponse } from 'next'

import { getCache, setCache } from '~lib/notion/getCache'
import { normalizerContent } from '~lib/notion/getCatchAll'
import { notion } from '~utils/notion/helper'

const useCache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE

const omitFields = [
  'object',
  'created_time',
  'last_edited_time',
  'parent',
  'url',
  'data.address',
  'data.date',
  'data.datePublished',
  'data.episodesPeopleGuest',
  'data.episodesPeopleSoundEngineer',
  'data.episodesPeopleThanks',
  'data.events',
  'data.festivals',
  'data.peopleCast',
  'data.peopleCastPast',
  'data.peopleCrew',
  'data.peopleDirector',
  'data.peopleDirectorMusical',
  'data.peopleDirectorTechnical',
  'data.peopleProducer',
  'data.peopleThanks',
  'data.peopleWriter',
  'data.podcastsPeopleHost',
  'data.showsPeopleCastPast',
  'data.showsPeopleCrew',
  'data.showsPeopleDirector',
  'data.showsPeopleDirectorMusical',
  'data.showsPeopleDirectorTechnical',
  'data.showsPeopleProducer',
  'data.showsPeopleWriter',
  'data.social',
  'data.tags',
]

const notionPagesId = async (req: NextApiRequest, res: NextApiResponse) => {
  console.dir(`notionPagesId`)
  const page_id = req.query.id
  const catchAll = ['api', 'notion', 'pages', page_id]
  /**
   * @cache pre
   */
  let data
  if (useCache) {
    const url = catchAll.join('/')
    const cacheData = await getCache(url)
    if (!!cacheData) {
      data = cacheData
    }
  }

  if (!data || data === undefined) {
    const contentData = await notion.pages.retrieve({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      page_id,
    })

    data = normalizerContent(contentData)

    /**
     * @cache post
     */
    if (useCache) {
      // console.dir(`*** useCache x1 ***`)
      const url = catchAll.join('/')
      // console.dir(url)
      const isCacheExists = await getCache(url)
      // console.dir(isCacheExists)
      if (!isCacheExists || isCacheExists === undefined) {
        setCache(data, url)
      }
    }
  }

  try {
    /**
     * @json should this be omitted at write time?
     */
    const dataOmittted = _omit(data, omitFields)
    res.status(200).json({
      ...dataOmittted,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      error: {
        code: 404,
        message: `Not found: ${page_id}`,
      },
    })
  }
}

export default notionPagesId
