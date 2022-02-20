import { ButtonIcon } from '@jeromefitz/design-system/components'
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

import useAudio from '~store/useAudio'

const ThemeToggle = (props) => {
  const { theme, setTheme } = useTheme()
  const content = `Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`

  const audio = useAudio.use.audio()
  const sounds = useAudio.use.sounds()
  const volume = useAudio.use.volume()

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
        <ButtonIcon
          aria-label={content}
          onClick={() => handleClick()}
          cursor="pointer"
          variant="ghost"
          {...props}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </ButtonIcon>
      </TooltipTrigger>
      <TooltipContent align="end" sideOffset={5}>
        {content}
        <TooltipArrow offset={15} />
      </TooltipContent>
    </Tooltip>
  )
}

export default ThemeToggle
