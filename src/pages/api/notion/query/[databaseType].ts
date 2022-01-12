// http://localhost:3000/api/notion/query/tags?events=1446dc938dc04018b3762d37b154fc92&shows=2cc25eed-12e6-4ccb-b949-21391d0e3174&eventsLineupShowIds=aa68b27a-f337-4cdb-8d34-c5c0f47c3d1b,4c9d65b3-8a36-4ae8-8a4a-503c9724d409,51a67c70-5b4c-4cea-92df-ca3e0daf8a59,cba93218-d432-45a0-b440-49e2d8eea17b,ca84ce27-c264-4935-8cad-2c55c8b20264,5805f58e-dad5-4afe-aa10-6afe78886f42,bf2d4594-b66f-4914-aa48-62f8a219e52d,e4695f66-92c4-4c03-b677-c514694863b8

import { NextApiRequest, NextApiResponse } from 'next'

import getQuery from '@jeromefitz/notion/getQuery'

interface RequestQueryProps {
  databaseType?: string
  // @_meta
  routeType?: string
  // @events
  events?: string
  eventsLineupShowIds?: string
  shows?: string
  // @people
  key?: string
  value?: string
  // @podcasts
  episodes?: string
  podcasts?: string
}

const notionQueryRouteType = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.dir(`notionQueryRouteType`)
  // console.dir(req.query)
  const reqQuery: RequestQueryProps = req?.query
  const data = await getQuery({ reqQuery })

  try {
    /**
     * @json should this be omitted at write time?
     */
    // const dataOmittted = _omit(data, omitFields['people'])
    const dataOmittted = data
    res.status(200).json({
      ...dataOmittted,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(404).json({
      error: {
        code: 404,
        message: `Not found`,
      },
    })
  }
}

export default notionQueryRouteType
