import { CalendarIcon } from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import {
  useIsomorphicEffect,
  useViewportSize,
  useWindowScroll,
} from '@mantine/hooks'
import { IconButton, Separator } from '@radix-ui/themes'
import { useInView } from 'framer-motion'
import { findIndex, toInteger } from 'lodash'
// eslint-disable-next-line no-restricted-imports
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Skeleton } from '~components/Skeleton'
import { useStore as _useStore } from '~store/index'

const isDebug = false

const useStore: any = () => {
  return _useStore((store) => ({
    count: store.count,
    countSet: store.countSet,
    current: store.current,
    currentSet: store.currentSet,
    isWidgetOpen: store.isWidgetOpen,
    isWidgetOpenSet: store.isWidgetOpenSet,
    seen: store.seen,
    seenSetDecrease: store.seenSetDecrease,
    seenSetIncrease: store.seenSetIncrease,
  }))
}

// eslint-disable-next-line complexity
function ModuleWidget({ options, refPass = null }) {
  const ref: any = refPass
  const id = `widget-container-${options.id}`

  const useViewportSizeProps = useViewportSize()
  const screenHeight = useViewportSizeProps.height
  const isMobile = useViewportSizeProps.width <= 768 || false

  const {
    count,
    countSet,
    // current,
    // currentSet,
    isWidgetOpen,
    isWidgetOpenSet,
    seen,
    seenSetDecrease,
    seenSetIncrease,
  } = useStore()
  // const props = useStore()

  const refElement: any = useRef(null)

  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [loading, setLoading] = useState(true)

  useIsomorphicEffect(() => {
    setWidth(refElement.current.offsetWidth)
    setHeight(refElement.current.offsetHeight)
  }, [isMobile])

  const [isFirst, isFirstSet] = useState(options.id === 0)
  const [isSeen, isSeenSet] = useState(false)
  const [idIndexFound, idIndexFoundSet] = useState(-1)
  const [widgetTop, widgetTopSet] = useState(0)
  const [widgetTopAction, widgetTopSetAction] = useState(0)

  useEffect(() => {
    // console.dir('useEffect (0): effected')
    // @hack(widget) into the river please!
    const wcElements: any = Array.from(
      document?.getElementsByClassName('widget-container'),
    )
    const idIndexFoundTemp = findIndex(wcElements, { id: id })
    idIndexFoundSet(idIndexFoundTemp)
    isFirstSet(options.id === 0 || idIndexFoundTemp === 0)
    countSet(wcElements.length)

    if (idIndexFoundTemp > 0) {
      let offsetHeight = 0
      for (let index = 0; index < idIndexFoundTemp; index++) {
        const previousElement = wcElements[index]
        offsetHeight += previousElement?.offsetHeight
      }
      const offsetHeightOffset = toInteger(idIndexFoundTemp) * 1
      widgetTopSet(offsetHeight + offsetHeightOffset)
      widgetTopSetAction(
        wcElements[idIndexFoundTemp]?.getBoundingClientRect().top - offsetHeight ??
          0,
      )
      // isSeenSet(ref.current.getBoundingClientRect().top < scrollY.current)
    } else {
      widgetTopSet(0)
      widgetTopSetAction(
        wcElements[idIndexFoundTemp]?.getBoundingClientRect().top - 0 ?? 0,
      )
    }
  }, [countSet, id, options.id])

  const isInView = useInView(ref, {
    margin: isMobile || isFirst ? '0px' : '-250px',
  })

  const [scroll] = useWindowScroll()
  const scrollTop = ref?.current?.getBoundingClientRect()?.top
  useEffect(() => {
    console.dir('useEffect (1): effected <== debounce or memo this somehow?')
    isSeenSet(screenHeight - scrollTop >= screenHeight)
  }, [scrollTop, scroll.y, screenHeight])

  useEffect(() => {
    console.dir('useEffect (2): effected')
    isSeen ? seenSetIncrease() : seenSetDecrease()
  }, [isSeen, seenSetDecrease, seenSetIncrease])

  console.dir(`isSeen: ${isSeen}`)

  return (
    <div
      className={cx(
        '[--mbm-row:-3rem] [--ptd-row:5rem] [--ptm-row:5rem]',
        'pointer-events-none',
        // 'z-50',
        'absolute right-0 grid gap-[0.5rem] transition-opacity',
        'w-[var(--sidebar-width)] p-[0_var(--sidebar-margin)]',
        'top-[var(--ptd-row,0)] md:top-auto',
        // 'z-40',
        '',
      )}
      id="layout--modules--row-0--widget"
    >
      <div
        className={cx(
          // 'z-50 md:-z-50',
          'relative md:relative',
          'h-[82.5938px] w-full',
          '[--front-widget-height:53.5px]',
          'mx-auto',
        )}
      >
        <div
          className={cx(
            // @hack(widget) want to throw myself in in the river
            /*! eslint-disable-next-line tailwindcss/no-custom-classname */
            isFirst && 'widget-init',
            // // 'z-40 md:-z-40',
            'group',
            '[pointer-events:all]',
            // 'w-[calc(var(--sidebar-width)_-_var(--sidebar-margin)*2)] touch-none',
            'z-50 md:z-0',
            'fixed',
            'md:fixed md:bottom-auto',
            // 'md:top-0',
            'md:top-[var(--header-height)]',
            'md:[--y:translateY(var(--header-height))]',
            'overflow-y-hidden rounded backdrop-blur-md',
            'bg-[var(--whiteA11)] hover:bg-[var(--whiteA12)] dark:bg-[var(--blackA11)] dark:hover:bg-[var(--blackA12)]',
            '',
            'mx-2 md:md:mx-0 ',
            'inset-x-0 bottom-0 md:inset-auto',
            'w-[calc(100%-1rem)]',
            'md:w-[calc(var(--sidebar-width)_-_var(--sidebar-margin)*2)]',
            /**
             * visible
             */
            'opacity-100',
            'data-[visible=n]:opacity-0 ',
            'data-[visible=n]:[pointer-events:none]',
            'hover:data-[visible=y]:cursor-pointer',
            'hover:data-[visible=y]:shadow-md',
            // 'md:data-[visible=n]:opacity-100 md:data-[visible=n]:[pointer-events:auto]',
            'data-[visible=y]:opacity-100',
            /**
             * closed
             */
            'data-[state=closed]:[--y:translateY(calc(var(--offset-final)+81px))_scale(calc(1_*_var(--scale)))]',
            'md:data-[state=closed]:[--y:translateY(calc(var(--offset-desktop)-9px))_scale(calc(1_*_1))]',
            /**
             * open
             */
            'data-[state=open]:[--y:translateY(calc(-1*var(--widget-open)-(5px*var(--index))))]',
            '',
          )}
          data-current={isInView ? 'y' : 'n'}
          data-state={isWidgetOpen ? 'open' : 'closed'}
          data-visible={isInView ? 'y' : isSeen ? 'y' : 'n'}
          style={{
            // widget specific'
            '--current':
              seen === 0 ? 'true' : seen - 1 === idIndexFound ? 'true' : 'false',
            '--index': idIndexFound,
            '--index-inverse': seen - idIndexFound,
            '--initial-height': '25px',
            '--lift': -1,
            '--lift-amount': 'calc(var(--lift) * var(--widget-gap))',
            '--offset': 'calc(var(--initial-height))',
            '--offset-desktop': `${
              isFirst ? '9' : widgetTop + idIndexFound * 18
              // widgetTop * (idIndexFound % 2 === 0 ? 9 : 18)
            }px`,
            '--offset-final': `calc(var(--offset)*${
              isInView || isSeen ? 'var(--index-inverse)' : 0
            }*-1)`,
            '--scale':
              seen - idIndexFound === 0 ? 1 : (95 - (seen - idIndexFound)) / 100,
            // '--visible': 'n',
            '--seen': seen,
            // '--widget-after': idIndexFound - 1 - seen * -1,
            '--visible': isInView || isSeen ? 'y' : 'n',
            '--widget-before': 1,
            '--widget-gap': 'calc(14px * idIndexFound)',
            '--widget-height': height,
            '--widget-open': `${widgetTop}px`,
            '--widget-open-action': `${widgetTopAction}px`,
            '--widget-width': width,
            // // widget general
            transform: 'var(--y)',
            transition:
              'background-color .4s,transform .4s,opacity .4s,height .4s,box-shadow .2s',
            willChange: 'transform,opacity,height',
          }}
          // data-seen={isInView}
          // // {...widgetProps}
        >
          <div
            className={cx(
              'w-full',
              // 'h-full',
              '',
              'flex scale-100 flex-col gap-[0.5rem]',
            )}
            onClick={() => {
              if (isMobile) {
                isWidgetOpenSet((isWidgetOpen) => !isWidgetOpen)
                if (!isWidgetOpen) {
                  document.body.classList.add('!overflow-hidden')
                } else {
                  document.body.classList.remove('!overflow-hidden')
                }
              }
            }}
          >
            <NextLink
              className={cx(
                !isWidgetOpen && '[pointer-events:none]',
                !isFirst && 'group-data-[visible=n]:[pointer-events:none]',
                'md:[pointer-events:auto]',
              )}
              href={'/playground/layout'}
            >
              <div
                // eslint-disable-next-line tailwindcss/no-custom-classname
                className={cx(
                  'widget-container',
                  'w-full',
                  // 'h-full',
                  'grid gap-[0.5rem] p-3',
                  // 'bg-[var(--black-a11)] backdrop-blur-md',
                  'rounded border',
                  'border-[var(--accent-10)]',
                )}
                id={id}
                ref={refElement}
              >
                <div className={cx(isDebug ? 'visible' : 'hidden', 'size-full')}>
                  <p className={cx('font-mono text-xs')}>
                    ({idIndexFound}/{count}) h: {height}; w: {width}; wt: {widgetTop}
                    ; wta: {widgetTopAction}
                    <br />
                    isWidgetOpen {isWidgetOpen ? 'y' : 'n'};isInView{' '}
                    {isInView ? 'y' : 'n'}
                    ;isSeen {isSeen ? 'y' : 'n'} (
                    {ref?.current?.getBoundingClientRect()?.top || '0'}/{scroll.y})
                  </p>
                  <Separator orientation="horizontal" size="4" />
                </div>
                {/* canHover */}
                <div
                  className={cx(
                    'relative flex w-fit items-center gap-[0.7rem]',
                    'text-sm',
                    'group',
                  )}
                  onClick={() => setLoading((l) => !l)}
                >
                  {loading ? (
                    <Skeleton className="size-full min-h-[var(--space-5)] min-w-[var(--space-5)]" />
                  ) : (
                    <IconButton radius="large" size="1">
                      <CalendarIcon className="flex size-full shrink-0 items-center justify-center p-1" />{' '}
                    </IconButton>
                  )}

                  <div
                    className={cx(
                      'flex flex-col',
                      'before:absolute before:inset-0 before:content-["_"]',
                      'place-content-center',
                    )}
                  >
                    {loading ? (
                      <Skeleton className="size-full min-h-[var(--space-5)] min-w-[var(--space-9)]" />
                    ) : (
                      <p className="text-xs font-bold no-underline group-hover:underline">
                        FRI 09/22 08PM
                      </p>
                    )}
                  </div>
                </div>
                {loading ? (
                  <>
                    <Skeleton className="size-full min-h-[1.25rem]" />
                    <Skeleton className="size-full min-h-[1.25rem]" />
                  </>
                ) : (
                  <p className="text-sm">{options?.headline}</p>
                )}
              </div>
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ModuleWidget }
