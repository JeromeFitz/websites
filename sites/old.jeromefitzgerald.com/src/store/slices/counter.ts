import { produce } from 'immer'
import { NamedSet } from 'zustand/middleware'

import { StoreState } from '~store/useStore'

interface ICounter {
  counter: number
  counterReset: () => void
}

const initialState: Omit<ICounter, 'counterReset'> = {
  counter: 10,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Counter = (set: NamedSet<StoreState>, get: any) => {
  const { counter } = initialState

  return {
    counter,
    counterReset: () =>
      set(
        produce((state: StoreState) => {
          state.counter = counter
        }),
        false,
        // @note(zustand) https://github.com/pmndrs/zustand/issues/705#issuecomment-1023693991
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        'counterReset'
      ),
  }
}

export type { ICounter }
export default Counter
