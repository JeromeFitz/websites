'use client'

import { createContext } from 'react'

const LinkRouterChangeContext = createContext<() => void>(() => {})

const handleRouterChange = (href: string, startChange: () => void) => {
  const { pathname, search, hash } = window.location
  const isChange = href !== pathname + search + hash
  isChange && startChange()
  // isChange && window.scroll(0, 0)
}

export { handleRouterChange, LinkRouterChangeContext }
