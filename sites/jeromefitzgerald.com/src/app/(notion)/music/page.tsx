import { Anchor } from '@jeromefitz/ds/components/Anchor'
import { cx } from '@jeromefitz/ds/utils/cx'
import { getDataFromCache, getSegmentInfo } from '@jeromefitz/shared/notion/utils'
import { isObjectEmpty } from '@jeromefitz/utils'

import type { Metadata } from 'next'

import { draftMode } from 'next/headers'

import { CONFIG, getPageData } from '~app/(notion)/_config/index'
import { generateMetadataCustom } from '~app/(notion)/_config/temp/generateMetadataCustom'
import { ModuleRow } from '~app/_temp/modules/ModuleRow'
import { TopBar } from '~app/_temp/modules/TopBar'
import { LayoutClient } from '~app/layout.client'
// import { NowPlayingClient } from '~components/NowPlaying/NowPlaying.client'

import { Top } from './_components/Top'

const slug = '/music'
const { SEGMENT } = CONFIG.PAGES

function addS(str) {
  const poss = str.charAt(str.length - 1) === 's' ? '' : 's'
  return `${str}’${poss}`
}

const bandcamps = [
  {
    album: 'The Control Center',
    artist: 'Buscrates',
    href: 'https://torysilvermusic.bandcamp.com/album/slowly',
  },
  {
    album: 'Check Please',
    artist: 'Cam Chambers and Nice Rec',
    href: 'https://camchambers.bandcamp.com/album/check-please',
  },
  {
    album: 'Shifty',
    artist: 'Else Collective',
    href: 'https://pjroduta.bandcamp.com/album/shifty',
  },
  {
    album: 'Heat',
    artist: 'Flower Crown',
    href: 'https://flowercrownmusic.bandcamp.com/album/heat',
  },
  {
    album: 'Made For The Soul',
    artist: 'FRH Golden x pvkvsv',
    href: 'https://frhgolden.bandcamp.com/album/made-for-the-soul',
  },
  {
    album: 'Yinztroducing...',
    artist: 'Moemaw Naedon & C.Scott',
    href: 'https://soulslimerecords.bandcamp.com/album/yinztroducing',
  },
  {
    album: 'Drink The Blue Sky',
    artist: 'Nice Rec',
    href: 'https://nicerec.bandcamp.com/album/drink-the-blue-sky',
  },
  {
    album: 'Slowly',
    artist: 'Tory Silver',
    href: 'https://torysilvermusic.bandcamp.com/album/slowly',
  },
]

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const plans = [
//   {
//     description: 'Since March 2020',
//     id: 0,
//     name: 'All Time',
//     time_range: 'long_term',
//   },
//   {
//     description: `Past six months`,
//     id: 1,
//     name: '~ 6 month',
//     time_range: 'medium_term',
//   },
//   {
//     description: `Past month`,
//     id: 2,
//     name: '~ 1 month',
//     time_range: 'short_term',
//   },
// ]

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const { isEnabled } = draftMode()
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    // @todo(next) revalidate
    revalidate: false,
    segmentInfo: {
      ...segmentInfo,
      slug,
    },
  })

  const is404 = isObjectEmpty(data?.blocks || {})
  const is404Seo = {
    title: `404 | ${segmentInfo?.segment} | ${process.env.NEXT_PUBLIC__SITE}`,
  }

  if (is404) return is404Seo

  const pageData = getPageData(data?.page?.properties) || ''
  const seo = await generateMetadataCustom({ data, pageData, segmentInfo })

  return pageData?.isPublished ? seo : is404Seo
}

