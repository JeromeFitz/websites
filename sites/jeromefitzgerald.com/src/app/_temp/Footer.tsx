/**
 * @note(next) 📝 @/components/Layout (!layout.tsx)
 *
 * Footer is handled by Layout Component
 *
 * At the time of this commit there is an issue with
 *  Footer having any `use client` components within it
 *  while in layout.tsx
 *
 */
import { memo } from 'react'

import { FooterClient } from './Footer.client'

const FooterClientMemoized = memo(FooterClient)

function Footer() {
  return (
    <>
      <FooterClientMemoized />
    </>
  )
}

export { Footer }
