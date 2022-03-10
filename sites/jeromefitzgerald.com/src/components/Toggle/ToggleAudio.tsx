import { Button, Flex, Kbd } from '@jeromefitz/design-system/components'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import { SpeakerOffIcon, SpeakerModerateIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

const ToggleAudio = (props) => {
  const audio = useStore.use.audio()
  const audioToggle = useStore.use.audioToggle()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()
  const [playEnableSound] = useSound(sounds.enableSound, {
    soundEnabled: true,
    volume,
  })
  const [playDisableSound] = useSound(sounds.disableSound, {
    soundEnabled: true,
    volume,
  })
  const content = `Toggle audio ${audio ? 'off' : 'on'}`
  const icon = audio ? <SpeakerModerateIcon /> : <SpeakerOffIcon />
  const key1 = 't'
  const key2 = 'a'

  const handleClick = React.useCallback(() => {
    audio ? playDisableSound() : playEnableSound()
    audioToggle()
  }, [audio, audioToggle, playDisableSound, playEnableSound])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label={content}
          css={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() => handleClick()}
          ghost
          {...props}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        align="end"
        css={{ display: 'none', '@bp1': { display: 'inline-flex' } }}
        sideOffset={5}
      >
        <Flex align="center" gap="1" justify="center">
          <span>{content}</span>
          <Kbd>{key1}</Kbd>
          <Kbd>{key2}</Kbd>
        </Flex>
        <TooltipArrow offset={15} />
      </TooltipContent>
    </Tooltip>
  )
}

export default ToggleAudio
