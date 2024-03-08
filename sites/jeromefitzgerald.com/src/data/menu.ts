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
  keywords?: string[]
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
        title: 'Events',
        titleDescription: 'Jerome is cooking something up at the moment.',
      },
      {
        href: '/events/2024/03/22/sketch-madness',
        id: '/events/2024/03/22/sketch-madness',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['sketch', 'madness', 'march'],
        title: 'Sketch Madness: FRI 03/22',
        titleDescription:
          'Coming this March to the city of champions, “Sketch Madness,” a new sketch comedy show from the writers and producers of the sold-out triumph “Revue This!”',
      },
      {
        href: '/events/2024/03/23/sketch-madness',
        id: '/events/2024/03/23/sketch-madness',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['sketch', 'madness', 'march'],
        title: 'Sketch Madness: SAT 03/23',
        titleDescription:
          'Coming this March to the city of champions, “Sketch Madness,” a new sketch comedy show from the writers and producers of the sold-out triumph “Revue This!”',
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
    title: 'Events',
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
        keywords: ['alex', 'jerome', 'aoj'],
        title: 'Alex O’Jerome',
        titleDescription: 'Chicago to Pittsburgh Connection. Dem Vomit Twinz.',
      },
      {
        href: '/shows/boo-humbag-the-musical',
        id: '/shows/boo-humbag-the-musical',
        isActive: false,
        isActiveMobileOverride: true,
        keywords: ['boo', 'humbag', 'musical'],
        title: 'Boo Humbag: The Musical',
        titleDescription:
          'The most celebrated morality tale of all-time was transformed by into a hilarious send-up complete with original song and dance numbers. Gold, Toe Nails, & A Christmas Miracle',
      },
      {
        href: '/shows/bubble-boy-the-musical',
        id: '/shows/bubble-boy-the-musical',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['bubble', 'boy', 'musical'],
        title: 'Bubble Boy: The Musical',
        titleDescription: 'A musical ahead of its time by Cinco Paul',
      },
      {
        href: '/shows/jerome-and',
        id: '/shows/jerome-and',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['jerome', '&', 'and'],
        title: 'Jerome &',
        titleDescription:
          'Special Comedy Guests, Special Musical Guests, Special Overall Hi-Jinks',
      },
      {
        href: '/shows/jfle',
        id: '/shows/jfle',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['jfle', 'jesse', 'jerome'],
        title: 'JFLE (Jerome & Jesse LE)',
        titleDescription: 'Delightful absurdity with dark whimsy and musical skill',
      },
      {
        href: '/shows/jfle-take-broadway',
        id: '/shows/jfle-take-broadway',
        isActive: false,
        isActiveMobileOverride: true,
        keywords: ['jfle', 'jesse', 'jerome', 'broadway'],
        title: 'JFLE: Take Broadway',
        titleDescription:
          'Cats become Lion Kings in this send up of past, current, & future Broadway',
      },
      {
        href: '/shows/jfle-grand-finale',
        id: '/shows/jfle-grand-finale',
        isActive: false,
        isActiveMobileOverride: false,
        keywords: ['jfle', 'jesse', 'jerome', 'grand', 'finale'],
        title: 'JFLE: Grand Finale',
        titleDescription:
          'The two night sell out extravangza with special guests P-Si & G-Funk (Paul Simon & Art Garfunkel)',
      },
      {
        href: '/shows/justin-and-jerome-experience',
        id: '/shows/justin-and-jerome-experience',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['jje', 'justin', 'jerome', 'experience'],
        title: 'Justin & Jerome Experience',
        titleDescription: 'Acclaimed improv and heralded sketch (on-and-off stage)',
      },
      {
        href: '/shows/my-dinner-with-andre-the-musical',
        id: '/shows/my-dinner-with-andre-the-musical',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['jje', 'justin', 'jerome', 'experience', 'andre', 'dinner'],
        title: 'My Dinner With André: The Musical',
        titleDescription:
          'The cult classic gets the Justin & Jerome Experience treatment.',
      },
      {
        href: '/shows/the-death-show',
        id: '/shows/the-death-show',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['death', 'show'],
        title: 'The Death Show',
        titleDescription:
          'The longest running death themed improv show in Pittsburgh.',
      },
      {
        href: '/shows/warp-zone',
        id: '/shows/warp-zone',
        isActive: false,
        isActiveMobileOverride: true,
        keywords: ['warp', 'zone'],
        title: 'Warp Zone',
        titleDescription: 'Arcade Comedy Theater’s Premier House Team',
      },
      {
        href: '/shows',
        icon: ListBulletIcon,
        id: 'all-shows',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['all', 'shows'],
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
        id: '/podcasts/knockoffs',
        isActive: true,
        isActiveMobileOverride: true,
        keywords: ['knockoffs', 'alex', 'ky', 'podcast'],
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
        keywords: ['theme', 'dark'],
        title: 'Change Theme to Dark Mode',
        titleDescription: '...',
      },
      {
        href: 'light',
        icon: SunIcon,
        id: '/theme/light',
        isActive: true,
        isActiveMobileOverride: false,
        keywords: ['theme', 'light'],
        title: 'Change Theme to Light Mode',
        titleDescription: '...',
      },
    ],
    title: 'Change Theme…',
  },
]

export { menus }
