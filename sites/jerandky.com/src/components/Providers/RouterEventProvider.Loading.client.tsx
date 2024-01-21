'use client'
import { cx } from '@jeromefitz/ds/utils/cx'
import { useNProgress } from '@tanem/react-nprogress'
// import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Loading: React.FC<{ isRouteChanging: boolean }> = ({ isRouteChanging }) => {
  const { isFinished } = useNProgress({
    isAnimating: isRouteChanging,
    minimum: 0.08,
  })

  useEffect(() => {
    isFinished
      ? document.body.classList.remove('loading')
      : document.body.classList.add('loading')

    return () => {
      document.body.classList.remove('loading')
    }
  }, [isFinished])

  return (
    <div
      id="loading--status"
      className={cx(
        'pointer-events-none fixed',
        'z-[9999] origin-[0_0]',
        'left-0 top-0 h-[2.5px] w-full',
        'bg-gradient-to-r',
        'from-radix-pink1 to-radix-pink11',
        'dark:from-radix-pink11 dark:to-radix-pink1',
        isFinished ? 'opacity-0' : 'opacity-100',
        '',
      )}
      // animate={{
      //   opacity: isFinished ? [1, 0.75, 0.5, 0.25, 0] : [0, 0.25, 0.5, 0.75, 1],
      //   scaleX: isFinished ? 1 : progress,
      // }}
      // transition={{ duration: 0.75 }}
    />
  )
}

export { Loading }
