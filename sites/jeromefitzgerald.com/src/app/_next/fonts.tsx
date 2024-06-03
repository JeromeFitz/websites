import { cx } from '@jeromefitz/ds/utils/cx'

import { GeistMono as fontGeistMono } from 'geist/font/mono'
import { GeistSans as fontGeistSans } from 'geist/font/sans'
// import localFont from 'next/font/local'
// import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'

// const fontIBMPlexSerif = IBM_Plex_Serif({
//   display: 'swap',
//   subsets: ['latin'],
//   variable: '--font-ibm-plex-serif',
//   weight: ['400', '500'],
// })
// const fontIBMPlexSans = IBM_Plex_Sans({
//   display: 'swap',
//   subsets: ['latin'],
//   variable: '--font-ibm-plex-sans',
//   weight: ['400', '500'],
// })
// const fontIBMPlexMono = IBM_Plex_Mono({
//   display: 'swap',
//   subsets: ['latin'],
//   variable: '--font-ibm-plex-mono',
//   weight: ['400', '500'],
// })

// const fonts = cx(fontInter.variable, GeistSans.variable, GeistMono.variable)
const fonts = cx(
  // fontInter.variable,
  fontGeistMono.variable,
  fontGeistSans.variable,
  //   fontIBMPlexSans.variable,
  //   fontIBMPlexSerif.variable,
  //   fontIBMPlexMono.variable,
)

// const fontInter = { variable: '' }
// const fontInter = localFont({
//   declarations: [
//     {
//       prop: 'unicode-range',
//       value:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
//     },
//   ],
//   display: 'swap',
//   src: '../../public/fonts/inter/inter-4.0.0-beta9g-var.woff2',
//   style: 'normal',
//   variable: '--font-inter',
//   weight: '100 900',
// })

// const fontGeistMono = localFont({
//   declarations: [
//     {
//       prop: 'unicode-range',
//       value:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
//     },
//   ],
//   display: 'swap',
//   src: '../../public/fonts/geist/GeistMonoVF--1.0.0.woff2',
//   style: 'normal',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })

// const fontGeistSans = localFont({
//   declarations: [
//     {
//       prop: 'unicode-range',
//       value:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
//     },
//   ],
//   display: 'swap',
//   src: '../../public/fonts/geist/GeistVF--1.0.0.woff2',
//   style: 'normal',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })

export { fonts }
