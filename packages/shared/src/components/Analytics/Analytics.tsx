import { Suspense } from 'react'

import { FathomAnalytics } from './Fathom'
import { VercelAnalytics } from './Vercel'

function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <Suspense>
        <FathomAnalytics />
      </Suspense>
    </>
  )
}

export { Analytics }
