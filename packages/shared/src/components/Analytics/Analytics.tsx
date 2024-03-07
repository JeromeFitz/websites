import { Suspense } from 'react'

import { FathomAnalytics } from './Fathom'
import { VercelAnalytics, VercelSpeedInsights } from './Vercel'

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
