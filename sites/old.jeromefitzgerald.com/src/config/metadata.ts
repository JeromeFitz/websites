import type { Metadata } from 'next'

const APPLICATION_NAME = 'Jerome Fitzgerald'
const DESCRIPTION = 'An actor, comedian, & writer hailing from Pittsburgh, PA.'
const IMAGE_URL =
  'https://cdn.jeromefitzgerald.com/images/2020/01/jfle--2020--cec-jr--bob-shields.jpg'
const KEYWORDS = [
  'Jerome',
  'Jerome Fitzgerald',
  'Pittsburgh',
  'Comedian',
  'Comedy',
  'Improv',
  'Sketch',
  'Stand-up',
  'Standup',
]
const NAME = 'Jerome Fitzgerald'
const PUBLISHER = 'Nice Group of People, LLC'
const TITLE_DEFAULT = 'Jerome Fitzgerald (he/him)'
const TITLE_TEMPLATE = 'Jerome Fitzgerald'
const URL = 'https://jeromefitzgerald.com'

const metadata: Metadata = {
  alternates: {},
  applicationName: APPLICATION_NAME,
  authors: [{ name: NAME, url: URL }],
  colorScheme: 'dark',
  creator: NAME,
  description: DESCRIPTION,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'Next.js',
  keywords: KEYWORDS,
  openGraph: {
    url: URL,
    siteName: APPLICATION_NAME,
    images: [
      {
        url: IMAGE_URL,
        width: 1280,
        height: 960,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  publisher: PUBLISHER,
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  title: {
    default: TITLE_DEFAULT,
    template: `%s | ${TITLE_TEMPLATE}`,
  },
  twitter: {
    card: 'summary_large_image',
    // title: TITLE,
    // description: DESCRIPTION,
    // // siteId: '1467726470533754880',
    creator: '@JeromeFitz',
    // creatorId: '1467726470533754880',
    // images: [IMAGE_URL],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export { metadata }
