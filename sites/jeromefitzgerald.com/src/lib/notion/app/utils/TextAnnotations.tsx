import { Box, Code, Flex, Link } from '@jeromefitz/design-system/components'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import * as React from 'react'
import { useSound } from 'use-sound'

import { nextSeo } from '~config/index'
import { useUI } from '~context/UI'
import getNextLink from '~utils/getNextLink'

/**
 * @note This should be SSR to ensure Notion Content generates
 */
const EmojiParser = dynamic(
  () =>
    import('@jeromefitz/design-system/custom/Emoji').then(
      (mod: any) => mod.EmojiParser
    ),
  {
    ssr: true,
  }
)

const domain = new URL(nextSeo.url)

const TextAnnotationLink = ({ children, href }) => {
  const { audio } = useUI()
  const [playPopDown] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const handleClickLink = () => playPopDown()

  const isExternal = !href.includes(domain.hostname.replace('www.', ''))

  if (!isExternal) {
    const link = getNextLink(href)
    if (!!link) {
      return (
        <NextLink
          as={link.as.replace('//', '/')}
          href={link.href}
          passHref
          prefetch={true}
        >
          <Link
            css={{
              display: 'inline-flex',
            }}
            onClick={handleClickLink}
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
        onClick={handleClickLink}
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
  // @types(emoji) dynamic import ability
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const text = <EmojiParser id={id} text={plain_text} />
  const { bold, code, color, italic, strikethrough, underline } = annotations

  /**
   * @note default behavior
   */
  let Component: any = Box
  let as = 'span'
  let css: any = {
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
  }

  /**
   * @custom
   */
  if (!!code) {
    Component = Code
    as = 'code'
    css = {
      // backgroundColor: '$colors$green3',
      fontSize: '$3',
      py: '$1',
      '@bp1': { fontSize: '$4' },
    }
  }

  return (
    <>
      <Component as={as} css={css}>
        {href ? <TextAnnotationLink href={href}>{text}</TextAnnotationLink> : text}
      </Component>
    </>
  )
}

export default TextAnnotations
