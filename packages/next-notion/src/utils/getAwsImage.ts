// import url from 'node:url'

import { formatInTimeZone } from '@jeromefitz/date-fns-tz'
// import { isAfter, differenceInSeconds, parseISO } from 'date-fns'
import { isAfter, parseISO } from 'date-fns'

// const DEBUG = true

const TZ_UTC = 'UTC'
// const TZ_AWS = 'America/New_York'
const URL_AWS = 'amazonaws.com'

function isAwsImage(imageUrl: string) {
  return imageUrl?.includes(URL_AWS) || false
}

/**
 * @todo(deprecate) Lol, this is why you use the Notion API better
 *  so you can avoid doing hacks like this -- when there is an actual
 *  field that just tells you in `expiry_time` :X
 */
// function isAwsImageExpired(imageUrl: string) {
//   const timestamp = new Date()
//   const tsAWS = formatInTimeZone(timestamp, TZ_AWS, `yyyyMMdd'T'HHmmss'Z'`)
//   // const tsUTC = formatInTimeZone(timestamp, TZ_UTC, `yyyyMMdd'T'HHmmss'Z'`)
//   const url_parts = url.parse(imageUrl, true)
//   const query = url_parts.query
//   const xAmzDate = query['X-Amz-Date']
//   const xAmzExpires = query['X-Amz-Expires']
//   // const dateLeft = parseISO(tsUTC)
//   const dateLeft = parseISO(tsAWS)
//   // @ts-ignore
//   const dateRight = parseISO(xAmzDate)
//   /**
//    * @note(aws)
//    * X-Amz-Date must not be more than X-Amz-Expires number of seconds in the past
//    *
//    */
//   let diffInSeconds = differenceInSeconds(dateLeft, dateRight)
//   diffInSeconds = diffInSeconds < 0 ? diffInSeconds * -1 : diffInSeconds
//   // @ts-ignore
//   const isExpired = diffInSeconds >= xAmzExpires

//   // // @debug
//   // if (DEBUG) {
//   //   console.dir(`>> isAwsImageExpired`)
//   //   console.dir(imageUrl)
//   //   // console.dir(`ts(utc):           ${tsUTC}`)
//   //   console.dir(`ts(aws):           ${tsAWS}`)
//   //   console.dir(`xAmzDate:          ${xAmzDate}`)
//   //   console.dir(`xAmzExpires:       ${xAmzExpires}`)
//   //   // console.dir(`dateLeft:`)
//   //   // console.dir(dateLeft)
//   //   console.dir(`dateLeft:`)
//   //   console.dir(dateLeft)
//   //   console.dir(`dateRight:`)
//   //   console.dir(dateRight)
//   //   console.dir(`diffInSeconds:     ${diffInSeconds}`)
//   //   console.dir(`isExpired:         ${isExpired ? 'y' : 'n'}`)
//   //   console.dir(`---`)
//   // }

//   return isExpired
// }

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
  // @note(notion) format in notion api (not aws query param)
  const utc = formatInTimeZone(timestamp, TZ_UTC, `yyyy-MM-dd'T'HH:mm:ss.ms'Z'`)
  const isExpired = isAfter(parseISO(utc), parseISO(image?.expiry_time))

  // // @debug
  // if (DEBUG) {
  //   const diff = differenceInSeconds(parseISO(utc), parseISO(image?.expiry_time))
  //   // diff = diff < 0 ? diff * -1 : diff
  //   console.dir(`utc:          ${utc}`)
  //   console.dir(`expiry_time:  ${image?.expiry_time}`)
  //   console.dir(`diff:         ${diff} (${diff / 60} minutes)`)
  //   console.dir(`isExpired:    ${isExpired ? 'y' : 'n'}`)
  //   console.dir(`---`)
  // }

  return isExpired
}

// export { isAwsImage, isAwsImageExpired, isImageExpired }
export { isAwsImage, isImageExpired }
