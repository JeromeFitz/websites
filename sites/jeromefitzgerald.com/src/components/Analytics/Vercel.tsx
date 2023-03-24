import { Analytics } from '@vercel/analytics/react'

const debug = process.env.NODE_ENV === 'development'

function VercelAnalytics() {
  return <Analytics debug={debug} />
}

export { VercelAnalytics }
