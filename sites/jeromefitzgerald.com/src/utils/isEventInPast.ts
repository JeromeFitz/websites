import { parseISO } from 'date-fns'
import _isBefore from 'date-fns/isBefore'
import _filter from 'lodash/filter'

function isEventInPast(ts) {
  const timestampNow = new Date()
  const iso = parseISO(ts)
  return _isBefore(iso, timestampNow)
}

function filterForEventsInPast(items) {
  return _filter(items, (item) => isEventInPast(item?.properties?.dateEvent?.start))
}

export { filterForEventsInPast, isEventInPast }
