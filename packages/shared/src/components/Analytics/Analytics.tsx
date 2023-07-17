'use client'
import { FathomAnalytics } from './Fathom'
import { VercelAnalytics } from './Vercel'

function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <FathomAnalytics />
    </>
  )
}

export { Analytics }
