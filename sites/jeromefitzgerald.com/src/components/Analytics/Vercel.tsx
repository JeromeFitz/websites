import { Analytics } from '@vercel/analytics/react'

function VercelAnalytics() {
  return <Analytics debug={process.env.NODE_ENV === 'production'} />
}

export { VercelAnalytics }
