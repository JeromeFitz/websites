'use client'
import { Cmdk } from '@/components/Cmdk'
import { Orientation } from '@/components/WIP/index'

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
