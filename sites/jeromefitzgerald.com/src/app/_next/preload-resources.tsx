'use client'

import ReactDOM from 'react-dom'

const preconnects = [
  // https://web.dev/preconnect-and-dns-prefetch/#how-to-implement-rel=preconnect
  // 'https://jeromefitzgerald.com',
  'https://cdn.jeromefitzgerald.com',
  'https://cdn.jerandky.com',
  'https://cdn.usefathom.com',
  'https://vitals.vercel-insights.com',
]

function PreloadResources() {
  preconnects.map((preconnect) => {
    // console.dir(`> preconnect: ${preconnect}`)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ReactDOM.preconnect(preconnect, { crossOrigin: 'anonymous' })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ReactDOM.prefetchDNS(preconnect)
  })

  return null
}

export { PreloadResources }
