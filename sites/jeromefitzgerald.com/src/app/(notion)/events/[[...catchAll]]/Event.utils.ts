import { parseISO } from 'date-fns'
import _isAfter from 'date-fns/isAfter'

function isEventInFuture(ts) {
  const timestampNow = new Date()
  const iso = parseISO(ts)
  const isEventOver = _isAfter(timestampNow, iso)

  // console.dir(`> isEventInFuture`)
  // console.dir(`iso:           ${iso}`)
  // console.dir(`timestampNow:  ${timestampNow}`)
  // console.dir(`isEventOver:   ${isEventOver ? 'yes' : 'no'}`)
  // console.dir(`---`)

  return isEventOver
}

export { isEventInFuture }
