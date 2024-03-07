'use client'
/**
 * @note(next) why is this client? flushSync?
 */
import type { SeparatorProps } from '@radix-ui/react-separator'

import { Root as SeparatorRoot } from '@radix-ui/react-separator'

import { cx } from '../../utils/cx'

interface SeparatorPropsImpl extends SeparatorProps {
  children?: any
  className?: any
}

function Separator({
  // @todo(radix) className
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  className = '',
  decorative = true,
  orientation = 'vertical',
}: SeparatorPropsImpl) {
  return (
    // @todo(radix) children
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SeparatorRoot
      asChild
      className={cx('h-[1px] w-full', 'min-h-[0.75rem]', 'text-gray-6', className)}
      decorative={decorative}
      orientation={orientation}
    >
      <hr />
    </SeparatorRoot>
  )
}

export { Separator }
