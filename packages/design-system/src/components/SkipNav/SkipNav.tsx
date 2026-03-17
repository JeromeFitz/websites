import type { Ref } from 'react'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Link } from '@radix-ui/themes/dist/esm/components/link.js'

import { cx } from '../../utils/cx'

const defaultId = 'skip-nav'

interface SkipNavContentProps {
  children?: React.ReactNode
  id?: string
  ref?: Ref<HTMLDivElement> | undefined
}
interface SkipNavLinkProps {
  children?: React.ReactNode
  contentId?: string
  ref?: Ref<HTMLAnchorElement> | undefined
}

const SkipNavLink = ({
  children = 'Skip to content',
  contentId,
  ref,
  ...props
}: SkipNavLinkProps) => {
  const id = contentId || defaultId
  return (
    <Link
      {...props}
      className={cx(
        'absolute top-2 right-full z-50 block rounded-3 bg-accent-1 p-4',
        'focus:right-auto focus:left-2.5',
      )}
      data-skip-nav-content=""
      href={`#${id}`}
      ref={ref}
      tabIndex={0}
    >
      {children}
    </Link>
  )
}
SkipNavLink.displayName = 'SkipNavLink'

const SkipNavContent = ({ id: idProp, ref, ...props }: SkipNavContentProps) => {
  const id = idProp || defaultId
  return <Box {...props} asChild id={id} ref={ref} />
}
SkipNavContent.displayName = 'SkipNavContent'

export { SkipNavContent, SkipNavLink }
