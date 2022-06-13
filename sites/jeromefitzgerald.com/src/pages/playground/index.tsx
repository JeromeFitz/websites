import { Box, Button, PageHeading, Separator, Text } from '@jeromefitz/design-system'
import * as React from 'react'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

const properties = {
  title: 'Playground',
  seoDescription: 'Quick behind the scenes test of stuff.',
}

const PagesPlayground = () => {
  const counter = useStore.use.counter()
  const counterDecrement = useStore.use.counterDecrement()
  const counterIncrement = useStore.use.counterIncrement()
  const counterReset = useStore.use.counterReset()

  const audio = useStore.use.audio()
  const audioToggle = useStore.use.audioToggle()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()

  const [playBleep] = useSound(sounds.bleep, {
    soundEnabled: true,
    volume,
  })
  // const [playMenuOpen] = useSound(sounds.menuOpen, {
  //   soundEnabled: audio,
  //   volume,
  // })
  const [playGlugDown] = useSound(sounds.glug, {
    soundEnabled: audio,
    playbackRate: 0.9,
    volume,
  })
  const [playGlugUp] = useSound(sounds.glug, {
    soundEnabled: audio,
    playbackRate: 1.1,
    volume,
  })
  const [playRisingPops] = useSound(sounds.risingPops, {
    soundEnabled: audio,
    volume,
  })

  const plays = {
    playBleep,
    playGlugDown,
    playGlugUp,
    playRisingPops,
  }

  const handleAudio = () => {
    // console.dir(`> sounds.bleep: ${sounds.bleep}`)
    plays.playBleep()
    audioToggle()
  }

  // const state = useStore((state) => state)
  // console.dir(`> state`)
  // console.dir(state)

  return (
    <>
      <PageHeading
        description={properties.seoDescription}
        title={properties.title}
      />
      <Separator my="3" size="full" />
      <Box css={{ '& button': { mr: '$2' } }}>
        <Text css={{ my: '$2' }}>Audio is: {audio ? 'ON' : 'OFF'}</Text>
        <Button size="2" onClick={handleAudio}>
          audioToggle
        </Button>
        <Text css={{ my: '$2' }}>Counter: {counter}</Text>
        <Button
          size="2"
          onClick={() => {
            counterDecrement()
            playGlugDown()
          }}
        >
          counterDecrement
        </Button>
        <Button
          size="2"
          onClick={() => {
            counterIncrement()
            playGlugUp()
          }}
        >
          counterIncrement
        </Button>
        <Button
          size="2"
          onClick={() => {
            counterReset()
            playRisingPops()
          }}
        >
          counterReset
        </Button>
        <Separator my="3" size="full" />
      </Box>
    </>
  )
}

export default PagesPlayground
