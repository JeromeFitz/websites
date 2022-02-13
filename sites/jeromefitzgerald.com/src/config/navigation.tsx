/**
 * @todo(navigation)
 *
 * Preferably this would come from NOTION or generated
 *  during the build. Things we need to take into consideration:
 * - Banner:
 * - - Next Upcoming Event (Dynamic)
 * - - Fallback? (Blog Post)
 * - - Carousel?
 * - Mobile: Menu (Sheet)
 * - - Swap the Menu when user is on Mobile for better experience
 * - Desktop: Menu (Dropdown)
 * - - This was a Popover. Would like to see a variation return (Hover?)
 * - Site: Menu (KBar)
 * - - Is this overloading?
 */

/**
 * @menu Consider values for both Sheet and Dropdown
 */
import {
  BookOpenIcon,
  MicrophoneIcon,
  MusicNoteIcon,
  TicketIcon,
  // VolumeOffIcon,
  VolumeUpIcon,
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
  // SpeakerModerateIcon,
  // SpeakerOffIcon,
  StarIcon,
  // SunIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'
import type { Action } from 'kbar'
import * as React from 'react'

const cssIconHeroToRadix = {
  marginTop: '1px',
  width: '1rem',
}

interface ISections {
  [key: string]: {
    id: string
    icon?: any
    order: number
    title: string
    url?: string
    settings?: any
  }
}

interface ISheetMenuProps {
  order: number
  section: string
}
interface ISheetMenu {
  [key: string]: ISheetMenuProps
}
interface IKBarMenuProps extends Action {
  order: number
  section: string
}
interface IKBarMenu {
  [key: string]: IKBarMenuProps
}
interface IDropdownMenuProps {
  icon?: any
  iconLabel?: string
  indicator?: any
  order: number
  section: string
  rightSlot?: string | React.ReactElement | any
}
interface IDropdownMenu {
  [key: string]: IDropdownMenuProps
}

// interface INavigation {
//   [key: string]: {
//     id: string
//     title: string
//     url: string
//   }
// }

interface Wutt {
  [key: string]: Wut[]
}
interface Wut {
  icon?: any | React.ReactElement
  id?: string
  rightSlot?: string | React.ReactElement
  rightSlotExtended?: string | React.ReactElement
  separator?: boolean
  title: string
  titleExtended?: string
  url?: string
}

const sections: ISections = {
  events: {
    id: 'events',
    icon: <CalendarIcon />,
    order: 0,
    title: 'Next Event',
    url: '/events',
    settings: {
      sheet: { active: true, children: true, childrenCount: 1 },
      dropdown: {
        inline: true,
        label: true,
        separator: false,
      },
    },
  },
  shows: {
    id: 'shows',
    icon: <StarIcon />,
    order: 10,
    title: 'Shows',
    url: '/shows',
    settings: {
      sheet: { active: true, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
  },
  podcasts: {
    id: 'podcasts',
    icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />,
    order: 20,
    title: 'Podcasts',
    url: '/podcasts',
    settings: {
      sheet: { active: true, children: false },
      dropdown: { inline: false, label: true, separator: true },
    },
  },
  pages: {
    id: 'pages',
    order: 30,
    title: 'Pages',
    url: '/',
    settings: {
      sheet: { active: true, children: true },
      dropdown: { inline: true, label: false, separator: true },
    },
  },
  social: {
    id: 'social',
    icon: <Share1Icon />,
    order: 40,
    title: 'Social',
    settings: {
      sheet: { active: false, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
  },
  settings: {
    id: 'settings',
    icon: <GearIcon />,
    order: 50,
    title: 'Settings',
    settings: {
      sheet: { active: false, children: false },
      dropdown: { inline: false, label: true, separator: false },
    },
  },
}

const navigationData: Wutt = {
  // @events
  events: [
    {
      title: 'The Playlist',
      titleExtended: 'The Playlist: Kalyani Singh',
      url: '/events/2022/02/25/the-playlist',
      rightSlot: 'FRI 02/25',
      rightSlotExtended: 'Friday, Feb. 25th at 09:30PM',
      separator: true,
      icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />,
    },
    {
      title: 'Events',
      url: '/events',
      rightSlot: 'View All',
      icon: <TicketIcon className="hi2ri" style={cssIconHeroToRadix} />,
    },
  ],
  // @shows
  shows: [
    {
      title: 'Alex O’Jerome',
      url: '/shows/alex-o-jerome',
      icon: <StarIcon />,
    },
    {
      title: 'JFLE (Jerome & Jesse LE)',
      url: '/shows/jfle',
      icon: <StarIcon />,
    },
    {
      title: 'Justin & Jerome Experience',
      url: '/shows/justin-and-jerome-experience',
      separator: true,
      icon: <StarIcon />,
    },
    {
      title: 'View All',
      url: '/shows',
      icon: <ListBulletIcon />,
    },
  ],
  // @podcasts
  podcasts: [
    {
      title: 'Knockoffs',
      url: '/podcasts/knockoffs',
      icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />,
    },
    {
      title: 'tHe Jer Ky BoyZ',
      url: '/podcasts/jer-and-ky-and-guest',
      icon: <MicrophoneIcon className="hi2ri" style={cssIconHeroToRadix} />,
      separator: true,
    },
    {
      title: 'View All',
      url: '/podcasts',
      icon: <ListBulletIcon />,
    },
  ],
  // @pages
  pages: [
    {
      title: 'About',
      url: '/about',
      icon: <IdCardIcon />,
    },
    {
      title: 'Books',
      url: '/books',
      icon: <BookOpenIcon className="hi2ri" style={cssIconHeroToRadix} />,
    },
    {
      title: 'Colophon',
      url: '/colophon',
      icon: <InfoCircledIcon />,
    },
    // {
    //   title: 'Contact',
    //   url: '/contact',
    // },
    { title: 'Home', url: '/', icon: <HomeIcon /> },
    {
      title: 'Music',
      url: '/music',
      icon: <MusicNoteIcon className="hi2ri" style={cssIconHeroToRadix} />,
    },
  ],
  // @social
  social: [
    {
      title: 'Email',
      url: 'j@jeromefitzgerald.com',
      icon: <EnvelopeOpenIcon />,
    },
    {
      title: 'GitHub',
      url: 'https://github.com/JeromeFitz',
      icon: <GitHubLogoIcon />,
      rightSlot: <ExternalLinkIcon />,
    },
    {
      title: 'Instagram',
      url: 'https://instagram.com/JeromeFitz',
      icon: <ImageIcon />,
      rightSlot: <ExternalLinkIcon />,
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/JeromeFitz',
      icon: <TwitterLogoIcon />,
      rightSlot: <ExternalLinkIcon />,
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jeromefitzgerald',
      icon: <Link1Icon />,
      rightSlot: <ExternalLinkIcon />,
    },
  ],
  // @settings
  settings: [
    {
      title: 'Toggle Sound',
      url: '/',
      icon: <VolumeUpIcon className="hi2ri" style={cssIconHeroToRadix} />,
    },
    {
      title: 'Toggle Theme',
      url: '/',
      icon: <MoonIcon />,
    },
  ],
}

const navigationDropdown: IDropdownMenu = {
  // // @events
  // [navigationData.eventNext.id]: {
  //   section: sections.events.id,
  //   order: 10,
  // },
  // // @shows
  // // @podcasts
  // // @pages
  // [navigationData.home.id]: {
  //   section: sections.pages.id,
  //   order: 10,
  // },
  // // @social
  // // @settings
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const navigationKBar: IKBarMenu = {
  // [navigationData.home.id]: {
  //   id: `kbar-${sections.pages.id}-${navigationData.home.id}`,
  //   section: sections.pages.id,
  //   order: 10,
  // },
}
const navigationSheet: ISheetMenu = {
  // [navigationData.home.id]: {
  //   section: sections.pages.id,
  //   order: 10,
  // },
}

export {
  navigationData,
  navigationDropdown,
  navigationKBar,
  navigationSheet,
  sections,
}

// @todo(deprecated) remove
const navigationHeader: any = []
export { navigationHeader }
