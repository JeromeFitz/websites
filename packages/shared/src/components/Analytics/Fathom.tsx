'use client'

import { envClient as env } from '@jeromefitz/next-config/env.client.mjs'

import { load, trackPageview } from 'fathom-client'
import { usePathname, useSearchParams } from 'next/navigation.js'
import { useEffect } from 'react'

function FathomAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    if (env.IS_PRODUCTION) {
      load(env.NEXT_PUBLIC__FATHOM_SITE_ID, {
        honorDNT: true,
        includedDomains: [env.NEXT_PUBLIC__SITE],
        url: `https://cdn.usefathom.com/script.js`,
      })
    }
  }, [])

  useEffect(() => {
    if (!pathname) return
    trackPageview({
      referrer: document.referrer,
      url: pathname + searchParams.toString(),
    })
  }, [pathname, searchParams])

  return null
}

export { FathomAnalytics }
