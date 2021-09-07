import _map from 'lodash/map'

import { NotionText } from '~utils/notion'
import getTextAnnotations from '~utils/notion/getTextAnnotations'

const getContentTypeDetail = (content) =>
  _map(content.text, (text: NotionText) => {
    return getTextAnnotations(text)
  })

export default getContentTypeDetail
