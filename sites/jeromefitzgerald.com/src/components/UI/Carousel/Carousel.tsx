'use client'
/**
 * @hack more blatant fork'ing from `radix-ui` this time from:
 * @ref  https://github.com/radix-ui/website
 *
 */
import { cx } from '@jeromefitz/ds/utils/cx'

import type { RefObject } from 'react'

import { composeEventHandlers } from '@radix-ui/primitive'
import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { createContext } from '@radix-ui/react-context'
import { useCallbackRef } from '@radix-ui/react-use-callback-ref'
import { Button } from '@radix-ui/themes'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useRef, useState } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

// import { log } from '~utils/log'

const [CarouselProvider, useCarouselContext] = createContext<{
  _: any
  nextDisabled: boolean
  onNextClick(): void
  onPrevClick(): void
  prevDisabled: boolean
  slideListRef: RefObject<HTMLElement>
}>('Carousel')

const Carousel = ({ children, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const ref = useRef<HTMLElement | any | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const slideListRef = useRef<HTMLElement | any | null>(null)
  const [_, force] = useState({})
  const [nextDisabled, setNextDisabled] = useState(false)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const navigationUpdateDelay = useRef(100)
  useEffect(() => smoothscroll.polyfill(), [])

  const getSlideInDirection = useCallbackRef((direction: -1 | 1) => {
    // Property 'querySelectorAll' does not exist on type 'never
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const slides = ref.current?.querySelectorAll<HTMLElement>(
      '[data-slide-intersection-ratio]',
    )
    if (slides) {
      const slidesArray = Array.from(slides.values())

      if (direction === 1) {
        slidesArray.reverse()
      }

      return slidesArray.find(
        (slide: any) => slide.dataset.slideIntersectionRatio !== '0',
      )
    }

    return
  })

  const handleNextClick = useCallback(() => {
    const nextSlide: any = getSlideInDirection(1)

    if (nextSlide) {
      const { clientWidth, scrollLeft, scrollWidth } = slideListRef.current
      const itemWidth = nextSlide.clientWidth
      const itemsToScroll =
        itemWidth * 2.5 < document.documentElement.offsetWidth ? 2 : 1
      const nextPos =
        Math.floor(scrollLeft / itemWidth) * itemWidth + itemWidth * itemsToScroll
      slideListRef.current.scrollTo({ behavior: 'smooth', left: nextPos })

      // Disable previous & next buttons immediately
      setPrevDisabled(nextPos <= 0)
      setNextDisabled(scrollWidth - nextPos - clientWidth <= 0)
      // Wait for scroll animation to finish before the buttons *might* show up again
      navigationUpdateDelay.current = 500
    }
  }, [getSlideInDirection, setPrevDisabled])

  const handlePrevClick = useCallback(() => {
    const prevSlide: any = getSlideInDirection(-1)
    if (prevSlide) {
      const { clientWidth, scrollLeft, scrollWidth } = slideListRef.current
      const itemWidth = prevSlide.clientWidth
      const itemsToScroll =
        itemWidth * 2.5 < document.documentElement.offsetWidth ? 2 : 1
      const nextPos =
        Math.ceil(scrollLeft / itemWidth) * itemWidth - itemWidth * itemsToScroll
      slideListRef.current.scrollTo({ behavior: 'smooth', left: nextPos })

      // Disable previous & next buttons immediately
      setPrevDisabled(nextPos <= 0)
      setNextDisabled(scrollWidth - nextPos - clientWidth <= 0)
      // Wait for scroll animation to finish before the buttons *might* show up again
      navigationUpdateDelay.current = 500
    }
  }, [getSlideInDirection, setPrevDisabled])

  useEffect(() => {
    // Keep checking for whether we need to disable the navigation buttons, debounced
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => {
        if (slideListRef.current) {
          const { clientWidth, scrollLeft, scrollWidth } = slideListRef.current
          setPrevDisabled(scrollLeft <= 0)
          setNextDisabled(scrollWidth - scrollLeft - clientWidth <= 0)
          navigationUpdateDelay.current = 100
        }
      })
    }, navigationUpdateDelay.current)
  })

  // Not all code returns a value
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    const slidesList = slideListRef.current
    if (slidesList) {
      const handleScrollStartAndEnd = debounce(() => force({}), 100, {
        leading: true,
        trailing: true,
      })
      slidesList.addEventListener('scroll', handleScrollStartAndEnd)
      window.addEventListener('resize', handleScrollStartAndEnd)
      force({})
      return () => {
        slidesList.removeEventListener('scroll', handleScrollStartAndEnd)
        window.removeEventListener('resize', handleScrollStartAndEnd)
      }
    }
  }, [slideListRef])

  return (
    <CarouselProvider
      _={_}
      nextDisabled={nextDisabled}
      onNextClick={handleNextClick}
      onPrevClick={handlePrevClick}
      prevDisabled={prevDisabled}
      slideListRef={slideListRef}
    >
      <div {...props} ref={ref}>
        {children}
      </div>
    </CarouselProvider>
  )
}

