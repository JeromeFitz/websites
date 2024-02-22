'use client'
import { Tooltip } from '@jeromefitz/ds/components/Tooltip'

function TooltipWrapper({ children, ...props }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Tooltip {...props}>{children}</Tooltip>
}

export { TooltipWrapper }
