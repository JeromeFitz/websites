import _map from 'lodash/map'

import getContentType from '../utils/getContentType'

import { Flex } from '~styles/system/components'

const column = ({ content, has_children }) => {
  if (!has_children) return null
  const nodeContent = _map(content.column.children, (content) =>
    getContentType(content)
  )
  return (
    <Flex
      direction="column"
      css={{ flex: '1 1', my: '$2', '@bp1': { my: '$2', paddingRight: '.75rem' } }}
    >
      {nodeContent}
    </Flex>
  )
}

export default column
