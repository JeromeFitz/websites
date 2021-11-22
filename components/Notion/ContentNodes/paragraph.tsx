import { Paragraph } from '~styles/system/components'

import getContentTypeDetail from './utils/getContentTypeDetail'

const paragraph = ({ content, id }) => {
  return (
    <Paragraph css={{ mb: '$3', lineHeight: '1.5' }} size="1">
      {getContentTypeDetail({ content, id })}
    </Paragraph>
  )
}

export default paragraph
