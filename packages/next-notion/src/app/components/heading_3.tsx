import { Heading } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_3 = ({ content, id }) => {
  return (
    <Heading as="h4" css={{ mb: '$3' }} size="1">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_3
