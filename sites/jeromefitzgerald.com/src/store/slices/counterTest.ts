import { produce } from 'immer'
import { NamedSet } from 'zustand/middleware'

import { StoreState } from '~store/useStore'

/**
 * @note testing that we can alter state outside of existing slice
 */
interface ICounterTest {
  counterDecrement: () => void
  counterIncrement: () => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CounterTest = (set: NamedSet<StoreState>, get: any) => ({
  counterDecrement: () =>
    set(
      produce((state: StoreState) => {
        state.counter = state.counter > 1 ? --state.counter : 0
      }),
      false,
      // @note(zustand) https://github.com/pmndrs/zustand/issues/705#issuecomment-1023693991
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'counterDecrement'
    ),
  counterIncrement: () =>
    set(
      produce((state: StoreState) => {
        ++state.counter
      }),
      false,
      // @note(zustand) https://github.com/pmndrs/zustand/issues/705#issuecomment-1023693991
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      'counterIncrement'
    ),
})

export type { ICounterTest }
export default CounterTest
