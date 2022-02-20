import { State, UseBoundStore } from 'zustand'

interface Selectors<StoreType> {
  use: {
    [key in keyof StoreType]: () => StoreType[key]
  }
}

function createSelectors<StoreType extends State>(store: UseBoundStore<StoreType>) {
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  ;(store as any).use = {}

  Object.keys(store.getState()).forEach((key) => {
    const selector = (state: StoreType) => state[key as keyof StoreType]
    ;(store as any).use[key] = () => store(selector)
  })

  return store as UseBoundStore<StoreType> & Selectors<StoreType>
}

export type { Selectors }
export default createSelectors
