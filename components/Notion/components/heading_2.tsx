import getContentTypeDetail from '../utils/getContentTypeDetail'

import { Heading } from '~styles/system/components'

const heading_1 = ({ content, id }) => {
  return (
    <Heading as="h3" css={{ fontWeight: '700', mb: '$3' }} size="2">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_1
