import { Button, Flex, Kbd, Text } from '@jeromefitz/design-system/components'
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

  const content = 'Command Menu'
  const icon = <Text as="span">⌘</Text>
  const key1 = os === 'macos' ? '⌘' : 'ctrl'
  const key2 = 'k'

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

export { CommandKButton }
