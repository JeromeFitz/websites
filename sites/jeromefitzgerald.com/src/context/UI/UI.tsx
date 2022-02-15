/* eslint-disable @typescript-eslint/no-unused-vars */
import { ThemeProvider } from 'next-themes'
import React, { FC, useMemo } from 'react'

interface State {
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

const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

const uiReducerReturn = {
  ['OPEN_SIDEBAR']: (state: State, action: Action | any) => {
    return { ...state, displaySidebar: true }
  },
  ['CLOSE_SIDEBAR']: (state: State, action: Action | any) => {
    return { ...state, displaySidebar: false }
  },
  ['OPEN_DROPDOWN']: (state: State, action: Action | any) => {
    return { ...state, displayDropdown: true }
  },
  ['CLOSE_DROPDOWN']: (state: State, action: Action | any) => {
    return { ...state, displayDropdown: false }
  },
  ['OPEN_MODAL']: (state: State, action: Action | any) => {
    return { ...state, displayModal: true }
  },
  ['CLOSE_MODAL']: (state: State, action: Action | any) => {
    return { ...state, displayModal: false }
  },
  ['OPEN_NAVIGATION']: (state: State, action: Action | any) => {
    return { ...state, displayNavigation: true }
  },
  ['CLOSE_NAVIGATION']: (state: State, action: Action | any) => {
    return { ...state, displayNavigation: false }
  },
  ['OPEN_TOAST']: (state: State, action: Action | any) => {
    return { ...state, displayNotification: true }
  },
  ['CLOSE_TOAST']: (state: State, action: Action | any) => {
    return { ...state, displayNotification: false }
  },
  ['SET_MODAL_VIEW']: (state: State, action: Action | any) => {
    return { ...state, modalView: action.view }
  },
  ['SET_TOAST_TEXT']: (state: State, action: Action | any) => {
    return { ...state, notificationText: action.text }
  },
  ['AUDIO_ENABLE']: (state: State, action: Action | any) => {
    return { ...state, audio: true }
  },
  ['AUDIO_DISABLE']: (state: State, action: Action | any) => {
    return { ...state, audio: false }
  },
  ['SET_BACKGROUND_COLOR']: (state: State, action: Action | any) => {
    return { ...state, backgroundColor: action.backgroundColor }
  },
}

function uiReducer(state: State, action: Action) {
  const uiReducerData = uiReducerReturn[action?.type]
  if (!!uiReducerData) {
    return uiReducerData(state, action)
  }
  return state
}

const UIProvider: FC = (props) => {
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

  const setAudioEnable = () => dispatch({ type: 'AUDIO_ENABLE' })
  const setAudioDisable = () => dispatch({ type: 'AUDIO_DISABLE' })

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
      setAudioEnable,
      setAudioDisable,
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

const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within UIProvider`)
  }
  return context
}

const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  </UIProvider>
)

export { useUI, ManagedUIContext, UIContext, UIProvider }
export type { State }
