import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import Mousetrap from 'mousetrap'
import { useTheme } from 'next-themes'
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
import { darkTheme } from '~styles/system/stitches.config'

const ThemeToggle = (props) => {
  const { theme, setTheme } = useTheme()
  const content = `Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`

  const { audio } = useUI()

  const [playBleep] = useSound('/static/audio/bleep.mp3', { soundEnabled: audio })

  const handleClick = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle(darkTheme.className)
    document.documentElement.classList.toggle('light-theme')
    document.documentElement.style.setProperty('color-scheme', newTheme)
    setTheme(newTheme)
    playBleep()
  }, [playBleep, setTheme, theme])

  useEffect(() => {
    Mousetrap.bind(['ctrl+t'], () => handleClick())

    return () => {
      Mousetrap.unbind(['ctrl+t'])
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
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
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
