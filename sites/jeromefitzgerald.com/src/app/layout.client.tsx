'use client'
import { SideBar } from '~app/_temp/sidebar/SideBar'

function LayoutClient({ children }) {
  return <SideBar>{children}</SideBar>
}

export { LayoutClient }
