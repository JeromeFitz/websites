import { IconButton, Tooltip } from '@modulz/design-system'
import { SpeakerOffIcon, SpeakerModerateIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUIContext'

const ThemeToggle = (props) => {
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
  const content = `Toggle audio ${audio ? 'on' : 'off'}`

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
