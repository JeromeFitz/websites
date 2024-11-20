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
        'rounded-3 bg-accent-1 absolute right-[100%] top-2 z-50 block p-4',
        'focus:left-2.5 focus:right-auto',
      )}
      data-skip-nav-content=""
      href={`#${id}`}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Box {...props} asChild id={id} ref={forwardedRef} />
  )
})
SkipNavContent.displayName = 'SkipNavContent'

export { SkipNavContent, SkipNavLink }
