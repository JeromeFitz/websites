import { pipe } from 'ramda'
import { create, Mutate, StoreApi } from 'zustand'
import {
  createJSONStorage,
  devtools as _devtools,
  NamedSet,
  persist as _persist,
} from 'zustand/middleware'

import createSelectors from './createSelectors'
import type { IAudio, ICounter, ICounterTest, ISettings } from './slices'
import { Audio, Counter, CounterTest, Settings } from './slices'

type StoreState = IAudio & ICounter & ICounterTest & ISettings

const isDev = process.env.NODE_ENV === 'development' && typeof window !== 'undefined'

const devtools = (
  config: (
    set: NamedSet<StoreState>,
    // @todo(types) any
    get: any,
    api: Mutate<StoreApi<StoreState>, [['zustand/devtools', never]]>
  ) => StoreState
) =>
  /**
   * @note(zustand) comment out `name` real quick
   * ref: https://github.com/pmndrs/zustand/issues/1205
   */
  isDev
    ? _devtools(config, {
        // name: 'zustand',
      })
    : config

const persist = (
  config: (
    set: NamedSet<StoreState>,
    // @todo(types) any
    get: any,
    api: Mutate<StoreApi<StoreState>, [['zustand/persist', Partial<StoreState>]]>
  ) => StoreState
) =>
  _persist(config, {
    name: 'store',
    // getStorage: () => localStorage,
    storage: createJSONStorage(() => localStorage),
    partialize: (state: StoreState) => ({
      audio: state.audio,
      counter: state.counter,
    }),
  })

const createImpl = (
  config: (
    set: NamedSet<StoreState>,
    // @todo(types) any
    get: any,
    api: Mutate<
      StoreApi<StoreState>,
      [['zustand/devtools', never], ['zustand/persist', Partial<StoreState>]]
    >
  ) => StoreState
) => create<StoreState>(config)

const createStore = pipe(devtools, persist, createImpl)
const useStoreBase = createStore((set, get) => {
  return {
    ...Audio(set, get),
    ...Counter(set, get),
    ...CounterTest(set, get),
    ...Settings(set, get),
  }
})
const useStore = createSelectors(useStoreBase)

export type { StoreState }
export { useStore }
