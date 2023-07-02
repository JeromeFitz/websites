'use client'

import { cx } from '@jeromefitz/shared/src/utils'
import { HomeIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Anchor } from '~components/Anchor'
import { useStore } from '~store/useStore'
// import { log } from '~utils/log'

// const items = ['events', 'shows', 'about', 'currently']
const items = ['events', 'shows', 'books', 'music']
const HOMEPAGE = 'homepage'

function NavigationBarSelected({ isVisible = true }) {
  return (
    <motion.div
      id="nav-selector"
      className={cx(
        'absolute rounded-full',
        'top-[-0.45rem] h-8 w-full',
        // 'bg-zinc-900/90 dark:bg-zinc-100/90',
        // 'border-zinc-50  bg-zinc-900',
        'border-[1px]',
        'border-black dark:border-white',
        // 'blackA-bg-int dark:whiteA-bg',
        'bg-black/5 dark:bg-white/5',
        // 'group:hover:bg-black',
        // 'mix-blend-screen',
        'hidden md:flex',
        'z-0'
      )}
      layoutId="help"
      animate={{
        opacity: isVisible ? [0.9] : [0.9, 0],
      }}
      initial={false}
    />
  )
}

function NavigationBar() {
  const pathname = usePathname()
  const commandMenuOpenSet = useStore.use.commandMenuOpenSet()

  const [selected, setSelected] = useState(HOMEPAGE)

  useEffect(() => {
    const p: any = pathname?.split('/')[1]
    setSelected(p === '' ? HOMEPAGE : p)
  }, [pathname])

  return (
    <>
      <motion.nav
        animate={{
          opacity: [0, 0.95],
          transform: 'translateX(-50%) translateY(0px) translateZ(0px)',
        }}
        className={cx(
          'fixed left-[50%] p-2 md:p-3',
          'bottom-8 ',
          'z-10',
          'flex items-center justify-between',
          'transition-all duration-300',
          'backdrop-blur-xl',
          'rounded-full',
          'shadow-lg',
          'bg-gradient-to-tl ',
          'border-[1px]',
          'md:mix-blend-difference md:hover:mix-blend-normal',
          'md:hover:from-radix-mauve1 md:hover:to-radix-mauve3',
          'mauve-border-int text-radix-mauve11',
          'group'
        )}
        id="navigation-bar"
        initial={false}
        // style={{
        //   backgroundImage:
        //     'linear-gradient(135deg,rgba(56,57,58,.6),rgba(31,32,35,.1))',
        // }}
      >
        {/* <motion.div
          id="nav-selector"
          className={cx('absolute bg-black/50 rounded-full', 'w-12 h-10')}
        /> */}
        <ul
          className={cx(
            'flex w-full list-none gap-x-1 px-1 py-0 md:px-4',
            // 'text-black dark:text-red-500',
            'place-content-center items-center',
            ''
          )}
        >
          <motion.li
            className="mr-2 inline-block"
            onClick={() => setSelected(HOMEPAGE)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Anchor
              aria-label="home"
              id="home"
              title="home"
              href="/"
              // className={cx(
              //   'py-0 px-2 stroke-purple-500 fill-none',
              //   'flex flex-col items-center justify-center',
              //   'transition-opacity duration-300'
              // )}
              className={cx(
                'relative px-2 py-0',
                'font-mono text-sm tracking-wider',
                'no-underline',
                'transition-all duration-300'
              )}
            >
              <>
                <HomeIcon className={cx('relative inline-block', 'h-4 w-4')} />
                {selected === HOMEPAGE ? (
                  <NavigationBarSelected isVisible={false} />
                ) : null}
              </>
            </Anchor>
          </motion.li>
          {items.map((item) => {
            const isSelected = selected === item
            return (
              <motion.li
                className="z-50 inline-block"
                key={`li-${item}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Anchor
                  href={`/${item}`}
                  className={cx(
                    'relative px-2 py-0 ',
                    'font-mono text-sm tracking-wider',
                    'no-underline',
                    'transition-all duration-300',
                    'active:aria-selected:bg-black/30 dark:active:aria-selected:bg-white/30',
                    // isSelected && '!text-radix-mauve12',
                    // 'text-radix-mauve11',
                    ''
                  )}
                  onClick={() => setSelected(item)}
                >
                  <>
                    {item}
                    {isSelected ? <NavigationBarSelected isVisible={true} /> : null}
                  </>
                </Anchor>
              </motion.li>
            )
          })}
          <motion.li
            className="ml-2 inline-block cursor-pointer"
            onClick={() => commandMenuOpenSet()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              aria-label="command menu"
              // className={cx(
              //   'py-0 px-2 stroke-purple-500 fill-none',
              //   'flex flex-col items-center justify-center',
              //   'transition-opacity duration-300'
              // )}
              className={cx(
                'relative px-2 py-0',
                'h-24 font-mono text-lg leading-8 tracking-wider',
                'no-underline',
                'transition-all duration-300',
                'active:aria-selected:bg-black/30 dark:active:aria-selected:bg-white/30',
                ' '
              )}
            >
              <>⌘</>
            </span>
          </motion.li>
        </ul>
      </motion.nav>
    </>
  )
}

export { NavigationBar }
