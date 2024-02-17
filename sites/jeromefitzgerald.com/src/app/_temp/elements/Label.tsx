import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

/**
 * @todo(html) proper componentType elements
 */
function Label({ children, className = '', componentType = 'p' }) {
  const Component: ReactNode | string = componentType
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component
      className={cx(
        'hidden opacity-100',
        'font-sans',
        'text-3xl font-bold tracking-normal',
        'md:text-3xl md:font-black md:tracking-tight',
        className,
      )}
    >
      {children}
    </Component>
  )
}

export { Label }
