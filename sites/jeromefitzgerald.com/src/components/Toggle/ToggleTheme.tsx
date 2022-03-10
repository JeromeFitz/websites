import { Button, Flex, Kbd } from '@jeromefitz/design-system/components'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { useSound } from 'use-sound'

import useStore from '~store/useStore'

const ToggleTheme = (props) => {
  const { theme, setTheme } = useTheme()
  const content = `Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`
  const icon = theme === 'light' ? <SunIcon /> : <MoonIcon />
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
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle(darkTheme.className)
    document.documentElement.classList.toggle('light-theme')
    document.documentElement.style.setProperty('color-scheme', newTheme)
    setTheme(newTheme)
    playBleep()
  }, [playBleep, setTheme, theme])

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

export default ToggleTheme
