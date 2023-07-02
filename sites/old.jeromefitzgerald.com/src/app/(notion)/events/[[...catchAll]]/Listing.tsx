import type { Event } from '@jeromefitz/notion/schema'
import { TZ } from '@jeromefitz/shared/src/lib/constants'
import { cx } from '@jeromefitz/shared/src/utils'
import _parseISO from 'date-fns/parseISO'
import { formatInTimeZone as _formatInTimeZone } from 'date-fns-tz'
import _orderBy from 'lodash/orderBy'

import { Anchor } from '~components/Anchor'
import { formatDateForSlug } from '~utils/formatDateForSlug'
import { filterForEventsInFuture } from '~utils/isEventInFuture'
import { filterForEventsInPast } from '~utils/isEventInPast'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Listing({ data, pathVariables, isUpcoming = true }) {
  const { items } = data

  const eventsFiltered = isUpcoming
    ? filterForEventsInFuture(items?.results)
    : filterForEventsInPast(items?.results)
  const sortBy = isUpcoming ? 'asc' : 'desc'

  const events = _orderBy(eventsFiltered, ['properties.dateEvent.start'], [sortBy])

  return (
    <>
      <div className="mauve-border my-2 border-b-[1px] border-solid md:my-8">
        <ul>
          <li
            className={cx(
              'group',
              'hidden md:grid',
              'grid-cols-2 gap-2',
              'text-sm font-bold uppercase',
              'border-radix-mauve12 border-b-2',
              'my-4 py-4 md:my-2 md:p-4'
            )}
          >
            <div>Title</div>
            <div className={cx('text-right')}>Venue</div>
          </li>
          {events.map((event) => {
            const { properties }: { properties: Event } = event
            const { dateEvent, rollupEvents__Venues, slug, title } = properties

            const yyyymmdd = formatDateForSlug(dateEvent.start)
            const url = `/events/${yyyymmdd}/${slug}`

            const venue = rollupEvents__Venues[0]
            const iso = _parseISO(dateEvent?.start)
            const date1 = _formatInTimeZone(iso, TZ, 'EEEE, MMMM')
            const date1b = _formatInTimeZone(iso, TZ, 'do')
            const date2 = _formatInTimeZone(iso, TZ, `'@' hh:mma`)
            const date2b = _formatInTimeZone(iso, TZ, `z`)

            // const { rollupTags, rollupTagsSecondary } = properties
            // const tags =
            //   _map(
            //     _union(rollupTags, rollupTagsSecondary),
            //     (tag: string) => TAGS[tag]?.title
            //   ).join(', ') || 'Comedy'
            // log(`${DEBUG_KEY} tags`, tags)

            return (
              <li
                key={event.id}
                className={cx(
                  'group',
                  'my-4 py-4 md:my-2 md:p-4',
                  // 'border-l-2 px-2 md:px-0 md:border-0',
                  // 'bg-radix-mauve1',
                  'border-radix-mauve12 border-b',
                  'hover:bg-black/10',

                  'last-of-type:border-0'
                )}
              >
                <Anchor
                  href={url}
                  className={cx('grid grid-cols-12', 'gap-y-4  md:gap-1')}
                >
                  <div
                    className={cx(
                      'col-span-12 md:col-span-8',
                      'text-xl font-bold',
                      'md:text-4xl md:font-extrabold'
                    )}
                  >
                    {title}
                    {/* <span
                      className={cx(
                        'hidden md:inline-grid',
                        'text-sm font-normal',
                        'text-ellipsis'
                      )}
                    >
                      {properties?.seoDescription}
                    </span> */}
                  </div>
                  <div
                    className={cx(
                      'col-span-12 md:col-span-4',
                      'md:text-right',
                      'text-sm slashed-zero'
                    )}
                  >
                    <span className={cx('text-base font-bold')}>{venue}</span>
                    <br />
                    <span
                      className={cx('')}
                      style={
                        {
                          // fontFeatureSettings: '"ordn","ss02"',
                        }
                      }
                    >
                      {date1}
                    </span>
                    <span
                      className={cx(' ')}
                      style={{
                        fontFeatureSettings: '"ordn"',
                      }}
                    >
                      {` `}
                      {date1b}
                    </span>
                    <br />
                    <span
                      className={cx('')}
                      style={{
                        fontFeatureSettings: '""',
                      }}
                    >
                      {date2}
                    </span>
                    <span
                      className={cx('text-sm')}
                      style={{
                        fontFeatureSettings: '"sups"',
                      }}
                    >
                      {` `}
                      {date2b}
                    </span>
                  </div>
                </Anchor>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export { Listing }
