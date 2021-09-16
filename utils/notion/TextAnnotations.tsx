import { ExternalLinkIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import NextLink from 'next/link'
import nodeEmoji from 'node-emoji'
import { useSound } from 'use-sound'

import Emoji from '~components/Notion/Emoji'
import { useUI } from '~context/ManagedUIContext'
import getNextLink from '~utils/notion/getNextLink'

const emojiParser = (text) => {
  const emojiFound = nodeEmoji.find(text.trim())

  if (emojiFound === undefined) {
    return text
  }

  return <Emoji character={emojiFound.emoji} />
}

const TextAnnotations = ({ href, plain_text, annotations }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

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
    const isExternal = !href.includes('jerome')

    if (!isExternal) {
      const link = getNextLink(href)
      if (!!link) {
        returnElement = (
          <NextLink as={link.as.replace('//', '/')} href={link.href}>
            <a
              className={cx(
                'font-semibold',
                'underline underline-offset-md underline-thickness-sm',
                'hover:text-green-500 dark:hover:text-yellow-200'
              )}
              onClick={() => {
                playActive()
              }}
            >
              {returnElement}
            </a>
          </NextLink>
        )
      } else {
        return null
      }
    } else {
      returnElement = (
        <a
          className={cx(
            'font-semibold',
            'underline underline-offset-md underline-thickness-sm',
            'hover:text-green-500 dark:hover:text-yellow-200',
            'inline-flex flex-row',
            'ml-1'
          )}
          href={href}
          rel="noreferrer"
          target={'_blank'}
          onClick={() => {
            playActive()
          }}
        >
          <span>{returnElement}</span>
          <ExternalLinkIcon className="h-4   w-4  ml-1" />
        </a>
      )
    }
  }
  return returnElement
}

export default TextAnnotations
