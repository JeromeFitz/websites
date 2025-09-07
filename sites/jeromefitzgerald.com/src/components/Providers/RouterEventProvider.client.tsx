'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useStore as _useStore, useShallow } from '@/store/index'

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
  return _useStore(
    useShallow((store) => ({
      isRouteChanging: store.isRouteChanging,
      isRouteChangingSet: store.isRouteChangingSet,
    })),
  )
}

function RouterEventProvider() {
  // @todo(types)
  const pathname: any = usePathname()
  const { isRouteChanging, isRouteChangingSet } = useStore()

  const [pastRoute, pastRouteSet] = useState('')

  // biome-ignore lint/correctness/useExhaustiveDependencies: migrate
  useEffect(() => {
    pastRoute !== pathname && isRouteChangingSet(true)

    pastRoute === pathname && isRouteChangingSet(false)
    pastRouteSet(pathname)
  }, [pathname, pastRoute])

  return <Loading isRouteChanging={isRouteChanging} />
}

export { RouterEventProvider }
