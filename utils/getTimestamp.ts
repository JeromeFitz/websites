import { format as _formatUTC, utcToZonedTime } from 'date-fns-tz'
import _format from 'date-fns/format'
import _formatISO from 'date-fns/formatISO'
import enUS from 'date-fns/locale/en-US'
import _upperCase from 'lodash/upperCase'

const timeZone = 'America/New_York'

const getTimestamp = (ts: number) => {
  /**
   * @note
   * ts is from Notion
   */
  const utc = _formatISO(new Date(ts))
  const timestamp = utcToZonedTime(utc, timeZone)

  const full = _format(timestamp, `EEEE MMMM do 'at' hha`)
  const podcast = _format(timestamp, `EEEE, MMMM do`)
  const tablet =
    _upperCase(_format(timestamp, 'EEE MMM do')) + _format(timestamp, ' hha')
  const upcoming = _format(timestamp, 'EEE. MMM. do hha')
  const iso = _formatISO(timestamp)

  return {
    full,
    iso,
    utc,
    podcast,
    tablet,
    upcoming,
    event: {
      day: _format(timestamp, 'EEEE'),
      date: _format(timestamp, 'dd'),
      month: _format(timestamp, 'MM'),
      year: _format(timestamp, 'yyyy'),
      //
      hour: _format(timestamp, 'hh'),
      minute: _format(timestamp, 'mm'),
      ampm: _format(timestamp, 'a'),
      timeZone: _formatUTC(timestamp, 'zzz', { timeZone, locale: enUS }),
      timeZoneFull: _formatUTC(timestamp, 'zzzz', { timeZone, locale: enUS }),
    },
    // @todo(time_zone)
    time_zone: timeZone,
  }
}

export default getTimestamp
