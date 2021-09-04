import React, { useMemo, useState } from 'react'
import cx from 'clsx'
import useSound from 'use-sound'

import { useNotification } from '~context/Notification'
import { useUI } from '~context/ManagedUIContext'

import styles from './Notification.module.css'

const Notification = ({ children, id, indexReverse, preserve, type }) => {
  const { removeNotification } = useNotification()

  const [isChecked, isCheckedSet] = useState(false)

  const { audio } = useUI()
  const [playActive] = useSound('/static/audio/pop-down.mp3', {
    soundEnabled: audio,
    volume: 0.25,
  })

  const handleVisible = () => {
    isCheckedSet(true)
    removeNotification(id)
  }
  useMemo(() => {
    if (!preserve) {
      const timer = setTimeout(() => {
        removeNotification(id)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    } else {
      return () => {}
    }
  }, [id, preserve, removeNotification])

  const idCss = `alert-notification--${id}`

  const cssProperties = {}
  cssProperties[`--notification-id`] = indexReverse

  const bgType = `bg-${type}`
  const bgTypeLighter = `bg-${type}-lighter`
  const bgTypeLight = `bg-${type}-light`
  // const bgTypeDark = `bg-${type}-dark`

  return (
    <>
      <div
        className={cx(
          styles.notificationContainer,
          // bgType,
          'max-h-24 shadow text-secondary',
          { 'opacity-0': indexReverse > 3 },
          { 'max-h-1 group-hover:max-h-24': indexReverse > 1 },
          // { 'opacity-100': indexReverse <= 3 },
          {
            'group-hover:opacity-100 -translate-y-12 scale-90 group-hover:scale-100 group-hover:-translate-y-40':
              indexReverse === 3,
          },
          { [bgTypeLighter]: indexReverse === 3 },
          {
            'group-hover:scale-100 -hover:opacity-100 -translate-y-8 scale-95 group-hover:scale-100 group-hover:-translate-y-20':
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
        role={'status'}
      >
        <div className={cx(styles.notification)}>
          <div
            className={cx(styles.notificationMessage, {
              'opacity-0 group-hover:opacity-100': indexReverse > 1,
            })}
          >
            <input
              checked={isChecked}
              className="hidden"
              id={idCss}
              onChange={() => {
                playActive()
                handleVisible()
              }}
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

export default Notification
