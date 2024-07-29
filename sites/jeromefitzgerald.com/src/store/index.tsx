'use client'
import {
  BookOpenIcon,
  // DesktopIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  IdCardIcon,
  // InfoCircledIcon,
  ListBulletIcon,
  // MagnifyingGlassIcon,
  MicrophoneIcon,
  // MoonIcon,
  MusicalNoteIcon,
  // Pencil2Icon,
  Share1Icon,
  StarIcon,
  // SunIcon,
  TicketIcon,
} from '@jeromefitz/ds/components/Icon/index'

import type { ReactNode } from 'react'
import type { StoreApi } from 'zustand'

import { createContext, useContext, useRef } from 'react'
import { useStore as useZustandStore } from 'zustand'
// import { persist } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const Context = createContext<any | null>(null)

interface ProviderProps {
  children: ReactNode
}
const Provider = ({ children }: ProviderProps) => {
  const storeRef = useRef<StoreApi<any>>()
  if (!storeRef.current) {
    storeRef.current = initializeStoreMenu()
  }
  return <Context.Provider value={storeRef.current}>{children}</Context.Provider>
}

const useStore = <T,>(selector: (state: any) => T): T => {
  const store = useContext(Context)
  if (!store) throw new Error('Store is missing the provider')
  return useZustandStore(store, selector)
}

