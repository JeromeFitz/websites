import { createContext } from 'react'

export interface BreadcrumbContextValue {
  collapsed: boolean
  sticky: boolean
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  collapsed: false,
  sticky: false,
})