async function Slug({ revalidate, segmentInfo }) {
  const { isEnabled } = draftMode()

  const data = await getDataFromCache({
    database_id: '',
    draft: isEnabled,
    filterType: 'equals',
    revalidate,
    segmentInfo: {
      ...segmentInfo,
      slug,
    },
  })

  const { title } = getPageData(data?.page?.properties) || ''

  if (isObjectEmpty(data.page)) return null
  return (
    <>
      <LayoutClient>
        <div className="w-full min-w-full font-sans">
          <TopBar
            className=""
            description={`My “Music” library is at over 50 days, and am continuing an ever
                  growing vinyl collection. (I have not yet made the leap to first
                  editions, which is probably for the best currently. Especially when looking
                  to backstock really old records.)`}
            isHidden={false}
            isHiddenTags={true}
            label={``}
            title={title}
            // zzz={NowPlayingClient}
          />

          {/* Tracks */}
          <ModuleRow>
            {/* <NowPlayingClient /> */}
            <div className={cx('mb-2 w-full md:relative ')}>
              <div className={cx('font-mono')}>
                <div
                  className={cx(
                    'mb-2 text-xl font-black tracking-tight md:tracking-tight',
                  )}
                >
                  <h3>Disclaimer</h3>
                </div>
                <div className={cx('text-base tracking-tight')}>
                  <p>
                    All data is from{' '}
                    <strong className="text-spotify-dark  dark:text-spotify">
                      Spotify
                    </strong>
                    . Currently it is from the last ~4 weeks.
                  </p>
                </div>
              </div>
            </div>
            <div className={cx('w-full md:relative')}>
              <div className={cx('w-full md:relative')}>
                <div
                  className={cx(
                    'mb-2 text-xl font-black tracking-tight md:mb-4 md:text-3xl md:tracking-tight',
                  )}
                >
                  <h3>Top Tracks</h3>
                </div>
                <div className={cx('text-base tracking-tight md:text-xl')}>
                  <p>
                    Sometimes I tend to play the same song over and over again (and
                    over and over again).
                  </p>
                </div>
              </div>
            </div>
          </ModuleRow>
          <div className="pl-[var(--pl)] pr-[var(--pr)] [--pl:var(--grid-margin)] [--pr:var(--grid-margin)]">
            <Top id="top-tracks" time_range={'short_term'} />
          </div>
          {/* Artists */}
          <ModuleRow>
            <div className={cx('w-full md:relative')}>
              <div className={cx('w-full md:relative')}>
                <div
                  className={cx(
                    'mb-2 text-xl font-black tracking-tight md:mb-4 md:text-3xl md:tracking-tight',
                  )}
                >
                  <h3>Top Artists</h3>
                </div>
                <div className={cx('text-base tracking-tight md:text-xl')}>
                  <p>
                    Though I feel I have an eclectic taste, it is obvious I listen to
                    a lot of my personal heavy hitters a lot
                  </p>
                </div>
              </div>
            </div>
          </ModuleRow>
          <div className="pl-[var(--pl)] pr-[var(--pr)] [--pl:var(--grid-margin)] [--pr:var(--grid-margin)]">
            <Top id="top-artists" time_range={'short_term'} />
          </div>
        </div>
        <ModuleRow>
          <div className={cx('w-full md:relative')}>
            <div className={cx('text-xl tracking-tight md:text-2xl')}>
              <p>
                Please support artists by going to shows and purchasing music,
                especially local and indie.
              </p>
              <p
                className={cx(
                  'mb-2 mt-4 items-center text-lg tracking-wide md:text-xl',
                )}
              >
                Like some of <Anchor href="/shows/jerome-and">Jerome &</Anchor>’s
                musical guests on Bandcamp:
              </p>
              <ul className="list-inside px-2 py-8 text-lg tracking-wide md:list-disc md:text-xl">
                {bandcamps.map(({ album, artist: _artist, href }, id) => {
                  const artist = addS(_artist)
                  return (
                    <li className="my-2 md:my-1" key={`bandcamp-link-${id}`}>
                      <Anchor
                        className={cx(
                          'inline-flex flex-row items-center gap-1',
                          'underline-offset-4',
                          'underline',
                          'decoration-[var(--accent-a4)] hover:decoration-[var(--accent-a5)]',
                          'text-[var(--accent-11)] hover:text-[var(--accent-12)]',
                          'transition-all duration-200 ease-in',
                          '',
                        )}
                        href={href}

                        // target="_blank"
                      >
                        {artist}, “{album}”
                      </Anchor>
                    </li>
                  )
                })}
              </ul>
              <div className="relative my-3 hidden md:my-6">
                <h2 className="my-3 text-xl font-black md:text-3xl">
                  Choose Time Range
                </h2>
              </div>
            </div>
          </div>
        </ModuleRow>
      </LayoutClient>
    </>
  )
}

export default function Page(props) {
  const revalidate = props?.revalidate || false
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  return <Slug revalidate={revalidate} segmentInfo={segmentInfo} />
}
