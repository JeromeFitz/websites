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

function Providers({ children }) {
  return (
    <>
      {children}
      <Cmdk />
    </>
  )
}

export { Providers }
