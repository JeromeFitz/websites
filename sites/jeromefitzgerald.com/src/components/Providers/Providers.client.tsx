'use client'
import dynamic from 'next/dynamic.js'

const Cmdk = dynamic(
  async () => {
    const { Cmdk: Component } = await import('@/components/Cmdk')
    return { default: Component }
  },
  { ssr: false },
)

function Providers({ children }) {
  return (
    <>
      {children}
      <Cmdk />
    </>
  )
}

export { Providers }
