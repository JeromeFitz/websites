import { useEffect, useState } from 'react'

import { cx } from '@/utils/cx'

const Header = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true)
  let lastScrollY = 0

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
    lastScrollY = currentScrollY
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: suppress
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cx(
        'fixed top-0 z-50 w-full transition-opacity duration-250 ease-out',
      )}
      style={{
        // transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 100 : 0,
      }}
    >
      <>{children}</>
    </header>
  )
}

export { Header }
