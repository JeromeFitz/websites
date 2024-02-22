import {
  BookOpenIcon,
  DesktopIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  ListBulletIcon,
  // MagnifyingGlassIcon,
  MicrophoneIcon,
  MoonIcon,
  MusicalNoteIcon,
  Pencil2Icon,
  StarIcon,
  SunIcon,
  TicketIcon,
} from '@jeromefitz/ds/components/Icon/index'

import type { ReactNode } from 'react'

const isDev = process.env.NODE_ENV === 'development'

interface Item {
  group: string
  href: string
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  icon?: ReactNode | any
  id: string
  isActive: boolean
  isActiveMobileOverride: boolean
  isParent: boolean
  isParentIconVisible?: boolean
  title: string
  titleDescription: string
}
type Items = Omit<Item, 'group' | 'isParent'>
interface NavigationMenuItems extends Omit<Item, 'titleDescription'> {
  items: Items[]
}

const menus: NavigationMenuItems[] = [
  {
    group: 'navigation-menu',
    href: '/',
    icon: HomeIcon,
    id: '/homepage',
    isActive: true,
    isActiveMobileOverride: false,
    isParent: false,
    isParentIconVisible: true,
    items: [],
    title: 'Home',
  },
  {
    group: 'events',
    href: '/events',
    icon: TicketIcon,
    id: 'upcoming-events',
    isActive: true,
    isActiveMobileOverride: true,
    isParent: true,
    items: [
      {
        href: '/events',
        id: 'upcoming-events',
        isActive: false,
        isActiveMobileOverride: false,
        title: 'Upcoming Events',
        titleDescription: 'Jerome is cooking something up at the moment.',
      },
      {
        href: '/events',
        icon: ListBulletIcon,
        id: 'all-events',
        isActive: true,
        isActiveMobileOverride: true,
        title: '… All Events',
        titleDescription: 'Including recent past events.',
      },
    ],
    title: 'Upcoming Events',
  },
  {
    group: 'shows',
    href: '/shows',
    icon: StarIcon,
    id: 'shows',
    isActive: true,
    isActiveMobileOverride: true,
    isParent: true,
    items: [
      {
        href: '/shows/alex-o-jerome',
        id: '/shows/alex-o-jerome',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Alex O’Jerome',
        titleDescription: 'Chicago to Pittsburgh Connection. Dem Vomit Twinz.',
      },
      {
        href: '/shows/bubble-boy-the-musical',
        id: '/shows/bubble-boy-the-musical',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Bubble Boy: The Musical',
        titleDescription: 'A musical ahead of its time by Cinco Paul',
      },
      {
        href: '/shows/jerome-and',
        id: '/shows/jerome-and',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Jerome &',
        titleDescription:
          'Special Comedy Guests, Special Musical Guests, Special Overall Hi-Jinks',
      },
      {
        href: '/shows/jfle',
        id: '/shows/jfle',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'JFLE (Jerome & Jesse LE)',
        titleDescription: 'Delightful absurdity with dark whimsy and musical skill',
      },
      {
        href: '/shows/justin-and-jerome-experience',
        id: '/shows/justin-and-jerome-experience',
        isActive: false,
        isActiveMobileOverride: true,
        title: 'Justin & Jerome Experience',
        titleDescription: 'Acclaimed improv and heralded sketch (on-and-off stage)',
      },
      {
        href: '/shows/my-dinner-with-andre-the-musical',
        id: '/shows/my-dinner-with-andre-the-musical',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'My Dinner With André: The Musical',
        titleDescription:
          'The cult classic gets the Justin & Jerome Experience treatment.',
      },
      {
        href: '/shows/the-death-show',
        id: '/shows/the-death-show',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'The Death Show',
        titleDescription:
          'The longest running death themed improv show in Pittsburgh.',
      },
      {
        href: '/shows',
        icon: ListBulletIcon,
        id: 'all-shows',
        isActive: true,
        isActiveMobileOverride: true,
        title: '… All Shows',
        titleDescription: 'If you can believe, there are more.',
      },
    ],
    title: 'Shows',
  },
  {
    group: 'podcasts',
    href: '/podcasts',
    icon: MicrophoneIcon,
    id: 'podcasts',
    isActive: false,
    isActiveMobileOverride: true,
    isParent: true,
    items: [
      {
        href: '/podcasts/jer-and-ky-and-guest',
        id: '/podcasts/jer-and-ky-and-guest',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Jer & Ky & Guest',
        titleDescription: '...',
      },
      {
        href: '/podcasts/knockoffs',
        id: '/podcasts/knockoffs',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Knockoffs',
        titleDescription: '...',
      },
      {
        href: '/podcasts',
        icon: ListBulletIcon,
        id: 'all-podcasts',
        isActive: true,
        isActiveMobileOverride: true,
        title: '… All Podcasts',
        titleDescription: 'These two he helps host, these he guests or is retired.',
      },
    ],
    title: 'Podcasts',
  },
  {
    group: 'pages',
    href: '/',
    id: 'pages',
    isActive: true,
    isActiveMobileOverride: true,
    isParent: true,
    items: [
      {
        href: '/about',
        icon: IdCardIcon,
        id: '/about',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'About',
        titleDescription: 'Yea. Who is he?',
      },
      {
        href: '/books',
        icon: BookOpenIcon,
        id: '/books',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Books',
        titleDescription: 'Currently Reading… ',
      },
      {
        href: '/colophon',
        icon: InfoCircledIcon,
        id: '/colophon',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Colophon',
        titleDescription: 'How was this built?',
      },
      {
        href: '/contact',
        icon: EnvelopeOpenIcon,
        id: '/contact',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Contact',
        titleDescription: 'IDK. Sure why not',
      },
      {
        href: '/music',
        icon: MusicalNoteIcon,
        id: '/music',
        isActive: true,
        isActiveMobileOverride: true,
        title: 'Music',
        titleDescription: 'Currently Listening to… ',
      },
      {
        href: '/podcasts',
        icon: MicrophoneIcon,
        id: '/podcasts',
        isActive: true,
        isActiveMobileOverride: false,
        title: 'Podcasts',
        titleDescription: 'Host & Features “galore”',
      },
    ],
    title: '… More',
  },
  {
    group: 'navigation-menu',
    href: '/contact',
    icon: EnvelopeOpenIcon,
    id: '/contact',
    isActive: false,
    isActiveMobileOverride: false,
    isParent: false,
    items: [],
    title: 'Contact',
  },
  {
    group: 'navigation-menu',
    href: '/playground/2024',
    icon: Pencil2Icon,
    id: '/playground/2024',
    isActive: isDev,
    isActiveMobileOverride: false,
    isParent: false,
    items: [],
    title: 'Playground',
  },
  {
    group: 'general',
    href: '/theme',
    icon: DesktopIcon,
    id: 'theme',
    isActive: false,
    isActiveMobileOverride: false,
    isParent: true,
    items: [
      {
        href: 'dark',
        icon: MoonIcon,
        id: '/theme/dark',
        isActive: true,
        isActiveMobileOverride: false,
        title: 'Change Theme to Dark Mode',
        titleDescription: '...',
      },
      {
        href: 'light',
        icon: SunIcon,
        id: '/theme/light',
        isActive: true,
        isActiveMobileOverride: false,
        title: 'Change Theme to Light Mode',
        titleDescription: '...',
      },
    ],
    title: 'Change Theme…',
  },
]

export { menus }
