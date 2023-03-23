// import { Box, Callout, Flex, Text } from '@jeromefitz/design-system'
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
    <div id="quote-container" className="p-2 md:p-4">
      <div id="quote-wrapper" className="green-border mr-4 border-l-8 p-4">
        {isQuote ? (
          <div id="quote" className="flex flex-col gap-3">
            <p className="text-xl font-black md:text-3xl">
              {text[0]}
              {closeQuote}
            </p>
            <p className="text-base font-bold md:text-xl">{text[1]}</p>
          </div>
        ) : (
          <p>{children}</p>
        )}
      </div>
    </div>
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

// export { QuoteImpl }
export default quote
