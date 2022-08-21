import { useDelayedRender, CommandMenu } from '@jeromefitz/design-system'
import React from 'react'

import useStore from '~store/useStore'

import { CommandMenuData } from './CommandMenuData'

function CommandMenuWrapper() {
  const commandMenuOpen = useStore.use.commandMenuOpen()
  const commandMenuOpenSet = useStore.use.commandMenuOpenSet()

  React.useEffect(() => {
    const down = (e: { key: string; metaKey: any; preventDefault: () => void }) => {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault()
        // setOpen((open) => !open)
        commandMenuOpenSet()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [commandMenuOpenSet])

  const { mounted: open } = useDelayedRender(commandMenuOpen, {
    exitDelay: 125,
  })

  return (
    <CommandMenu
      open={open}
      onOpenChange={commandMenuOpenSet}
      wrapperCss={{
        top: '1rem',
        // height: '95%',
        '@bp1': { top: '5rem', height: 'inherit', maxHeight: '400px' },
      }}
    >
      <CommandMenuData />
    </CommandMenu>
  )
}

export { CommandMenuWrapper as CommandMenu }
