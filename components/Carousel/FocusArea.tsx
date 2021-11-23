import { useComposedRefs } from '@radix-ui/react-compose-refs'
import React from 'react'

import { styled } from '~styles/system/stitches.config'

const StyledFocusArea = styled('div', {
  outline: 0,
  borderRadius: '$3',
  '&:focus': {
    boxShadow: '0 0 0 2px $colors$blue8',
  },
  '&:focus:not(:focus-visible)': {
    boxShadow: 'none',
  },
})

const FocusArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof StyledFocusArea>
>(({ children, onKeyDown, ...props }, forwardedRef) => {
  const ownRef = React.useRef<HTMLDivElement>(null)
  const composedRef = useComposedRefs(ownRef, forwardedRef)

  return (
    <StyledFocusArea
      {...props}
      data-focus-area
      ref={composedRef}
      tabIndex={0}
      onKeyDown={(event) => {
        onKeyDown?.(event)

        // Move focus inside the FocusArea when Enter or Spacebar is pressed
        if (
          event.target === event.currentTarget &&
          (event.key === 'Enter' || event.key === ' ')
        ) {
          // We are looking for something obviously focusable
          const tier1 =
            '[role="menu"], [role="dialog"] input, [role="dialog"] button, [tabindex="0"]'
          const tier2 = 'a, button, input, select, textarea'

          // Search for tier 1 and tier 2 elements, prioritising
          const elementToFocus = [
            event.currentTarget.querySelector<HTMLElement>(tier1),
            event.currentTarget.querySelector<HTMLElement>(tier2),
          ].filter((el) => Boolean(el))[0]

          if (elementToFocus) {
            event.preventDefault()
            elementToFocus.focus()
          }
        }

        // Move focus onto the FocusArea when Escape is pressed, unless the focus is currently inside a modal
        if (
          event.key === 'Escape' &&
          event.target instanceof HTMLElement &&
          event.target !== event.currentTarget &&
          event.target.closest('[role="dialog"], [role="menu"]') === null
        ) {
          event.currentTarget.focus()
        }
      }}
    >
      <div data-focus-area-entry />
      {children}
      <div data-focus-area-exit />
    </StyledFocusArea>
  )
})

FocusArea.displayName = 'FocusArea'

export default FocusArea
