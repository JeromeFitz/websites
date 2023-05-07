'use client'
import {
  ExternalLinkIcon as ExternalLink,
  Pencil2Icon as PencilWithPaper,
} from '@jeromefitz/ds/components/Icon'
import _find from 'lodash/find'
import { useState } from 'react'

import { Anchor } from '~components/Anchor'
import { Top } from '~components/Music'
import { useSpotify } from '~hooks/useSpotify'
// @todo(next) https://github.com/vercel/next.js/issues/46756
// import { Icon } from '@jeromefitz/ds/components/Icon'
import { RadioGroup } from '~ui/RadioGroup'
import { cx } from '~utils/cx'
// import { log } from '~utils/log'

// const DEBUG_KEY = `~components/Music >> `

const plans = [
  {
    id: 0,
    name: 'All Time',
    description: 'Since March 2020',
    time_range: 'long_term',
  },
  {
    id: 1,
    name: '~ 6 month',
    description: `Past six months`,
    time_range: 'medium_term',
  },
  {
    id: 2,
    name: '~ 1 month',
    description: `Past month`,
    time_range: 'short_term',
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Music({ preview = false, ...props }) {
  // const empty = {}
  const { data, setSpotifyTimeRange } = useSpotify()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState(
    _find(plans, { time_range: data?.time_range })
  )

  const handleSpotifyTimeRange = (time_range) => {
    // console.dir(`time_range: ${time_range}`)
    setSelected(time_range)
    void setSpotifyTimeRange(data, time_range)
  }

  // log(`${DEBUG_KEY} data`, data)
  // log(`${DEBUG_KEY} selected`, selected)

  return (
    <>
      {/* @todo(remove) at some point in the next few weeks would be cool to remove this haha */}
      <div
        id="footer--construction-0"
        className={cx('my-4 w-full p-4', 'bg-radix-slate1 rounded', 'shadow')}
      >
        <h3
          className={cx('text-3xl font-black', 'flex flex-row items-center', 'my-2')}
        >
          <span className="mr-2">
            <PencilWithPaper className="h-6 w-6" />
          </span>
          <span>
            {` `}
            Please Note
          </span>
        </h3>
        <p className="mx-0 my-4 text-lg">Still working on this page.</p>
      </div>
      <p className={cx('my-2 items-center text-xl')}>
        Please support artists by going to shows and purchasing music, especially
        local and indie.
      </p>
      <p className={cx('my-4 items-center text-xl')}>
        Artists like{' '}
        <Anchor
          href="https://nicerec.bandcamp.com/album/drink-the-blue-sky"
          target="_blank"
          className={cx(
            'inline-flex flex-row items-center gap-1',
            'underline-offset-4',
            'underline',
            'decoration-radix-mauve4 hover:decoration-radix-mauve5',
            'text-radix-mauve11 hover:text-radix-mauve12',
            'transition-all duration-200 ease-in'
          )}
        >
          Nice Rec’s, “Drink The Blue Sky”
          <span className={cx('mx-1 inline-block text-inherit')}>
            <ExternalLink />
          </span>
        </Anchor>
        {` `}or{` `}
        <Anchor
          href="https://torysilvermusic.bandcamp.com/album/slowly"
          target="_blank"
          className={cx(
            'inline-flex flex-row items-center gap-1',
            'underline-offset-4',
            'underline',
            'decoration-radix-mauve4 hover:decoration-radix-mauve5',
            'text-radix-mauve11 hover:text-radix-mauve12',
            'transition-all duration-200 ease-in'
          )}
        >
          Tory Silver’s “Slowly”
          <span className={cx('mx-1 inline-block text-inherit')}>
            <ExternalLink />
          </span>
        </Anchor>{' '}
        on Bandcamp.
      </p>
      <p className={cx('my-4 items-center text-base')}>
        My “Music” library is at over 50 days, and am continuing an ever growing
        vinyl collection. (I have not yet made the leap to first editions, which is
        probably for the best currently in backstocking an old collection, heh.)
      </p>
      <p className={cx('my-4 items-center text-lg')}>
        These stats come from{' '}
        <span className="text-spotify dark:text-spotify-dark font-bold">
          Spotify
        </span>
        . Though I am not a fan of some of the people behind their podcasts, I am a
        fan of some of my pals who work there.
      </p>
      <div className="relative my-3 md:my-6">
        <h2 className="my-3 text-xl font-black md:text-3xl">Choose Time Range</h2>
        <RadioGroup
          items={plans}
          label="Choose a time range"
          onValueChange={handleSpotifyTimeRange}
        />
      </div>
      <Top id="top-tracks" time_range={data?.time_range} />
      <Top id="top-artists" time_range={data?.time_range} />
    </>
  )
}

export { Music }
