import { HomeIcon, MenuAlt4Icon, XIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSound } from 'use-sound'

import { ThemeMode } from '~components/Layout'
import { activeLinks } from '~config/navigation'
import { useUI } from '~context/ManagedUIContext'

// const ThemeMode = dynamic(
//   () => import('~components/Layout').then((mod) => mod.ThemeMode),
//   {
//     ssr: false,
//   }
// )

const NavigationMobile = () => {
  const router = useRouter()
  const { audio, displayNavigation, closeNavigation, toggleNavigation } = useUI()
  const [soundMenuOpen] = useSound('/static/audio/rising-pops.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const [soundSwitchOff] = useSound('/static/audio/switch-off.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const [soundSwitchOn] = useSound('/static/audio/switch-on.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })

  const handleClick = () => {
    displayNavigation ? soundSwitchOff() : soundMenuOpen()
    toggleNavigation()
  }
  const handleClickHome = () => {
    closeNavigation()
    soundSwitchOn()
    void router.push('/')
  }
  const handleClickLink = () => {
    soundSwitchOff()
    closeNavigation()
  }

  return (
    <header>
      {/* Top Right Menu Controls */}
      <div className={cx('menu--theme z-50', 'absolute top-5', 'w-full')}>
        <div
          className={cx(`flex flex-col w-full max-w-4xl`, `px-2 mx-auto md:px-8`)}
        >
          <div className="ml-auto">
            <ThemeMode />
          </div>
        </div>
      </div>
      {/* Bottom Left Home Button */}
      {router.asPath === '/' ? null : (
        <div
          className={cx('menu--home z-50', 'fixed bottom-3 left-8 md:left-11', '')}
        >
          <motion.button
            aria-label={`Link to homepage of jeromefitzgerald.com`}
            className={cx(
              `badge`,
              'focus:ring-4',
              `bg-black text-white`,
              `dark:bg-white dark:text-black`,
              'text-lg',
              'drop-shadow-lg'
            )}
            onClick={() => handleClickHome()}
            initial={{ scale: 0.8, y: 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <HomeIcon className={cx('h-5 w-5 md:h10 md:w-10')} />
          </motion.button>
        </div>
      )}
      {/* Bottom Right Menu */}
      <div
        className={cx('menu--mobile z-50', 'fixed bottom-3 right-8 md:right-11', '')}
      >
        <motion.button
          aria-label={displayNavigation ? `Close navigation` : `Open navigation`}
          className={cx(
            `badge`,
            'focus:ring-4',
            `bg-black text-white`,
            `dark:bg-white dark:text-black`,
            'text-lg',
            'drop-shadow-lg'
          )}
          onClick={() => handleClick()}
          initial={{ scale: 0, y: 0 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          {displayNavigation ? (
            <XIcon className={cx('h-5 w-5 md:h10 md:w-10')} />
          ) : (
            <MenuAlt4Icon className={cx('h-5 w-5 md:h10 md:w-10')} />
          )}
        </motion.button>
        <motion.nav
          aria-label="Site Navigation"
          className="absolute top-0 max-w-min items-end"
        >
          <AnimatePresence>
            <motion.ul
              className={cx(
                'fixed flex flex-col-reverse max-w-min items-center',
                'm-0 p-0 list-none',
                'bottom-16 md:bottom-20 right-4',

                displayNavigation ? 'pointer-events-auto' : 'pointer-events-none',
                ''
              )}
              initial={{}}
              animate={{}}
              exit={{}}
              transition={{ duration: 0.5, staggerChildren: 2.5 }}
              // // @framer(variants)
              // initial="hidden"
              // animate="visible"
              // exit="hidden"
              // variants={list}
            >
              {activeLinks.map((link, linkIndex) => {
                if (!link.active) {
                  return null
                }

                // const delay = [
                //   'delay-75',
                //   'delay-100',
                //   'delay-150',
                //   'delay-200',
                //   'delay-300',
                //   'delay-500',
                //   'delay-700',
                //   'delay-1000',
                // ]

                const key = `link--key--${link.title}`
                // console.dir(`key`)
                // console.dir(key)

                return (
                  <motion.li
                    className={cx(
                      'my-0.5 cursor-pointer drop-shadow-xl',
                      'focus:ring-4',
                      // delay[linkIndex],
                      ''
                    )}
                    key={key}
                    initial={{ scale: 0, y: 0 }}
                    animate={{
                      scale: displayNavigation ? 1 : 0,
                      y: displayNavigation ? 0 : 0,
                      opacity: displayNavigation ? 1 : 0,
                    }}
                    exit={{ scale: 0, y: 0 }}
                    transition={{
                      delay: displayNavigation
                        ? linkIndex * 0.125
                        : (activeLinks.length - linkIndex) * 0.125,
                      duration: displayNavigation ? 0.5 : 0.5,
                    }}
                    // // @framer(variants)
                    // variants={item}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleClickLink()}
                  >
                    <NextLink href={link.href}>
                      <a
                        className={cx(
                          `badge-sm`,
                          'bg-black dark:bg-white text-white dark:text-black',
                          // 'text-lg font-bold',
                          'capitalize focus:ring-4'
                        )}
                      >
                        {link.title}
                      </a>
                    </NextLink>
                  </motion.li>
                )
              })}
            </motion.ul>
          </AnimatePresence>
        </motion.nav>
      </div>
    </header>
  )
}

export default NavigationMobile
