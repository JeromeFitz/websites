import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils/index'
import { asyncForEach } from '@jeromefitz/utils'

import _noop from 'lodash/noop.js'
import _orderBy from 'lodash/orderBy.js'
import _size from 'lodash/size.js'
import { cache } from 'react'

import { RelationsItem } from './Relations.Item'

const RelationsItems = cache(async ({ items: __items }) => {
  const _items: any = []

  await asyncForEach(__items, async (item: any) => {
    const data: any = await getPageDataFromNotion(item)
    if (!data) return
    _items.push(data)
  }).catch(_noop)

  if (_size(_items) === 0) return null

  const items = _orderBy(_items, [`url`])

  return (
    <>
      {items.map((item) => {
        return (
          <li key={item?.id}>
            <RelationsItem item={item} />
          </li>
        )
      })}
    </>
  )
})

export { RelationsItems }
