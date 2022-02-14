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
  CalendarIcon,
  EnvelopeOpenIcon,
  ExternalLinkIcon,
  GearIcon,
  GitHubLogoIcon,
  HomeIcon,
  IdCardIcon,
  ImageIcon,
  InfoCircledIcon,
  Link1Icon,
  ListBulletIcon,
  MoonIcon,
  // Pencil2Icon,
  Share1Icon,
  SpeakerModerateIcon,
  // SpeakerOffIcon,
  StarIcon,
  // SunIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import * as React from 'react'

// import { useUI } from '~context/UI'
const cssIconHeroToRadix = {
  marginTop: '1px',
}
const cssIconHeroToRadix1 = {
  marginTop: '1px',
  width: '1rem',
}

interface INavigationItem {
  icon?: React.ReactElement
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
}

interface INavigation {
  [key: string]: {
    active: boolean
    id: string
    icon?: React.ReactElement
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
  }
}

const navigation: INavigation = {
  events: {
    active: true,
    id: 'events',
    icon: <CalendarIcon />,
    order: 0,
    title: 'Next Event',
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
      {
        title: 'The Playlist',
        titleExtended: 'The Playlist: Kalyani Singh',
        url: '/events/2022/02/25/the-playlist',
        rightSlot: 'FRI 02/25',
        rightSlotExtended: 'Friday, Feb. 25th at 09:30PM',
        separator: true,
        icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        subtitle: 'FRI 02/25 09:30PM',
      },
      {
        title: 'Events',
        url: '/events',
        rightSlot: 'View All',
        icon: <TicketIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <TicketIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        keywords: 'Events',
        subtitle: 'Listing page for all Events',
      },
    ],
  },
  shows: {
    active: true,
    id: 'shows',
    icon: <StarIcon />,
    order: 10,
    title: 'Shows',
    url: '/shows',
    subtitle: '‎',
    settings: {
      sheet: { active: true, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
    items: [
      {
        title: 'Alex O’Jerome',
        url: '/shows/alex-o-jerome',
        icon: <StarIcon />,
        subtitle: '(improv) The Vomit Twinz',
        keywords: 'AOJ',
      },
      {
        title: 'JFLE (Jerome & Jesse LE)',
        url: '/shows/jfle',
        icon: <StarIcon />,
        subtitle: '(sketch, musical)',
      },
      {
        title: 'Justin & Jerome Experience',
        url: '/shows/justin-and-jerome-experience',
        separator: true,
        icon: <StarIcon />,
        subtitle: '(sketch) with Aaron Tarnow',
        keywords: 'JJE',
      },
      {
        title: 'View All',
        url: '/shows',
        icon: <ListBulletIcon />,
        subtitle: 'Go to listing pages for Shows',
        keywords: 'view all shows',
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
    url: '/podcasts',
    subtitle: '‎',
    settings: {
      sheet: { active: true, children: false },
      dropdown: { inline: false, label: true, separator: true },
    },
    items: [
      {
        title: 'Knockoffs',
        url: '/podcasts/knockoffs',
        icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        subtitle: '‎',
      },
      {
        title: 'tHe Jer Ky BoyZ',
        url: '/podcasts/jer-and-ky-and-guest',
        icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        separator: true,
        subtitle: '‎',
      },
      {
        title: 'View All',
        url: '/podcasts',
        icon: <ListBulletIcon />,
        subtitle: 'Listing page for all Podcasts',
      },
    ],
  },
  pages: {
    active: true,
    id: 'pages',
    order: 30,
    title: 'Pages',
    url: '/',
    subtitle: '‎',
    settings: {
      sheet: { active: true, children: true },
      dropdown: { inline: true, label: false, separator: true },
    },
    items: [
      {
        title: 'About',
        url: '/about',
        icon: <IdCardIcon />,
        subtitle: '‎',
      },
      {
        title: 'Books',
        url: '/books',
        icon: <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        subtitle: '‎',
      },
      {
        title: 'Colophon',
        url: '/colophon',
        icon: <InfoCircledIcon />,
        subtitle: '‎',
      },
      // {
      //   title: 'Contact',
      //   url: '/contact',
      // },
      {
        title: 'Home',
        url: '/',
        icon: <HomeIcon />,
        subtitle: '‎',
        keywords: 'home',
      },
      {
        title: 'Music',
        url: '/music',
        icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix1} />,
        iconKbarOverride: (
          <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />
        ),
        subtitle: '‎',
      },
    ],
  },
  social: {
    active: true,
    id: 'social',
    icon: <Share1Icon />,
    order: 40,
    title: 'Social',
    subtitle: '‎',
    settings: {
      sheet: { active: false, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
    items: [
      {
        title: 'Email',
        url: 'j@jeromefitzgerald.com',
        icon: <EnvelopeOpenIcon />,
        subtitle: 'j [at] jeromefitzgerald.com',
        keywords: 'social email mail',
      },
      {
        title: 'GitHub',
        url: 'https://github.com/JeromeFitz',
        icon: <GitHubLogoIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@JeromeFitz',
        keywords: 'social github gh git',
      },
      {
        title: 'Instagram',
        url: 'https://instagram.com/JeromeFitz',
        icon: <ImageIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@JeromeFitz',
        keywords: 'social instagram ig',
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/JeromeFitz',
        icon: <TwitterLogoIcon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@JeromeFitz',
        keywords: 'social twitter',
      },
      {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jeromefitzgerald',
        icon: <Link1Icon />,
        rightSlot: <ExternalLinkIcon />,
        subtitle: '@jeromefitzgerald',
        keywords: 'social linkedin',
      },
    ],
  },
  settings: {
    active: true,
    id: 'settings',
    icon: <GearIcon />,
    order: 50,
    title: 'Settings',
    subtitle: '‎',
    settings: {
      sheet: { active: false, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
    items: [
      {
        title: 'Toggle Sound',
        url: '/',
        icon: <SpeakerModerateIcon />,
        // icon: <SpeakerOffIcon />,
        keywords: 'Sound Off On',
        shortcut: ['t', 'a'],
        subtitle: '‎',
      },
      {
        title: 'Toggle Theme',
        url: '/',
        icon: <MoonIcon />,
        // icon: <SunIcon />,
        keywords: 'Theme Light Dark Off On',
        shortcut: ['t', 't'],
        subtitle: '‎',
      },
    ],
  },
}

export { navigation }

// @todo(deprecated) remove
const navigationHeader: any = []
export { navigationHeader }
