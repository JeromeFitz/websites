import { MenuAlt4Icon, XIcon } from '@heroicons/react/solid'
import { Portal } from '@reach/portal'
import cx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { Navigation as NavigationOld, ThemeMode } from '~components/Layout'

const Navigation = () => {
  const [navigationOpen, navigationOpenSet] = useState(false)
  const [overlayY, overlayYSet] = useState(-100)
  const handleClick = () => {
    navigationOpenSet(!navigationOpen)
    overlayYSet(navigationOpen ? -100 : 0)
  }
  return (
    <>
      <Portal>
        {true ? (
          <>
            <motion.div
              className={cx(
                `flex flex-col w-full max-w-4xl`,
                `px-2 mx-auto md:px-8`,
                'py-2.5 md:py-6',
                'fixed top-0 transition-all',
                navigationOpen
                  ? 'bg-white dark:bg-black border-b border-black dark:border-white'
                  : '',
                ''
              )}
              initial={{ zIndex: 0, opacity: 0, display: 'none' }}
              exit={{ zIndex: 0, opacity: 0, display: 'none' }}
              animate={{
                zIndex: navigationOpen ? 40 : 20,
                opacity: 1,
                display: 'flex',
              }}
            >
              <motion.div
                className={cx(
                  'flex flex-row',
                  // 'flex flex-row w-full max-w-4xl px-2 mx-auto md:px-8 py-2.5 md:py-3',
                  'justify-between items-center',
                  // 'justify-end items-end',
                  // 'bg-yellow-500',
                  // 'absolute',
                  ``
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: overlayY, opacity: navigationOpen ? 1 : 0 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NavigationOld />
                <ThemeMode />
                <motion.button
                  aria-label={'Open Menu'}
                  className={cx(
                    'ml-4',
                    'text-2xl sm:text-3xl focus:outline-none',
                    'hover:text-gray-600 dark:hover:text-gray-100',
                    `z-40`
                  )}
                  onClick={() => handleClick()}
                  key={'menu--open'}
                  initial={{ scale: 0.8, y: 0, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.8, y: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  {navigationOpen ? (
                    <XIcon className="h-5 w-5 " />
                  ) : (
                    <MenuAlt4Icon className="h-5 w-5 " />
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </Portal>
      <motion.header
        className={cx(
          `flex flex-row min-w-full`,
          'fixed',
          navigationOpen ? 'z-0' : 'z-40'
        )}
      >
        <div
          className={cx(
            'flex flex-row w-full max-w-4xl px-2 mx-auto md:px-8 py-2.5 md:py-3',
            'justify-end items-end',
            // 'bg-yellow-500',
            // 'absolute',
            ``
          )}
        >
          <motion.button
            aria-label={'Open Menu'}
            className={cx(
              'ml-4',
              'text-2xl sm:text-3xl focus:outline-none',
              'hover:text-gray-600 dark:hover:text-gray-100',
              `z-40`
            )}
            onClick={() => handleClick()}
            key={'menu--open'}
            initial={{ scale: 0.8, y: 0, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            {navigationOpen ? null : ( // <XIcon className="h-5 w-5 " />
              <MenuAlt4Icon className="h-5 w-5 " />
            )}
          </motion.button>
        </div>
      </motion.header>
    </>
  )
}

export default Navigation
