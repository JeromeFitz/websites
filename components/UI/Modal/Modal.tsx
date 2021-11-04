import * as Portal from '@radix-ui/react-portal'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import cx from 'clsx'
import { FC, useRef, useEffect, useCallback } from 'react'

import Icon from '~components/Icon'
import { useUI } from '~context/ManagedUIContext'
import FocusTrap from '~lib/focusTrap'

import styles from './Modal.module.css'

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
  onEnter?: () => void | null
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Modal: FC<Props> = ({ children, open, onClose, onEnter = null }) => {
  const ref = useRef()
  const { displayModal } = useUI()
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
        window.addEventListener('keydown', handleKey)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      clearAllBodyScrollLocks()
    }
  }, [open, handleKey])

  return (
    <Portal.Root>
      {open ? (
        <div
          className={cx(
            styles.root,
            'animated025',
            displayModal ? 'fadeIn' : 'fadeOut'
          )}
        >
          <div className={styles.modal} role="dialog" ref={ref}>
            <button
              onClick={() => onClose()}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none absolute right-0 top-0 m-6"
            >
              <Icon className="h-4 w-4" icon={'XIcon'} />
            </button>
            <FocusTrap focusFirst>{children}</FocusTrap>
          </div>
        </div>
      ) : null}
    </Portal.Root>
  )
}

export default Modal