const CarouselSlideList = ({ ...props }) => {
  const context = useCarouselContext('CarouselSlideList')
  const ref = useRef<any>(null)
  const composedRefs = useComposedRefs(ref, context.slideListRef)
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [dragStart, setDragStart] = useState<any | null>(null)

  const handleMouseMove = useCallbackRef((event) => {
    if (ref.current) {
      const distanceX = event.clientX - dragStart.pointerX
      ref.current.scrollLeft = dragStart.scrollX - distanceX
    }
  })

  const handleMouseUp = useCallbackRef(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    setDragStart(null)
  })

  return (
    <div
      {...props}
      data-state={dragStart ? 'dragging' : undefined}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onMouseDownCapture={composeEventHandlers(
        props.onMouseDownCapture,
        (event: MouseEvent) => {
          // Drag only if main mouse button was clicked
          if (event.button === 0) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            setDragStart({
              pointerX: event.clientX,
              scrollX: (event.currentTarget as HTMLElement).scrollLeft,
            })
          }
        },
      )}
      /**
       * @todo(types)
       * '... '=> void' is not assignable to type
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onPointerDown={composeEventHandlers(
        props.onPointerDown,
        (event: PointerEvent) => {
          const element = event.target as HTMLElement
          element.style.userSelect = 'none'
          element.setPointerCapture(event.pointerId)
        },
      )}
      /**
       * @todo(types)
       * '... '=> void' is not assignable to type
       */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onPointerUp={composeEventHandlers(props.onPointerUp, (event: PointerEvent) => {
        const element = event.target as HTMLElement
        element.style.userSelect = ''
        element.releasePointerCapture(event.pointerId)
      })}
      /**
       * @todo(types)
       * '... '=> void' is not assignable to type
       */
      // className=""
      ref={composedRefs}
    />
  )
}

const CarouselSlide = ({ className = '', ...props }) => {
  const context = useCarouselContext('CarouselSlide')
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const ref = useRef<HTMLElement | any | null>(null)
  const [intersectionRatio, setIntersectionRatio] = useState(0)
  const isDraggingRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersectionRatio(entry.intersectionRatio),
      { root: context.slideListRef.current, threshold: [0, 0.5, 1] },
    )
    observer?.observe(ref.current)
    return () => observer?.disconnect()
  }, [context.slideListRef])

  return (
    <div
      {...props}
      className={cx(className, 'box-border')}
      data-slide-intersection-ratio={intersectionRatio}
      onClick={(event) => {
        if (isDraggingRef.current) {
          event.preventDefault()
        }
      }}
      onDragStart={(event) => {
        event.preventDefault()
        isDraggingRef.current = true
      }}
      ref={ref}
    />
  )
}

const CarouselNext = ({ className = '', ...props }) => {
  const context = useCarouselContext('CarouselNext')
  // log(`CarouselNext >> props`, props)
  // log(`CarouselNext >> context`, context)
  return (
    <Button
      {...props}
      // asChild
      className={cx(
        className,
        'hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-10',
      )}
      disabled={context.nextDisabled}
      onClick={() => context.onNextClick()}
      radius="medium"
      tabIndex={-1}
      variant="outline"
    />
  )
}

const CarouselPrevious = ({ className = '', ...props }) => {
  const context = useCarouselContext('CarouselPrevious')
  return (
    <Button
      {...props}
      // asChild
      className={cx(
        className,
        'hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-10',
      )}
      disabled={context.prevDisabled}
      onClick={() => context.onPrevClick()}
      radius="medium"
      tabIndex={-1}
      variant="outline"
    />
  )
}

export { Carousel, CarouselNext, CarouselPrevious, CarouselSlide, CarouselSlideList }
