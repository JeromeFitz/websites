import { useViewportScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

const useProgress = () => {
  const [readingProgress, setReadingProgress] = useState(0)
  const { scrollYProgress } = useViewportScroll()

  useEffect(
    () =>
      /**
       * Use Framer Motion's useViewportScroll to get the current scroll
       * position in the viewport and save it in the state
       */
      scrollYProgress.onChange((latest: number) => {
        setReadingProgress(parseFloat(latest.toFixed(2)))
      }),
    [scrollYProgress]
  )

  return readingProgress
}

export default useProgress
