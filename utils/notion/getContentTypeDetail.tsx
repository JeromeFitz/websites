import _map from 'lodash/map'

import { NotionText } from '~utils/notion'
import TextAnnotations from '~utils/notion/TextAnnotations'

const getContentTypeDetail = (content) =>
  _map(content.text, (text: NotionText) => {
    const { href, plain_text, annotations } = text
    return (
      <TextAnnotations
        href={href}
        plain_text={plain_text}
        annotations={annotations}
      />
    )
  })

export default getContentTypeDetail
