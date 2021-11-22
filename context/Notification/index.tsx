import React, { useState, useContext, useCallback } from 'react'

import { NotificationContainer } from '~components/Alert'

const NotificationContext = React.createContext(null)

let id = 1

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  // console.dir(`> NotificationProvider`)
  // console.dir(notifications)

  const addNotification = useCallback(
    ({
      action = null,
      cancelAction = null,
      preserve = true,
      text,
      type = 'info',
    }) => {
      setNotifications((notifications) => [
        ...notifications,
        {
          action,
          cancelAction,
          id: id++,
          preserve,
          text,
          type,
        },
      ])
    },
    [setNotifications]
  )

  const removeNotification = useCallback(
    (id) => {
      setNotifications((notifications) => notifications.filter((t) => t.id !== id))
    },
    [setNotifications]
  )

  return (
    <NotificationContext.Provider
      value={{
        addNotification,
        removeNotification,
      }}
    >
      <NotificationContainer notifications={notifications} />
      {children}
    </NotificationContext.Provider>
  )
}

const useNotification = () => {
  const notificationHelpers = useContext(NotificationContext)

  return notificationHelpers
}

export { NotificationContext, useNotification }
export default NotificationProvider
