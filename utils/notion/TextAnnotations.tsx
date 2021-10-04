import cx from 'clsx'
import hasEmoji from 'has-emoji'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useSound } from 'use-sound'

import Icon from '~components/Icon'
import { useUI } from '~context/ManagedUIContext'
import getNextLink from '~utils/notion/getNextLink'

const Emoji = dynamic(() => import('~components/Notion/Emoji'), {
  ssr: false,
})

const emojiParser = (text) => {
  const emojiFound = hasEmoji(text.trim())

  if (emojiFound === undefined || emojiFound === false) {
    return text
  }

  return <Emoji character={text.trim()} />
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
          <Icon className="h-4 w-4 ml-1" icon={'ExternalLinkIcon'} />
        </a>
      )
    }
  }
  return returnElement
}

export default TextAnnotations
