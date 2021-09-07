import cx from 'clsx'
import NextLink from 'next/link'
import nodeEmoji from 'node-emoji'

import Emoji from '~components/Notion/Emoji'
import getNextLink from '~utils/notion/getNextLink'

const emojiParser = (text) => {
  const emojiFound = nodeEmoji.find(text.trim())

  if (emojiFound === undefined) {
    return text
  }

  return <Emoji character={emojiFound.emoji} />
}

const getTextAnnotations = ({ href, plain_text, annotations }) => {
  let returnElement = <>{emojiParser(plain_text)}</>
  if (annotations.bold) {
    returnElement = <strong>{returnElement}</strong>
  }
  if (annotations.code) {
    returnElement = <code>{returnElement}</code>
  }
  if (annotations.italic) {
    returnElement = <em>{returnElement}</em>
  }
  if (annotations.strikethrough) {
    returnElement = <s>{returnElement}</s>
  }
  if (annotations.underline) {
    returnElement = <u>{returnElement}</u>
  }
  if (href) {
    const link = getNextLink(href)
    // returnElement = <a href={href}>{returnElement}</a>
    if (!!link) {
      returnElement = (
        <NextLink as={link.as.replace('//', '/')} href={link.href}>
          <a
            className={cx(
              'font-semibold',
              'underline underline-offset-md underline-thickness-sm',
              'hover:text-green-500 dark:hover:text-yellow-200'
            )}
          >
            {returnElement}
          </a>
        </NextLink>
      )
    } else {
      return null
    }
  }
  return returnElement
}

export default getTextAnnotations
