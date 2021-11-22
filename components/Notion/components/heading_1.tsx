import getContentTypeDetail from '../utils/getContentTypeDetail'

import { Heading } from '~styles/system/components'

const heading_1 = ({ content, id }) => {
  return (
    <Heading as="h2" css={{ fontWeight: '700', mb: '$4' }} size="3">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_1
