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

  const styles = cx(
    'inline-flex flex-row items-center gap-1',
    'underline-offset-4',
    'underline',
    // 'decoration-radix-slate4 hover:decoration-radix-slate5',
    'text-radix-pink11 hover:text-radix-pink12',
    'transition-all duration-200 ease-in',
    '',
    // 'hover:bg-breeze hover:dark:bg-breeze-r hover:bg-clip-text hover:text-transparent',
    '',
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
