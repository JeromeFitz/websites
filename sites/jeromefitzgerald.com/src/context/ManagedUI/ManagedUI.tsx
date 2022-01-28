import { ThemeProvider } from 'next-themes'
import React, { FC, useMemo } from 'react'

export interface State {
  audio: boolean
  displayDropdown: boolean
  displayModal: boolean
  displayNavigation: boolean
  displayNotification: boolean
  displaySidebar: boolean
  modalView: string
  notificationText: string
}

const initialState = {
  audio: false,
  backgroundColor: 'bg-black',
  displayDropdown: false,
  displayModal: false,
  displayNavigation: false,
  displayNotification: false,
  displaySidebar: false,
  modalView: 'LOGIN_VIEW',
  notificationText: '',
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_TOAST'
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_TOAST_TEXT'
      text: NotificationText
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'OPEN_NAVIGATION'
    }
  | {
      type: 'CLOSE_NAVIGATION'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }
  | {
      type: 'AUDIO_ENABLE'
    }
  | {
      type: 'AUDIO_DISABLE'
    }
  | {
      type: 'SET_BACKGROUND_COLOR'
      backgroundColor: string
    }

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW' | 'MODAL_TEST_VIEW'
type NotificationText = string

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

// @todo(complexity) 16
// eslint-disable-next-line complexity
function uiReducer(state: State, action: Action) {
  switch (action?.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'OPEN_NAVIGATION': {
      return {
        ...state,
        displayNavigation: true,
      }
    }
    case 'CLOSE_NAVIGATION': {
      return {
        ...state,
        displayNavigation: false,
      }
    }
    case 'OPEN_TOAST': {
      return {
        ...state,
        displayNotification: true,
      }
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        displayNotification: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      }
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        notificationText: action.text,
      }
    }
    case 'AUDIO_ENABLE': {
      return {
        ...state,
        audio: true,
      }
    }
    case 'AUDIO_DISABLE': {
      return {
        ...state,
        audio: false,
      }
    }
    case 'SET_BACKGROUND_COLOR': {
      return {
        ...state,
        backgroundColor: action.backgroundColor,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' })

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' })
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' })

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const openNavigation = () => dispatch({ type: 'OPEN_NAVIGATION' })
  const closeNavigation = () => dispatch({ type: 'CLOSE_NAVIGATION' })
  const toggleNavigation = () =>
    state.displayNavigation
      ? dispatch({ type: 'CLOSE_NAVIGATION' })
      : dispatch({ type: 'OPEN_NAVIGATION' })

  const openNotification = () => dispatch({ type: 'OPEN_TOAST' })
  const closeNotification = () => dispatch({ type: 'CLOSE_TOAST' })

  const toggleAudio = () =>
    state.audio
      ? dispatch({ type: 'AUDIO_DISABLE' })
      : dispatch({ type: 'AUDIO_ENABLE' })

  const setModalView = (view: MODAL_VIEWS) => {
    return dispatch({ type: 'SET_MODAL_VIEW', view })
  }

  const setBackgroundColor = ({ backgroundColor }) =>
    dispatch({ type: 'SET_BACKGROUND_COLOR', backgroundColor })

  const value = useMemo(
    () => ({
      ...state,
      closeDropdown,
      closeModal,
      closeNavigation,
      closeNotification,
      closeSidebar,
      closeSidebarIfPresent,
      openDropdown,
      openModal,
      openNavigation,
      openNotification,
      openSidebar,
      setBackgroundColor,
      setModalView,
      toggleAudio,
      toggleNavigation,
      toggleSidebar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  </UIProvider>
)
