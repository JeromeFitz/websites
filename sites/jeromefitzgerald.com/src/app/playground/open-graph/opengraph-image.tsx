import { cx } from '@jeromefitz/shared/src/utils/cx'
import { ImageResponse } from 'next/server'

// Route segment config
export const runtime = 'edge'

const avatar =
  'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2021/bighead--jerome--dizzy.svg'
const items = [
  {
    title: 'Jerome &: The Comedy Variety Show',
    segment: 'events',
    slug: '/events/2023/07/15/jerome-and',
    description: 'SAT 07/15 @ 09:00PM EDT',
    venue: 'Arcade Comedy Theater',
    location: 'Pittsburgh, PA',
  },
  {
    title: 'Alex O’Jerome',
    segment: 'shows',
    slug: '/shows/alex-o-jerome',
    description: 'The Vomit Twinz',
    venue: 'LAX to CHI to PIT Connection',
    location: 'improv',
  },
  {
    title: 'Boo Humbag: The Musical',
    segment: 'shows',
    slug: '/shows/boo-humbag-the-musical',
    description: 'The most celebrated morality tale of all-time.',
    venue:
      'Transfomred into a hilarious send-up with original song and dance numbers.',
    location: 'musical',
  },
]
const item = items[2]

// Image metadata
export const alt = 'Jerome'
export const size = {
  width: 1200,
  height: 600,
}

export const contentType = 'image/png'

// // Font
// const interRegular = fetch(
//   new URL('../../../assets/fonts/inter/v3/inter-regular.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())
// const interBlack = fetch(
//   new URL('../../../assets/fonts/inter/v3/inter-black.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

function Pill({ children }) {
  return (
    <div
      tw={cx(
        'm-4 mx-auto w-1/5 rounded-full border-2 border-[#0f0f0f] bg-[#f4f4f4] px-3 py-2 text-center text-[#0f0f0f]'
      )}
    >
      {children}
    </div>
  )
}

// Image generation
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/require-await
export default async function Image() {
  return new ImageResponse(
    (
      <div tw={cx('flex h-[600px] w-[1200px] border-2 bg-[#f4f4f4]')}>
        {/* // Start here */}
        <div
          tw={cx(
            'flex h-full w-full flex-row flex-wrap items-start  text-3xl',
            '',
            // @todo(vercel/og)
            'justify-items-start bg-[linear-gradient(170deg,_rgb(244,_244,_244),_rgb(207,_47,_152))]',
            '',
            ''
          )}
          style={{
            background:
              'linear-gradient(170deg, rgb(244, 244, 244), rgb(207, 47, 152))',
            justifyItems: 'start',
          }}
        >
          <div tw={cx('flex w-full flex-row justify-between', 'mb-12')}>
            <div
              tw={cx(
                'm-3 flex items-center p-3 ',
                // @todo(vercel/og)
                'align-top',
                '',
                ''
              )}
              style={{
                verticalAlign: 'top',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                tw={cx(
                  'h-16 w-16 rounded-full bg-[#f4f4f4] ',
                  // @todo(vercel/og)
                  'inline-block ring-1 ring-[#0f0f0f]',
                  '',
                  ''
                )}
                // @todo(vercel/og) cannot handle inline-block
                style={{
                  backgroundColor: '#f4f4f4',
                  border: '1px black',
                  display: 'block',
                }}
                src={avatar}
              />
              <span tw={cx('mx-4 text-2xl font-medium')}>jeromefitzgerald.com</span>
            </div>
            <div
              tw={cx(
                'm-3 flex items-center p-3',
                // @todo(vercel/og)
                'align-top',
                '',
                ''
              )}
              style={{
                verticalAlign: 'top',
              }}
            >
              <span tw={cx('mx-4 text-2xl font-medium')}>{item.segment}</span>
              <span
                tw={cx(
                  'inline-block h-16 w-16 rounded-full ',
                  // @todo(vercel/og)
                  ' bg-breeze ring-1 ring-[#0f0f0f]'
                )}
                style={{
                  backgroundColor: '#f4f4f4',
                  border: '1px black',
                  display: 'block',
                }}
              />
            </div>
          </div>
          <div
            tw={cx(
              'flex w-full flex-row justify-center',
              'mb-12',
              // @todo(vercel/og)
              'align-top',
              '',
              ''
            )}
            style={{
              verticalAlign: 'top',
            }}
          >
            <div tw={cx('flex flex-row flex-wrap')}>
              <span
                tw={cx(
                  'mx-16 px-16 text-center text-6xl uppercase',
                  // @todo(vercel-og)
                  'font-black'
                )}
                style={{
                  fontWeight: 900,
                }}
              >
                {item.title}
              </span>
            </div>
          </div>
          <div
            tw={cx(
              'flex w-full flex-row justify-center text-center',
              'mb-12',
              // @todo(vercel/og)
              'align-top',
              '',
              ''
            )}
            style={{
              verticalAlign: 'top',
            }}
          >
            <div
              tw={cx(
                'flex flex-row flex-wrap justify-center text-center',
                // @todo(vercel/og)
                'gap-1',
                '',
                ''
              )}
              style={{
                gap: '1.25rem',
              }}
            >
              <span tw={cx('mx-4 w-full px-4 text-center text-3xl font-bold')}>
                {item.description}
              </span>
              <span tw={cx('mx-4 w-full px-4 text-center text-2xl font-semibold')}>
                {item.venue}
              </span>
              <span
                tw={cx(
                  ' mx-4 w-full px-4 text-center text-xl font-semibold uppercase'
                )}
              >
                <Pill>{item.location}</Pill>
              </span>
            </div>
          </div>
        </div>
        {/* // End here */}
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      // fonts: [
      //   {
      //     name: 'Inter',
      //     data: await interRegular,
      //     style: 'normal',
      //     weight: 400,
      //   },
      //   {
      //     name: 'Inter',
      //     data: await interBlack,
      //     style: 'normal',
      //     weight: 900,
      //   },
      // ],
    }
  )
}
