'use client'

import type { Event } from '@/lib/drizzle/schemas/types'

import { TZDate } from '@date-fns/tz'
import { formatInTimeZone } from 'date-fns-tz'
import _upperCase from 'lodash/upperCase'
import { memo } from 'react'

import { TicketIcon } from '@/components/Icon/index'
import { TZ } from '@/config/const'
import { useStore as _useStore, useShallow } from '@/store/index'

const useStore = () => {
  return _useStore(
    useShallow((store) => ({
      eventsUpcoming: store.eventsUpcoming,
      eventsUpcomingSet: store.eventsUpcomingSet,
    })),
  )
}

const StoreInitEventsUpcoming = memo(function StoreInitEventsUpcoming({
  items = [],
}: {
  items?: Event[]
}) {
  const { eventsUpcoming, eventsUpcomingSet } = useStore()
  if (eventsUpcoming.length === 0 && items.length > 1) {
    const events: any = []
    items.map((item) => {
      // const timestamp = `${_upperCase(item.dateDayOfWeekAbbr)} ${item.dateMonth}/${item.dateDayOfMonth}`
      const timestampUTC = new TZDate(item.dateIso, 'UTC')
      const timestamp = `${_upperCase(
        formatInTimeZone(timestampUTC, TZ, `EEE`),
      )} ${formatInTimeZone(timestampUTC, TZ, `MM/dd`)}`

      events.push({
        href: item.slugPreview,
        icon: TicketIcon,
        id: item.slugPreview,
        isActive: true,
        isActiveMobile: true,
        keywords: item.seoKeywords || [],
        title: `${timestamp}: ${item.title}`,
        titleDescription: `${timestamp}: ${item.title}`,
      })
    })
    eventsUpcomingSet(events)
  }
  return null
})

export { StoreInitEventsUpcoming }
