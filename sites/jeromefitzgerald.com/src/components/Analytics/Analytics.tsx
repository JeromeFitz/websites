'use client'

import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { load, trackPageview } from 'fathom-client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

function Fathom() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => {
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
        url: `https://${process.env.NEXT_PUBLIC__FATHOM_CUSTOM_DOMAIN}/script.js`,
      })
    }
  }, [])

  useEffect(() => {
    trackPageview()
  }, [pathname, searchParams])

  return null
}

function Vercel() {
  return <VercelAnalytics debug={process.env.NODE_ENV === 'production'} />
}

function Analytics() {
  return (
    <>
      <Vercel />
      <Fathom />
    </>
  )
}

export { Analytics }
