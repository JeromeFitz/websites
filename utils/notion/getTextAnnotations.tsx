import cx from 'clsx'
import Link from 'next/link'

import getNextLink from '~utils/notion/getNextLink'

const getTextAnnotations = ({ href, plain_text, annotations }) => {
  let returnElement = <>{plain_text}</>
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
    returnElement = (
      <Link as={link.as.replace('//', '/')} href={link.href}>
        <a
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200'
          )}
        >
          {returnElement}
        </a>
      </Link>
    )
  }
  return returnElement
}

export default getTextAnnotations
