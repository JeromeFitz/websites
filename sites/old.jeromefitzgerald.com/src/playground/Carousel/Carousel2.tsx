'use client'
import './styles.css'
import { cx } from '@jeromefitz/shared/src/utils'
import { animate, motion, useMotionValue, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function Carousel2() {
  const ref = useRef<HTMLUListElement>(null)
  const { scrollXProgress } = useScroll({ container: ref })
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [trackMouse, setTrackMouse] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)
  const [items, setItems] = useState<number[]>([])

  useEffect(() => {
    const arr = new Array(10).fill(undefined).map((val, idx) => idx)
    setItems(arr)

    return () => {
      setStartX(0)
      setScrollLeft(0)
      setTrackMouse(false)
      setAnimationComplete(true)
    }
  }, [])

  const x = useMotionValue(0)

  const handleMouseMove = (e: React.PointerEvent<HTMLUListElement>) => {
    if (!ref.current) return null
    if (!trackMouse) return null

    setAnimationComplete(false)

    const xVal = e.pageX - ref.current.offsetLeft
    const walk = (xVal - startX) * 2 //scroll-fast

    const controls = animate(x, scrollLeft - walk, {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
      onUpdate: (val) => {
        if (!ref.current) return
        ref.current.scrollLeft = val
      },
      onComplete: () => {
        setAnimationComplete(true)
      },
      onStop: () => {
        setAnimationComplete(true)
      },
    })
    return controls.stop
  }

  const handleMouseDown = (e: React.PointerEvent<HTMLUListElement>) => {
    // if (!(e.target instanceof HTMLLIElement)) return;
    if (!ref.current) return

    setTrackMouse(true)

    const startX = e.pageX - ref.current.offsetLeft
    setStartX(startX)

    const scrollLeft = ref.current.scrollLeft
    setScrollLeft(scrollLeft)
  }

  const handleMouseLeave = () => {
    setTrackMouse(false)
  }

  const handleMouseUp = () => {
    setTrackMouse(false)
  }

  const handleScroll = () => {
    if (!ref.current) return

    if (animationComplete) {
      x.set(ref.current.scrollLeft)
    }
  }

  return (
    <div className={cx('z-50 m-0 p-0')}>
      <svg className={cx('fixed h-[50px] w-[50px] -rotate-90')} viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="15"
          pathLength="1"
          strokeDashoffset={0}
          className={cx('stroke-radix-green3 fill-none stroke-[15%] opacity-30')}
          strokeDasharray={'1px 1px'}
        />
        <motion.circle
          cx="25"
          cy="25"
          r="15"
          pathLength="1"
          strokeDashoffset={0}
          className={cx(' stroke-radix-green3 fill-none stroke-[15%]')}
          style={{
            pathLength: scrollXProgress,
          }}
        />
      </svg>
      <motion.ul
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onScroll={handleScroll}
        className={cx(
          'cursor-grab active:cursor-grabbing',
          'mx-auto flex h-96 list-none overflow-x-scroll px-0 py-20',
          'flex-[0_0_600px]',
          ''
        )}
      >
        {items.map((idx) => (
          <motion.li
            key={idx}
            className={cx(
              ' bg-radix-green3 ',
              'm-[0_20px_0_0] select-none',
              'flex-[0_0_200px]',
              'last-of-type:m-0 ',
              ''
            )}
          ></motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
export { Carousel2 }
