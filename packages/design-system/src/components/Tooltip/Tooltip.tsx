/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  Root as TooltipRoot,
  TooltipTrigger,
} from '@radix-ui/react-tooltip'
import React from 'react'

import { cx } from '../../utils/cx'

const TooltipImpl = ({ children, description }) => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        {/* @todo(radix) children */}
        {/* @ts-ignore */}
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className={cx(
              'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade rounded-1 select-none px-4 py-3 leading-[none] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]',
              'bg-black text-white',
              'dark:bg-white dark:text-black',
              'z-10',
            )}
            sideOffset={5}
          >
            {description}
            {/* @todo(radix) className */}
            {/* @ts-ignore */}
            <TooltipArrow className="fill-black dark:fill-white" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export { TooltipImpl as Tooltip }
