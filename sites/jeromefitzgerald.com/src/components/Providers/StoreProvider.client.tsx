'use client'

import type { PropsWithChildren } from 'react'

import { Provider } from '@/store/index'

const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider>{children}</Provider>
}

export { StoreProvider }
