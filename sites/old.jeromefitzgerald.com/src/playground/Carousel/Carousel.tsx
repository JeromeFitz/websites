'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { cx } from '@jeromefitz/shared/src/utils'
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useMotionValue,
  // useScroll,
} from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

const images = [
  '/static/images/carousel-temp/1.jpg',
  '/static/images/carousel-temp/2.jpg',
  '/static/images/carousel-temp/3.jpg',
  '/static/images/carousel-temp/4.jpg',
  '/static/images/carousel-temp/5.jpg',
  '/static/images/carousel-temp/6.jpg',
]

const collapsedAspectRatio = 1 / 3
const fullAspectRatio = 3 / 2
const margin = 12
const gap = 2

function Carousel() {
  const [index, setIndex] = useState(0)

  const handleNext = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1)
    } else {
      setIndex(images.length - 1)
    }
  }, [index])
  const handlePrevious = useCallback(() => {
    if (index + 1 < images.length) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }, [index])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        // e.preventDefault()
        handleNext()
      }
      if (e.key === 'ArrowRight') {
        // e.preventDefault()
        handlePrevious()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [handleNext, handlePrevious])

  const ref = useRef<HTMLUListElement>()
  // const { scrollXProgress } = useScroll({ container: ref })
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [trackMouse, setTrackMouse] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(true)
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
    console.dir(`> handleMouseDown`)
    // if (!(e.target instanceof HTMLLIElement)) return;
    if (!ref.current) return

    setTrackMouse(true)

    const startX = e.pageX - ref.current.offsetLeft
    setStartX(startX)

    const scrollLeft = ref.current.scrollLeft
    setScrollLeft(scrollLeft)

    console.dir(`startX:     ${startX}`)
    console.dir(`scrollLeft: ${scrollLeft}`)

    startX < 250 ? handleNext() : handlePrevious()
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
    <MotionConfig
      transition={{
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      <div className="h-full bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{
                x: `-${index * 100}%`,
              }}
              className={cx('flex cursor-grab active:cursor-grabbing')}
              /**
               * @todo(types) Type 'MutableRefObject<HTMLUListElement | undefined>' is not assignable to type 'Ref<HTMLDivElement> | undefined'.
               */
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref={ref}
              /**
               * @todo(types) Type '(e: React.PointerEvent<HTMLUListElement>) => void' is not assignable to type 'MouseEventHandler<HTMLDivElement>'.
               */
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onMouseMove={handleMouseMove}
              /**
               * @todo(types) Type '(e: React.PointerEvent<HTMLUListElement>) => void' is not assignable to type 'MouseEventHandler<HTMLDivElement>'.
               */
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onScroll={handleScroll}
            >
              {images.map((image, i) => {
                return (
                  <motion.img
                    key={image}
                    src={image}
                    animate={{ opacity: i === index ? 1 : 0.3 }}
                    className="aspect-[3/2] w-full shrink-0 select-none object-cover"
                  />
                )
              })}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80"
                  onClick={() => setIndex(index - 1)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/60 transition hover:bg-white/80"
                  onClick={() => setIndex(index + 1)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: 'none' }}
                  whileHover={{ opacity: 1 }}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute inset-x-0 bottom-6 flex justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  index * gap +
                  margin
                }%`,
              }}
              /**
               * @todo(types) Type '{ aspectRatio: number; gap: string; }' is not assignable to type 'MotionStyle'.
               */
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
              className="flex h-14"
            >
              {images.map((image, i) => (
                <motion.button
                  key={image}
                  onClick={() => setIndex(i)}
                  whileHover={{ opacity: 1 }}
                  initial={false}
                  animate={i === index ? 'active' : 'inactive'}
                  className="shrink-0"
                  variants={{
                    active: {
                      opacity: 1,
                      style: {
                        aspectRatio: fullAspectRatio,
                        marginLeft: `${margin}%`,
                        marginRight: `${margin}%`,
                      },
                    },
                    inactive: {
                      opacity: 0.5,
                      style: {
                        aspectRatio: collapsedAspectRatio,
                        marginLeft: '0%',
                        marginRight: '0%',
                      },
                    },
                  }}
                >
                  <motion.img src={image} className="h-full object-cover" />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}

export { Carousel }
