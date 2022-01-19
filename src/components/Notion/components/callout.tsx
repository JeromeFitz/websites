import { Box, Emoji, Flex, Text } from '@jeromefitz/design-system/components'
import _size from 'lodash/size'
// import dynamic from 'next/dynamic'

import getContentTypeDetail from '../utils/getContentTypeDetail'

// const Emoji = dynamic(() => import('@jeromefitz/design-system/components'), {})

const callout = ({ content, id }) => {
  if (_size(content) > 0) {
    const {
      icon: { emoji },
    } = content
    return (
      <Box key={id} css={{ py: '$4' }}>
        <Flex
          css={{
            alignItems: 'flex-start',
            backgroundColor: '$colors$gray12',
            borderRadius: '0.75rem',
            color: '$colors$gray1',
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
            {emoji && <Emoji character={emoji} margin={true} />}
          </Text>
          <Text
            as="h6"
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

export default callout
