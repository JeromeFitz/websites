import { ButtonIcon } from '@jeromefitz/design-system/components'
import { Tooltip, TooltipTrigger } from '@jeromefitz/design-system/custom/Tooltip'
import { SpeakerOffIcon, SpeakerModerateIcon } from '@radix-ui/react-icons'
// import Mousetrap from 'mousetrap'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { useSound } from 'use-sound'

import { useUI } from '~context/ManagedUI'

const TooltipContent = dynamic(() => import('./TooltipContent'), {
  ssr: false,
})

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

  const handleClick = React.useCallback(() => {
    audio ? playDisableSound() : playEnableSound()
    toggleAudio()
  }, [audio, playDisableSound, playEnableSound, toggleAudio])

  // React.useEffect(() => {
  //   Mousetrap.bind(['ctrl+a'], () => handleClick())

  //   return () => {
  //     Mousetrap.unbind(['ctrl+a'])
  //   }
  // }, [handleClick])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ButtonIcon
          aria-label={content}
          onClick={() => handleClick()}
          cursor="pointer"
          {...props}
        >
          {audio ? <SpeakerModerateIcon /> : <SpeakerOffIcon />}
        </ButtonIcon>
      </TooltipTrigger>
      <TooltipContent content={content} />
    </Tooltip>
  )
}

export default ThemeToggle
