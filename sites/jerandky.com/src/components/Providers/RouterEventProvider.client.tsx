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
  { ssr: true },
)

function RouterEventProvider() {
  // @todo(types)
  const pathname: any = usePathname()

  const [isRouteChanging, isRouteChangingSet] = useState(false)
  const [pastRoute, pastRouteSet] = useState('')

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pastRoute !== pathname && isRouteChangingSet(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    pastRoute === pathname && isRouteChangingSet(false)
    pastRouteSet(pathname)
  }, [pathname, pastRoute])

  return <Loading isRouteChanging={isRouteChanging} />
}

export { RouterEventProvider }
