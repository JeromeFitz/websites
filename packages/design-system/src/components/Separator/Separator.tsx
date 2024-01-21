'use client'
/**
 * @note(next) why is this client? flushSync?
 */
import * as Separator from '@radix-ui/react-separator'

import { cx } from '../../utils/cx.js'

function SeparatorImpl({ className = '' }) {
  return (
    <Separator.Root
      asChild
      className={cx(
        // 'data-[orientation=horizontal]:h-[1px]',
        // 'data-[orientation=horizontal]:w-full',
        // 'data-[orientation=vertical]:h-full',
        // 'data-[orientation=vertical]:w-[1px]',
        // 'min-h-[0.75rem]',
        'h-[1px] w-full',
        'min-h-[0.75rem]',
        'text-radix-slate6',
        className,
      )}
      decorative
      orientation="vertical"
    >
      <hr />
    </Separator.Root>
  )
}

export { SeparatorImpl as Separator }
