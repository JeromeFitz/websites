import { Box, Callout, Flex, Text } from '@jeromefitz/design-system'
import _map from 'lodash/map'
import _size from 'lodash/size'

import getContentTypeDetail from '../utils/getContentTypeDetail'

/**
 * @todo(quote) can we splice the quote for better display?
 * @note(quote) lol, yes, but this is incredibly hacky.
 * We check on `delimiter` then if data comes from notion,
 *  we split the first array item from the rest, and hope, heh.
 */
const delimiter = '”'
const splitter = (children = '') => {
  return Array.isArray(children)
    ? {
        isQuote: true,
        text: [
          children[0]?.props?.plain_text,
          _map(children?.slice(1), (child: any) => child?.props?.plain_text).join(
            ' '
          ),
        ],
        closeQuote: '',
      }
    : {
        isQuote: true,
        text: children?.split(delimiter)?.slice(0),
        closeQuote: delimiter,
      }
}
const QuoteImpl = ({ children }) => {
  const { closeQuote, isQuote, text } = splitter(children)
  return (
    <Box
      css={{
        p: '$2',
        '@bp1': {
          p: '$4',
        },
      }}
    >
      <Callout variant="quote">
        {isQuote ? (
          <Flex direction="column" gap="3">
            <Text size="5" weight="7" variant="quote">
              {text[0]}
              {closeQuote}
            </Text>
            <Text size="4" weight="5" css={{ color: '$colors$quoteTextHover' }}>
              {text[1]}
            </Text>
          </Flex>
        ) : (
          <Text variant="quote">{children}</Text>
        )}
      </Callout>
    </Box>
  )
}
const quote = ({ content, id }) => {
  if (_size(content) > 0) {
    const text = getContentTypeDetail({ content, id })
    return <QuoteImpl>{text}</QuoteImpl>
  } else {
    return null
  }
}

export { QuoteImpl }
export default quote
