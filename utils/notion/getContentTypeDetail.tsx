import _map from 'lodash/map'

import { NotionText } from '~utils/notion'
// import TextAnnotations from '~utils/notion/TextAnnotations'
import { TextAnnotation } from '~utils/notion/TextAnnotations'

const getContentTypeDetail = (content) =>
  _map(content.text, (text: NotionText, textId) => {
    const { href, plain_text, annotations } = text
    return (
      <TextAnnotation
        annotations={annotations}
        href={href}
        key={`text-annotations--${textId}`}
        plain_text={plain_text}
      />
    )
  })

export default getContentTypeDetail
