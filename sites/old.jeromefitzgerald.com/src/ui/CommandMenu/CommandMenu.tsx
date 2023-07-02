import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { cx } from '@jeromefitz/shared/src/utils'
import { DividerVerticalIcon } from '@radix-ui/react-icons'
import { Command, useCommandState } from 'cmdk'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

import { useStore } from '~store/useStore'
// import { log } from '~utils/log'
import { sleep } from '~utils/sleep'

const CMD_K_TIMER_OUT = '0.25s'
interface CommandMenuProps<T extends { label: string }> {
  items: T[]
  open?: boolean
  onSelect?: (data: {
    item: T
    modifiers: {
      control: boolean
    }
  }) => void
  pages?: any
  search?: string
  setPages?: any
  setSearch?: any
  setOpen?: any
  subItems?: any
}

const Item = (props) => {
  const { closeMenu, item, cmdref } = props
  if (!item.active) return null
  return (
    <Command.Item
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSelect={async () => {
        void item.onSelect()

        // // const val = cmdref.current.querySelector(
        // //   `[cmdk-item=""][aria-selected="true"]`
        // // ).dataset.value
        const val = cmdref.current.querySelector(
          `[cmdk-item=""][aria-selected="true"]`
        )

        val.dataset.isActive = true
        await sleep('0.1s')
        val.dataset.isActive = false
        await sleep('0.1s')

        item?.close && (await closeMenu())
      }}
      className={cx(
        'p-3',
        'cursor-pointer',
        'flex items-center text-sm font-medium',
        'select-none border-l-4 focus:outline-none',
        'rounded-r',
        // 'text-zinc-700 dark:text-zinc-300',
        // 'aria-selected:bg-black/10 dark:aria-selected:bg-white/10',
        // 'active:aria-selected:bg-black/30 dark:active:aria-selected:bg-white/30',
        // 'data-[is-active=true]:aria-selected:bg-black/30 dark:data-[is-active=true]:aria-selected:bg-white/30',
        // '',
        // 'aria-selected:border-green-400',
        // 'active:aria-selected:border-green-200',
        // 'data-[is-active=true]:border-green-200',
        'text-radix-mauve12',
        'border-transparent',
        'aria-selected:blackA-bg-int dark:aria-selected:whiteA-bg-int',
        'aria-selected:green-border-int',
        'active:aria-selected:green-border-int',
        'data-[is-active=true]:green-border',
        'data-[is-active=true]:aria-selected:bg-black/30 dark:data-[is-active=true]:aria-selected:bg-white/30',
        ''
      )}
      data-is-active={false}
      data-url={item?.url}
    >
      {item.label}
    </Command.Item>
  )
}

const SubItem = (props) => {
  const search = useCommandState((state) => state.search)
  if (!search) return null
  return <Item {...props} />
}

