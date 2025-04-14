import { TZDate } from '@date-fns/tz'
import { format, isAfter, parseISO } from 'date-fns'

const TZ_UTC = 'UTC'
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
function isImageExpired(image: any) {
  if (!isAwsImage(image?.src)) {
    return false
  }
  let expiry_time = image?.expiry_time
  if (expiry_time === null || expiry_time === undefined) {
    return true
  }

  const timestamp = new Date()
  let utc: any = new TZDate(timestamp, TZ_UTC)
  const formatConfig = `yyyy-MM-dd'T'HH:mm:ss.ms'Z'`
  utc = format(utc, formatConfig)
  expiry_time = parseISO(image?.expiry_time)
  const isExpired = isAfter(parseISO(utc), expiry_time)

  return isExpired
}

export { isAwsImage, isImageExpired }
