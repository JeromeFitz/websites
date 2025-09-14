// import { CurrentlyBookClient } from '@/components/Currently/Currently.Book.Client'
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
    apiUrl: '/api/v2/music/recent-played-albums?limit=1&offset=0',
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
    apiUrl: '/api/v1/books/currently-reading',
    color: 'mint',
    component: CurrentlyItemWrapper,
    href: '/currently/reading',
    icon: BookOpenIcon,
    id: 'reading',
    isActive: true,
    prefetch: false,
    title: 'I’m Reading…',
    titleSub: 'Jaime Loftus – Raw Dog: The Naked Truth About Hot Dogs',
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
