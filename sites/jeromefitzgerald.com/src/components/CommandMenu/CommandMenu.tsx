'use client'
// import { isObjectEmpty } from '@jeromefitz/utils'
import _formatDate from 'date-fns/format'
import _parseISO from 'date-fns/parseISO'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  memo,
  // useCallback,
  useContext,
  // useEffect,
  // useMemo,
  // useRef,
  useState,
} from 'react'
// import _title from 'title'

// import { useMyStore } from '~components/Providers'
import {
  handleRouterChange,
  LinkRouterChangeContext,
} from '~context/LinkRouterChangeContext'
import { useNotion } from '~hooks/useNotion'
import { useThemeToggle } from '~hooks/useThemeToggle'
// import { GENERATE, GENERATED } from '~lib/constants'
import { CommandMenu } from '~ui/CommandMenu'
import { formatDateForSlug } from '~utils/formatDateForSlug'
import { filterForEventsInFuture } from '~utils/isEventInFuture'
// import { log } from '~utils/log'
import { sleep } from '~utils/sleep'
// const DEBUG_KEY = 'CommandMenu >> '

const isDev = process.env.NODE_ENV === 'development'

function CommandMenuWrapper() {
  const { resolvedTheme: theme, setTheme } = useTheme()
  const handleThemeToggle = useThemeToggle({ setTheme, theme })

  const router = useRouter()
  const startChange: any = useContext(LinkRouterChangeContext)

  // const ref = useRef(null)
  const [search, setSearch] = useState('')

  // const [isHoldingModifier, setIsHoldingModifier] = useState(false)
  const [pages, setPages] = useState<string[]>([])
  const page = pages[pages.length - 1]

  const TYPES = {
    EVENTS: 'events',
    PAGES: 'pages',
    PODCASTS: 'podcasts',
    ROOT: 'root',
    SHOWS: 'shows',
  }

  const TEST: any = {
    // root: GENERATED.map((item) => ({
    //   icon: '',
    //   label: item,
    //   onSelect: () => router.push(item),
    //   title: item,
    //   type: TYPES.ROOT,
    //   url: null
    // })),
    test: [
      {
        active: true,
        close: true,
        icon: '',
        label: `Homepage`,
        onSelect: () => {
          handleRouterChange('/', startChange)
          router.push('/')
        },
        subitem: false,
        title: `Title: Homepage`,
        type: TYPES.ROOT,
        url: '/',
      },
      {
        active: true,
        close: true,
        icon: '',
        label: `About`,
        onSelect: () => {
          handleRouterChange('/about', startChange)
          router.push('/about')
        },
        subitem: false,
        title: `Title: About`,
        type: TYPES.ROOT,
        url: '/about',
      },
      {
        active: true,
        close: true,
        icon: '',
        label: `Books`,
        onSelect: () => {
          handleRouterChange('/books', startChange)
          router.push('/books')
        },
        subitem: false,
        title: `Title: Books`,
        type: TYPES.ROOT,
        url: '/books',
      },
      {
        active: true,
        close: true,
        icon: '',
        label: `Music`,
        onSelect: () => {
          handleRouterChange('/music', startChange)
          router.push('/music')
        },
        subitem: false,
        title: `Title: Music`,
        type: TYPES.ROOT,
        url: '/music',
      },
      {
        active: true,
        close: false,
        icon: '',
        label: `Events`,
        onSelect: () => {
          setPages([...pages, 'events'])
          setSearch('')
        },
        subitem: false,
        title: `Title: Root Events`,
        type: TYPES.ROOT,
        url: null,
      },
      {
        active: true,
        close: false,
        icon: '',
        label: `Podcasts`,
        onSelect: () => {
          setPages([...pages, 'podcasts'])
          setSearch('')
        },
        subitem: false,
        title: `Title: Root Podcasts`,
        type: TYPES.ROOT,
        url: null,
      },
      {
        active: true,
        close: false,
        icon: '',
        label: `Shows`,
        onSelect: () => {
          setPages([...pages, 'shows'])
          setSearch('')
        },
        subitem: false,
        title: `Title: Root Show`,
        type: TYPES.ROOT,
        url: null,
      },
      // {
      //   close: false,
      //   icon: '',
      //   label: `Root`,
      //   onSelect: () => {
      //     setPages([...pages, 'root'])
      //     setSearch('')
      //   },
      //   title: `Title: Root Show`,
      //   type: TYPES.ROOT,
      // url: null
      // },
      {
        active: isDev,
        close: true,
        icon: '',
        label: `Testing`,
        onSelect: () => {
          handleRouterChange('/testing', startChange)
          router.push('/testing')
        },
        subitem: false,
        title: `Title: Testing`,
        type: TYPES.ROOT,
        url: '/testing',
      },
      {
        active: isDev,
        close: true,
        icon: '',
        label: `Playground`,
        onSelect: () => {
          handleRouterChange('/playground', startChange)
          router.push('/playground')
        },
        subitem: false,
        title: `Title: Playground`,
        type: TYPES.ROOT,
        url: '/playground',
      },
      {
        active: true,
        close: false,
        icon: '',
        label: `Toggle Theme`,
        onSelect: async () => {
          await sleep('0.1s')
          void handleThemeToggle()
          setSearch('')
        },
        subitem: false,
        title: `Title: Toggle Theme`,
        type: TYPES.ROOT,
        url: null,
      },
    ],
    // events: [],
    // podcasts: [],
    // shows: [],
  }

  // log(`${DEBUG_KEY} TEST`, TEST)
  // log(`${DEBUG_KEY} search`, search)
  // log(`${DEBUG_KEY} !search`, !search)

  const { ...showsProps } = useNotion(TYPES.SHOWS)
  if (!showsProps.isLoading) {
    // log(`${DEBUG_KEY} showsProps`, showsProps)
    // log(
    //   `${DEBUG_KEY} showsProps?.data?.items?.results`,
    //   showsProps?.data?.items?.results
    // )
    TEST.shows = showsProps?.data?.items?.results.map((item) => {
      const { slug, title } = item.properties
      const url = `/${TYPES.SHOWS}/${slug}`
      return {
        active: true,
        close: true,
        icon: '',
        label: title,
        onSelect: () => {
          handleRouterChange(url, startChange)
          router.push(url)
        },
        subitem: true,
        title: `Title: ${title}`,
        type: TYPES.ROOT,
        url,
      }
    })
    TEST.shows.push({
      active: true,
      close: true,
      icon: '',
      label: `… View All Shows`,
      onSelect: () => {
        handleRouterChange(`/${TYPES.SHOWS}`, startChange)
        router.push(`/${TYPES.SHOWS}`)
      },
      subitem: false,
      title: `… View All Shows`,
      type: TYPES.ROOT,
      url: `/${TYPES.SHOWS}`,
    })
  }
  const { ...eventsProps } = useNotion(TYPES.EVENTS)
  if (!eventsProps.isLoading) {
    // log(`${DEBUG_KEY} eventsProps`, eventsProps)
    // log(
    //   `${DEBUG_KEY} eventsProps?.data?.items?.results`,
    //   eventsProps?.data?.items?.results
    // )

    // log(`${DEBUG_KEY} EVENTS`, EVENTS)
    TEST.events = _orderBy(
      filterForEventsInFuture(eventsProps?.data?.items?.results),
      ['properties.dateEvent.start']
    ).map((item) => {
      const { dateEvent, slug, title } = item.properties

      const eventSlugInfo = formatDateForSlug(dateEvent?.start)
      const url = `/${TYPES.EVENTS}/${eventSlugInfo}/${slug}`
      const dateInfo = _formatDate(_parseISO(dateEvent?.start), 'EEEE, MMMM do')
      const t = `${title} (${dateInfo})`

      return {
        active: true,
        close: true,
        icon: '',
        label: t,
        onSelect: () => {
          handleRouterChange(url, startChange)
          router.push(url)
        },
        subitem: true,
        title: `Title: ${t}`,
        type: TYPES.ROOT,
        url,
      }
    })
    TEST.events.push({
      active: true,
      close: true,
      icon: '',
      label: `… View All Events`,
      onSelect: () => {
        handleRouterChange(`/${TYPES.EVENTS}`, startChange)
        router.push(`/${TYPES.EVENTS}`)
      },
      subitem: false,
      title: `… View All Events`,
      type: TYPES.ROOT,
      url: `/${TYPES.EVENTS}`,
    })
  }
  const { ...podcastsProps } = useNotion(TYPES.PODCASTS)
  if (!podcastsProps.isLoading) {
    // log(`${DEBUG_KEY} podcastsProps`, podcastsProps)
    // log(
    //   `${DEBUG_KEY} podcastsProps?.data?.items?.results`,
    //   podcastsProps?.data?.items?.results
    // )
    TEST.podcasts = podcastsProps?.data?.items?.results.map((item) => {
      const { slug, title } = item.properties
      const url = `/${TYPES.PODCASTS}/${slug}`
      // log(`url`, url)
      return {
        active: true,
        close: true,
        icon: '',
        label: title,
        onSelect: () => {
          handleRouterChange(url, startChange)
          router.push(url)
        },
        subitem: true,
        title: `Title: ${title}`,
        type: TYPES.ROOT,
        url,
      }
    })
    TEST.podcasts.push({
      active: true,
      close: true,
      icon: '',
      label: `… View All Podcasts`,
      onSelect: () => {
        handleRouterChange(`/${TYPES.PODCASTS}`, startChange)
        router.push(`/${TYPES.PODCASTS}`)
      },
      subitem: false,
      title: `… View All Podcasts`,
      type: TYPES.ROOT,
      url: `/${TYPES.PODCASTS}`,
    })
  }
  // const [loading, setLoading] = useState(false)
  // const [items, setItems] = useState([])
  // useEffect(() => {
  //   async function getItems() {
  //     setLoading(true)
  //     const res = await fetch('http://localhost:3000/api/v1/cms/shows')
  //     setItems(res.json())
  //     setLoading(false)
  //   }

  //   getItems()
  // }, [])
  // log(`${DEBUG_KEY} items`, items)

  /**
   * @note(cmdk) toggle Modifier
   */
  // useEffect(() => {
  //   const keyDown = (e: KeyboardEvent) => {
  //     if (e.key === 'Control') {
  //       setIsHoldingModifier(true)
  //     }
  //   }

  //   const keyUp = (e: KeyboardEvent) => {
  //     if (e.key === 'Control') {
  //       setIsHoldingModifier(false)
  //     }
  //   }

  //   document.addEventListener('keydown', keyDown)
  //   document.addEventListener('keyup', keyUp)
  //   return () => {
  //     document.removeEventListener('keydown', keyDown)
  //     document.removeEventListener('keyup', keyUp)
  //   }
  // }, [search])

  const subItems = [
    ..._filter(TEST['events'], (item) => item.subitem),
    ..._filter(TEST['shows'], (item) => item.subitem),
    ..._filter(TEST['podcasts'], (item) => item.subitem),
  ]

  // log(`subItems`, subItems)

  return (
    <CommandMenu
      items={!page ? TEST.test : TEST[page]}
      pages={pages}
      search={search}
      setPages={setPages}
      setSearch={setSearch}
      subItems={subItems}
    />
  )
}

const CM = memo(CommandMenuWrapper)
export { CM as CommandMenu }
// export { CommandMenuWrapper as CommandMenu }
