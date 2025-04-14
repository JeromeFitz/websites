import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { Flex } from '@radix-ui/themes/dist/esm/components/flex.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import NextLink from 'next/link'

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

function FlexImpl({ children }: { children: React.ReactNode }) {
  return (
    <Flex align="center" asChild direction="row" display="inline-flex" gap="1">
      {children}
    </Flex>
  )
}

const Anchor = ({
  children,
  className = '',
  href,
}: {
  children: React.ReactNode
  className?: string
  href: string
}) => {
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
