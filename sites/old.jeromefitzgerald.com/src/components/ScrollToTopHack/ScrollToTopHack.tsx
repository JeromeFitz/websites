'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface ScrollToTopHackProps {
  children: React.ReactNode
}

function ScrollToTopHack({ children }: ScrollToTopHackProps) {
  const pathname = usePathname()
  useEffect(() => {
    window.scroll(0, 0)
  }, [pathname])

  return <>{children}</>
}

export { ScrollToTopHack }
