import { Button, Kbd, Text } from '@jeromefitz/design-system/components'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from '@jeromefitz/design-system/custom/Tooltip'
import { useOs } from '@mantine/hooks'
import { useKBar, VisualState } from 'kbar'
import React from 'react'

function CommandKButton() {
  const { query } = useKBar()
  const os = useOs()

  const commandKey = os == 'macos' ? '⌘' : 'ctrl'
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          aria-label="Open Command Menu"
          css={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() =>
            query.setVisualState((vs) =>
              [VisualState.animatingOut, VisualState.hidden].includes(vs)
                ? VisualState.animatingIn
                : VisualState.animatingOut
            )
          }
          ghost
        >
          <Text as="span">⌘</Text>
        </Button>
      </TooltipTrigger>
      <TooltipContent align="end" sideOffset={5}>
        <>
          Command Menu <Kbd>{commandKey}</Kbd>
          {` `}
          <Kbd>k</Kbd>
        </>
        <TooltipArrow offset={15} />
      </TooltipContent>
    </Tooltip>
  )
}

export { CommandKButton }