const getDefaultInitialStateStoreMenu = () => ({
  bookStatus: 'in-progress',
  bookStatusSet: () => {},
  cmdkInput: '',
  cmdkInputSet: () => {},
  cmdkPages: [],
  cmdkPagesSet: () => {},
  cmdkPagesSetRemove: () => {},
  count: 0,
  countSet: () => {},
  current: 0,
  currentSet: () => {},
  isCmdkInnerOpen: false,
  isCmdkInnerOpenSet: () => {},
  isCmdkOpen: false,
  isCmdkOpenSet: () => {},
  isMenuMobileOpen: false,
  isMenuMobileOpenSet: () => {},
  isOverlay: false,
  isOverlaySet: () => {},
  isRouteChanging: false,
  isRouteChangingSet: () => {},
  isWidgetOpen: false,
  isWidgetOpenSet: () => {},
  seen: 0,
  seenSetDecrease: () => {},
  seenSetIncrease: () => {},
  // @note(zustand) no persist state due to SSR
  spotifyTimeRange: 'medium_term',
  spotifyTimeRangeSet: () => {},
  spotifyType: 'top-tracks',
  spotifyTypeSet: () => {},
  // @wip(menu)
  zzz_menuSecondary: [
    {
      hasSubNavigation: true,
      href: '/currently/listening-to',
      icon: Share1Icon,
      id: 'currently',
      isActive: true,
      isActiveMobile: true,
      title: 'Currently…',
    },
    {
      hasSubNavigation: true,
      href: '/events',
      icon: TicketIcon,
      id: 'events',
      isActive: true,
      isActiveMobile: true,
      title: 'Events',
    },
    {
      hasSubNavigation: true,
      href: '/podcasts',
      icon: MicrophoneIcon,
      id: 'podcasts',
      isActive: true,
      isActiveMobile: true,
      title: 'Podcasts',
    },
    {
      hasSubNavigation: true,
      href: '/shows',
      icon: StarIcon,
      id: 'shows',
      isActive: true,
      isActiveMobile: true,
      title: 'Shows',
    },
    {
      hasSubNavigation: false,
      href: null,
      id: 'sep',
      isActive: true,
      isActiveMobile: true,
      title: 'SEP',
    },
    {
      hasSubNavigation: false,
      href: '/about',
      icon: IdCardIcon,
      id: 'about',
      isActive: true,
      isActiveMobile: true,
      title: 'About',
    },
    {
      hasSubNavigation: false,
      href: '/',
      icon: HomeIcon,
      id: 'home',
      isActive: true,
      isActiveMobile: true,
      title: 'Home',
    },
    {
      hasSubNavigation: false,
      href: '/about#contact',
      icon: EnvelopeOpenIcon,
      id: 'contact',
      isActive: true,
      isActiveMobile: true,
      title: 'Contact',
    },
  ],
  zzz_menuSecondaryActive: { id: 'home', title: 'Home' },
  zzz_menuTertiary: {
    currently: [
      {
        href: '/currently',
        icon: null,
        id: 'all',
        isActive: false,
        isActiveMobile: false,
        title: 'All',
        titleDescription: null,
      },
      {
        href: '/currently/cooking',
        icon: null,
        id: 'cooking',
        isActive: false,
        isActiveMobile: false,
        title: 'Cooking…',
        titleDescription: 'Currently Cooking… ',
      },
      {
        href: '/currently/listening-to',
        icon: MusicalNoteIcon,
        id: 'listening-to',
        isActive: true,
        isActiveMobile: true,
        title: 'Listening to…',
        titleDescription: 'Currently Listening to… ',
      },
      {
        href: '/currently/reading',
        icon: BookOpenIcon,
        id: 'reading',
        isActive: true,
        isActiveMobile: true,
        title: 'Reading…',
        titleDescription: 'Currently Reading… ',
      },
    ],
    events: [
      {
        href: '/events',
        icon: ListBulletIcon,
        id: 'all',
        isActive: true,
        isActiveMobile: true,
        title: '… All Events',
        titleDescription: 'Including recent past events.',
      },
      {
        href: '/events/2024/08/09/barbara-a-mother-comedy-bingo',
        icon: TicketIcon,
        id: '2024/08/09/barbara-a-mother-comedy-bingo',
        isActive: true,
        isActiveMobile: true,
        keywords: ['barbara', 'mother', 'comedy', 'bingo'],
        title: 'Comedy Bingo: FRI 08/09',
        titleDescription: '',
      },
      {
        href: '/events/2024/08/17/doomscroll',
        icon: TicketIcon,
        id: '2024/08/17/doomscroll',
        isActive: true,
        isActiveMobile: true,
        keywords: ['doom', 'scroll', 'improv'],
        title: 'Doomscroll: SAT 08/17',
        titleDescription: '',
      },
    ],
    podcasts: [
      {
        href: '/podcasts',
        icon: ListBulletIcon,
        id: 'all',
        isActive: true,
        isActiveMobile: true,
        title: '… All Podcasts',
        titleDescription: 'These two he helps host, these he guests or is retired.',
      },
      {
        href: '/podcasts/jer-and-ky-and-guest',
        icon: MicrophoneIcon,
        id: '/podcasts/jer-and-ky-and-guest',
        isActive: true,
        isActiveMobile: true,
        keywords: [
          'jerky',
          'jer',
          'ky',
          'guest',
          'mailshrimp',
          'wild',
          'fuck',
          'podcast',
        ],
        title: 'Jer & Ky & Guest',
        titleDescription: '...',
      },
      {
        href: '/podcasts/knockoffs',
        icon: MicrophoneIcon,
        id: '/podcasts/knockoffs',
        isActive: true,
        isActiveMobile: true,
        keywords: ['knockoffs', 'alex', 'ky', 'podcast'],
        title: 'Knockoffs',
        titleDescription: '...',
      },
    ],
    shows: [
      {
        href: '/shows',
        icon: ListBulletIcon,
        id: 'all',
        isActive: true,
        isActiveMobile: false,
        keywords: ['all', 'shows'],
        title: '… All Shows',
        titleDescription: 'If you can believe, there are more.',
      },
      {
        href: '/shows/alex-o-jerome',
        icon: StarIcon,
        id: 'alex-o-jerome',
        isActive: true,
        isActiveMobile: true,
        keywords: ['alex', 'jerome', 'aoj'],
        title: 'Alex O’Jerome',
        titleDescription: 'Chicago to Pittsburgh Connection. Dem Vomit Twinz.',
      },
      {
        href: '/shows/boo-humbag',
        icon: StarIcon,
        id: 'boo-humbag',
        isActive: true,
        isActiveMobile: true,
        keywords: ['boo', 'humbag', 'musical'],
        title: 'Boo Humbag: The Musical',
        titleDescription:
          'The most celebrated morality tale of all-time was transformed by into a hilarious send-up complete with original song and dance numbers. Gold, Toe Nails, & A Christmas Miracle',
      },
      {
        href: '/shows/bubble-boy-the-musical',
        icon: StarIcon,
        id: 'bubble-boy-the-musical',
        isActive: true,
        isActiveMobile: true,
        keywords: ['bubble', 'boy', 'musical'],
        title: 'Bubble Boy: The Musical',
        titleDescription: 'A musical ahead of its time by Cinco Paul',
      },
      {
        href: '/shows/jer-and-ky',
        icon: StarIcon,
        id: '/shows/jer-and-ky',
        isActive: true,
        isActiveMobile: true,
        keywords: ['jer', '&', 'ky', 'mailshrimp'],
        title: 'The Jer & Ky BoyZ',
        titleDescription:
          'Special Comedy Guests, Special Musical Guests, Special Overall Hi-Jinks',
      },
      {
        href: '/shows/jerome-and',
        icon: StarIcon,
        id: '/shows/jerome-and',
        isActive: true,
        isActiveMobile: true,
        keywords: ['jerome', '&', 'and'],
        title: 'Jerome &',
        titleDescription:
          'Special Comedy Guests, Special Musical Guests, Special Overall Hi-Jinks',
      },
      {
        href: '/shows/jfle',
        icon: StarIcon,
        id: '/shows/jfle',
        isActive: true,
        isActiveMobile: true,
        keywords: ['jfle', 'jesse', 'jerome'],
        title: 'JFLE (Jerome & Jesse LE)',
        titleDescription: 'Delightful absurdity with dark whimsy and musical skill',
      },
      {
        href: '/shows/jfle-take-broadway',
        icon: StarIcon,
        id: '/shows/jfle-take-broadway',
        isActive: true,
        isActiveMobile: true,
        keywords: ['jfle', 'jesse', 'jerome', 'broadway'],
        title: 'JFLE: Take Broadway',
        titleDescription:
          'Cats become Lion Kings in this send up of past, current, & future Broadway',
      },
      {
        href: '/shows/jfle-grand-finale',
        icon: StarIcon,
        id: '/shows/jfle-grand-finale',
        isActive: false,
        isActiveMobile: false,
        keywords: ['jfle', 'jesse', 'jerome', 'grand', 'finale'],
        title: 'JFLE: Grand Finale',
        titleDescription:
          'The two night sell out extravangza with special guests P-Si & G-Funk (Paul Simon & Art Garfunkel)',
      },
      {
        href: '/shows/justin-and-jerome-experience',
        icon: StarIcon,
        id: '/shows/justin-and-jerome-experience',
        isActive: true,
        isActiveMobile: true,
        keywords: ['jje', 'justin', 'jerome', 'experience'],
        title: 'Justin & Jerome Experience',
        titleDescription: 'Acclaimed improv and heralded sketch (on-and-off stage)',
      },
      {
        href: '/shows/my-dinner-with-andre-the-musical',
        icon: StarIcon,
        id: '/shows/my-dinner-with-andre-the-musical',
        isActive: true,
        isActiveMobile: true,
        keywords: ['jje', 'justin', 'jerome', 'experience', 'andre', 'dinner'],
        title: 'My Dinner With André: The Musical',
        titleDescription:
          'The cult classic gets the Justin & Jerome Experience treatment.',
      },
      {
        href: '/shows/the-death-show',
        icon: StarIcon,
        id: '/shows/the-death-show',
        isActive: true,
        isActiveMobile: true,
        keywords: ['death', 'show'],
        title: 'The Death Show',
        titleDescription:
          'The longest running death themed improv show in Pittsburgh.',
      },
      {
        href: '/shows/warp-zone',
        icon: StarIcon,
        id: '/shows/warp-zone',
        isActive: true,
        isActiveMobile: true,
        keywords: ['warp', 'zone'],
        title: 'Warp Zone',
        titleDescription: 'Arcade Comedy Theater’s Premier House Team',
      },
    ],
  },
  zzz_menuTertiaryActive: {
    id: null,
    isActive: false,
    isActiveMobile: true,
    title: null,
  },
})

