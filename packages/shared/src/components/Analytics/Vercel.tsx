'use client'
import { Analytics } from '@vercel/analytics/react'

const debug = process.env.NODE_ENV === 'development'
const isVercel = process.env.VERCEL_URL || ''

function VercelAnalytics() {
  return isVercel ? <Analytics debug={debug} /> : null
}

export { VercelAnalytics }
