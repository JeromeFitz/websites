import { SpeakerOffIcon, SpeakerModerateIcon } from '@radix-ui/react-icons'
import Mousetrap from 'mousetrap'
import { useCallback, useEffect } from 'react'
import { useSound } from 'use-sound'

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '~components/Tooltip'
import { useUI } from '~context/ManagedUIContext'
import { IconButton } from '~styles/system/components'

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
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton
          aria-label={content}
          onClick={() => handleClick()}
          cursor="pointer"
          variant="ghost"
          {...props}
        >
          {audio ? <SpeakerModerateIcon /> : <SpeakerOffIcon />}
        </IconButton>
      </TooltipTrigger>
      <TooltipContent align="end" sideOffset={5}>
        {content}
        <TooltipArrow offset={15} />
      </TooltipContent>
    </Tooltip>
  )
}

export default ThemeToggle
