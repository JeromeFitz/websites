import { cx } from '@jeromefitz/shared/src/utils/cx'
import { useNProgress } from '@tanem/react-nprogress'
import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Loading: React.FC<{ isRouteChanging: boolean }> = ({ isRouteChanging }) => {
  const { isFinished, progress } = useNProgress({
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
    <motion.div
      id="loading--status"
      className={cx(
        'pointer-events-none fixed',
        'z-[9999] origin-[0_0]',
        'left-0 top-0 h-[2.5px] w-full',
        'bg-gradient-to-r',
        // 'from-radix-pink8 to-radix-pink11',
        'from-radix-purple1 to-radix-pink12',
        ''
      )}
      animate={{
        opacity: isFinished ? [1, 0.75, 0.5, 0.25, 0] : [0, 0.25, 0.5, 0.75, 1],
        scaleX: isFinished ? 1 : progress,
      }}
      transition={{ duration: 0.75 }}
    />
  )
}

export { Loading }
