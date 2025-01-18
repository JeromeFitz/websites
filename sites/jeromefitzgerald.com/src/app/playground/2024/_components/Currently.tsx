// import { Anchor } from '@jeromefitz/ds/components/Anchor'
import {
  BookOpenIcon,
  InfoCircledIcon,
  MusicalNoteIcon,
  TicketIcon,
} from '@jeromefitz/ds/components/Icon/index'
import { cx } from '@jeromefitz/ds/utils/cx'

import { Box } from '@radix-ui/themes/dist/esm/components/box.js'
import { Em } from '@radix-ui/themes/dist/esm/components/em.js'
import { Text } from '@radix-ui/themes/dist/esm/components/text.js'

import { CurrentlyEvent } from './Currently.Event'
import { CurrentlyItemWrapper } from './Currently.Item.Wrapper'
import { CurrentlyMusicClient } from './Currently.Music.Client'

const currently = [
  {
    apiUrl: '',
    color: 'pink',
    component: CurrentlyItemWrapper,
    href: '/currently/cooking',
    icon: InfoCircledIcon,
    id: 'cooking',
    isActive: false,
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
    title: 'My Next Event…',
    titleSub: 'Not Scheduled – See Past Events',
  },
]

function Currently() {
  return (
    <Box
      className={cx(
        'relative flex h-min w-full flex-none flex-col flex-nowrap content-center items-center justify-center overflow-visible p-0',
        // @todo(ui) can we align this with radix?
        'gap-[10px]',
        'order-[0]',
        'md:h-[266px]',
      )}
      style={{ opacity: 1 }}
    >
      <Box
        className={cx(
          'relative flex h-min w-full flex-none flex-col flex-nowrap content-start items-start justify-start gap-6 overflow-visible p-0',
          'md:flex-row md:justify-between',
        )}
        style={{ opacity: 1 }}
      >
        <Box
          className={cx(
            // 'bg-grass-5',
            'rounded-3',
            'relative flex h-min flex-[1_0_0px] flex-row flex-nowrap content-center items-center justify-start gap-[10px] overflow-visible',
            'w-[unset]',
            'md:w-[318px] md:min-w-[318px] md:max-w-[318px]',
          )}
          style={{ opacity: 1 }}
        >
          <Text
            className="text-accentA-12"
            size={{ initial: '6', md: '8' }}
            weight="medium"
          >
            <Em>Currently…</Em>
          </Text>
        </Box>
        {}
        {currently.map((c, idx) => {
          if (!c?.isActive) return null

          const key = `currently-${idx}-${c.id}`

          const Component = c.component
          const titleSub = c?.titleSub.split(' – ')
          const props = { ...c, titleSub }

          // if (c.id === 'listening') {
          //   console.dir(`c:`)
          //   console.dir(c)
          //   console.dir(`props:`)
          //   console.dir(props)
          // }

          return <Component key={key} {...props} />
        })}
      </Box>
    </Box>
  )
}

export { Currently }
