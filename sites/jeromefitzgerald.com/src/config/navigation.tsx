/**
 * @todo(navigation)
 *
 * Preferably this would come from NOTION or generated during the build.
 */
import { Icon } from '@jeromefitz/design-system'
import * as React from 'react'

const Priority: {
  HIGH: number
  NORMAL: number
  LOW: number
} = {
  HIGH: 1,
  NORMAL: 0,
  LOW: -1,
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
  type: 'url.internal' | 'url.external' | 'audio' | 'theme'
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
    type: 'url.internal' | 'url.external' | 'audio' | 'theme' | 'settings' | 'social'
    priority?: any
  }
}

const navigation: INavigation = {
  events: {
    active: true,
    id: 'events',
    icon: <Icon.Calendar />,
    priority: Priority.HIGH,
    order: 0,
    // title: 'Next Event',
    title: 'Menu',
    type: 'url.internal',
    url: '/events',
    // subtitle: '‎',
    subtitle: null,
    settings: {
      sheet: { active: true, children: true },
      dropdown: {
        inline: true,
        label: true,
        separator: false,
      },
    },
    items: [
      // {
      //   id: 'the-playlist',
      //   title: 'The Playlist',
      //   titleExtended: 'The Playlist: Kalyani Singh',
      //   url: '/events/2022/02/25/the-playlist',
      //   rightSlot: 'FRI 02/25',
      //   rightSlotExtended: 'Friday, Feb. 25th at 09:30PM',
      //   separator: true,
      //   icon: <Icon.MusicNote />,
      //   iconKbarOverride: (
      //     <Icon.MusicNote  />
      //   ),
      //   subtitle: 'FRI 02/25 09:30PM (default)',
      //   type: 'url.internal',
      // },
      {
        id: 'events',
        title: 'Events',
        url: '/events',
        rightSlot: 'View All',
        icon: <Icon.Ticket />,
        iconKbarOverride: <Icon.Ticket />,
        keywords: 'Events',
        subtitle: 'Listing page for all Events',
        type: 'url.internal',
      },
    ],
  },
  shows: {
    active: true,
    id: 'shows',
    icon: <Icon.Star />,
    priority: Priority.NORMAL,
    order: 10,
    title: 'Shows',
    type: 'url.internal',
    url: '/shows',
    // subtitle: '‎',
    subtitle: null,
    settings: {
      sheet: { active: true, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
    items: [
      {
        id: 'alex-o-jerome',
        title: 'Alex O’Jerome',
        url: '/shows/alex-o-jerome',
        icon: <Icon.Star />,
        subtitle: 'The Vomit Twinz',
        keywords: 'AOJ',
        type: 'url.internal',
      },
      {
        id: 'jerome-and',
        title: 'Jerome &',
        url: '/shows/jerome-and',
        icon: <Icon.Star />,
        subtitle: 'Special Guests Every Show!',
        keywords: 'And',
        type: 'url.internal',
      },
      {
        id: 'jfle',
        title: 'JFLE (Jerome & Jesse LE)',
        url: '/shows/jfle',
        icon: <Icon.Star />,
        subtitle: 'kewl doodz doin kewl sketchez',
        type: 'url.internal',
      },
      {
        id: 'justin-and-jerome-experience',
        title: 'Justin & Jerome Experience',
        url: '/shows/justin-and-jerome-experience',
        separator: true,
        icon: <Icon.Star />,
        subtitle: 'with Aaron Tarnow',
        keywords: 'JJE',
        type: 'url.internal',
      },
      {
        id: 'the-playlist',
        title: 'The Playlist',
        url: '/shows/the-playlist',
        separator: true,
        icon: <Icon.Star />,
        subtitle: 'Special Musical Guests Every Show!',
        // keywords: 'TP',
        type: 'url.internal',
      },
      {
        id: 'view-all-shows',
        title: 'View All',
        url: '/shows',
        icon: <Icon.ListBullet />,
        subtitle: 'Go to listing pages for Shows',
        keywords: 'view all shows',
        type: 'url.internal',
      },
    ],
  },
  podcasts: {
    active: true,
    id: 'podcasts',
    icon: <Icon.Microphone />,
    iconKbarOverride: <Icon.Microphone />,
    priority: Priority.NORMAL,
    order: 20,
    title: 'Podcasts',
    type: 'url.internal',
    url: '/podcasts',
    // subtitle: '‎',
    subtitle: null,
    settings: {
      sheet: { active: true, children: false },
      dropdown: { inline: false, label: true, separator: true },
    },
    items: [
      {
        id: 'jer-and-ky-and-guest',
        title: 'Jer & Ky (& Guest)',
        url: '/podcasts/jer-and-ky-and-guest',
        icon: <Icon.Microphone />,
        iconKbarOverride: <Icon.Microphone />,
        separator: false,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'testing',
      },
      {
        id: 'knockoffs',
        title: 'Knockoffs',
        url: '/podcasts/knockoffs',
        icon: <Icon.Microphone />,
        iconKbarOverride: <Icon.Microphone />,
        separator: true,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'testing',
      },
      {
        title: 'View All',
        url: '/podcasts',
        icon: <Icon.ListBullet />,
        subtitle: 'Listing page for all Podcasts',
        type: 'url.internal',
        description: 'testing',
      },
    ],
  },
  pages: {
    active: true,
    id: 'pages',
    priority: Priority.NORMAL,
    order: 30,
    title: 'Pages',
    type: 'url.internal',
    url: '/',
    // subtitle: '‎',
    subtitle: null,
    settings: {
      sheet: { active: true, children: true },
      dropdown: { inline: true, label: false, separator: true },
    },
    items: [
      {
        id: 'about',
        title: 'About',
        url: '/about',
        icon: <Icon.IdCard />,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'About ol’ Jerome',
      },
      {
        id: 'books',
        title: 'Books',
        url: '/books',
        icon: <Icon.BookOpen />,
        iconKbarOverride: <Icon.BookOpen />,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: `Current Reading and Recs`,
      },
      {
        id: 'colophon',
        title: 'Colophon',
        url: '/colophon',
        icon: <Icon.InfoCircled />,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'How this site was made',
      },
      {
        id: 'homepage',
        title: 'Homepage',
        url: '/',
        icon: <Icon.Home />,
        // subtitle: '‎',
        subtitle: null,
        keywords: 'home index',
        type: 'url.internal',
        description: 'Go back to homepage',
      },
      {
        id: 'music',
        title: 'Music',
        url: '/music',
        icon: <Icon.MusicNote />,
        iconKbarOverride: <Icon.MusicNote />,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'Current Tunes',
      },
      {
        id: 'podcasts',
        title: 'Podcasts',
        url: '/podcasts',
        icon: <Icon.Microphone />,
        // subtitle: '‎',
        subtitle: null,
        keywords: 'home podcasts',
        type: 'url.internal',
        description: 'Knockoffs, Jer & Ky & Guest',
      },
    ],
  },
  social: {
    active: true,
    id: 'social',
    icon: <Icon.SocialShare />,
    priority: Priority.LOW,
    order: 40,
    title: 'Social',
    type: 'social',
    // subtitle: '‎',
    subtitle: null,
    settings: {
      sheet: { active: false, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
    items: [
      {
        id: 'email',
        title: 'Email',
        url: 'mailto:j@jeromefitzgerald.com',
        icon: <Icon.EnvelopeOpen />,
        subtitle: 'j [at] jeromefitzgerald.com',
        keywords: 'social email mail',
        type: 'url.external',
      },
      {
        id: 'github',
        title: 'GitHub',
        url: 'https://github.com/JeromeFitz',
        icon: <Icon.GitHubLogo />,
        rightSlot: <Icon.ExternalLink />,
        subtitle: '@JeromeFitz',
        keywords: 'social github gh git',
        type: 'url.external',
      },
      {
        id: 'instagarm',
        title: 'Instagram',
        url: 'https://instagram.com/JeromeFitz',
        icon: <Icon.InstagramLogo />,
        rightSlot: <Icon.ExternalLink />,
        subtitle: '@JeromeFitz',
        keywords: 'social instagram ig',
        type: 'url.external',
      },
      {
        id: 'twitter',
        title: 'Twitter',
        url: 'https://twitter.com/JeromeFitz',
        icon: <Icon.TwitterLogo />,
        rightSlot: <Icon.ExternalLink />,
        subtitle: '@JeromeFitz',
        keywords: 'social twitter',
        type: 'url.external',
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jeromefitzgerald',
        icon: <Icon.LinkedInLogo />,
        rightSlot: <Icon.ExternalLink />,
        subtitle: '@jeromefitzgerald',
        keywords: 'social linkedin',
        type: 'url.external',
      },
    ],
  },
  settings: {
    active: true,
    id: 'settings',
    icon: <Icon.Gear />,
    priority: Priority.LOW,
    order: 50,
    title: 'Settings',
    type: 'settings',
    // subtitle: '‎',
    subtitle: null,
    settings: {
      sheet: { active: true, children: true },
      dropdown: { inline: false, label: true, separator: false },
    },
    items: [
      {
        id: 'settings-audio',
        title: 'Toggle Sound',
        url: '/',
        icon: <Icon.SpeakerModerate />,
        icons: {
          // @note this is reversed
          true: <Icon.SpeakerOff />,
          false: <Icon.SpeakerModerate />,
        },
        keywords: 'Sound Off On',
        shortcut: ['t', 'a'],
        // subtitle: '‎',
        subtitle: null,
        type: 'audio',
      },
      {
        id: 'settings-theme',
        title: 'Toggle Theme',
        url: '/',
        icon: <Icon.Moon />,
        icons: {
          // @note this is reversed
          light: <Icon.Moon />,
          dark: <Icon.Sun />,
        },
        keywords: 'Theme Light Dark Off On',
        shortcut: ['t', 't'],
        // subtitle: '‎',
        subtitle: null,
        type: 'theme',
      },
    ],
  },
}

export { navigation }

// @todo(deprecated) remove
const navigationHeader: any = []
export { navigationHeader }
