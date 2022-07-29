import { darkTheme, Button, Flex, Icon, Kbd } from '@jeromefitz/design-system'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '@jeromefitz/design-system/custom/Tooltip'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useEffectOnce } from 'react-use'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

const ToggleTheme = (props) => {
  // @hack(hydration) @todo(hydration) please make this more efficient
  const [mounted, setMounted] = React.useState(false)
  useEffectOnce(() => {
    setMounted(true)
  })

  const { theme, setTheme } = useTheme()
  const content = `Toggle theme to ${
    theme === 'light' || !mounted ? 'dark' : 'light'
  }`
  const icon = theme === 'light' || !mounted ? <Icon.Sun /> : <Icon.Moon />
  const key1 = 't'
  const key2 = 't'

  const audio = useStore.use.audio()
  const sounds = useStore.use.sounds()
  const volume = useStore.use.volume()

  const [playBleep] = useSound(sounds.bleep, {
    soundEnabled: audio,
    volume,
  })

  const handleClick = React.useCallback(() => {
    const newTheme = theme === 'dark' || !mounted ? 'light' : 'dark'
    document.documentElement.classList.toggle(darkTheme.className)
    document.documentElement.classList.toggle('light-theme')
    document.documentElement.style.setProperty('color-scheme', newTheme)
    setTheme(newTheme)
    playBleep()
  }, [playBleep, mounted, setTheme, theme])

  return (
    <TooltipProvider>
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
        <TooltipPortal>
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
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToggleTheme
