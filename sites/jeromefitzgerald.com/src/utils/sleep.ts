import _ms from 'ms'
import type { StringValue } from 'ms'

const DEBUG = false

const sleep = (s: StringValue) =>
  new Promise((resolve) => {
    const ms = _ms(DEBUG ? '5s' : s)
    setTimeout(resolve, ms)
  })

export { sleep }
