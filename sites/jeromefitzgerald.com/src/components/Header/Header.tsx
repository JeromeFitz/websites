'use client'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect } from 'react'

const clamp = (number, min, max) => Math.min(Math.max(number, min), max)

function useBoundedScroll(bounds) {
  const { scrollY } = useScroll()
  const scrollYBounded = useMotionValue(0)
  const scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useEffect(() => {
    return scrollY.onChange((current) => {
      const previous = scrollY.getPrevious()
      const diff = current - previous
      const newScrollYBounded = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}

function Header() {
  const { scrollYBoundedProgress } = useBoundedScroll(400)
  const scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  )

  return (
    <div className="text-radix-slate6 mx-auto flex w-full max-w-3xl flex-1 overflow-hidden">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            /**
             * @todo(types)
             * Type '{ height: MotionValue<number>; backgroundColor: MotionValue<string>; }' is not assignable to type 'MotionStyle'.
             */
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [80, 50]),
            backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
              scrollYBoundedProgressThrottled,
              [0, 1],
              [1, 0.1]
            )})`,
          }}
          className="fixed inset-x-0 top-0 flex h-20 shadow backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              style={{
                scale: useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 1],
                  [1, 0.9]
                ),
              }}
              className="flex origin-left items-center text-xl font-semibold "
            >
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Jerome Fitzgerald
              </span>
            </motion.p>
            <motion.nav
              style={{
                /**
                 * @todo(types)
                 * Type '{ opacity: MotionValue<number>; }' is not assignable to type 'MotionStyle'.
                 */
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                opacity: useTransform(
                  scrollYBoundedProgressThrottled,
                  [0, 1],
                  [1, 0]
                ),
              }}
              className="text-radix-slate4 flex space-x-4 text-xs font-medium"
            >
              <a href="#">A</a>
              <a href="#">B</a>
              <a href="#">C</a>
            </motion.nav>
          </div>
        </motion.header>

        <main className="px-8 pt-28">
          <h1 className="bg-radix-slate2 h-10 w-4/5 rounded text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(2).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="bg-radix-slate2 h-4 w-5/6 rounded" />
                <p className="bg-radix-slate2 h-4 rounded" />
                <p className="bg-radix-slate2 h-4 w-4/6 rounded" />
              </div>
            ))}
            <div className="bg-radix-slate2 h-64 rounded"></div>
            {[...Array(90).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="bg-radix-slate2 h-4 w-5/6 rounded" />
                <p className="bg-radix-slate2 h-4 rounded" />
                <p className="bg-radix-slate2 h-4 w-4/6 rounded" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export { Header }
