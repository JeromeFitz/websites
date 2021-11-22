import { Heading } from '~styles/system/components'

import getContentTypeDetail from './utils/getContentTypeDetail'

const heading_1 = ({ content, id }) => {
  return (
    <Heading as="h4" css={{ fontWeight: '700', mb: '$2' }} size="1">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_1
