'use client'
import { Separator } from '@jeromefitz/ds/components/Separator'
import { Suspense } from 'react'

import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
} from '~components/Section'

import { NowPlayingClient } from './NowPlaying.client'

function NowPlaying() {
  return (
    <SectionWrapper>
      <SectionHeader>
        <SectionHeaderTitle>Now Playing</SectionHeaderTitle>
        <SectionHeaderContent>
          <span></span>
        </SectionHeaderContent>
      </SectionHeader>
      <SectionContent>
        <Suspense>
          <NowPlayingClient />
        </Suspense>

        <Separator className="mt-3" />
        <div className="mt-3">
          I listen to a lot of music. I do not think that makes me unique, however, I
          enjoy it all the same. If you’d like to see more of my listening habits
          please check out the <span className="line-through">music section</span>.
          {/* <Anchor href="/music">music section</Anchor>.*/}
        </div>
      </SectionContent>
    </SectionWrapper>
  )
}

export { NowPlaying }
