'use client'
import { Cmdk } from '@/components/Cmdk'
import { Orientation } from '@/components/WIP'

function Providers({ children }) {
  return (
    <>
      <Orientation>
        {children}
        <Cmdk />
      </Orientation>
    </>
  )
}

export { Providers }
