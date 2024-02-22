import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getPageDataFromNotion } from '@jeromefitz/shared/notion/utils'

import _size from 'lodash/size.js'
import { Suspense } from 'react'

import type { PageObjectResponseEvent } from '~app/(notion)/_config'

import { getEventData, getPropertyTypeDataShow } from '~app/(notion)/_config'
import { RelationLoading } from '~components/Relations/index'

async function UpcomingShowsIndividual({ id }) {
  const item: PageObjectResponseEvent = await getPageDataFromNotion(id)
  if (!item) return null
  const { properties } = item
  const {
    // dateIso,
    dayOfMonth,
    dayOfWeek,
    href,
    monthName,
    time,
    timezone,
    title,
    venueTitle,
    year,
    // ...props
  } = getEventData(properties)

  const style = cx(
    'inline-block text-lg font-normal tracking-tight lg:text-2xl',
    'mb-4 w-full',
    'hover:bg-[var(--blackA8)] dark:hover:bg-[var(--whiteA8)]',
  )

  return (
    <Anchor className={style} href={href}>
      <div className={cx('text-3xl font-black')}>{title}</div>
      <h5 className={cx('mb-1 mt-2 pb-1 pt-2 text-2xl font-bold leading-relaxed')}>
        {dayOfMonth} {monthName} {year}
      </h5>
      <div className={cx('text-xl')}>
        <span>
          {time} {timezone}
        </span>
        <br />
        <span>{dayOfWeek}</span>
      </div>
      <div className={cx('text-xl')}> at {venueTitle}</div>
    </Anchor>
  )
}

function UpcomingShows({ properties }) {
  // const items = properties['Relation.Events.Primary']
  const items = getPropertyTypeDataShow(properties, 'Relation.Events.Primary')
  if (!items) return null
  const itemsCount = _size(items)
  if (itemsCount === 0)
    return (
      <p
        className={cx(
          'inline-block text-base font-normal tracking-tight lg:text-xl',
        )}
      >
        No Upcoming Shows
      </p>
    )
  return (
    <>
      <>
        <ul>
          {Array(itemsCount)
            .fill(0)
            .map((_, i) => {
              const item = items[i]
              const { id } = item

              return (
                <li className={cx('my-2 lg:my-0.5')} key={id}>
                  <Suspense fallback={<RelationLoading />}>
                    <UpcomingShowsIndividual id={id} />
                  </Suspense>
                </li>
              )
            })}
        </ul>
      </>
    </>
  )
}

export { UpcomingShows }
