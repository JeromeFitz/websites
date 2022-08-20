import { darkTheme, CommandMenuItem, Flex, Icon } from '@jeromefitz/design-system'
import { useTheme } from 'next-themes'
import React from 'react'

import { useThemeToggle } from '~hooks/useThemeToggle'
import useStore from '~store/useStore'

function Settings() {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const handleThemeToggle = useThemeToggle({ darkTheme, setTheme, theme })

  const audio = useStore.use.audio()
  const audioToggle = useStore.use.audioToggle()

  return (
    <>
      <CommandMenuItem
        onSelect={() => {
          handleThemeToggle()
        }}
        value="toggle-theme"
      >
        <Flex gap="3">
          {theme === 'light' ? <Icon.Moon /> : <Icon.Sun />}
          Toggle Theme
        </Flex>
      </CommandMenuItem>
      <CommandMenuItem
        onSelect={() => {
          audioToggle()
        }}
        value="toggle-audio"
      >
        <Flex gap="3">
          {audio ? <Icon.SpeakerModerate /> : <Icon.SpeakerOff />}
          Toggle Audio
        </Flex>
      </CommandMenuItem>
    </>
  )
}

export { Settings }
