'use client'
/**
 * @note(next) ⛔ ⛔ ⛔
 *
 * do not, let me repeat, do not
 * make Cmdk a `next/dynamic` loaded
 * component
 *
 * *.module.css imports break tailwind
 *  on development if you do and it was
 *  very, very annoying to figure out
 *
 * ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔ ⛔
 */
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
