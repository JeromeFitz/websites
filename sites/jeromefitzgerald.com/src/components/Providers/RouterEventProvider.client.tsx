'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// import { Loading } from './RouterEventProvider.Loading.client'
const Loading = dynamic(
  async () => {
    const { Loading: Component } = await import(
      './RouterEventProvider.Loading.client'
    )
    return { default: Component }
  },
  { ssr: false }
)

function RouterEventProvider() {
  // @todo(types)
  const pathname: any = usePathname()

  const [isRouteChanging, isRouteChangingSet] = useState(false)
  const [pastRoute, pastRouteSet] = useState('')

  useEffect(() => {
    pastRoute !== pathname && isRouteChangingSet(true)
    pastRoute === pathname && isRouteChangingSet(false)
    pastRouteSet(pathname)
  }, [pathname, pastRoute])

  return <Loading isRouteChanging={isRouteChanging} />
}

export { RouterEventProvider }
