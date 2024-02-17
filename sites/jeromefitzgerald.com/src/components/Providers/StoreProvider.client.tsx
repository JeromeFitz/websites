'use client'
import { type PropsWithChildren, useRef } from 'react'

import { Provider, initializeStoreMenu } from '~store/index'

const StoreProvider = ({ children, ...props }: PropsWithChildren) => {
  const storeRef = useRef<any>()

  if (!storeRef.current) {
    storeRef.current = initializeStoreMenu(props)
  }

  return <Provider value={storeRef.current}>{children}</Provider>
}

export { StoreProvider }
