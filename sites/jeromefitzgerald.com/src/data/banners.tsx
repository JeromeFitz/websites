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
      desktop:
        'Robert A. Caro – “The Power Broker: Robert Moses and the Fall of New York”',
      mobile: 'Robert A. Caro – “The Power Broker”',
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
      desktop: 'Latchkey Kids w/ Warp Zone!: Saturday, May 10th',
      mobile: 'Latchkey Kids!: SAT 05/10',
    },
    href: '/events/2024/05/10/the-latchkey-kids',
    icon: <TicketIcon />,
  },
}

export { BANNERS, banners }
