import { Flex } from '@jeromefitz/design-system'
import _map from 'lodash/map'

import Column from './column'

const column_list = ({ content, id }) => {
  const nodeContentParent = _map(content.children, (child) => (
    <Column key={child.id} content={child} has_children={child.has_children} />
  ))
  return (
    <Flex
      key={id}
      justify="between"
      css={{
        display: 'flex',
        flexDirection: 'column',
        my: '$4',
        '@bp1': { flexDirection: 'row' },
      }}
    >
      {nodeContentParent}
    </Flex>
  )
}

export default column_list
