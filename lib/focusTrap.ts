import React, { useEffect, RefObject } from 'react'
import { tabbable } from 'tabbable'

interface Props {
  children: React.ReactNode | any
  focusFirst?: boolean
}

export default function FocusTrap({ children, focusFirst = false }: Props) {
  const root: RefObject<any> = React.useRef()
  const anchor: RefObject<any> = React.useRef(document.activeElement)

  const returnFocus = () => {
    // Returns focus to the last focused element prior to trap.
    if (anchor) {
      anchor.current.focus()
    }
  }

  const trapFocus = () => {
    // Focus the container element
    if (root.current) {
      root.current.focus()
      if (focusFirst) {
        selectFirstFocusableEl()
      }
    }
  }

  const selectFirstFocusableEl = () => {
    // Try to find focusable elements, if match then focus
    // Up to 6 seconds of load time threshold
    let match = false
    const end = 60 // Try to find match at least n times
    let i = 0
    const timer = setInterval(() => {
      if (!match !== i > end) {
        match = !!tabbable(root.current).length
        if (match) {
          // Attempt to focus the first el
          tabbable(root.current)[0].focus()
        }
        i = i + 1
      } else {
        // Clear interval after n attempts
        clearInterval(timer)
      }
    }, 100)
  }

  useEffect(() => {
    setTimeout(trapFocus, 20)
    return () => {
      returnFocus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, children])

  // eslint-disable-next-line react/no-children-prop
  return React.createElement('div', {
    ref: root,
    children,
    className: 'outline-none focus-trap',
    tabIndex: -1,
  })
}