function CommandMenu<T extends { label: string }>({
  items,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelect,
  pages,
  search,
  setPages,
  setSearch,
  subItems,
}: CommandMenuProps<T>) {
  const cmdref = useRef<any>(null)
  const cmdInput = useRef<any>(null)
  const open = useStore.use.commandMenuOpen()
  const setOpen = useStore.use.commandMenuOpenSet()

  // log(`... pages`, pages)
  /**
   * @note(cmdk)
   */
  const handleAsyncSleep = async () => {
    void (await sleep(CMD_K_TIMER_OUT))
  }
  const controls = useAnimationControls()

  const closeMenu = useCallback(async () => {
    await controls.start('closed')
    open && (await handleAsyncSleep())
    // @todo(types)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setOpen(false)
    setSearch('')
  }, [controls, open, setOpen, setSearch])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // @note(cmdk) handle ESCAPE/BACKSPACE with Command.Input
      if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
        e.preventDefault()
        setPages((pages) => pages.slice(0, -1))
      }
      if (e.key === 'Escape' && !search) {
        e.preventDefault()
        void closeMenu()
      }
      // @note(cmdk) toggle with ⌘K
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault()
        void closeMenu()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [closeMenu, open, pages, search, setOpen, setPages, setSearch])

  // async function closeMenu() {
  //   await controls.start('closed')
  //   open && (await handleAsyncSleep())
  //   setOpen(false)
  //   setSearch('')
  // }

  useEffect(() => {
    if (open) {
      void controls.start('open')
    }
  }, [controls, open])

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          loop
          ref={cmdref}
          id="hoagies"
        >
          <>
            <motion.div
              id="cmdk_overlay1"
              className={cx(
                'fixed top-0',
                'pointer-events-none',
                'h-full w-full',
                'backdrop-blur',
                'z-50'
              )}
              data-state={open ? 'open' : 'closed'}
              animate={{
                opacity: [0, 0.25, 0.5, 0.75, 0.95],
                display: 'block',
                transition: { duration: 0.35 },
              }}
              exit={{
                opacity: [0.95, 0.75, 0.5, 0.25, 0],
                transition: { delay: 0.125, duration: 0.25 },
                transitionEnd: { display: 'none' },
              }}
            />
            <motion.div
              id="cmdk_overlay2"
              className={cx(
                'fixed top-0',
                'pointer-events-none',
                'h-full w-full',
                'bg-white dark:bg-black',
                'z-50'
              )}
              data-state={open ? 'open' : 'closed'}
              animate={{
                opacity: [0, 0.25, 0.5, 0.75, 0.95],
                display: 'block',
                transition: { duration: 0.35 },
              }}
              exit={{
                opacity: [0.95, 0.75, 0.5, 0.25, 0],
                transition: { delay: 0.125, duration: 0.25 },
                transitionEnd: { display: 'none' },
              }}
            />
          </>
          <motion.div
            id="whoa"
            initial="closed"
            animate={controls}
            exit="closed"
            variants={{
              open: {
                opacity: 1,
                transition: { ease: 'easeOut', duration: 0.25 },
              },
              closed: {
                opacity: 0,
                transition: { ease: 'easeIn', duration: 0.3 },
              },
            }}
            className={cx(
              'z-[9999]',
              'fixed left-1/2 top-[12%] -translate-x-1/2',
              'w-11/12',
              'md:w-full md:max-w-xl',
              'rounded-lg shadow-lg',
              'transition-all duration-150 ease-in-out',
              'backdrop-blur-3xl',
              'bg-white dark:bg-black',
              'mauve-border-int border-2',
              ''
            )}
          >
            <div className="relative ml-px mt-2 pl-1.5">
              <Command.Input
                autoFocus
                placeholder={
                  !!pages && pages?.length === 0
                    ? 'Search for an Event, Show, or Page'
                    : // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                      pages[0].charAt(0).toUpperCase() + pages[0].slice(1)
                }
                className={cx(
                  'bg-transparent',
                  'block w-full',
                  'text-sm font-medium',
                  'placeholder:text-radix-mauve11',
                  'border-none',
                  'focus:border-transparent focus:outline-none focus-visible:ring-transparent',
                  '',
                  ''
                )}
                value={search}
                onValueChange={setSearch}
                ref={cmdInput}
              />
              <span
                className={cx(
                  'right-5 items-center justify-end',
                  'top-1/2 -translate-y-1/2 px-1.5',
                  'absolute',
                  'gap-x-2',
                  // 'hidden',
                  'flex flex-row',
                  // 'md:flex md:flex-row',
                  ''
                )}
              >
                <kbd
                  onClick={() => {
                    setSearch('')
                    setPages((pages) => pages.slice(0, -1))
                    cmdInput.current.focus()
                  }}
                  className={cx(
                    'w-auto select-none items-center justify-center rounded-md text-[0.6rem] font-bold leading-none hover:cursor-pointer',
                    'text-radix-mauve12 bg-black/10 dark:bg-white/10',
                    'h-5 px-1.5',
                    'flex',
                    // 'hidden md:flex',
                    ''
                  )}
                >
                  CLEAR
                </kbd>
                <kbd
                  onClick={() => {
                    void closeMenu()
                  }}
                  className={cx(
                    'w-auto select-none items-center justify-center rounded-md text-[0.6rem] font-bold leading-none hover:cursor-pointer',
                    'text-radix-mauve12 bg-black/10 dark:bg-white/10',
                    'h-5 px-1.5',
                    'hidden md:flex',
                    ''
                  )}
                >
                  ESC
                </kbd>
              </span>
            </div>
            <Command.Separator
              alwaysRender
              className={cx(
                'mt-2 h-px',
                // 'bg-zinc-300/70 dark:bg-zinc-300/10',
                'bg-black/10',
                ''
              )}
            />
            <Command.List
              style={{
                // Should equal py-2 below
                scrollPaddingBlockStart: '0.5rem',
                scrollPaddingBlockEnd: '0.5rem',
              }}
              className="max-h-[50vh] w-full overflow-y-auto p-2"
            >
              <Command.Empty
                className={cx(
                  'flex items-center space-x-2 p-3 text-sm',
                  'text-radix-mauve11',
                  '',
                  ''
                )}
              >
                <DocumentMagnifyingGlassIcon className="h-5 w-5" />
                <span className="font-medium">No Results</span>
              </Command.Empty>
              {items?.map((item: any) => {
                // log(`item`, item)

                return (
                  <Item
                    key={`cmdk-item-${item.label}`}
                    cmdref={cmdref}
                    closeMenu={closeMenu}
                    item={item}
                  />
                )
              })}
              <SubItem
                cmdref={cmdref}
                closeMenu={closeMenu}
                item={{ label: 'iggy pop' }}
              />
              {!!pages &&
                pages?.length === 0 &&
                subItems?.map((item: any) => {
                  // log(`item`, item)

                  return (
                    <SubItem
                      key={`cmdk-item-${item.label}`}
                      cmdref={cmdref}
                      closeMenu={closeMenu}
                      item={item}
                    />
                  )
                })}
            </Command.List>
            <div
              className={cx(
                'h-px',
                // 'bg-zinc-300/70 dark:bg-zinc-300/10',
                'blackA-bg-int',
                '',
                '',
                '',
                ''
              )}
            />
            <div className="text-radix-mauve12 ml-px flex w-full items-center justify-between py-2 pl-3.5 pr-5">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49998 1L6.92321 2.00307L1.17498 12L0.599976 13H1.7535H13.2464H14.4L13.825 12L8.07674 2.00307L7.49998 1ZM7.49998 3.00613L2.3285 12H12.6714L7.49998 3.00613Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>

              <div
                className={cx(
                  'flex items-center space-x-3',
                  // 'text-zinc-700 dark:text-zinc-300',
                  '',
                  ''
                )}
              >
                <div className="flex items-center space-x-2 ">
                  <span className="text-xs">Go to</span>
                  <kbd
                    className={cx(
                      'flex h-5 w-auto select-none items-center justify-center rounded-md px-1.5  pb-1 font-bold',
                      'text-radix-mauve12 bg-black/10 dark:bg-white/10',
                      '',
                      '',
                      ''
                    )}
                  >
                    ↵
                  </kbd>
                </div>
                <DividerVerticalIcon className="hidden opacity-30 md:flex" />
                <div className="hidden items-center justify-center space-x-2 md:flex">
                  <span className="text-xs">Command Menu</span>
                  <div className="flex items-center space-x-1">
                    <kbd
                      className={cx(
                        'flex h-5 w-auto select-none items-center justify-center rounded-md px-1.5 pt-[1px] text-sm font-bold',
                        'text-radix-mauve12 bg-black/10 dark:bg-white/10',
                        '',
                        '',
                        ''
                      )}
                    >
                      ⌘
                    </kbd>
                    <span className="">+</span>
                    <kbd
                      className={cx(
                        'flex h-5 w-auto select-none items-center justify-center rounded-md px-1.5 pt-[1px] text-sm font-bold',
                        'text-radix-mauve12 bg-black/10 dark:bg-white/10',
                        '',
                        '',
                        ''
                      )}
                    >
                      k
                    </kbd>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  )
}

export { CommandMenu }
