'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Loading } from '~components/Loading'

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
