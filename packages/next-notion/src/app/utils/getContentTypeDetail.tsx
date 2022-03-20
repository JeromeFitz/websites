import type { NotionText } from '@jeromefitz/notion/schema'
import _map from 'lodash/map'

import TextAnnotations from './TextAnnotations'

const getContentTypeDetail = ({ content, id = null }) => {
  /**
   * @notion(1.0.1) depending on where in the tree this value is either:
   * - rich_text (heading_1, heading_2, heading_3, paragraph, ...)
   * - text (the actual `type` of a `rich_text` element)
   */
  return _map(content.rich_text ?? content.text, (text: NotionText, textId) => {
    const { href, plain_text, annotations } = text
    const key = `${id}--text-annotations--${textId}`
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
}

export default getContentTypeDetail
