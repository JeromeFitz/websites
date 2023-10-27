'use client'
import { load, trackPageview } from 'fathom-client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// const isProd = process.env.NODE_ENV === 'production'
// const isVercel = process.env.VERCEL_URL || ''
// const hasAnalytics = isProd && isVercel

function FathomAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
    // if (hasAnalytics) {
    if (process.env.NODE_ENV === 'production') {
      /**
       * @note(types)
       * Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      load(process.env.NEXT_PUBLIC__FATHOM_SITE_ID, {
        honorDNT: true,
        includedDomains: [process.env.NEXT_PUBLIC__SITE],
        url: `https://cdn.usefathom.com/script.js`,
      })
    }
  }, [])

  useEffect(() => {
    if (!pathname) return
    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    })
  }, [pathname, searchParams])

  return null
}

export { FathomAnalytics }
