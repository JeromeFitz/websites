import { Heading } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_1 = ({ content, id }) => {
  return (
    <Heading as="h2" css={{ mb: '$5' }} size="3">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_1
