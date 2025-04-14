'use client'

import { preconnect, prefetchDNS } from 'react-dom'

const preconnects = [
  // https://web.dev/preconnect-and-dns-prefetch/#how-to-implement-rel=preconnect
  // 'https://jeromefitzgerald.com',
  'https://cdn.jeromefitzgerald.com',
  'https://cdn.jerandky.com',
  'https://cdn.usefathom.com',
  'https://vitals.vercel-insights.com',
]

function PreloadResources() {
  preconnects.map((p) => {
    // console.dir(`> p: ${p}`)
    preconnect(p, { crossOrigin: 'anonymous' })
    prefetchDNS(p)
  })
  return null
}

export { PreloadResources }
