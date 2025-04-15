'use client'
import { cx } from '@jeromefitz/ds/utils/cx'

import { useNProgress } from '@tanem/react-nprogress'
import { useEffect } from 'react'

const Loading: React.FC<{ isRouteChanging: boolean }> = ({ isRouteChanging }) => {
  const { isFinished } = useNProgress({
    isAnimating: isRouteChanging,
    minimum: 0.08,
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isFinished
      ? document.body.classList.remove('loading')
      : document.body.classList.add('loading')

    return () => {
      document.body.classList.remove('loading')
    }
  }, [isFinished])

  return (
    <div
      className={cx(
        'pointer-events-none fixed',
        'z-[9999] origin-[0_0]',
        'left-0 top-0 h-0.5 w-full',
        'bg-gradient-to-r',
        'to-accent-11 from-[var(--accent-1)]',
        'dark:from-accent-11 dark:to-[var(--accent-1)]',
        isFinished ? 'opacity-0' : 'opacity-100',
        '',
      )}
      id="loading--status"
    />
  )
}

export { Loading }
