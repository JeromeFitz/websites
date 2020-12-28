import _getUnixTime from 'date-fns/getUnixTime'

const notionLength = 14

const notionTimestamp = () => {
  return parseInt(_getUnixTime(new Date()).toString().padEnd(notionLength, '0'))
}

export default notionTimestamp
