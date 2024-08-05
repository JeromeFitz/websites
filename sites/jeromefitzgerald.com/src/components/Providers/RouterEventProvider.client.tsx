'use client'

import dynamic from 'next/dynamic.js'
import { usePathname } from 'next/navigation.js'
import { useEffect, useState } from 'react'

import { useStore as _useStore } from '@/store/index'

// import { Loading } from './RouterEventProvider.Loading.client'
const Loading = dynamic(
  async () => {
    const { Loading: Component } = await import(
      './RouterEventProvider.Loading.client'
    )
    return { default: Component }
  },
  { ssr: true },
)

const useStore = () => {
  return _useStore((store) => ({
    isRouteChanging: store.isRouteChanging,
    isRouteChangingSet: store.isRouteChangingSet,
  }))
}

function RouterEventProvider() {
  // @todo(types)
  const pathname: any = usePathname()
  const { isRouteChanging, isRouteChangingSet } = useStore()

  const [pastRoute, pastRouteSet] = useState('')

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pastRoute !== pathname && isRouteChangingSet(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pastRoute === pathname && isRouteChangingSet(false)
    pastRouteSet(pathname)
    // @todo(eslint) react-hooks/exhaustive-deps
  }, [pathname, pastRoute])

  return <Loading isRouteChanging={isRouteChanging} />
}

export { RouterEventProvider }
