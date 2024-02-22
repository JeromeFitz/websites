import { cx } from '@jeromefitz/ds/utils/cx'
// import { notFound } from 'next/navigation.js'

import { FourOhFour } from '@/app/_errors/404'
import { Grid } from '@/components/Grid/index'
import {
  HeadlineColumnA,
  HeadlineContent,
  HeadlineTitle,
  HeadlineTitleSub,
} from '@/components/Headline/index'

const isDev = process.env.NODE_ENV === 'development'

const avatar =
  'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2021/bighead--jerome--dizzy.svg'

const items = [
  {
    description: 'SAT 07/15 @ 09:00PM EDT',
    location: 'Pittsburgh, PA',
    segment: 'events',
    slug: '/events/2023/07/15/jerome-and',
    title: 'Jerome &: The Comedy Variety Show',
    venue: 'Arcade Comedy Theater',
  },
  {
    description: 'The Vomit Twinz',
    location: 'improv',
    segment: 'shows',
    slug: '/shows/alex-o-jerome',
    title: 'Alex O’Jerome',
    venue: 'LAX to CHI to PIT Connection',
  },
  {
    description: 'The most celebrated morality tale of all-time.',
    location: 'musical',
    segment: 'shows',
    slug: '/shows/boo-humbag-the-musical',
    title: 'Boo Humbag: The Musical',
    venue:
      'Transfomred into a hilarious send-up with original song and dance numbers.',
  },
]
const item = items[2]

function Pill({ children }) {
  return (
    <div
      className={cx(
        'm-4 mx-auto w-1/5 rounded-full border-2 border-[#0f0f0f] bg-[#f4f4f4] px-3 py-2 text-[#0f0f0f]',
      )}
    >
      {children}
    </div>
  )
}

function OpenGraphTesting() {
  return (
    <div className={cx('h-[600px] w-[1200px] border-2 bg-[#f4f4f4]')}>
      {/* // Start here */}
      <div
        className={cx(
          'flex size-full flex-row flex-wrap items-start justify-items-start text-3xl',
          'bg-[linear-gradient(170deg,_rgb(244,_244,_244),_rgb(207,_47,_152))]',
        )}
      >
        <div className={cx('flex w-full flex-row justify-between')}>
          <div className={cx('m-3 flex items-center p-3 align-top')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="inline-block size-16 rounded-full bg-[white] ring-1 ring-[black]"
              src={avatar}
            />
            <span className={cx('mx-4 text-2xl font-medium')}>
              jeromefitzgerald.com
            </span>
          </div>
          <div className={cx('m-3 flex items-center p-3 align-top')}>
            <span className={cx('mx-4 text-2xl font-medium')}>{item.segment}</span>
            <span className="bg-breeze inline-block size-16 rounded-full ring-1 ring-[black]" />
          </div>
        </div>
        <div className={cx('flex w-full flex-row justify-center align-top')}>
          <div className={cx('flex flex-row flex-wrap')}>
            <span
              className={cx('mx-16 px-16 text-center text-6xl font-black uppercase')}
            >
              {item.title}
            </span>
          </div>
        </div>
        <div className={cx('flex w-full flex-row justify-center align-top')}>
          <div className={cx('flex flex-row flex-wrap gap-1')}>
            <span className={cx('mx-4 w-full px-4 text-center text-3xl font-bold')}>
              {item.description}
            </span>
            <span
              className={cx('mx-4 w-full px-4 text-center text-2xl font-semibold')}
            >
              {item.venue}
            </span>
            <span
              className={cx(
                ' mx-4 w-full px-4 text-center text-xl font-semibold uppercase',
              )}
            >
              <Pill>{item.location}</Pill>
            </span>
          </div>
        </div>
      </div>
      {/* // End here */}
    </div>
  )
}

export default function Page() {
  // if (!isDev) notFound()
  // @note(next) avoid NEXT_DYNAMIC_NO_SSR_CODE
  if (!isDev) return <FourOhFour isNotPublished={false} segmentInfo={{}} />

  const title = 'Open Graph Testing'
  return (
    <Grid as="section">
      <HeadlineColumnA>
        <HeadlineTitle aria-label={title} as="h1">
          <>{title}</>
        </HeadlineTitle>
        <HeadlineTitleSub>
          <></>
        </HeadlineTitleSub>
      </HeadlineColumnA>
      <HeadlineContent>
        <OpenGraphTesting />
      </HeadlineContent>
    </Grid>
  )
}
