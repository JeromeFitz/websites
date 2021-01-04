import React, { useMemo, useState } from 'react'
import cx from 'clsx'

import { useToast } from '~context/Toast'
import styles from './Toast.module.css'

const Toast = ({ children, id, indexReverse, preserve, type }) => {
  const { removeToast } = useToast()

  const [isChecked, isCheckedSet] = useState(false)

  const handleVisible = () => {
    isCheckedSet(true)
    removeToast(id)
  }
  useMemo(() => {
    if (!preserve) {
      const timer = setTimeout(() => {
        removeToast(id)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    } else {
      return () => {}
    }
  }, [id, preserve, removeToast])

  const idCss = `alert-toast--${id}`

  const cssProperties = {}
  cssProperties[`--toast-id`] = indexReverse

  const bgType = `bg-${type}`
  const bgTypeLighter = `bg-${type}-lighter`
  const bgTypeLight = `bg-${type}-light`
  // const bgTypeDark = `bg-${type}-dark`

  return (
    <>
      <div
        className={cx(
          styles.toastContainer,
          // bgType,
          'max-h-24 shadow text-secondary',
          { 'opacity-0': indexReverse > 3 },
          { 'max-h-1': indexReverse > 1 },
          // { 'opacity-100': indexReverse <= 3 },
          {
            'group-hover:opacity-100 -translate-y-8 scale-90 group-hover:-translate-y-40':
              indexReverse === 3,
          },
          { [bgTypeLighter]: indexReverse === 3 },
          {
            'group-hover:opacity-100 -translate-y-4 scale-95 group-hover:-translate-y-20':
              indexReverse === 2,
          },
          {
            [bgTypeLight]: indexReverse === 2,
          },
          `${indexReverse === 3 && 'group-hover:' + bgType}`,
          `${indexReverse === 2 && 'group-hover:' + bgType}`,
          {
            'opacity-100 -translate-y-0 group-hover:-translate-y-1':
              indexReverse === 1,
          },
          {
            [bgType]: indexReverse === 1,
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
            {preserve && (
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
