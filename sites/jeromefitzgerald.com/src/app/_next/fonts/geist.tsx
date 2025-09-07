import { Geist_Mono, Geist as Geist_Sans } from 'next/font/google'

import { cx } from '@/utils/cx'

const geistMono = Geist_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-mono',
})
const geistSans = Geist_Sans({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const fonts = cx(geistSans.variable, geistMono.variable)

export { fonts }
