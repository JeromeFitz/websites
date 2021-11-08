import * as Portal from '@radix-ui/react-portal'
import cx from 'clsx'
import _size from 'lodash/size'
import React from 'react'

import Notification from './Notification'
import styles from './Notification.module.css'

const NotificationContainer = ({ notifications }) => {
  const count = _size(notifications)
  // if (typeof document === 'undefined' || count === 0) {
  //   return null
  // }
  if (count === 0) {
    return null
  }
  const notificationSize = notifications.length
  const cssProperties = {}
  cssProperties[`--offset-bottom`] = '0px'

  console.dir(`> NotificationContainer`)
  console.dir(notifications)

  return (
    <Portal.Root>
      {count > 0 ? (
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
      ) : null}
    </Portal.Root>
  )
}

export default NotificationContainer
