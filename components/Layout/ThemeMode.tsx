import {
  VolumeOffIcon,
  VolumeUpIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/solid'
import cx from 'clsx'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { memo } from 'react'
import { useSound } from 'use-sound'

// import Emoji from '~components/Notion/Emoji'
import { useUI } from '~context/ManagedUIContext'

const AppSoundToggle = () => {
  const { audio, toggleAudio } = useUI()
  const [playEnableSound] = useSound('/static/audio/enable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })
  const [playDisableSound] = useSound('/static/audio/disable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })
  const handleClick = () => {
    audio ? playDisableSound() : playEnableSound()
    toggleAudio()
  }
  return (
    <motion.button
      className={cx(
        'text-2xl sm:text-3xl focus:outline-none',
        'hover:text-gray-600 dark:hover:text-gray-100'
      )}
      onClick={() => handleClick()}
      key={audio ? 'sound-on-icon' : 'sound-off-icon'}
      initial={{ scale: 0.8, y: 0, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, y: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      {/* <Emoji character={audio ? '🔉️' : '🔇️'} /> */}
      {audio ? (
        <VolumeUpIcon className="h-5 w-5 " />
      ) : (
        <VolumeOffIcon className="h-5 w-5" />
      )}
    </motion.button>
  )
}

const AppThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const { audio } = useUI()

  const [playBleep] = useSound('/static/audio/bleep.mp3', { soundEnabled: audio })

  const darkModeActive = theme === 'dark'
  const handleClick = () => {
    playBleep()
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <motion.button
      className={cx(
        'ml-4',
        'text-2xl sm:text-3xl focus:outline-none',
        'hover:text-gray-600 dark:hover:text-gray-100'
      )}
      onClick={() => handleClick()}
      key={darkModeActive ? 'dark-icon' : 'light-icon'}
      initial={{ scale: 0.8, y: 0, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, y: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      {/* <Emoji character={theme === 'light' ? '🌞️' : '🌚️'} /> */}
      {theme === 'light' ? (
        <SunIcon className="h-5 w-5 " />
      ) : (
        <MoonIcon className="h-5 w-5 " />
      )}
    </motion.button>
  )
}

const ThemeMode = () => {
  return (
    <div className="flex flex-row">
      <AppSoundToggle />
      <AppThemeToggle />
    </div>
  )
}

const ThemeModeMemo = memo(ThemeMode)

export default ThemeModeMemo
