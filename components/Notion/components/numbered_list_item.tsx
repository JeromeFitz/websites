import getContentTypeDetail from '../utils/getContentTypeDetail'

import { Text } from '~styles/system/components'

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
