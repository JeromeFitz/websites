import ms from 'ms'

/**
 * @redis is in seconds not ms
 */
// eslint-disable-next-line no-constant-binary-expression
const getTimeInSeconds = (time: number) => time / 1000 ?? 0

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
