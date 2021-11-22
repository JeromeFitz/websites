import _size from 'lodash/size'
import dynamic from 'next/dynamic'

import { Box, Flex, Text } from '~styles/system/components'

import getContentTypeDetail from './utils/getContentTypeDetail'

const Emoji = dynamic(() => import('~components/Emoji'), {})

const callout = ({ content, id }) => {
  if (_size(content) > 0) {
    const {
      icon: { emoji },
    } = content
    return (
      <Box key={id} css={{ py: '$4' }}>
        <Flex
          css={{
            br: '0.75rem',
            bc: '$colors$gray12',
            color: '$colors$gray1',
            m: '$6',
            p: '$6',
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
            css={{ mb: 0, pb: 0, color: 'inherit', fontSize: 'inherit' }}
          >
            {emoji && <Emoji character={emoji} margin={true} />}
          </Text>
          <Text as="h6" css={{ ml: '$4', color: 'inherit', fontSize: 'inherit' }}>
            {getContentTypeDetail({ content, id })}
          </Text>
        </Flex>
      </Box>
    )
  }
  return null
}

export default callout
