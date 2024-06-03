import {
  // getDataFromCache,
  getDatabaseQuery,
  // getDatabaseQueryByDateRange,
} from '@jeromefitz/shared/notion/utils/index'

import { isAfter } from 'date-fns/isAfter'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _remove from 'lodash/remove.js'

import { CONFIG, getEventData } from '@/app/(notion)/_config/index'

import { CurrentlyItem } from './Currently.Item'
import { CurrentlyWrapper } from './Currently.Item.Wrapper'

const { DATABASE_ID } = CONFIG.EVENTS

const isEnabled = false
const revalidate = false
const segmentInfo = {
  catchAll: ['events'],
  hasMeta: false,
  isIndex: true,
  segment: 'events',
  segmentCount: 1,
  slug: '/events',
}

/**
 * @todo(notion) what if no upcoming event ...
 */
// @todo(complexity) 11
// eslint-disable-next-line complexity
async function CurrentlyEvent({ titleSub, ...c }) {
  const { color, href, icon, id, title } = c

  const data = await getDatabaseQuery({
    database_id: DATABASE_ID,
    draft: isEnabled,
    filterType: 'starts_with',
    revalidate,
    segmentInfo,
  })

  const draft = false
  const items = data.results.map((item) => {
    const { properties } = item
    const itemData: any = getEventData(properties)
    if (!itemData?.id) return null
    if (!itemData?.isPublished) return null
    if (itemData?.isEventOver) return null
    return itemData
  })
  _remove(items, (i) => i === null)

  /**
   * @todo(notion) filter out past events in listing
   */
  const events = _orderBy(
    _filter(items, draft ? {} : { isPublished: true }),
    ['dateIso'],
    ['asc'],
  )

  let hasTop = !!events && events.length >= 1
  const top = events[0]
  hasTop = hasTop && !!top && !isAfter(Date.now(), top.dateIso)

  const headline = hasTop
    ? `${top.dayOfWeekAbbr} ${top.month}/${top.dayOfMonth} @ ${top.time}`.toUpperCase()
    : titleSub[0]
  const subline = hasTop ? top?.title : titleSub[1]

  const props = {
    headline,
    id,
    isLoading: false,
    subline,
  }

  const propsParent = { color, href: hasTop ? top?.href : href, icon, id, title }

  if (!hasTop) return null

  return (
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  )
}

export { CurrentlyEvent }
