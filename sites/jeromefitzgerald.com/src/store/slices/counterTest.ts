/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetState, SetState } from 'zustand'

import { StoreState } from '../useStore'

/**
 * @note testing that we can alter state outside of existing slice
 */
interface ICounterTest {
  counterDecrement: () => void
  counterIncrement: () => void
}

const CounterTest = (set: SetState<StoreState>, get: GetState<StoreState>) => ({
  counterDecrement: () => {
    set((prev) => ({ counter: prev.counter > 1 ? prev.counter - 1 : 0 }))
  },
  counterIncrement: () => {
    set((prev) => ({ counter: prev.counter + 1 }))
  },
})

export type { ICounterTest }
export default CounterTest
