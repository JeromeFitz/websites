'use client'
import { Suspense } from 'react'

import { FathomAnalytics } from './Fathom.js'
import { VercelAnalytics, VercelSpeedInsights } from './Vercel.js'

function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <VercelSpeedInsights />
      <Suspense fallback={null}>
        <FathomAnalytics />
      </Suspense>
    </>
  )
}

export { Analytics }
