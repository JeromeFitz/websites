import { cx } from '@jeromefitz/shared/src/utils'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

// import { sleep } from '~utils/sleep'

function Item({
  children,
  onSelect = () => {},
  closeMenu,
}: {
  children: ReactNode
  onSelect?: () => void
  closeMenu: () => void
}) {
  const controls = useAnimationControls()

  return (
    <DropdownMenu.Item
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSelect={async (e) => {
        e.preventDefault()

        await controls.start({
          // backgroundColor: '#fff',
          color: '#000',
          transition: { duration: 0.04 },
        })
        await controls.start({
          // backgroundColor: '#38bdf8',
          color: '#fff',
          transition: { duration: 0.04 },
        })
        // void (await sleep('0.125s'))

        // eslint-disable-next-line @typescript-eslint/await-thenable
        await closeMenu()
        onSelect()
      }}
      className="text-radix-gray7 data-[highlighted]:bg-radix-sky4 w-40 select-none rounded px-2 py-1.5 data-[highlighted]:text-white data-[highlighted]:focus:outline-none"
      asChild
    >
      <motion.div animate={controls}>{children}</motion.div>
    </DropdownMenu.Item>
  )
}

function DropdownMenuRadix() {
  const [text, setText] = useState('Select an item')
  const [open, setOpen] = useState(false)
  const controls = useAnimationControls()

  async function closeMenu() {
    await controls.start('closed')
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      void controls.start('open')
    }
  }, [controls, open])

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="border-radix-gray3 mx-auto w-full max-w-sm overflow-hidden rounded-md border bg-white">
        <header className="border-radix-gray1 border-b p-2">
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger
              className={cx(
                'hover:bg-radix-gray2/50 data-[state=open]:bg-radix-gray2/75 cursor-default select-none rounded px-4 text-2xl focus-visible:outline-none'
              )}
              aria-label="Choose time range to show top artists and tracks"
            >
              {/*  */}
              Choose Time Range
            </DropdownMenu.Trigger>

            <AnimatePresence>
              {open && (
                <DropdownMenu.Portal forceMount>
                  <DropdownMenu.Content
                    align="start"
                    className="mt-1 overflow-hidden rounded bg-white/75 p-2 text-left shadow backdrop-blur"
                    asChild
                  >
                    <motion.div
                      initial="closed"
                      animate={controls}
                      exit="closed"
                      variants={{
                        open: {
                          opacity: 1,
                          transition: { ease: 'easeOut', duration: 0.1 },
                        },
                        closed: {
                          opacity: 0,
                          transition: { ease: 'easeIn', duration: 0.2 },
                        },
                      }}
                    >
                      <Item
                        closeMenu={() => closeMenu}
                        onSelect={() => setText('Clicked Item 1')}
                      >
                        Item 1
                      </Item>
                      <Item
                        closeMenu={() => closeMenu}
                        onSelect={() => setText('Clicked Item 2')}
                      >
                        Item 2
                      </Item>
                      <Item
                        closeMenu={() => closeMenu}
                        onSelect={() => setText('Clicked Item 3')}
                      >
                        Item 3
                      </Item>
                    </motion.div>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              )}
            </AnimatePresence>
          </DropdownMenu.Root>
        </header>
        <div className="px-6 py-8 text-right">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export { DropdownMenuRadix as DropdownMenu }
