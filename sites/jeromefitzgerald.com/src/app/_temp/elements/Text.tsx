import { cx } from '@jeromefitz/ds/utils/cx'

import type { ReactNode } from 'react'

function Text({ children, className = '', componentType = 'p' }) {
  const Component: ReactNode = componentType

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component
      className={cx(
        'font-mono text-lg tracking-normal md:tracking-normal',
        className,
      )}
    >
      {children}
    </Component>
  )
}

export { Text }
