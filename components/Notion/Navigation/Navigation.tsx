import { MenuAlt4Icon, XIcon } from '@heroicons/react/solid'
import { Portal } from '@reach/portal'
import cx from 'clsx'
import { motion } from 'framer-motion'
// import { useState } from 'react'

import { Navigation as NavigationOld, ThemeMode } from '~components/Layout'
import { useUI } from '~context/ManagedUIContext'

const Navigation = () => {
  const { displayNavigation, openNavigation, closeNavigation } = useUI()
  // const [overlayY, overlayYSet] = useState(-100)
  const handleClick = () => {
    displayNavigation ? closeNavigation() : openNavigation()
    // overlayYSet(displayNavigation ? -100 : 0)
  }
  return (
    <>
      <Portal>
        {true ? (
          <>
            <div className="flex flex-row">
              <div className="flex flex-row w-full max-w-4xl px-2 mx-auto md:px-8">
                <motion.div
                  className={cx(
                    `flex flex-row w-full max-w-4xl px-2 mx-auto md:px-8 py-9 md:py-12`,
                    // 'py-2.5 md:py-6',
                    'fixed top-0',
                    displayNavigation
                      ? 'bg-white dark:bg-black'
                      : 'bg-transparent border-0',
                    displayNavigation ? 'z-50' : 'z-0',
                    displayNavigation && 'border-b border-black dark:border-white',
                    ''
                  )}
                >
                  <motion.div
                    className={cx('flex flex-row', 'ml-auto', `mr-4`)}
                    initial={{ y: -100 }}
                    animate={{ y: displayNavigation ? 0 : -100 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <NavigationOld handleClick={handleClick} />
                    <ThemeMode />
                    <div className="flex flex-row ml-auto mr-4">
                      <motion.button
                        aria-label={'Open Menu'}
                        className={cx(
                          'ml-4',
                          'text-2xl sm:text-3xl focus:outline-none',
                          'hover:text-gray-600 dark:hover:text-gray-100'
                          // `z-40`
                        )}
                        onClick={() => handleClick()}
                        key={'menu--open'}
                        initial={{ scale: 0.8, y: 0 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 0 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        {displayNavigation ? (
                          <XIcon className="h-5 w-5 " />
                        ) : (
                          <MenuAlt4Icon className="h-5 w-5 " />
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </>
        ) : null}
      </Portal>
      <motion.header className={cx(`flex flex-row min-w-full`, 'fixed', 'hidden')}>
        <div
          className={cx(
            'flex flex-row w-full max-w-4xl px-2 mx-auto md:px-8 py-2.5 md:py-3',
            'justify-end items-end',
            ``
          )}
        >
          <motion.button
            aria-label={'Open Menu'}
            className={cx(
              'ml-4',
              'text-2xl sm:text-3xl focus:outline-none',
              'hover:text-gray-600 dark:hover:text-gray-100',
              ''
            )}
            onClick={() => handleClick()}
            key={'menu--open'}
            initial={{ scale: 0.8, y: 0 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            {displayNavigation ? null : ( // <XIcon className="h-5 w-5 " />
              <MenuAlt4Icon className="h-5 w-5 " />
            )}
          </motion.button>
        </div>
      </motion.header>
    </>
  )
}

export default Navigation
