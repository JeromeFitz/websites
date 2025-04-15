// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ms from 'ms'

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => (!time ? 0 : time / 1000)

/**
 * @note in seconds
 *       ...probably could be hard-coded
 */
const TIME = {
  DAY: getTimeInSeconds(ms('1d')),
  HOUR: getTimeInSeconds(ms('1h')),
  MINUTE: getTimeInSeconds(ms('1m')),
  MONTH: getTimeInSeconds(ms('30d')),
  YEAR: getTimeInSeconds(ms('1y')),
}

export { TIME }
