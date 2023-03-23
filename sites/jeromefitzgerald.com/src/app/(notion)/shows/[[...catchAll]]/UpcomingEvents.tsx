'use client'
import _filter from 'lodash/filter'

import { Anchor } from '~components/Anchor'
import { useNotion } from '~hooks/useNotion'
import { cx } from '~utils/cx'
import { formatDateForSlug } from '~utils/formatDateForSlug'
import { isEventInFuture } from '~utils/isEventInFuture'
// import { log } from '~utils/log'

const ROUTE_TYPE = 'events'

function UpcomingEvents({ id }) {
  const { ...upcomingEventsProps } = useNotion(ROUTE_TYPE)
  const upcomingEvents = upcomingEventsProps?.isLoading
    ? []
    : upcomingEventsProps?.data?.items?.results
  // log(`upcomingEvents`, upcomingEvents)

  if (!upcomingEvents) {
    return null
  }

  const items = _filter(
    upcomingEvents,
    (item) =>
      item?.properties?.relationEvents__Shows?.includes(id) &&
      isEventInFuture(item?.properties?.dateEvent?.start)
  )
  // log(`items`, items)
  const hasUpcomingEvents = !!items && items.length > 0

  return (
    <>
      <h6
        className={cx(
          'text-3xl font-bold',
          'uppercase tracking-tight',
          'my-4 border-b border-white py-4',
          !hasUpcomingEvents && 'line-through'
        )}
      >
        Upcoming Events
      </h6>
      <ul className={cx('')}>
        {hasUpcomingEvents ? (
          items.map((item) => {
            const yyyymmdd = formatDateForSlug(item?.properties?.dateEvent.start)
            const url = `/${ROUTE_TYPE}/${yyyymmdd}/${item?.properties?.slug}`
            const t = `${item?.properties?.title} (${yyyymmdd})`

            return (
              <li
                className={cx('my-2 ')}
                key={`shows--upcoming-events--${item?.id}`}
              >
                <Anchor className={cx('my-2')} href={url}>
                  {t}
                </Anchor>
              </li>
            )
          })
        ) : (
          <li className={cx('my-2 ')} key={`shows--upcoming-events--na`}>
            No upcoming events for {}
          </li>
        )}
      </ul>
    </>
  )
}

export { UpcomingEvents }
