import {
  ArrowRightIcon,
  BookOpenIcon,
  MusicalNoteIcon,
  TicketIcon,
} from '@jeromefitz/ds/components/Icon/index'

// import type { Data } from '@/components/Banner/Banner.types'

const BANNERS = {
  LISTENING: 'listening',
  READING: 'reading',
  UPCOMING: 'upcoming',
}

const banners = {
  [BANNERS.LISTENING]: {
    badge: {
      color: 'orange',
      text: 'Listening…',
    },
    button: {
      icon: <ArrowRightIcon />,
      text: 'Go to Music',
    },
    content: {
      desktop: 'FRH Golden x DayDreamzs – The Game is The Game',
      mobile: 'FRH Golden x DayDreamzs – The Game is The Game',
    },
    href: '/currently/listening-to',
    icon: <MusicalNoteIcon />,
  },
  [BANNERS.READING]: {
    badge: {
      color: 'mint',
      text: 'Reading…',
    },
    button: {
      icon: <ArrowRightIcon />,
      text: 'Go to Books',
    },
    content: {
      desktop: 'Costanza Casati – Clytemnestra: A Novel',
      mobile: 'Costanza Casati – Clytemnestra”',
    },
    href: '/currently/reading',
    icon: <BookOpenIcon />,
  },
  [BANNERS.UPCOMING]: {
    badge: {
      color: 'purple',
      text: 'Upcoming…',
    },
    button: {
      icon: <ArrowRightIcon />,
      text: 'Go to Details',
    },
    content: {
      desktop: 'Irony City: Saturday, January 04th',
      mobile: 'Irony City: SAT 01/04',
    },
    href: '/events/2025/01/04/irony-city',
    icon: <TicketIcon />,
  },
}

export { BANNERS, banners }
