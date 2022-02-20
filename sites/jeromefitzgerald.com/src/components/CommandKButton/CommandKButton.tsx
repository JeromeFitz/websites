import { Button, Kbd } from '@jeromefitz/design-system/components'
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{
              height: '1rem',
              width: '1rem',
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
            ></path>
          </svg>
        </Button>
      </TooltipTrigger>
      <TooltipContent align="end" sideOffset={5}>
        <>
          Command Menu <Kbd>{commandKey}</Kbd> + <Kbd>k</Kbd>
        </>
        <TooltipArrow offset={15} />
      </TooltipContent>
    </Tooltip>
  )
}

export { CommandKButton }
