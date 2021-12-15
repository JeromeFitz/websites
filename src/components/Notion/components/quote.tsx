import _size from 'lodash/size'

import getContentTypeDetail from '../utils/getContentTypeDetail'

import Emoji from '~components/Emoji'
import { Box, Flex, Text } from '~styles/system/components'

const quote = ({ content, id }) => {
  if (_size(content) > 0) {
    return (
      <Box
        css={{
          py: '$4',
        }}
      >
        <Flex
          css={{
            alignItems: 'flex-start',
            backgroundColor: '$colors$violet9',
            borderRadius: '0.75rem',
            color: 'white',
            display: 'flex',
            fontSize: '$6',
            justifyContent: 'flex-start',
            lineHeight: '1.5',
            margin: '$1',
            marginBottom: '$2',
            padding: '$3',
            paddingBottom: '$4',
            verticalAlign: 'middle',
          }}
        >
          <Text
            as="span"
            css={{
              mb: '0',
              pb: '0',
              color: 'inherit',
              lineHeight: 'inherit',
              fontSize: 'inherit',
            }}
          >
            <Emoji character={`📰️`} />
          </Text>
          <Text
            as="blockquote"
            css={{
              ml: '$4',
              color: 'inherit',
              lineHeight: 'inherit',
              fontSize: 'inherit',
            }}
          >
            {getContentTypeDetail({ content, id })}
          </Text>
        </Flex>
      </Box>
    )
  }
  return null
}

export default quote