const initializeStoreMenu = (preloadedState: Partial<any> = {}) => {
  return createStore<any>((set, get) => ({
    ...getDefaultInitialStateStoreMenu(),
    ...preloadedState,
    bookStatusSet: (status) => {
      set({
        bookStatus: status,
      })
    },
    cmdkInputSet: (search) => {
      set({
        cmdkInput: search,
      })
    },
    cmdkPagesSet: (page) => {
      set({
        cmdkPages: [...get().cmdkPages, page],
      })
    },
    cmdkPagesSetRemove: () => {
      set({
        cmdkPages: get().cmdkPages.slice(0, -1),
      })
    },
    isCmdkInnerOpenSet: () => {
      set({
        isCmdkInnerOpen: !get().isCmdkInnerOpen,
      })
    },
    isCmdkOpenSet: () => {
      set({
        isCmdkInnerOpen: !get().isCmdkInnerOpen,
      })
      get().isCmdkOpen
        ? setTimeout(() => {
            // console.dir(`ok`)
            set({
              cmdkInput: '',
              cmdkPages: get().cmdkPages.slice(0, -1),
              isCmdkInnerOpen: false,
              isCmdkOpen: !get().isCmdkOpen,
            })
          }, 250)
        : set({
            isCmdkOpen: !get().isCmdkOpen,
          })
    },
    isMenuMobileOpenSet: () => {
      set({
        isMenuMobileOpen: !get().isMenuMobileOpen,
      })
    },
    isOverlaySet: () => {
      set({
        isOverlay: !get().isOverlay,
      })
    },
    isRouteChangingSet: (val: boolean) => {
      set({
        isRouteChanging: val,
      })
    },
    spotifyTimeRangeSet: (time_range) => {
      set({
        spotifyTimeRange: time_range,
      })
    },
    spotifyTypeSet: (type) => {
      set({
        spotifyType: type,
      })
    },
    zzz_menuSecondaryActiveSet: (item) => {
      const hasTertiary = !!get().zzz_menuTertiary[item.id]
      const menuTertiaryItemsActive = get().zzz_menuTertiary[item.id]?.filter(
        (i: { isActive: boolean; isActiveMobile: boolean }) =>
          i.isActive || i.isActiveMobile,
      )

      set({
        zzz_menuSecondaryActive: item,
        zzz_menuTertiaryActive: hasTertiary
          ? menuTertiaryItemsActive[0]
          : { icon: null, id: null, isActive: false, title: null },
      })
    },
    zzz_menuTertiaryActiveSet: (item) => {
      set({
        zzz_menuTertiaryActive: item,
      })
    },
  }))
}

export { initializeStoreMenu, Provider, useStore }
