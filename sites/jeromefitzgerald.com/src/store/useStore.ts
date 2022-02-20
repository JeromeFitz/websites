import create from 'zustand'

import createSelectors from './createSelectors'
import type { IAudio, ICounter, ICounterTest } from './slices'
import { AudioSlice, CounterSlice, CounterTestSlice } from './slices'

type StoreState = IAudio & ICounter & ICounterTest

const useStoreBase = create<StoreState>((set, get) => {
  return {
    ...AudioSlice(set, get),
    ...CounterSlice(set, get),
    ...CounterTestSlice(set, get),
  }
})
const useStore = createSelectors(useStoreBase)

export type { StoreState }
export default useStore
