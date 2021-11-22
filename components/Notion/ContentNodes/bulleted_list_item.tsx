import { Text } from '~styles/system/components'

import getContentTypeDetail from './utils/getContentTypeDetail'

const bulleted_list_item = ({ content, id }) => {
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

export default bulleted_list_item
