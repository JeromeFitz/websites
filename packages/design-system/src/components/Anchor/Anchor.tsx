/* eslint-disable no-restricted-imports */
import NextLink from 'next/link'

import { cx } from '../../utils/cx'
import { ExternalLinkIcon } from '../Icon'

const nextSeo = { url: `https://${process.env.NEXT_PUBLIC__SITE}` }
const domain = new URL(nextSeo.url)

const Anchor = ({ className = '', href, children }) => {
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
    'text-radix-pink11 hover:text-radix-pink12',
    'transition-all duration-200 ease-in',
    className
  )

  if (isExternal && !isNotion) {
    return (
      <a href={href} rel="noreferrer" target={'_blank'} className={styles}>
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

export { Anchor }
