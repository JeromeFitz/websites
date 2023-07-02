'use client'
import { cx } from '@jeromefitz/shared/src/utils'
import _filter from 'lodash/filter'

import { Listing } from '~app/(notion)/events/[[...catchAll]]/Listing'
import { useNotion } from '~hooks/useNotion'
import { isEventInFuture } from '~utils/isEventInFuture'

const ROUTE_TYPE = 'events'

function UpcomingEvents({ id }) {
  const { ...upcomingEventsProps } = useNotion(ROUTE_TYPE)
  const upcomingEvents = upcomingEventsProps?.isLoading
    ? []
    : upcomingEventsProps?.data?.items?.results

  if (!upcomingEvents) {
    return null
  }

  const items = _filter(
    upcomingEvents,
    (item) =>
      item?.properties?.relationEvents__Shows?.includes(id) &&
      isEventInFuture(item?.properties?.dateEvent?.start)
  )

  const hasUpcomingEvents = !!items && items.length > 0
  const data = { items: { results: items } }

  return (
    <div className="my-8">
      <div
        style={{
          '& ul': { listStyle: 'none', margin: '0', padding: '0' },
        }}
        className="m-auto grid grid-cols-6 gap-8"
      >
        <div className={cx('col-span-6 mb-4 flex flex-col  md:mb-8')}>
          <h4
            className={cx(
              'border-t-[1px] border-solid py-3 font-extrabold uppercase tracking-tight',
              'mauve-border',
              !hasUpcomingEvents && 'line-through'
            )}
          >
            Upcoming Events
          </h4>
          <ul>
            {hasUpcomingEvents ? (
              <Listing data={data} pathVariables={''} />
            ) : (
              <li className={cx('my-2 ')} key={`shows--upcoming-events--na`}>
                No upcoming events
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export { UpcomingEvents }
