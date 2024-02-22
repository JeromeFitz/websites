'use client'
import {
  ArrowRightIcon,
  BookOpenIcon,
  PlayIcon,
} from '@jeromefitz/ds/components/Icon'
import { cx } from '@jeromefitz/ds/utils/cx'

import { usePathname } from 'next/navigation'

import type { Data } from './Banner.types'

import { Banner } from './Banner'

const dataListening: Data = {
  badge: {
    color: 'mint',
    text: 'Playing…',
  },
  button: {
    icon: <ArrowRightIcon className={cx('text-[var(--accent-11)]')} />,
    text: 'Go to Music',
  },
  content: {
    desktop: 'Amyl and The Sniffers – “Comfort To Me”',
    mobile: 'Amyl and The Sniffers – “Comfort To Me”',
  },
  href: '/music',
  icon: <PlayIcon />,
}
const dataReading: Data = {
  badge: {
    color: 'purple',
    text: 'Reading…',
  },
  button: {
    icon: <ArrowRightIcon className={cx('text-[var(--accent-11)]')} />,
    text: 'Go to Books',
  },
  content: {
    desktop:
      'Robert A. Caro – “The Power Broker: Robert Moses and the Fall of New York”',
    mobile: 'Robert A. Caro – “The Power Broker”',
  },
  href: '/books',
  icon: <BookOpenIcon />,
}

function BannerClient() {
  const path = usePathname()
  if (path === '/music') return <Banner data={dataReading} />
  return <Banner data={dataListening} />
}

export { BannerClient }
