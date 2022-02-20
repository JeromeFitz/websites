import create from 'zustand'

import createSelectors from './createSelectors'
import type { ICounter, ICounterTest } from './slices'
import { Counter, CounterTest } from './slices'

type StoreState = ICounter & ICounterTest

const useStoreBase = create<StoreState>((set, get) => {
  return {
    ...Counter(set, get),
    ...CounterTest(set, get),
  }
})
const useStore = createSelectors(useStoreBase)

export type { StoreState }
export default useStore
