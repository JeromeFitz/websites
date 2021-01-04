import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as Fathom from 'fathom-client'

export const useAnalytics = () => {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
        honorDNT: true,
        includedDomains: ['jeromefitzgerald.com'],
        url: '/scripts/fathom.js',
      })
    }

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])
}
