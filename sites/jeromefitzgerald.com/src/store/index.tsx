'use client'
import type { ReactNode } from 'react'
import type { StoreApi } from 'zustand'

import { createContext, useContext, useRef } from 'react'
import { useStore as useZustandStore } from 'zustand'
// import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const Context = createContext<any | null>(null)

interface ProviderProps {
  children: ReactNode
}
const Provider = ({ children }: ProviderProps) => {
  const storeRef = useRef<StoreApi<any>>()
  if (!storeRef.current) {
    storeRef.current = initializeStoreMenu()
  }
  return <Context.Provider value={storeRef.current}>{children}</Context.Provider>
}

const useStore = <T,>(selector: (state: any) => T): T => {
  const store = useContext(Context)
  if (!store) throw new Error('Store is missing the provider')
  return useZustandStore(store, selector)
}

const getDefaultInitialStateStoreMenu = () => ({
  bookStatus: 'in-progress',
  bookStatusSet: () => {},
  cmdkInput: '',
  cmdkInputSet: () => {},
  cmdkPages: [],
  cmdkPagesSet: () => {},
  cmdkPagesSetRemove: () => {},
  count: 0,
  countSet: () => {},
  current: 0,
  currentSet: () => {},
  isCmdkInnerOpen: false,
  isCmdkInnerOpenSet: () => {},
  isCmdkOpen: false,
  isCmdkOpenSet: () => {},
  isMenuMobileOpen: false,
  isMenuMobileOpenSet: () => {},
  isRouteChanging: false,
  isRouteChangingSet: () => {},
  isWidgetOpen: false,
  isWidgetOpenSet: () => {},
  seen: 0,
  seenSetDecrease: () => {},
  seenSetIncrease: () => {},
  // @note(zustand) no persist state due to SSR
  spotifyTimeRange: 'medium_term',
  spotifyTimeRangeSet: () => {},
  spotifyType: 'top-tracks',
  spotifyTypeSet: () => {},
})

const initializeStoreMenu = (preloadedState: Partial<any> = {}) => {
  return createStore<any>((set, get) => ({
    ...getDefaultInitialStateStoreMenu(),
    ...preloadedState,
    bookStatusSet: (status) => {
      set({
        bookStatus: status,
      })
    },
    cmdkInputSet: (search) => {
      set({
        cmdkInput: search,
      })
    },
    cmdkPagesSet: (page) => {
      set({
        cmdkPages: [...get().cmdkPages, page],
      })
    },
    cmdkPagesSetRemove: () => {
      set({
        cmdkPages: get().cmdkPages.slice(0, -1),
      })
    },
    isCmdkInnerOpenSet: () => {
      set({
        isCmdkInnerOpen: !get().isCmdkInnerOpen,
      })
    },
    isCmdkOpenSet: () => {
      set({
        isCmdkInnerOpen: !get().isCmdkInnerOpen,
      })
      get().isCmdkOpen
        ? setTimeout(() => {
            // console.dir(`ok`)
            set({
              cmdkInput: '',
              cmdkPages: get().cmdkPages.slice(0, -1),
              isCmdkInnerOpen: false,
              isCmdkOpen: !get().isCmdkOpen,
            })
          }, 250)
        : set({
            isCmdkOpen: !get().isCmdkOpen,
          })
    },
    isMenuMobileOpenSet: () => {
      set({
        isMenuMobileOpen: !get().isMenuMobileOpen,
      })
    },
    isRouteChangingSet: (val: boolean) => {
      set({
        isRouteChanging: val,
      })
    },
    spotifyTimeRangeSet: (time_range) => {
      set({
        spotifyTimeRange: time_range,
      })
    },
    spotifyTypeSet: (type) => {
      set({
        spotifyType: type,
      })
    },
  }))
}

export { Provider, initializeStoreMenu, useStore }
