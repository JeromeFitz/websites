import { parseISO } from 'date-fns'
import _isAfter from 'date-fns/isAfter'
import _filter from 'lodash/filter'

function isEventInFuture(ts) {
  const timestampNow = new Date()
  const iso = parseISO(ts)
  return _isAfter(iso, timestampNow)
}

function filterForEventsInFuture(items) {
  return _filter(items, (item) =>
    isEventInFuture(item?.properties?.dateEvent?.start)
  )
}

export { filterForEventsInFuture, isEventInFuture }
