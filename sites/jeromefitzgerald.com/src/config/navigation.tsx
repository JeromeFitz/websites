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
}

interface INavigation {
  [key: string]: {
    active: boolean
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
    subtitle: '‎',
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
    subtitle: '‎',
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
        subtitle: '(improv) The Vomit Twinz',
        keywords: 'AOJ',
        type: 'url.internal',
      },
      {
        id: 'jerome-and',
        title: 'Jerome &',
        url: '/shows/jerome-and',
        icon: <StarIcon />,
        subtitle: '(improv) Special Guests Every Show!',
        keywords: 'And',
        type: 'url.internal',
      },
      {
        id: 'jfle',
        title: 'JFLE (Jerome & Jesse LE)',
        url: '/shows/jfle',
        icon: <StarIcon />,
        subtitle: '(sketch, musical) kewl doodz',
        type: 'url.internal',
      },
      {
        id: 'justin-and-jerome-experience',
        title: 'Justin & Jerome Experience',
        url: '/shows/justin-and-jerome-experience',
        separator: true,
        icon: <StarIcon />,
        subtitle: '(sketch) with Aaron Tarnow',
        keywords: 'JJE',
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
    subtitle: '‎',
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
        subtitle: '‎',
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
        subtitle: '‎',
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
    subtitle: '‎',
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
        subtitle: '‎',
        type: 'url.internal',
      },
      {
        id: 'books',
        title: 'Books',
        url: '/books',
        icon: <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        subtitle: '‎',
        type: 'url.internal',
      },
      {
        id: 'colophon',
        title: 'Colophon',
        url: '/colophon',
        icon: <InfoCircledIcon />,
        subtitle: '‎',
        type: 'url.internal',
      },
      {
        id: 'homepage',
        title: 'Homepage',
        url: '/',
        icon: <HomeIcon />,
        subtitle: '‎',
        keywords: 'home index',
        type: 'url.internal',
      },
      {
        id: 'music',
        title: 'Music',
        url: '/music',
        icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        subtitle: '‎',
        type: 'url.internal',
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
    subtitle: '‎',
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
    subtitle: '‎',
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
        subtitle: '‎',
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
        subtitle: '‎',
        type: 'theme',
      },
    ],
  },
}

export { navigation }

// @todo(deprecated) remove
const navigationHeader: any = []
export { navigationHeader }
