import { MenuAlt4Icon } from '@heroicons/react/solid'
import cx from 'clsx'
import { motion } from 'framer-motion'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUIContext'

const Navigation = () => {
  const { audio, displayNavigation, toggleNavigation } = useUI()
  const [soundSwitchOn] = useSound('/static/audio/switch-on.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const [soundSwitchOff] = useSound('/static/audio/switch-off.mp3', {
    soundEnabled: audio,
    volume: 0.5,
  })
  const handleClick = () => {
    displayNavigation ? soundSwitchOn() : soundSwitchOff()
    toggleNavigation()
  }
  return (
    <>
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
            {displayNavigation ? null : <MenuAlt4Icon className="h-5 w-5 " />}
          </motion.button>
        </div>
      </motion.header>
    </>
  )
}

export default Navigation
