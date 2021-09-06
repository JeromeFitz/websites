import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { memo } from 'react'
import useSound from 'use-sound'

import Emoji from '~components/Notion/Emoji'
import { useUI } from '~context/ManagedUIContext'

const config = {
  emoji: {
    true: '🔉️',
    false: '🔇️',
  },
  theme: {
    dark: '🌚️',
    light: '🌞️',
  },
}

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
  return (
    <motion.button
      className="text-2xl sm:text-3xl text-yellow-400 dark:text-yellow-300 focus:outline-none"
      onClick={() => {
        audio ? playDisableSound() : playEnableSound()
        toggleAudio()
      }}
      key={audio ? 'sound-on-icon' : 'soun-off-icon'}
      initial={{ scale: 0.8, y: 0, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, y: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <Emoji character={config.emoji[audio]} />
    </motion.button>
  )
}

const AppThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const { audio } = useUI()

  const [playBleep] = useSound('/static/audio/bleep.mp3', { soundEnabled: audio })

  const darkModeActive = theme === 'dark'
  return (
    <motion.button
      className="ml-4 text-2xl sm:text-3xl text-yellow-400 dark:text-yellow-300 focus:outline-none"
      onClick={() => {
        playBleep()
        setTheme(theme === 'light' ? 'dark' : 'light')
      }}
      key={darkModeActive ? 'dark-icon' : 'light-icon'}
      initial={{ scale: 0.8, y: 0, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, y: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <Emoji character={config.theme[theme || 'dark']} />
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
