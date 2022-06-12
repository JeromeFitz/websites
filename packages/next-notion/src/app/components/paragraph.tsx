import { Paragraph } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const paragraph = ({ content, id }) => {
  return (
    <Paragraph css={{ mb: '$4', lineHeight: '1.5' }} size="1">
      {getContentTypeDetail({ content, id })}
    </Paragraph>
  )
}

export default paragraph
