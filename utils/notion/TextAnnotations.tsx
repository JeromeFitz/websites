import cx from 'clsx'
import NextLink from 'next/link'
import { useSound } from 'use-sound'

import Icon from '~components/Icon'
import { EmojiParser } from '~components/Notion/Emoji'
import { useUI } from '~context/ManagedUIContext'
import getNextLink from '~utils/notion/getNextLink'

const TextAnnotationLink = ({ children, href }) => {
  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })
  const isExternal = !href.includes('jerome')

  if (!isExternal) {
    const link = getNextLink(href)
    if (!!link) {
      return (
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
            {children}
          </a>
        </NextLink>
      )
    } else {
      return null
    }
  } else {
    return (
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
        <span>{children}</span>
        <Icon className="h-4 w-4 ml-1" icon={'ExternalLinkIcon'} />
      </a>
    )
  }
}

const TextAnnotations = ({ href, id, plain_text, annotations }) => {
  if (!plain_text) return null
  // const text = emojiParser({ id, text: plain_text })
  const text = <EmojiParser id={id} text={plain_text} />
  const { bold, code, color, italic, strikethrough, underline } = annotations
  return (
    <span
      className={[
        bold ? 'font-bold ' : '',
        code ? 'code ' : '',
        italic ? 'italic' : '',
        strikethrough ? 'line-through ' : '',
        underline ? 'underline ' : '',
      ].join('')}
      style={color !== 'default' ? { color } : {}}
    >
      {href ? <TextAnnotationLink href={href}>{text}</TextAnnotationLink> : text}
    </span>
  )
}
export default TextAnnotations
