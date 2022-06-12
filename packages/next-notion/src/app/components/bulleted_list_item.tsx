import { Text } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const bulleted_list_item = ({ content, id }) => {
  return (
    <li>
      <Text
        size="3"
        css={{
          color: '$hiContrast',
          display: 'inline-block',
          lineHeight: '1.25',
          mb: '$3',
        }}
      >
        {getContentTypeDetail({ content, id })}
      </Text>
    </li>
  )
}

export default bulleted_list_item
