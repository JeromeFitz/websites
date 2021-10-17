import _map from 'lodash/map'

import { NotionText } from '~utils/notion'
import TextAnnotations from '~utils/notion/TextAnnotations'

const getContentTypeDetail = ({ content, id = null }) =>
  _map(content.text, (text: NotionText, textId) => {
    const { href, plain_text, annotations } = text
    const key = `${id}--text-annotations--${textId}`
    // console.dir(`key: ${key}`)
    return (
      <TextAnnotations
        annotations={annotations}
        href={href}
        id={id}
        key={key}
        plain_text={plain_text}
      />
    )
  })

export default getContentTypeDetail
