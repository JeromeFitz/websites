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
  const cssProperties = {}
  cssProperties[`--offset-bottom`] = '0px'

  return (
    <Portal>
      <div className={cx(styles.toastArea, 'group')} style={cssProperties}>
        {toasts.map((toast, toastIndex) => {
          const indexReverse = toastSize - toastIndex
          return (
            <Toast
              id={toast.id}
              indexReverse={indexReverse}
              key={`toast--${toastIndex}`}
              preserve={toast.preserve}
              type={toast.type}
            >
              {toast.text}
            </Toast>
          )
        })}
      </div>
    </Portal>
  )
}

export default ToastContainer
