import _ceil from 'lodash/ceil'

const getTimeInSeconds = (ts) => {
  const duration = ts.split(':').reduce((acc, time) => _ceil(60 * acc + +time))
  return duration
}

export default getTimeInSeconds
