import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

const nextSeo = { url: `https://${env.NEXT_PUBLIC__SITE}` }

import type { NotionColor } from '@/lib/drizzle/schemas/_notion/types'

import { Flex, Link, Text } from '@radix-ui/themes'
import NextLink from 'next/link'
import { Fragment } from 'react'

import { ArrowRightIcon, ArrowTopRightIcon } from '@/components/Icon'
import { cx } from '@/utils/cx'
import { isExternalUrl } from '@/utils/isExternalUrl'

type Size = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

const LinkText = ({
  color,
  disabled = false,
  href = '',
  text,
  textComponent,
  textMobile,
  icon,
  size = '2',
  tabIndex = 0,
}: {
  color?: NotionColor
  disabled?: boolean
  href?: string
  text: React.ReactNode
  textComponent?: React.ReactNode
  textMobile?: React.ReactNode
  icon?: React.ReactNode
  tabIndex?: number
  size?: Size
}) => {
  const hasHref: boolean = !!href
  const Icon = hasHref
    ? isExternalUrl(href)
      ? ArrowTopRightIcon
      : ArrowRightIcon
    : ArrowRightIcon
  const WrapperComponent = hasHref ? NextLink : Fragment
  const _href = href.replace(nextSeo.url, '')
  const WrapperProps = hasHref ? { href: _href } : {}

  return (
    <Flex asChild align="center" justify="between" width="100%">
      <Link
        asChild={hasHref}
        className={cx('group cursor-pointer! disabled:cursor-not-allowed!')}
        // @ts-ignore
        disabled={disabled}
        color={color || 'gold'}
        radius="full"
        size={size}
        tabIndex={tabIndex}
      >
        {/* @ts-ignore */}
        <WrapperComponent {...WrapperProps}>
          <Flex
            align="center"
            justify="start"
            width={{ initial: '90%', md: '90%' }}
            gap="2"
          >
            {icon}
            {textComponent ? (
              <>{textComponent}</>
            ) : (
              <>
                <Text truncate className={cx('hidden md:block')}>
                  {text}
                </Text>
                <Text truncate className={cx('block md:hidden')}>
                  {textMobile || text}
                </Text>
              </>
            )}
          </Flex>
          {!disabled && (
            <Icon
              className={cx(
                'transition-all delay-75',
                'md:opacity-0! md:group-focus:opacity-100! md:group-hover:opacity-100!',
                'md:-translate-x-2 md:group-focus:translate-x-0 md:group-hover:translate-x-0',
                'mx-1',
                '',
              )}
            />
          )}
        </WrapperComponent>
      </Link>
    </Flex>
  )
}

export { LinkText }
