import * as React from 'react'

type IURL_TYPE_KEY =
  | 'url.internal'
  | 'url.external'
  | 'audio'
  | 'theme'
  | 'settings'
  | 'social'
type IURL_TYPE = {
  [key: string]: IURL_TYPE_KEY
}

interface INavigationItem {
  icon?: React.ReactElement
  // @todo
  icons?: any
  iconKbarOverride?: React.ReactElement
  id?: string
  // dropdown
  rightSlot?: string | React.ReactElement
  rightSlotExtended?: string | React.ReactElement
  separator?: boolean
  // kbar
  keywords?: string
  shortcut?: string[]
  subtitle?: string
  // custom
  title: string
  titleExtended?: string
  url?: string
  type: IURL_TYPE_KEY
  description?: string
  priority?: any
}

interface INavigation {
  [key: string]: {
    active: boolean
    description?: string
    id: string
    icon?: React.ReactElement
    // @todo
    icons?: any
    iconKbarOverride?: React.ReactElement
    order: number
    title: string
    url?: string
    settings?: any
    // kbar
    keywords?: string
    shortcut?: string[]
    subtitle?: string
    //
    items?: INavigationItem[]
    type: IURL_TYPE_KEY
    priority?: any
    hasDynamicSubItems: boolean
  }
}

export type { INavigation, IURL_TYPE }
