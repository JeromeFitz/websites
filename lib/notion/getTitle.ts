import _last from 'lodash/last'

const getTitle = (title: string) =>
  _last(title.split('_'))
    .replace('Past', 'Cast Emeritus')
    .replace('Musical', 'Musical Director')
    .replace('Technical', 'Technical Director')

export default getTitle
