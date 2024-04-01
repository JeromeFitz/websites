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
    href: '/music',
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
      desktop:
        'Robert A. Caro – “The Power Broker: Robert Moses and the Fall of New York”',
      mobile: 'Robert A. Caro – “The Power Broker”',
    },
    href: '/books',
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
      desktop: 'Arcade Hootenanny!: Saturday, April 13th',
      mobile: 'Arcade Hootenanny!: SAT 04/13',
    },
    href: '/events/2024/04/13/arcade-hootenanny',
    icon: <TicketIcon />,
  },
}

export { BANNERS, banners }
