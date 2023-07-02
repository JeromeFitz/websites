'use client'
/**
 * @note(next) Until we can hook into router events
 *  need to customize the custom Link component
 *  across the board for the hack way of determining.
 *
 * should be able to back this out at some point
 */

import { cx } from '@jeromefitz/shared/src/utils'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

import {
  handleRouterChange,
  LinkRouterChangeContext,
} from '~context/LinkRouterChangeContext'

function AnchorNav({
  href,
  children,
  className = null,
}: React.PropsWithChildren<{ href: string; className?: any }>) {
  const pathname = usePathname()
  return (
    <Anchor href={href} className={cx(className, pathname === href && 'font-bold')}>
      {children}
    </Anchor>
  )
}

function Anchor({
  href,
  style,
  children,
  className,
  ...props
}: React.ComponentProps<'a'>) {
  const startChange: any = useContext(LinkRouterChangeContext)
  const useLink = href && href.startsWith('/')

  if (useLink)
    return (
      /**
       * @todo(types) next
       * fix the ...props type error
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <NextLink
        {...props}
        href={href}
        onClick={() => {
          handleRouterChange(href, startChange)
        }}
        style={style}
        className={cx(
          // 'inline-flex flex-row gap-1 items-center',
          // 'underline-offset-4',
          // 'underline',
          // 'decoration-radix-mauve4 hover:decoration-radix-mauve5',
          // 'text-radix-mauve11 hover:text-radix-mauve12',
          // 'transition-all duration-200 ease-in',
          className
        )}
      >
        {children}
      </NextLink>
    )
  return (
    <a
      {...props}
      href={href}
      className={className}
      style={style}
      rel="noreferrer"
      target={'_blank'}
    >
      {children}
    </a>
  )
}

export { AnchorNav, Anchor }
