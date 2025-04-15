import { CurrentlyEvent } from '@/components/Currently/Currently.Event'
import { CurrentlyItemWrapper } from '@/components/Currently/Currently.Item.Wrapper'
import { CurrentlyMusicClient } from '@/components/Currently/Currently.Music.Client'
import {
  BookOpenIcon,
  InfoCircledIcon,
  MusicalNoteIcon,
  TicketIcon,
} from '@/components/Icon/index'

const currently = [
  {
    apiUrl: '',
    className: '',
    color: 'pink',
    component: CurrentlyItemWrapper,
    href: '/currently/cooking',
    icon: InfoCircledIcon,
    id: 'cooking',
    isActive: false,
    prefetch: false,
    title: 'Cooking…',
    titleSub: 'N/A',
  },
  {
    // apiUrl: '/api/v1/music/top-tracks?limit=10&offset=0&time_range=short_term',
    apiUrl: '/api/v1/music/recently-played?limit=10',
    color: 'orange',
    component: CurrentlyMusicClient,
    href: '/currently/listening-to',
    icon: MusicalNoteIcon,
    id: 'listening',
    isActive: true,
    prefetch: false,
    title: 'I’m Listening To…',
    titleSub: 'Jessica Pratt – Here In The Pitch',
  },
  {
    apiUrl: '',
    color: 'mint',
    component: CurrentlyItemWrapper,
    href: '/currently/reading',
    icon: BookOpenIcon,
    id: 'reading',
    isActive: true,
    prefetch: false,
    title: 'I’m Reading…',
    titleSub: 'Costanza Casati – Clytemnestra',
  },
  {
    apiUrl: '',
    color: 'purple',
    component: CurrentlyEvent,
    href: '/events',
    icon: TicketIcon,
    id: 'events',
    isActive: true,
    prefetch: true,
    title: 'My Next Event…',
    titleSub: 'Not Scheduled – See Past Events',
  },
]

export { currently }
