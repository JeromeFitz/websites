import { IconButton, Tooltip } from '@modulz/design-system'
import { SpeakerOffIcon, SpeakerModerateIcon } from '@radix-ui/react-icons'
import Mousetrap from 'mousetrap'
import { useCallback, useEffect } from 'react'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUIContext'

const ThemeToggle = (props) => {
  const { audio, toggleAudio } = useUI()
  const content = `Toggle audio ${audio ? 'on' : 'off'}`

  const [playEnableSound] = useSound('/static/audio/enable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })

  const [playDisableSound] = useSound('/static/audio/disable-sound.mp3', {
    soundEnabled: true,
    volume: 0.25,
  })

  const handleClick = useCallback(() => {
    audio ? playDisableSound() : playEnableSound()
    toggleAudio()
  }, [audio, playDisableSound, playEnableSound, toggleAudio])

  useEffect(() => {
    Mousetrap.bind(['ctrl+a'], () => handleClick())

    return () => {
      Mousetrap.unbind(['ctrl+a'])
    }
  }, [handleClick])

  return (
    <Tooltip content={content} side="bottom" align="end">
      <IconButton
        aria-label={content}
        onClick={() => handleClick()}
        variant="ghost"
        {...props}
      >
        {audio ? <SpeakerModerateIcon /> : <SpeakerOffIcon />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
