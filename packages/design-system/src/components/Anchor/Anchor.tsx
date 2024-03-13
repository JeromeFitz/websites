import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { Flex } from '@radix-ui/themes'
// import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
// eslint-disable-next-line no-restricted-imports
import NextLink, { type LinkProps } from 'next/link'
import React, { type PropsWithChildren } from 'react'

import { cx } from '../../utils/cx'
import { ExternalLinkIcon } from '../Icon/Icon'

const nextSeo = { url: `https://${env.NEXT_PUBLIC__SITE}` }
const domain = new URL(nextSeo.url)

const Anchor = ({ children, className = '', href }) => {
  const isExternal =
    !href.includes(domain.hostname.replace('www.', '')) || href.includes('bsky.app')
  const isNotion = !href.includes('http')

  /**
   * @note(tailwind) twMerge works best here
   *
   * otherwise we need to pass `!` on certain
   *  elements like: !text-inherit
   * depending on the ordering of `cx` + tailwind by itself
   */
  const styles = cx(
    'inline-flex flex-row items-center gap-1',
    'underline-offset-4',
    'underline',
    'text-accent-11 hover:text-accent-12',
    'transition-all duration-200 ease-in',
    className,
  )

  if (isExternal && !isNotion) {
    return (
      <a className={styles} href={href} rel="noreferrer" target={'_blank'}>
        <>{children}</>
        <ExternalLinkIcon />
      </a>
    )
  }

  if (!href) return null

  const _href = href.replace(nextSeo.url, '')
  const props = {
    className: styles,
    href: _href === '' ? '/' : _href,
  }

  return <NextLink {...props}>{children}</NextLink>
}
const AnchorUnstyled = ({ children, className = '', href }) => {
  const isExternal =
    !href.includes(domain.hostname.replace('www.', '')) || href.includes('bsky.app')
  const isNotion = !href.includes('http')

  if (isExternal && !isNotion) {
    return (
      <Flex asChild direction="row" gap="2">
        <a className={className} href={href} rel="noreferrer" target={'_blank'}>
          <>{children}</>
          <ExternalLinkIcon />
        </a>
      </Flex>
    )
  }

  if (!href) return null

  const _href = href.replace(nextSeo.url, '')
  const props = {
    className,
    href: _href === '' ? '/' : _href,
  }

  return <NextLink {...props}>{children}</NextLink>
}

type AnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
>
type ScrollLinkProps = AnchorProps & LinkProps & PropsWithChildren

const ScrollTo = ({ children, className = '', href }: ScrollLinkProps) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    //remove everything before the hash
    const targetId = e.currentTarget.href.replace(/.*\#/, '')
    const elem = document.getElementById(targetId)
    window.scrollTo({
      behavior: 'smooth',
      top: elem?.getBoundingClientRect().top,
    })
  }

  /**
   * @note(tailwind) twMerge works best here
   *
   * otherwise we need to pass `!` on certain
   *  elements like: !text-inherit
   * depending on the ordering of `cx` + tailwind by itself
   */
  const styles = cx(
    'inline-flex flex-row items-center gap-1',
    'underline-offset-4',
    'underline',
    'text-accent-11 hover:text-accent-12',
    'transition-all duration-200 ease-in',
    className,
  )
  if (!href) return null

  const props = {
    className: styles,
    href,
  }

  return (
    <NextLink onClick={handleScroll} {...props}>
      {children}
    </NextLink>
  )
}
export { Anchor, AnchorUnstyled, ScrollTo }
