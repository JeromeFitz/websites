/**
 * @todo(navigation)
 *
 * Preferably this would come from NOTION or generated during the build.
 */
import {
  BookOpenIcon,
  MicrophoneIcon,
  MusicNoteIcon,
  TicketIcon,
} from '@heroicons/react/outline'
import {
  cssIconHeroToRadix,
  cssIconHeroToRadix1,
} from '@jeromefitz/shared/src/lib/constants'
import {
  CalendarIcon,
  EnvelopeOpenIcon,
  ExternalLinkIcon,
  GearIcon,
  GitHubLogoIcon,
  HomeIcon,
  IdCardIcon,
  InfoCircledIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  ListBulletIcon,
  MoonIcon,
  // Pencil2Icon,
  Share1Icon,
  SpeakerModerateIcon,
  SpeakerOffIcon,
  StarIcon,
  SunIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import * as React from 'react'

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
  }
}

const navigation: INavigation = {
  events: {
    active: true,
    id: 'events',
    icon: <CalendarIcon />,
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
      //   icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix1} />,
      //   iconKbarOverride: (
      //     <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />
      //   ),
      //   subtitle: 'FRI 02/25 09:30PM (default)',
      //   type: 'url.internal',
      // },
      {
        id: 'events',
        title: 'Events',
        url: '/events',
        rightSlot: 'View All',
        icon: <TicketIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <TicketIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        keywords: 'Events',
        subtitle: 'Listing page for all Events',
        type: 'url.internal',
      },
    ],
  },
  shows: {
    active: true,
    id: 'shows',
    icon: <StarIcon />,
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
        icon: <StarIcon />,
        subtitle: 'The Vomit Twinz',
        keywords: 'AOJ',
        type: 'url.internal',
      },
      {
        id: 'jerome-and',
        title: 'Jerome &',
        url: '/shows/jerome-and',
        icon: <StarIcon />,
        subtitle: 'Special Guests Every Show!',
        keywords: 'And',
        type: 'url.internal',
      },
      {
        id: 'jfle',
        title: 'JFLE (Jerome & Jesse LE)',
        url: '/shows/jfle',
        icon: <StarIcon />,
        subtitle: 'kewl doodz doin kewl sketchez',
        type: 'url.internal',
      },
      {
        id: 'justin-and-jerome-experience',
        title: 'Justin & Jerome Experience',
        url: '/shows/justin-and-jerome-experience',
        separator: true,
        icon: <StarIcon />,
        subtitle: 'with Aaron Tarnow',
        keywords: 'JJE',
        type: 'url.internal',
      },
      {
        id: 'the-playlist',
        title: 'The Playlist',
        url: '/shows/the-playlist',
        separator: true,
        icon: <StarIcon />,
        subtitle: 'Special Musical Guests Every Show!',
        // keywords: 'TP',
        type: 'url.internal',
      },
      {
        id: 'view-all-shows',
        title: 'View All',
        url: '/shows',
        icon: <ListBulletIcon />,
        subtitle: 'Go to listing pages for Shows',
        keywords: 'view all shows',
        type: 'url.internal',
      },
    ],
  },
  podcasts: {
    active: true,
    id: 'podcasts',
    icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix1} />,
    iconKbarOverride: (
      <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />
    ),
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
        icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        separator: false,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
      },
      {
        id: 'knockoffs',
        title: 'Knockoffs',
        url: '/podcasts/knockoffs',
        icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        separator: true,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
      },
      {
        title: 'View All',
        url: '/podcasts',
        icon: <ListBulletIcon />,
        subtitle: 'Listing page for all Podcasts',
        type: 'url.internal',
      },
    ],
  },
  pages: {
    active: true,
    id: 'pages',
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
        icon: <IdCardIcon />,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'About ol’ Jerome',
      },
      {
        id: 'books',
        title: 'Books',
        url: '/books',
        icon: <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: `Current Reading and Recs`,
      },
      {
        id: 'colophon',
        title: 'Colophon',
        url: '/colophon',
        icon: <InfoCircledIcon />,
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'How this site was made',
      },
      {
        id: 'homepage',
        title: 'Homepage',
        url: '/',
        icon: <HomeIcon />,
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
        icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        // subtitle: '‎',
        subtitle: null,
        type: 'url.internal',
        description: 'Current Tunes',
      },
      {
        id: 'podcasts',
        title: 'Podcasts',
        url: '/podcasts',
        icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix1} />,
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
    icon: <Share1Icon />,
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
        icon: <EnvelopeOpenIcon />,
        subtitle: 'j [at] jeromefitzgerald.com',
        keywords: 'social email mail',
        type: 'url.external',
      },
      {
        id: 'github',
        title: 'GitHub',
        url: 'https://github.com/JeromeFitz',
        icon: <GitHubLogoIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@JeromeFitz',
        keywords: 'social github gh git',
        type: 'url.external',
      },
      {
        id: 'instagarm',
        title: 'Instagram',
        url: 'https://instagram.com/JeromeFitz',
        icon: <InstagramLogoIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@JeromeFitz',
        keywords: 'social instagram ig',
        type: 'url.external',
      },
      {
        id: 'twitter',
        title: 'Twitter',
        url: 'https://twitter.com/JeromeFitz',
        icon: <TwitterLogoIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@JeromeFitz',
        keywords: 'social twitter',
        type: 'url.external',
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jeromefitzgerald',
        icon: <LinkedInLogoIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@jeromefitzgerald',
        keywords: 'social linkedin',
        type: 'url.external',
      },
    ],
  },
  settings: {
    active: true,
    id: 'settings',
    icon: <GearIcon />,
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
        icon: <SpeakerModerateIcon />,
        icons: {
          // @note this is reversed
          true: <SpeakerOffIcon />,
          false: <SpeakerModerateIcon />,
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
        icon: <MoonIcon />,
        icons: {
          // @note this is reversed
          light: <MoonIcon />,
          dark: <SunIcon />,
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
