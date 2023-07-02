import { cx } from '@jeromefitz/shared/src/utils'
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const avatar =
  'https://cdn.jeromefitzgerald.com/jeromefitzgerald.com/images/2021/bighead--jerome--dizzy.svg'

const data = [
  {
    type: 'homepage',
    title: 'Jerome (he/him)',
    description: 'Comedian. Human. Nice.',
    extra: 'An actor, comedian, & writer hailing from Pittsburgh, PA.',
    slug: 'homepage',
    image: null,
  },
  {
    type: 'events',
    title: 'Jerome &: The Comedy Variety Show',
    description: 'Saturday, January 21st @ 09:30PM EDT',
    extra: 'Arcade Comedy Theater',
    slug: '2023/01/21/jerome-and',
    image: null,
  },
  {
    type: 'shows',
    title: 'Jerome &',
    description:
      'The Comedy Variety Show. Special Friends & Out of Town Guests. Improv, Live Music, Sketch, Stand-up, & You!',
    extra: '',
    slug: 'jerome-and',
    image:
      'https://jerome.vercel.app/_next/image?url=https%3A%2F%2Fcdn.jeromefitzgerald.com%2Fimages%2F2020%2F01%2Fjfle--2020--cec-jr--bob-shields.jpg&w=1200&q=90',
  },
]
const item = data[1]

const TYPES = {
  EVENT: 'events',
  PAGE: 'pages',
  HOMEPAGE: 'homepage',
  SHOW: 'shows',
}

const TEMP = [
  {
    type: TYPES.EVENT,
    emoji: '🗓️',
    name: 'events',
  },
  {
    type: TYPES.PAGE,
    emoji: '📄',
    name: 'pages',
  },
  {
    type: TYPES.SHOW,
    emoji: '🎭',
    name: 'shows',
  },
  {
    type: TYPES.HOMEPAGE,
    emoji: '🏠',
    name: 'homepage',
  },
]

const key = crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(process.env.OG_API_KEY),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign']
)

function toHex(arrayBuffer: ArrayBuffer) {
  return Array.prototype.map
    .call(new Uint8Array(arrayBuffer), (n) => n.toString(16).padStart(2, '0'))
    .join('')
}

const font400 = fetch(
  new URL('../../../../assets/fonts/inter/inter-regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())
// const font700 = fetch(
//   new URL('../../../../assets/fonts/inter/inter-bold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())
// const font800 = fetch(
//   new URL('../../../../assets/fonts/inter/inter-extrabold.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())
// const font900 = fetch(
//   new URL('../../../../assets/fonts/inter/inter-black.ttf', import.meta.url)
// ).then((res) => res.arrayBuffer())

function Header({ avatar, emoji, url }) {
  return (
    <div
      tw={cx(
        'absolute left-0 top-0 flex w-full flex-col items-center justify-center p-4'
      )}
    >
      <div
        tw={cx(
          'absolute top-4 flex items-center text-center font-bold tracking-tight',
          'left-4'
        )}
      >
        <span tw={cx('h-24 w-24')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            tw={cx('h-24 w-24', 'rounded-full border border-solid border-black')}
          />
        </span>
        <span
          // style={{ fontSize: 24, fontWeight: 400 }}
          tw={cx('ml-4', 'text-2xl font-normal')}
        >
          jeromefitzgerald.com
        </span>
      </div>
      {url !== 'homepage' ? (
        <div
          tw={cx(
            'absolute top-4 flex items-center text-center font-bold tracking-tight',
            'right-4'
          )}
        >
          <span
            // style={{ fontSize: 24, fontWeight: 400 }}
            tw={cx('mr-4', 'text-2xl font-normal')}
          >
            {url}
          </span>
          <span tw={cx('h-24 w-24', '')}>
            <span
              tw={cx(
                'h-24 w-24',
                'rounded-full border border-solid border-black',
                'pl-4 pt-5 text-center text-6xl'
              )}
            >
              {emoji}
            </span>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

function Spacer() {
  return <div tw={cx('flex h-14 w-full p-4')} />
}

async function handler(req: NextRequest) {
  // const start = Date.now()
  const { searchParams } = req.nextUrl

  const id = searchParams.get('id')
  const foo = searchParams.get('foo')
  const token = searchParams.get('token')

  const verifyToken = toHex(
    await crypto.subtle.sign(
      'HMAC',
      await key,
      new TextEncoder().encode(JSON.stringify({ id }))
    )
  )

  // console.dir(id)
  // console.dir(token)
  // console.dir(verifyToken)

  if (token !== verifyToken) {
    return new Response('Invalid token.', { status: 401 })
  }

  const fontData400 = await font400
  // const fontData700 = await font700
  // const fontData800 = await font800
  // const fontData900 = await font900

  const type = TEMP[TEMP.findIndex((t) => t.type === item?.type)]

  if (!type) {
    console.dir(`> NOTHING FOUND DOOD`)
  }

  const description = encodeURIComponent(item.description)
  console.dir(description)
  console.dir(foo)

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          backgroundImage: 'linear-gradient(to bottom, #f1f1f1, #F9C8E0)',
          fontFamily: '"Inter"',
        }}
        tw={cx(
          'absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center p-4',
          'bg-white'
        )}
      >
        <Header avatar={avatar} emoji={type.emoji} url={type.name} />
        <Spacer />
        <div tw={cx('flex flex-col flex-wrap items-center justify-center ')}>
          <div
            // style={{ fontSize: 56, fontWeight: 900 }}
            tw={cx(
              'mx-4 my-0 flex w-auto flex-col flex-wrap justify-center px-6 py-4 text-center',
              'tracking-tight',
              'text-6xl font-black'
            )}
          >
            {item.title}
          </div>
          <div
            // style={{ fontSize: 36, fontWeight: 700 }}
            tw={cx(
              'mx-4 my-0 flex w-auto flex-wrap justify-center px-2 py-4 text-center',
              'tracking-tight',
              'text-3xl font-bold'
            )}
          >
            {item.description}
          </div>
          <div
            // style={{ fontSize: 32, fontWeight: 500 }}
            tw={cx(
              'mx-4 my-0 flex w-auto flex-col flex-wrap justify-center px-6 py-4 text-center',
              'tracking-tight',
              'text-2xl font-normal'
            )}
          >
            {item.extra}
          </div>
        </div>
      </div>
    ),
    {
      emoji: 'twemoji',
      fonts: [
        {
          name: 'Inter',
          data: fontData400,
          style: 'normal',
          weight: 400,
        },
        // {
        //   name: 'Inter',
        //   data: fontData700,
        //   style: 'normal',
        //   weight: 700,
        // },
        // {
        //   name: 'Inter',
        //   data: fontData800,
        //   style: 'normal',
        //   weight: 800,
        // },
        // {
        //   name: 'Inter',
        //   data: fontData900,
        //   style: 'normal',
        //   weight: 900,
        // },
      ],
      width: 1200,
      height: 600,
    }
  )
  // console.dir(Date.now() - start)
  return imageResponse
}

export default handler
