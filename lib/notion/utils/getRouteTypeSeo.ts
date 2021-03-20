import _find from 'lodash/find'
import getTableData from '~lib/notion/utils/getTableData'
import rpc, { values } from '~lib/notion/rpc'

import { routeTypes } from '~config/notion/website'

const getRouteTypeSeo = async (slug) => {
  const routeTypeId = routeTypes['seo'].indexId
  const routeTypeTable = await rpc('loadPageChunk', {
    chunkNumber: 0,
    cursor: { stack: [] },
    limit: parseInt(process.env.NEXT_PUBLIC__NOTION_LIMIT), // TODO: figure out Notion's way of handling pagination
    pageId: routeTypeId,
    verticalColumns: false,
  })
  const routeTypeTableBlock = values(routeTypeTable.recordMap.block).find(
    (block: any) => block.value.type === 'collection_view_page'
  )
  const routeTypeData = await getTableData(routeTypeTableBlock, true)
  return await _find(routeTypeData, { Slug: slug })
}

export default getRouteTypeSeo
