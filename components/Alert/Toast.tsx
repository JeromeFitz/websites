import React, { useEffect, useState } from 'react'
import cx from 'clsx'

import { useToast } from '~context/Toast'
import styles from './Toast.module.css'

const Toast = ({ children, count, id, index, isPersistent = false }) => {
  const { removeToast } = useToast()

  const [isChecked, isCheckedSet] = useState(false)

  const handleVisible = () => {
    isCheckedSet(true)
    removeToast(id)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [id, removeToast])

  const idCss = `alert-toast--${id}`

  const indexReverse = count - index

  const cssProperties = {}
  cssProperties[`--toast-id`] = indexReverse

  return (
    <>
      <div
        className={cx(
          styles.toastContainer,
          'bg-warning',
          'max-h-20 shadow-xl',
          { 'opacity-0': indexReverse > 3 },
          { 'max-h-1': indexReverse > 1 },
          { 'opacity-100': indexReverse <= 3 },
          {
            '-translate-y-8 scale-90 group-hover:-translate-y-40':
              indexReverse === 3,
          },
          {
            '-translate-y-4 scale-95 group-hover:-translate-y-20':
              indexReverse === 2,
          },
          {
            '-translate-y-0 group-hover:-translate-y-1': indexReverse === 1,
          },
          'transform group-hover:transform',
          { checked: isChecked }
        )}
        style={cssProperties}
      >
        <div className={cx(styles.toast)}>
          <div
            className={cx(styles.toastMessage, {
              'opacity-0 group-hover:opacity-100': indexReverse > 1,
            })}
          >
            <input
              checked={isChecked}
              className="hidden"
              id={idCss}
              onChange={() => handleVisible()}
              type="checkbox"
            />
            {children}
            {!isPersistent && (
              <label className="close cursor-pointer" title="close" htmlFor={idCss}>
                <svg
                  className="fill-current "
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Toast
