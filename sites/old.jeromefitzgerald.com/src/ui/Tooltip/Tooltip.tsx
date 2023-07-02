'use client'
import { cx } from '@jeromefitz/shared/src/utils'
import * as Tooltip from '@radix-ui/react-tooltip'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useState } from 'react'

// import { sleep } from '~utils/sleep'

const TooltipImpl = ({ content, trigger }) => {
  const [open, setOpen] = useState(false)
  const controls = useAnimationControls()

  // async function closeMenu() {
  //   await controls.start('closed')
  //   setOpen(false)
  // }

  useEffect(() => {
    if (open) {
      void controls.start('open')
    }
  }, [controls, open])

  return (
    <Tooltip.Provider>
      <Tooltip.Root open={open} onOpenChange={setOpen}>
        <Tooltip.Trigger asChild>
          <button
            className={cx(
              'inline-flex h-[35px] w-[35px] items-center justify-center rounded-full  outline-none',
              // 'shadow-[0_2px_10px] focus:shadow-[0_0_0_2px]',
              // 'bg-white text-radix-violet11 hover:bg-radix-violet3',
              // 'focus:shadow-black dark:focus:shadow-white',
              // 'shadow-[var(--blackA7)] dark:shadow-[var(--whiteA12)]'
              ''
            )}
          >
            {trigger}
          </button>
        </Tooltip.Trigger>
        <AnimatePresence>
          {open && (
            <Tooltip.Portal forceMount>
              <Tooltip.Content
                className={cx(
                  'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
                  'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
                  'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
                  'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
                  'select-none rounded-[4px] px-[15px] py-[10px] text-[15px] leading-none  will-change-[transform,opacity]',
                  '',
                  'shadow-[0_2px_10px] focus:shadow-[0_0_0_2px]',
                  // 'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]',
                  // 'focus:shadow-black dark:focus:shadow-white',
                  'shadow-[var(--blackA7)] dark:shadow-[var(--whiteA9)]',
                  // 'bg-white text-radix-violet11',
                  ''
                )}
                sideOffset={5}
                asChild
              >
                <motion.div
                  initial="closed"
                  animate={controls}
                  onAnimationEnd={() => console.dir('animation-stop')}
                  exit="closed"
                  variants={{
                    // open: {
                    //   opacity: 1,
                    //   transition: { ease: 'easeOut', duration: 0.1 },
                    // },
                    // closed: {
                    //   opacity: 0,
                    //   transition: { ease: 'easeIn', duration: 0.2 },
                    // },
                    open: {
                      scale: 1,
                      transition: { duration: 0.125 },
                    },
                    closed: {
                      scale: 1,
                      transition: { duration: 0.25 },
                    },
                  }}
                >
                  {content}
                  <Tooltip.Arrow className="fill-white dark:fill-black" />
                </motion.div>
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </AnimatePresence>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export { TooltipImpl as Tooltip }
