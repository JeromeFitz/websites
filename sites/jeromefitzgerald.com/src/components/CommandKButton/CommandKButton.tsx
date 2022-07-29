import { Button, Flex, Kbd, Text } from '@jeromefitz/design-system'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from '@jeromefitz/design-system/custom/Tooltip'
import { useOs } from '@mantine/hooks'
import { useKBar, VisualState } from 'kbar'
import React from 'react'

function CommandKButton() {
  const { query } = useKBar()
  const os = useOs()

  const content = 'Command Menu'
  const icon = <Text as="span">⌘</Text>
  const key1 = os === 'macos' ? '⌘' : 'ctrl'
  const key2 = 'k'

  return (
    <TooltipProvider>
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

export { CommandKButton }
