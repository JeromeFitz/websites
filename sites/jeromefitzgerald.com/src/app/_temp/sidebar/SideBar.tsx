'use client'
import {
  ArrowTopRightIcon,
  BookOpenIcon,
  CalendarIcon,
  MusicalNoteIcon,
  // TicketIcon,
} from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { useMotionValueEvent, useScroll } from 'framer-motion'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useStore as _useStore } from '~store/index'

import { SideBarContainer } from './SideBar.Container'
import { WidgetEventUpcoming } from './Widget.EventUpcoming'

const useStore = () => {
  return _useStore((store) => ({
    isRouteChanging: store.isRouteChanging,
    isRouteChangingSet: store.isRouteChangingSet,
  }))
}

/**
 * @todo(widget) This should be _per_ Route Type
 *
 * Every Route _except_ Current Event? Upcoming Event
 * Current Event? Buy Tickets
 *
 * @todo(dynamic) should be pull from api not hard-code
 * --
 * 2 Footer ones are always there
 */
const widgets = [
  {
    active: false,
    component: WidgetEventUpcoming,
    href: '/events/2023/12/16/jerome-and',
    icon: ArrowTopRightIcon,
    id: 0,
    percentageReveal: 0,
    subtitle: 'BUY TICKETS',
    title: 'SAT 12/16 09PM @ Arcade Comedy Theater',
  },
  {
    active: false,
    component: WidgetEventUpcoming,
    href: '/events/2023/12/16/jerome-and?utm_source=website&utm_medium=banner&utm_id=20231216',
    icon: CalendarIcon,
    id: 1,
    percentageReveal: 25,
    subtitle: 'SAT 12/16 09:00PM',
    title: 'Jerome &: Else Collective, Derek Minto, & more',
  },
  {
    active: true,
    component: WidgetEventUpcoming,
    href: '/music',
    icon: MusicalNoteIcon,
    id: 2,
    percentageReveal: 80,
    subtitle: 'Now Playing',
    title: '“Control Center” – Buscrates',
  },
  {
    active: true,
    component: WidgetEventUpcoming,
    href: '/books',
    icon: BookOpenIcon,
    id: 3,
    percentageReveal: 95,
    subtitle: 'Now Reading',
    title: '“SPQR” – Mary Beard',
  },
]

function SideBar({ children }) {
  const { isRouteChanging } = useStore()

  const { scrollY } = useScroll()
  const [scrollPosition, scrollPositionSet] = useState(0)
  const [percentage, percentageSet] = useState(0)

  const ref: any = useRef(null)

  const getWindowSize = () => {
    const { innerHeight, innerWidth } = window
    return { innerHeight, innerWidth }
  }

  // const [windowSize, windowSizeSet] = useState(getWindowSize())
  const [windowSize, windowSizeSet] = useState({ innerHeight: 0, innerWidth: 0 })
  const [width, widthSet] = useState(0)
  const [height, heightSet] = useState(0)

  useEffect(() => {
    function handleWindowResize() {
      heightSet(ref.current.clientHeight)
      widthSet(ref.current.clientWidth)
      windowSizeSet(getWindowSize())
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    heightSet(ref.current.clientHeight)
    widthSet(ref.current.clientWidth)
    windowSizeSet(getWindowSize())
  }, [])

  useLayoutEffect(() => {
    heightSet(ref.current.clientHeight)
    widthSet(ref.current.clientWidth)
  }, [isRouteChanging])

  useMotionValueEvent(scrollY, 'change', (latest) => {
    percentageSet(Math.round((latest / (height - windowSize.innerHeight)) * 100))
    scrollPositionSet(latest)
  })

  return (
    <>
      <div id="container--scroll" ref={ref}>
        {children}
      </div>
      <div
        className={cx(
          'bottom-1',
          'md:top-[calc(var(--header-height)_-_1px)]',
          'fixed z-40',
          'right-1',
          'md:right-[var(--sidebar-margin)]',
          'md:[--y:translateY(var(--header-height))]',
          'w-[calc(100%-0.5rem)]',
          'md:w-[calc(var(--sidebar-width)_-_var(--sidebar-margin)*2)]',
          'flex-col-reverse gap-4 md:flex md:flex-col',
          'h-3/4',
          'hidden',
        )}
      >
        {widgets.map((widget) => {
          if (!widget.active) return null

          const isSecondWidget = widget.id === 1
          const hasCustomWidget = !!widgets[0].active

          const {
            component: WidgetComponent,
            href,
            icon,
            id,
            percentageReveal: pReveal,
            subtitle,
            title,
          } = widget

          const percentageReveal = isSecondWidget && !hasCustomWidget ? 0 : pReveal

          const props = { href, percentage, percentageReveal }
          const widgetProps = { icon, subtitle, title }
          return (
            <SideBarContainer key={`sb-${id}`} {...props}>
              {WidgetComponent !== Fragment ? (
                <WidgetComponent {...widgetProps} />
              ) : (
                <span className="font-mono text-sm">
                  {title} ({id}):
                  <br />
                  {scrollPosition || 0} ({percentage || 0})
                  <br />
                  w: {width || 0} ({windowSize.innerWidth},{' '}
                  {width - windowSize.innerWidth}
                  )
                  <br />
                  h: {height || 0} ({windowSize.innerHeight},{' '}
                  {height - windowSize.innerHeight})
                </span>
              )}
            </SideBarContainer>
          )
        })}
      </div>
    </>
  )
}

export { SideBar }
