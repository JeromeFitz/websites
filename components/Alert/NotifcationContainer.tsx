import { Portal } from '@reach/portal'
import cx from 'clsx'
import React from 'react'

import Notification from './Notification'
import styles from './Notification.module.css'

const NotificationContainer = ({ notifications }) => {
  if (typeof document === 'undefined') {
    return null
  }

  const notificationSize = notifications.length
  const cssProperties = {}
  cssProperties[`--offset-bottom`] = '0px'

  // @todo(notification) change to: https://uiplaybook.dev/play/notification
  return (
    <Portal>
      <div className={cx(styles.notificationArea, 'group')} style={cssProperties}>
        {notifications.map((notification, notificationIndex) => {
          const indexReverse = notificationSize - notificationIndex
          return (
            <Notification
              id={notification.id}
              indexReverse={indexReverse}
              key={`notification--${notificationIndex}`}
              preserve={notification.preserve}
              type={notification.type}
            >
              {notification.text}
            </Notification>
          )
        })}
      </div>
    </Portal>
  )
}

export default NotificationContainer
