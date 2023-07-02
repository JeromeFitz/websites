'use client'
import { cx } from '@jeromefitz/shared/src/utils'
import { isObjectEmpty } from '@jeromefitz/utils'
import * as HoverCard from '@radix-ui/react-hover-card'
import { QuestionMarkCircledIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// import { log } from '~utils/log'

// const DEBUG_KEY = '~components/Debug >> '
const isDev = process.env.NODE_ENV === 'development'

function Debug({ data, pathVariables }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    if (open) {
      void controls.start('open')
    }
  }, [controls, open])

  // @note(next) only show this on dev please
  // probably need to remove entirely?
  if (!isDev || isObjectEmpty(data) || isObjectEmpty(pathVariables)) return null
  const { dataType, isIndex, routeType, slug } = pathVariables

  return (
    <>
      <HoverCard.Root open={open} onOpenChange={setOpen}>
        <HoverCard.Trigger asChild>
          <div
            className={cx(
              'hidden md:flex',
              'md:fixed',
              'md:bottom-6 md:left-5',
              'cursor-pointer rounded-full',
              'focus:shadow-md',
              'bg-radix-blue6 h-8 w-8',
              'items-center justify-center'
            )}
          >
            <span>
              <QuestionMarkCircledIcon className="h-12 w-12" />
            </span>
          </div>
        </HoverCard.Trigger>
        <AnimatePresence>
          {open && (
            <HoverCard.Portal forceMount>
              <HoverCard.Content
                className={cx(
                  'z-[9999]',
                  // 'w-80 p-5 rounded-md',
                  // 'bg-radix-blue3'
                  // 'will-change-[transform,_opacity]',
                  // 'duration-300 ease-in-out',
                  'data-[side=top]:animate-slideDownAndFade',
                  'data-[side=right]:animate-slideLeftAndFade',
                  'data-[side=bottom]:animate-slideUpAndFade',
                  'data-[side=left]:animate-slideRightAndFade'
                )}
                sideOffset={5}
                // style={{
                //   transformOrigin:
                //     'var(--radix-hover-card-content-transform-origin)',
                //   animation: 'scaleIn 0.5s ease-out',
                // }}
              >
                <motion.div
                  initial="closed"
                  animate={controls}
                  exit="closed"
                  variants={{
                    open: {
                      opacity: 1,
                      transition: { ease: 'easeIn', duration: 0.1 },
                    },
                    closed: {
                      opacity: 0,
                      transition: { ease: 'easeOut', duration: 0.1 },
                    },
                  }}
                >
                  <div
                    className={cx(
                      'flex flex-col gap-2',
                      'w-80 rounded-md p-5',
                      'bg-radix-blue3'
                    )}
                  >
                    <QuestionMarkCircledIcon />
                    <div
                      className={cx(
                        'flex flex-col gap-1',
                        'text-radix-blue12 m-0 text-base'
                      )}
                    >
                      <div className={cx('flex gap-2')}>
                        <div className={cx('flex gap-1')}>
                          <div className={cx('text-radix-blue11')}>debug:</div>{' '}
                          <div className={cx('font-bold')}>Route Info</div>
                        </div>
                      </div>
                      <div className={cx('flex gap-2')}>
                        <div className={cx('flex gap-1')}>
                          <div className={cx('text-radix-blue11')}>routeType:</div>{' '}
                          <div className={cx('font-bold')}>{routeType}</div>
                        </div>
                      </div>
                      <div className={cx('flex gap-2')}>
                        <div className={cx('flex gap-1')}>
                          <div className={cx('text-radix-blue11')}>dataType:</div>{' '}
                          <div className={cx('font-bold')}>{dataType}</div>
                        </div>
                      </div>
                      <div className={cx('flex gap-2')}>
                        <div className={cx('flex gap-1')}>
                          <div className={cx('text-radix-blue11')}>slug:</div>{' '}
                          <div className={cx('font-bold')}>{slug}</div>
                        </div>
                      </div>
                      <div className={cx('flex gap-2')}>
                        <div className={cx('flex gap-1')}>
                          <div className={cx('text-radix-blue11')}>isIndex:</div>{' '}
                          <div className={cx('font-bold')}>
                            {isIndex ? 'y' : 'n'}
                          </div>
                        </div>
                      </div>
                      {/* <div className={cx('flex gap-2', 'max-w-md h-12 truncate')}>
                  {seoDescription}
                </div> */}
                      <div className={cx('text-radix-blue11')}>pathname:</div>
                      <ul className={cx('list-inside list-disc')}>
                        {pathname?.split('/').map((path, i) => {
                          if (path === '') return null
                          return (
                            <li key={`debug-path-${i}`} className={cx('font-bold')}>
                              {path}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
                <HoverCard.Arrow className={cx('fill-radix-blue3')} />
              </HoverCard.Content>
            </HoverCard.Portal>
          )}
        </AnimatePresence>
      </HoverCard.Root>
    </>
  )
}

export { Debug }
