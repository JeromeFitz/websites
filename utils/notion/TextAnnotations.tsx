import { ExternalLinkIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'
import { useSound } from 'use-sound'

import { EmojiParser } from '~components/Emoji'
import { useUI } from '~context/ManagedUIContext'
import { Flex, Link } from '~styles/system/components'
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
        <NextLink as={link.as.replace('//', '/')} href={link.href} passHref>
          <Link
            css={{
              display: 'inline-flex',
            }}
            onClick={() => {
              playActive()
            }}
          >
            {children}
          </Link>
        </NextLink>
      )
    } else {
      return null
    }
  } else {
    return (
      <Link
        css={{
          display: 'inline-flex',
          ml: '$1',
        }}
        href={href}
        rel="noreferrer"
        target={'_blank'}
        onClick={() => {
          playActive()
        }}
        variant="contrast"
      >
        {children}
        <Flex as="span" css={{ color: '$slate8', display: 'inline-flex', mx: '$1' }}>
          <ExternalLinkIcon />
        </Flex>
      </Link>
    )
  }
}

const TextAnnotations = ({ href, id, plain_text, annotations }) => {
  if (!plain_text) return null
  const text = <EmojiParser id={id} text={plain_text} />
  // @todo(code)
  const { bold, color, italic, strikethrough, underline } = annotations
  return (
    <>
      <span
        style={{
          color: color !== 'default' ? color : 'inherit',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontStyle: italic ? 'italic' : 'inherit',
          fontWeight: bold ? 'bold' : 'inherit',
          textDecoration: strikethrough
            ? 'line-through'
            : underline
            ? 'underline'
            : 'inherit',
        }}
      >
        {href ? <TextAnnotationLink href={href}>{text}</TextAnnotationLink> : text}
      </span>
    </>
  )
}
export default TextAnnotations
