import { pipe } from 'ramda'
import _create, { Mutate, SetState, GetState, StoreApi } from 'zustand'
import {
  devtools as _devtools,
  NamedSet,
  persist as _persist,
} from 'zustand/middleware'

import createSelectors from './createSelectors'
import type { IAudio, ICounter, ICounterTest } from './slices'
import { Audio, Counter, CounterTest } from './slices'

type StoreState = IAudio & ICounter & ICounterTest

const isDev = process.env.NODE_ENV === 'development' && typeof window !== 'undefined'

const devtools = (
  config: (
    set: NamedSet<StoreState>,
    get: GetState<StoreState>,
    api: Mutate<StoreApi<StoreState>, [['zustand/devtools', never]]>
  ) => StoreState
) =>
  isDev
    ? _devtools(config, {
        name: 'zustand',
      })
    : config

const persist = (
  config: (
    set: SetState<StoreState>,
    get: GetState<StoreState>,
    api: Mutate<StoreApi<StoreState>, [['zustand/persist', never]]>
  ) => StoreState
) =>
  _persist(config, {
    name: 'store',
    getStorage: () => localStorage,
    partialize: (state: StoreState) => ({ audio: state.audio }),
  })

const create = (
  config: (
    set: SetState<StoreState>,
    get: GetState<StoreState>,
    api: Mutate<
      StoreApi<StoreState>,
      [['zustand/devtools', never], ['zustand/persist', never]]
    >
  ) => StoreState
) => _create<StoreState>(config)

const createStore = pipe(devtools, persist, create)
const useStoreBase = createStore((set, get) => {
  return {
    ...Audio(set, get),
    ...Counter(set, get),
    ...CounterTest(set, get),
  }
})
const useStore = createSelectors(useStoreBase)

export type { StoreState }
export default useStore
