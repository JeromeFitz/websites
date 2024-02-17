'use client'
import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const zustandContext = createContext<any | null>(null)

const Provider = zustandContext.Provider

const useStore = <T>(selector: (state: any) => T) => {
  const store = useContext(zustandContext)
  if (!store) throw new Error('Store is missing the provider')
  return useZustandStore(store, selector)
}

const getDefaultInitialStateStoreMenu = () => ({
  cmdkInput: '',
  cmdkInputSet: () => {},
  cmdkPages: [],
  cmdkPagesSet: () => {},
  cmdkPagesSetRemove: () => {},
  count: 0,
  countSet: () => {},
  current: 0,
  currentSet: () => {},
  // htmlWidth: 0,
  // htmlWidthSet: () => {},
  // htmlHeight: 0,
  isCmdkInnerOpen: false,
  isCmdkInnerOpenSet: () => {},
  // htmlHeightSet: () => {},
  isCmdkOpen: false,
  isCmdkOpenSet: () => {},
  //
  isMenuOpen: false,
  isMenuOpenSet: () => {},
  isRouteChanging: false,
  isRouteChangingSet: () => {},
  isWidgetOpen: false,
  isWidgetOpenSet: () => {},
  seen: 0,
  seenSetDecrease: () => {},
  seenSetIncrease: () => {},
  // @note(zustand) no persist state due to SSR
  spotifyTimeRange: 'short_term',
  spotifyTimeRangeSet: () => {},
  spotifyType: 'top-tracks',
  spotifyTypeSet: () => {},
})

const initializeStoreMenu = (preloadedState: Partial<any> = {}) => {
  return createStore<any>((set, get) => ({
    ...getDefaultInitialStateStoreMenu(),
    ...preloadedState,
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
    // htmlWidthSet: (width) => {
    //   set({
    //     htmlWidth: width,
    //   })
    // },
    // htmlHeightSet: (height) => {
    //   set({
    //     htmlHeight: height,
    //   })
    isCmdkInnerOpenSet: () => {
      set({
        isCmdkInnerOpen: !get().isCmdkInnerOpen,
      })
    },
    // },
    isCmdkOpenSet: () => {
      set({
        isCmdkInnerOpen: !get().isCmdkInnerOpen,
      })
      get().isCmdkOpen
        ? setTimeout(() => {
            console.dir(`ok`)
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
    isMenuOpenSet: () => {
      set({
        isMenuOpen: !get().isMenuOpen,
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
