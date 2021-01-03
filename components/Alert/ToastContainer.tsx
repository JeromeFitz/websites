import React from 'react'
import cx from 'clsx'
import Portal from '@reach/portal'

import Toast from './Toast'
import styles from './Toast.module.css'

const ToastContainer = ({ toasts }) => {
  if (typeof document === 'undefined') {
    return null
  }

  const toastSize = toasts.length

  return (
    <Portal>
      <div className={cx(styles.toastArea, 'group')}>
        {toasts.map((toast, toastIndex) => {
          return (
            <Toast
              count={toastSize}
              id={toast.id}
              index={toastIndex}
              key={`toast--${toastIndex}`}
            >
              {toast.content}
            </Toast>
          )
        })}
      </div>
    </Portal>
  )
}

export default ToastContainer
