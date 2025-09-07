import type { Event } from '@/lib/drizzle/schemas/types'

import { isAfter } from 'date-fns/isAfter'
import _filter from 'lodash/filter.js'
import _orderBy from 'lodash/orderBy.js'
import _take from 'lodash/take.js'

import { getEventsWithLimit } from '@/lib/drizzle/schemas/queries'

import { CurrentlyItem } from './Currently.Item'
import { CurrentlyWrapper } from './Currently.Item.Wrapper'

/**
 * @todo(notion) what if no upcoming event ...
 */
async function CurrentlyEvent({
  titleSub,
  ...c
}: {
  color: string
  href: string
  icon: any
  id: string
  prefetch: boolean
  title: string
  titleSub: string
}) {
  const dateNow = Date.now()
  const { color, href, icon, id, prefetch, title } = c
  const items = await getEventsWithLimit({ limit: 10 })
  const events = _take(
    _orderBy(
      _filter(items, (event: Event) => !isAfter(dateNow, event.dateIso)),
      (event: Event) => [event.dateIso],
      ['asc'],
    ),
    1,
  )

  let hasTop = !!events && events.length >= 1
  const top = events[0]
  hasTop = hasTop && !!top && !isAfter(Date.now(), top.dateIso)

  const headline = hasTop
    ? `${top.dateDayOfWeekAbbr} ${top.dateMonth}/${top.dateDayOfMonth} @ ${top.dateTime}`.toUpperCase()
    : titleSub[0]
  const subline = hasTop ? top?.title : titleSub[1]

  const props = {
    headline,
    id,
    isLoading: false,
    subline,
  }

  const propsParent = {
    color,
    href: hasTop ? top?.slugPreviewEt : href,
    icon,
    id,
    prefetch,
    title,
  }

  if (!hasTop) return null

  return (
    // @ts-ignore
    <CurrentlyWrapper {...propsParent}>
      <CurrentlyItem {...props} />
    </CurrentlyWrapper>
  )
}

export { CurrentlyEvent }
