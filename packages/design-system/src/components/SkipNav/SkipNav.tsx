import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'
import { forwardRef } from 'react'

import { cx } from '../../utils/cx'

const defaultId = 'skip-nav'

interface SkipNavContentProps {
  children?: React.ReactNode
  id?: string
}
interface SkipNavLinkProps {
  children?: React.ReactNode
  contentId?: string
}

const SkipNavLink = forwardRef(function SkipNavLink(
  { children = 'Skip to content', contentId, ...props }: SkipNavLinkProps,
  forwardedRef,
) {
  const id = contentId || defaultId
  return (
    <Link
      {...props}
      className={cx(
        'absolute top-2 right-[100%] z-50 block rounded-3 bg-accent-1 p-4',
        'focus:right-auto focus:left-2.5',
      )}
      data-skip-nav-content=""
      href={`#${id}`}
      // @ts-ignore
      ref={forwardedRef}
      tabIndex={0}
    >
      {children}
    </Link>
  )
})
SkipNavLink.displayName = 'SkipNavLink'

const SkipNavContent = forwardRef(function SkipNavContent(
  { id: idProp, ...props }: SkipNavContentProps,
  forwardedRef,
) {
  const id = idProp || defaultId
  return (
    // @ts-ignore
    <Box {...props} asChild id={id} ref={forwardedRef} />
  )
})
SkipNavContent.displayName = 'SkipNavContent'

export { SkipNavContent, SkipNavLink }
