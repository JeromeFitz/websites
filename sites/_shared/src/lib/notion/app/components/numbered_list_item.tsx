import { Text } from '@jeromefitz/design-system/components'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const numbered_list_item = ({ content, id }) => {
  return (
    <li>
      <Text
        size="3"
        css={{
          color: '$hiContrast',
          display: 'inline-block',
          lineHeight: '25px',
          mb: '$2',
        }}
      >
        {getContentTypeDetail({ content, id })}
      </Text>
    </li>
  )
}

export default numbered_list_item
