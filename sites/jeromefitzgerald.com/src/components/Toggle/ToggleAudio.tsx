import { Button, Flex, Icon, Kbd } from '@jeromefitz/design-system'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import * as React from 'react'
import { useEffectOnce } from 'react-use'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

const ToggleAudio = (props) => {
  // @hack(hydration) @todo(hydration) please make this more efficient
  const [mounted, setMounted] = React.useState(false)
  useEffectOnce(() => {
    setMounted(true)
  })

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
  const content = `Toggle audio ${audio || !mounted ? 'off' : 'on'}`
  const icon = audio || !mounted ? <Icon.SpeakerModerate /> : <Icon.SpeakerOff />
  const key1 = 't'
  const key2 = 'a'

  const handleClick = React.useCallback(() => {
    audio || !mounted ? playDisableSound() : playEnableSound()
    audioToggle()
  }, [audio, audioToggle, mounted, playDisableSound, playEnableSound])

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
