import { Box, Flex, Text } from '@jeromefitz/design-system'
import _size from 'lodash/size'
import dynamic from 'next/dynamic'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const Emoji = dynamic(
  () =>
    import('@jeromefitz/design-system/custom/Emoji').then((mod: any) => mod.Emoji),
  {
    ssr: false,
  }
)

const quote = ({ content, id }) => {
  if (_size(content) > 0) {
    return (
      <Box
        css={{
          py: '$5',
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
            margin: '$2',
            marginBottom: '$3',
            padding: '$4',
            paddingBottom: '$5',
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
            {/* @types(emoji) dynamic import ability */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Emoji character={`📰️`} />
          </Text>
          <Text
            as="blockquote"
            css={{
              ml: '$5',
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
