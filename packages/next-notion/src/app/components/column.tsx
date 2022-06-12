import { Flex } from '@jeromefitz/design-system'
import _map from 'lodash/map'

import getContentType from '../utils/getContentType'

const column = ({ content, has_children }) => {
  if (!has_children) return null
  const nodeContent = _map(content.column.children, (content) =>
    getContentType(content)
  )
  return (
    <Flex
      direction="column"
      css={{ flex: '1 1', my: '$3', '@bp1': { my: '$3', paddingRight: '$5' } }}
    >
      {nodeContent}
    </Flex>
  )
}

export default column
