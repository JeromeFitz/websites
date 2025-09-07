// import url from 'node:url'
import { TZDate } from '@date-fns/tz'
import { differenceInSeconds, format, isAfter, parseISO } from 'date-fns'

const DEBUG = false

const TZ_UTC = 'UTC'
// const TZ_AWS = 'America/New_York'
const URL_AWS = 'amazonaws.com'

function isAwsImage(imageUrl: string) {
  return imageUrl?.includes(URL_AWS) || false
}

/**
 * @note(notion)
 * - Check if AWS Image: Y: Continue; No: Skip
 * - Check if `expiry_time` set: Y: Continue; No: Force
 * - Check if has valid Expiration Time for AWS Notion
 */
function isImageExpired(image) {
  if (!isAwsImage(image?.src)) {
    return false
  }
  if (image?.expiry_time === null || image?.expiry_time === undefined) {
    return true
  }

  const timestamp = new Date()
  // @todo(types)
  // @note(notion) format in notion api (not aws query param)
  let utc: any = new TZDate(timestamp, TZ_UTC)
  utc = format(utc, `yyyy-MM-dd'T'HH:mm:ss.ms'Z'`)
  const isExpired = isAfter(parseISO(utc), parseISO(image?.expiry_time))

  // @debug
  if (DEBUG) {
    const diff = differenceInSeconds(parseISO(utc), parseISO(image?.expiry_time))
    // diff = diff < 0 ? diff * -1 : diff
    console.dir(`utc:          ${utc}`)
    console.dir(`expiry_time:  ${image?.expiry_time}`)
    console.dir(`diff:         ${diff} (${diff / 60} minutes)`)
    console.dir(`isExpired:    ${isExpired ? 'y' : 'n'}`)
    console.dir(`---`)
  }

  return isExpired
}

// export { isAwsImage, isAwsImageExpired, isImageExpired }
export { isAwsImage, isImageExpired }
