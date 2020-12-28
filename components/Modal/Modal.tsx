import { FC, useRef, useEffect } from 'react'
import Portal from '@reach/portal'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { MdClose } from 'react-icons/md'

// import styles from './Modal.module.css'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const styles = require('./Modal.module.css')

interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [open])

  return (
    <Portal>
      {open ? (
        <div className={styles.root} ref={ref}>
          <div className={styles.modal}>
            <div className="h-7 flex items-center justify-end w-full">
              <button
                onClick={() => onClose()}
                aria-label="Close panel"
                className="hover:text-gray-500 transition ease-in-out duration-150 focus:outline-none"
              >
                <MdClose className="h-6 w-6" />
              </button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </Portal>
  )
}

export default Modal
