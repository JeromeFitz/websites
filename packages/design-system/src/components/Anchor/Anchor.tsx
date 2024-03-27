import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

/**
 * @todo(radix-ui) issue w/ flex.props.js init order
 *
 * ref: https://github.com/JeromeFitz/websites/pull/2341
 */
import { Flex } from '@radix-ui/themes'
// import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import React from 'react'

import { ExternalLinkIcon } from '../Icon/Icon'

const nextSeo = { url: `https://${env.NEXT_PUBLIC__SITE}` }
const domain = new URL(nextSeo.url)

const getExternal = (href: string | string[]) =>
  !href.includes(domain.hostname.replace('www.', '')) || href.includes('bsky.app')

const getNotion = (href: string | string[]) => !href.includes('http')

const getParams = (href: string | string[]) => ({
  isExternal: getExternal(href),
  isNotion: getNotion(href),
})

function FlexImpl({ children }) {
  return (
    <Flex align="center" asChild direction="row" display="inline-flex" gap="1">
      {children}
    </Flex>
  )
}

const Anchor = ({ children, className = '', href }) => {
  const { isExternal, isNotion } = getParams(href)

  if (isExternal && !isNotion) {
    return (
      <FlexImpl>
        <Link className={className} href={href} rel="noreferrer" target="_blank">
          <>{children}</>
          <ExternalLinkIcon />
        </Link>
      </FlexImpl>
    )
  }

  if (!href) return null

  const _href = href.replace(nextSeo.url, '')
  const props = {
    className,
    href: _href === '' ? '/' : _href,
  }

  return (
    <FlexImpl>
      <Link asChild>
        <NextLink {...props}>{children}</NextLink>
      </Link>
    </FlexImpl>
  )
}

export { Anchor }
