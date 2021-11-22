import { useComposedRefs } from '@radix-ui/react-compose-refs'
import { createContext } from '@radix-ui/react-context'
import { useCallbackRef } from '@radix-ui/react-use-callback-ref'
import debounce from 'lodash/debounce'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import smoothscroll from 'smoothscroll-polyfill'

import { Box } from '~styles/system/components/Box'
import { styled } from '~styles/system/stitches.config'

const [CarouselProvider, useCarouselContext] = createContext<{
  _: any
  slideListRef: React.RefObject<HTMLElement>
  onNextClick(): void
  onPrevClick(): void
  nextDisabled: boolean
  prevDisabled: boolean
}>('Carousel')

export const Carousel = (props) => {
  const ref = useRef<React.ElementRef<typeof Box>>(null)
  const { children, ...carouselProps } = props
  const slideListRef = useRef<HTMLElement>(null)
  const [_, force] = useState({})
  const [nextDisabled, setNextDisabled] = useState(false)
  const [prevDisabled, setPrevDisabled] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const navigationUpdateDelay = useRef(100)
  useEffect(() => smoothscroll.polyfill(), [])

  // @todo(ignore) Not all code paths return a value.ts(7030)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const getSlideInDirection = useCallbackRef((direction) => {
    const slides = ref.current?.querySelectorAll<HTMLElement>(
      '[data-slide-intersected]'
    )
    if (slides) {
      // Property 'values' does not exist on type 'NodeListOf<HTMLElement>'.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Array.from(slides.values()).find((slide: HTMLElement, index) => {
        const slideBefore = slides.item(index - direction)
        return (
          slide.dataset.slideIntersected === 'false' &&
          slideBefore?.dataset.slideIntersected === 'true'
        )
      })
    }
  })

  const handleNextClick = useCallback(() => {
    const nextSlide = getSlideInDirection(1)
    if (nextSlide) {
      const { scrollLeft, scrollWidth, clientWidth } = slideListRef.current
      // Property 'clientWidth' does not exist on type 'unknown'.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const itemWidth = nextSlide.clientWidth
      const nextPos = Math.floor(scrollLeft / itemWidth) * itemWidth + itemWidth * 2
      slideListRef.current.scrollTo({ left: nextPos, behavior: 'smooth' })

      // Disable previous & next buttons immediately
      setPrevDisabled(nextPos <= 0)
      setNextDisabled(scrollWidth - nextPos - clientWidth <= 0)
      // Wait for scroll animation to finish before the buttons *might* show up again
      navigationUpdateDelay.current = 500
    }
  }, [getSlideInDirection, setPrevDisabled])

  const handlePrevClick = useCallback(() => {
    const prevSlide = getSlideInDirection(-1)
    if (prevSlide) {
      const { scrollLeft, scrollWidth, clientWidth } = slideListRef.current
      // Property 'clientWidth' does not exist on type 'unknown'.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const itemWidth = prevSlide.clientWidth
      const nextPos = Math.ceil(scrollLeft / itemWidth) * itemWidth - itemWidth * 2
      slideListRef.current.scrollTo({ left: nextPos, behavior: 'smooth' })

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
          const { scrollLeft, scrollWidth, clientWidth } = slideListRef.current
          setPrevDisabled(scrollLeft <= 0)
          setNextDisabled(scrollWidth - scrollLeft - clientWidth <= 0)
          navigationUpdateDelay.current = 100
        }
      })
    }, navigationUpdateDelay.current)
  })

  // @todo(ignore) Not all code paths return a value.ts(7030)
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
      prevDisabled={prevDisabled}
      slideListRef={slideListRef}
      onNextClick={handleNextClick}
      onPrevClick={handlePrevClick}
    >
      <Box {...carouselProps} ref={ref}>
        {children}
      </Box>
    </CarouselProvider>
  )
}

export const CarouselSlideList = (props) => {
  const context = useCarouselContext('CarouselSlideList')
  const ref = useRef<React.ElementRef<typeof Box>>(null)
  const composedRefs = useComposedRefs(ref, context.slideListRef)

  return <Box {...props} ref={composedRefs} />
}

export const CarouselSlide = (props) => {
  const { as: Comp = Box, ...slideProps } = props
  const context = useCarouselContext('CarouselSlide')
  const ref = useRef<React.ElementRef<typeof Box>>(null)
  const [isIntersected, setIsIntersected] = useState(false)

  // @todo(ignore) Not all code paths return a value.ts(7030)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => setIsIntersected(entry.isIntersecting),
        {
          root: context.slideListRef.current,
          threshold: 1.0,
        }
      )
      observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [context.slideListRef])

  return <Comp {...slideProps} ref={ref} data-slide-intersected={isIntersected} />
}

export const CarouselNext = (props) => {
  const { as: Comp = 'button', ...nextProps } = props
  const context = useCarouselContext('CarouselNext')
  return (
    <Comp
      {...nextProps}
      onClick={() => context.onNextClick()}
      disabled={context.nextDisabled}
    />
  )
}

export const CarouselPrevious = (props) => {
  const { as: Comp = 'button', ...prevProps } = props
  const context = useCarouselContext('CarouselPrevious')
  return (
    <Comp
      {...prevProps}
      onClick={() => context.onPrevClick()}
      disabled={context.prevDisabled}
    />
  )
}

export const CarouselArrowButton = styled('button', {
  unset: 'all',
  outline: 0,
  margin: 0,
  border: 0,
  padding: 0,

  display: 'flex',
  position: 'relative',
  zIndex: 1,
  ai: 'center',
  jc: 'center',
  bc: '$panel',
  br: '$round',
  width: '$7',
  height: '$7',
  color: '$hiContrast',

  boxShadow: '$colors$blackA11 0px 2px 12px -5px, $colors$blackA5 0px 1px 3px',
  willChange: 'transform, box-shadow, opacity',

  transition: 'all 100ms',
  '@media (prefers-reduced-motion)': {
    transition: 'none',
  },

  '@hover': {
    '&:hover': {
      boxShadow: '$colors$blackA10 0px 3px 16px -5px, $colors$blackA5 0px 1px 3px',
      transform: 'translateY(-1px)',

      // Fix a bug when hovering at button edges would cause the button to jitter because of transform
      '&::before': {
        content: '',
        inset: -2,
        br: '$round',
        position: 'absolute',
      },
    },
  },
  '&:focus': {
    boxShadow: `
      $colors$blackA10 0px 3px 16px -5px,
      $colors$blackA5 0px 1px 3px,
      $colors$blue8 0 0 0 2px
    `,
    transform: 'translateY(-1px)',
  },
  '&:focus:not(:focus-visible)': {
    boxShadow: '$colors$blackA11 0px 2px 12px -5px, $colors$blackA5 0px 1px 3px',
  },
  '&:active:not(:focus)': {
    boxShadow: '$colors$blackA11 0px 2px 12px -5px, $colors$blackA5 0px 1px 3px',
  },
  '&:active': {
    transform: 'none',
    transition: 'opacity 100ms',
    '@media (prefers-reduced-motion)': {
      transition: 'none',
    },
  },
  '&:disabled': {
    opacity: 0,
  },
  '@media (hover: none) and (pointer: coarse)': {
    display: 'none',
  },
})
