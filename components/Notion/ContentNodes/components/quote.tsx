import _size from 'lodash/size'

import getContentTypeDetail from '../utils/getContentTypeDetail'

import Emoji from '~components/Emoji'
import { Box, Flex, Text } from '~styles/system/components'

const quote = ({ content, id }) => {
  if (_size(content) > 0) {
    return (
      <Box css={{ py: '$4' }}>
        <Flex
          css={{
            br: '0.75rem',
            backgroundColor: '$colors$violet9',
            color: 'white',
            m: '$1',
            mb: '$2',
            p: '$3',
            pb: '$4',
            dispaly: 'flex',
            verticalAlign: 'middle',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            lineHeight: '1.5',
            fontSize: '$6',
          }}
        >
          <Text
            as="span"
            css={{
              mb: 0,
              pb: 0,
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
            }}
          >
            <Emoji character={`📰️`} />
          </Text>
          <Text
            as="blockquote"
            css={{
              ml: '$4',
              color: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
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
