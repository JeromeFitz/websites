import { GetState, SetState } from 'zustand'

import { StoreState } from '../useStore'

interface ICounter {
  counter: number
  counterReset: () => void
}

const initState = {
  counter: 10,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Counter = (set: SetState<StoreState>, get: GetState<StoreState>) => {
  const { counter } = initState

  return {
    counter,
    counterReset: () => {
      set(() => ({ counter }))
    },
  }
}

export type { ICounter }
export default Counter
