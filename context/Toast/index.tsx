import React, { useState, useContext, useCallback } from 'react'

import ToastContainer from '~components/Alert/ToastContainer'

const ToastContext = React.createContext(null)

let id = 1

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(
    ({
      action = null,
      cancelAction = null,
      preserve = true,
      text,
      type = 'info',
    }) => {
      setToasts((toasts) => [
        ...toasts,
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
    [setToasts]
  )

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    },
    [setToasts]
  )

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const toastHelpers = useContext(ToastContext)

  return toastHelpers
}

export { ToastContext, useToast }
export default ToastProvider
