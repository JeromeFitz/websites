import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import * as React from 'react'

export const useAnalytics = () => {
  const router = useRouter()

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(process.env.NEXT_PUBLIC__FATHOM_SITE_ID, {
        honorDNT: true,
        includedDomains: [process.env.NEXT_PUBLIC__SITE],
        url: `https://${process.env.NEXT_PUBLIC__FATHOM_CUSTOM_DOMAIN}/script.js`,
      })
    }

    function onRouteChangeComplete() {
      if (process.env.NODE_ENV === 'production') {
        Fathom.trackPageview()
      }
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}
