import {
  Box,
  Button,
  PageHeading,
  Separator,
  Text,
} from '@jeromefitz/design-system/components'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import * as React from 'react'
import { useSound } from 'use-sound'

import useAudio from '~store/useAudio'
import useStore from '~store/useStore'
import useTheme from '~store/useTheme'

const properties = {
  title: 'Playground',
  seoDescription: 'Quick behind the scenes test of stuff.',
}

const PagesPlayground = () => {
  const counter = useStore.use.counter()
  const counterDecrement = useStore.use.counterDecrement()
  const counterIncrement = useStore.use.counterIncrement()
  const counterReset = useStore.use.counterReset()

  const audio = useAudio.use.audio()
  const audioToggle = useAudio.use.audioToggle()
  const sounds = useAudio.use.sounds()
  const volume = useAudio.use.volume()

  const theme = useTheme.use.theme()
  const themeSet = useTheme.use.themeSet()

  const [playBleep] = useSound(sounds.bleep, {
    soundEnabled: audio,
    volume,
  })

  const handleAudio = () => {
    console.dir(`> sounds.bleep: ${sounds.bleep}`)
    playBleep()
    audioToggle()
  }

  const handleThemeToggle = React.useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle(darkTheme.className)
    document.documentElement.classList.toggle('light-theme')
    document.documentElement.style.setProperty('color-scheme', newTheme)
    // setTheme(newTheme)
    themeSet(newTheme)
    playBleep()
  }, [playBleep, theme, themeSet])

  // const state = useAudio((state) => state)
  // console.dir(`> state`)
  // console.dir(state)

  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Separator margin="my3" size="full" />
      <Box css={{ '& button': { mr: '$2' } }}>
        <Text css={{ my: '$2' }}>Audio is: {audio ? 'ON' : 'OFF'}</Text>
        <Button size="2" variant="blue" onClick={handleAudio}>
          audioToggle
        </Button>
        <Text css={{ my: '$2' }}>Counter: {counter}</Text>
        <Button size="2" variant="blue" onClick={counterDecrement}>
          counterDecrement
        </Button>
        <Button size="2" variant="blue" onClick={counterIncrement}>
          counterIncrement
        </Button>
        <Button size="2" variant="blue" onClick={counterReset}>
          counterReset
        </Button>
        <Separator margin="my3" size="full" />
        <Text css={{ my: '$2' }}>Theme is: {theme}</Text>
        <Button size="2" variant="blue" onClick={handleThemeToggle}>
          handleTheme
        </Button>
        <Button size="2" variant="blue" onClick={() => themeSet('dark')}>
          themeSet(dark)
        </Button>
        <Button size="2" variant="blue" onClick={() => themeSet('light')}>
          themeSet(light)
        </Button>
      </Box>
    </>
  )
}

export default PagesPlayground
