import { useMotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect } from 'react'

const clamp = (number, min, max) => Math.min(Math.max(number, min), max)

function useBoundedScroll(bounds, scrollOptions) {
  const { scrollY } = useScroll(scrollOptions)
  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  setInterval(() => {})

  useEffect(() => {
    return scrollY.onChange((current) => {
      const previous = scrollY.getPrevious()
      const diff = current - previous
      const scrollYBoundedNew = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(scrollYBoundedNew, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}

export { useBoundedScroll }
